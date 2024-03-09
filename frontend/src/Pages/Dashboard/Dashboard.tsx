import baseUrl from "../../baseUrl";
import { useEffect, useState } from "react"
import DashboardCard from '../../Components/DashboardCard'

type AdminType = {
  details: {
    totalPrice: number;
    totalOrder: number;
    totalActiveUsers: number;
    totalProducts: number;
  }
}

const Dashboard = () => {

  const [adminDetails, setAdminDetails] = useState<AdminType | null>(null);

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
  useEffect(() => {
    getAllAdminDetails();
  }, [])

  return (
    <section className="bg-gradient-to-br from-[#161616] via-[#3A3A3A] to-orange-300 min-h-screen p-10">
      <h1 className="text-white font-bold text-3xl">Dashboard</h1>
      <div>
        <div className="flex md:flex-row lg:flex-row flex-col gap-10">
          <DashboardCard title="Total sales" symbol='$' value={adminDetails?.details.totalPrice ?? 0} />
          <DashboardCard title="Total orders" value={adminDetails?.details.totalOrder ?? 0} />
          <DashboardCard title="Active users" value={adminDetails?.details.totalActiveUsers ?? 0} />
          <DashboardCard title="Total products" value={adminDetails?.details.totalProducts ?? 0} />
        </div>
      </div>

    </section>
  )
}

export default Dashboard
