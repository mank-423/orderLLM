import baseUrl from "../../baseUrl";
import { useEffect, useState, useRef } from "react"
import DashboardCard from '../../Components/DashboardCard'
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import UserCard from "./UserCard";


type MonthlyOrder = {
  monthYear: string;
  orderQuantity: number;
  orderPrice: number;
}

type AdminType = {
  details: {
    totalPrice: number;
    totalOrder: number;
    totalActiveUsers: number;
    totalProducts: number;
    monthlyOrdersArray: MonthlyOrder[];
    usernamesArray: string[];
  }
}

const Dashboard = () => {

  const [adminDetails, setAdminDetails] = useState<AdminType | null>(null);
  const navigate = useNavigate();
  const totalPriceChartRef = useRef<Chart | null>(null);
  const totalOrdersChartRef = useRef<Chart | null>(null);

  const getAllAdminDetails = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/admin/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json();
      setAdminDetails(data)
      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem('user');
    navigate('/auth');
  }
  useEffect(() => {
    getAllAdminDetails();
  }, [])

  useEffect(() => {
    // Ensure the charts are destroyed when the component re-renders or unmounts
    return () => {
      totalPriceChartRef.current?.destroy();
      totalOrdersChartRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (adminDetails) {
      // Extracting data for charts
      const months = adminDetails.details.monthlyOrdersArray.map(entry => entry.monthYear);
      const totalPriceData = adminDetails.details.monthlyOrdersArray.map(entry => entry.orderPrice);
      const totalOrderData = adminDetails.details.monthlyOrdersArray.map(entry => entry.orderQuantity);

      // Creating bar chart for total price
      const totalPriceCtx = document.getElementById("totalPriceChart") as HTMLCanvasElement;
      new Chart(totalPriceCtx, {
        type: "bar",
        data: {
          labels: months,
          datasets: [{
            label: "Total Price",
            data: totalPriceData,
            backgroundColor: "rgb(75, 192, 192)",
            barThickness: 30 // Adjust the bar thickness as needed
          }]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
                // color: 'rgba(255, 255, 255, 0.1)' // Set x-axis grid line color to white with opacity
              },
              ticks: {
                color: 'white' // Change the color of the markings on the y-axis to white
              }
            },
            y: {
              grid: {
                display: false,
                // color: 'rgba(255, 255, 255, 0.3)' // Set y-axis grid line color to white with opacity
              },
              beginAtZero: true, // Start y-axis from zero
              ticks: {
                color: 'white' // Change the color of the markings on the y-axis to white
              }
            }
          },
          plugins: {
            legend: {
              display: false // Hide legend
            }
          }
        }
      });

      // Creating bar chart for total orders
      const totalOrdersCtx = document.getElementById("totalOrdersChart") as HTMLCanvasElement;
      new Chart(totalOrdersCtx, {
        type: "bar",
        data: {
          labels: months,
          datasets: [{
            label: "Total Orders",
            data: totalOrderData,
            backgroundColor: "rgb(255, 99, 132)",
            barThickness: 30 // Adjust the bar thickness as needed
          }]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
                // color: 'rgba(255, 255, 255, 0.1)' // Set x-axis grid line color to white with opacity
              },
              ticks: {
                color: 'white' // Change the color of the markings on the y-axis to white
              }
            },
            y: {
              grid: {
                display: false,
                // color: 'rgba(255, 255, 255, 0.3)' // Set y-axis grid line color to white with opacity
              },
              // beginAtZero: true, // Start y-axis from zero
              ticks: {
                color: 'white' // Change the color of the markings on the y-axis to white
              }
            }
          },
          plugins: {
            legend: {
              display: false // Hide legend
            }
          }
        }
      });
    }
  }, [adminDetails]);

  return (
    <section className="bg-gradient-to-br from-[#161616] via-[#3A3A3A] to-orange-300 min-h-screen p-10">
      <button
        className="bg-[#454444] text-white py-4 px-8 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none font-bold text-lg mb-3"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
      <h1 className="text-white font-bold text-3xl">Dashboard</h1>
      <div>
        <div className="flex md:flex-row lg:flex-row flex-col gap-10">
          <DashboardCard title="Total sales" symbol='$' value={adminDetails?.details.totalPrice ?? 0} />
          <DashboardCard title="Total orders" value={adminDetails?.details.totalOrder ?? 0} />
          <DashboardCard title="Active users" value={adminDetails?.details.totalActiveUsers ?? 0} />
          <DashboardCard title="Total products" value={adminDetails?.details.totalProducts ?? 0} />
        </div>
      </div>

      {/* Canvas elements for Bar Charts */}
      <div className="my-10">
        <h1 className="font-bold text-3xl text-white">Projections</h1>
        <div className="flex flex-col md:flex-row md:gap-6 lg:gap-10">
          <div className="flex-grow h-[200px] md:h-[350px] lg:h-[350px] max-w-full border border-white lg:mb-0 md:mb-0 mb-5">
            <canvas id="totalPriceChart" className="w-full h-full"></canvas>
            <h1 className="text-white font-bold text-lg mt-2 md:mt-4 flex justify-center items-center">Total Sales</h1>
          </div>
          <div className="flex-grow h-[200px] md:h-[350px] lg:h-[350px] max-w-full border border-white lg:mb-0 md:mb-0 mb-5">
            <canvas id="totalOrdersChart" className="w-full h-full"></canvas>
            <h1 className="text-white font-bold text-lg mt-2 md:mt-4 flex justify-center items-center">Total Orders</h1>
          </div>
        </div>
      </div>

      <h1 className="text-white font-bold text-lg">Users list</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto max-h-[600px] p-4">
        {adminDetails?.details.usernamesArray.reverse().map((name, index) => (
          <UserCard key={index} name={name} />
        ))}
      </div>



    </section>
  )
}

export default Dashboard
