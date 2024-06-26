import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/firebaseConfig';
import logo from '../../assets/Images/logoCircle.png'
import ClipLoader from "react-spinners/ClipLoader";
import { CornerDownLeft } from 'react-feather-icon'
import baseUrl from "../../baseUrl";
import Avatar from "../../Components/Avatar";


//Type has changed so wee need to change this
type OrderItem = {
  item: string;
  quantity: number;
  price: number;
};

type ConfirmationResponse = {
  status: boolean;
  unavailableItems?: string[];
  response: {
    formatResponse: {
      orders: OrderItem[];
    };
    finalPrice: number;
  };
};

const ChatSection: React.FC = () => {
  const [msgAr, setMsgAr] = useState<string[]>([]);
  const [msg, setMsg] = useState<string>('');
  const [ai, setAi] = useState<string>('');
  const [confirmation, setConfirmation] = useState<ConfirmationResponse | null>(null);
  const [allOrders, setAllOrders] = useState<any[] | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  let navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSending(true);
    const response = await fetch(`${baseUrl}/api/generate/order`, {
      method: 'POST',
      body: JSON.stringify({
        userPrompt: msg,
      }),
      headers: {
        'Content-type': 'application/json',
      }
    });
    setMsg('');
    const result = await response.json();

    setMsgAr(prevMsgAr => [...prevMsgAr, msg, result.response]);
    setAi(result.response);
    setIsSending(false);

    if (result.status === 'end') {
      const confirm = window.confirm("Are you sure to confirm the order?")
      if (confirm) {
        handleOrderConfirm(result.response);
        console.log(ai);
      } else {
        alert("Order cancelled!")
      }

    }
  };

  const handleOrderConfirm = async (order: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/generate/confirm`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: user.email,
          orderStatement: order,
        })
      });

      // console.log("The final order:",order);

      const data: ConfirmationResponse = await response.json();

      if (data.status == true) {
        console.log(data);
        setConfirmation(data);
        console.log(confirmation);
        setMsgAr([]);

        getAllOrders();
      }else{
        alert(`Right orders weren't placed. Unavailable Items that you tried to confirm are: ${data.unavailableItems}`);
        setMsgAr([]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Remove the stored localStorage
      localStorage.removeItem('user');
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', (error as Error).message);
    }
  };

  // const handleOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedIndex = e.target.value;
  //   // Perform actions based on the selected index, such as displaying details of the selected order
  //   console.log("Selected Order Index:", selectedIndex);
  // };


  // Function to open the modal
  const openModal = (index: number) => {
    setSelectedOrderIndex(index);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedOrderIndex(null);
    setIsModalOpen(false);
  };

  // Render the modal content
  const renderModalContent = () => {
    if (selectedOrderIndex !== null && allOrders && allOrders[selectedOrderIndex]) {
      const selectedOrder = allOrders[selectedOrderIndex];

      return (
        <div className="bg-white p-2 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <p className="text-lg font-semibold">Order {selectedOrderIndex + 1}</p>
          <ul className="divide-y divide-gray-300">
            {selectedOrder.order.map((item: any, itemIndex: number) => (
              <li key={itemIndex} className="py-2">
                <p className="text-base font-semibold">{`Item ${itemIndex + 1}: ${item.item}`}</p>
                <p className="text-base">Quantity: {item.quantity}</p>
                <p className="text-base">Price: {item.price}</p>
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold mt-4">Final Price: {selectedOrder.finalPrice}</p>
          {/* Close button */}
          <button onClick={closeModal} className="bg-orange-400 text-white w-full px-4 py-2 rounded-lg mt-4">Close</button>
        </div>
      );
    }
    return null;
  };


  const getAllOrders = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/generate/allOrders/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAllOrders(data);
        // console.log("Response Data", data);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  //Check if the user is admin or not, if yes need to show one button for admin panel
  const isAdminCheck = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/users/isAdmin/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });

      const data = await response.json();

      // Check if isAdmin property exists in the response data
      if ('isAdmin' in data) {
        // Save the isAdmin property to localStorage
        localStorage.setItem('isAdmin', data.isAdmin);
        setIsAdmin(data.isAdmin);
        console.log(isAdmin);

      } else {
        console.error('isAdmin property not found in the response data');
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    isAdminCheck();
  }, [])

  useEffect(() => {
    getAllOrders();
  }, []);


  return (
    <section className="min-h-screen">

      <div className="lg:grid lg:grid-cols-5 md:grid md:grid-cols-5 bg-[#211f1f] min-h-screen lg:p-10 md:p-10 p-4">
        {/* First Div (Orange) - Now takes 1 part */}
        <div className="lg:col-span-1 md:col-span-1 lg:p-4 p-1 flex lg:flex-col md:flex-col items-center gap-5">
          {/* Inner div with data */}
          <div className="flex flex-row gap-5">
            <div>
              <div className="rounded-full bg-white flex max-w-fit p-3 mb-2 text-center">
                <Avatar initials={user.name[0] || 'default'} />
                {/* <Gravatar email={user?.email} /> */}
              </div>
            </div>

            {/* name of user */}
            <div className="flex flex-col justify-center">
              <div className="text-orange-400 font-bold lg:text-xl md:text-xl text-md">
                {user.name}
              </div>

              <div className="text-orange-200">
                {user.email}
              </div>
            </div>
          </div>

          <div className="py-4 min-w-full lg:block md:block hidden mt-20">
            {/* ORDERS */}
            <h1 className="text-2xl font-bold mb-4 text-orange-400">ORDERS</h1>

            <div className="bg-[#383636] flex justify-center items-center rounded-lg">
              {allOrders && allOrders.length > 0 ? (
                <div>
                  {/* Dropdown for orders on large screens */}
                  <div className="sm:hidden lg:block md:block">
                    <select
                      className="block w-[270px] py-2 px-4 bg-[#383636] text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-orange-300"
                      onChange={(e) => openModal(Number(e.target.value))}
                      value={selectedOrderIndex !== null ? selectedOrderIndex : ""}
                    >
                      <option value="">View your orders...</option>
                      {allOrders && allOrders.map((_order: any, index: number) => (
                        <option key={index} value={index}>Order {index + 1}</option>
                      ))}
                    </select>
                  </div>

                  {/* Modal */}
                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                      <div className="bg-white p-8 rounded-lg">
                        {renderModalContent()}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Show "No orders..." if there are no orders
                <div className="flex justify-center items-center h-full">
                  <p className="text-xl text-gray-500">No orders...</p>
                </div>
              )}
            </div>
          </div>

          {/* Sign out button */}
          {isAdmin && (
            <button onClick={() => navigate('/admin')} className="rounded-lg px-3 py-3 bg-orange-400 hover:bg-orange-500 text-white mt-auto lg:w-full md:w-full justify-center font-semibold lg:text-xl md:text-xl text-sm lg:block md:block hidden">
              <span className="flex justify-center items-center">Admin Panel</span>
            </button>
          )}
          <button onClick={handleSignOut} className={`rounded-lg px-3 py-3 bg-orange-300 hover:bg-orange-500 text-white lg:w-full md:w-full justify-center font-semibold lg:text-xl md:text-xl text-sm ${isAdmin ? '' : 'mt-auto'}`}>
            <span className="flex justify-center items-center">Logout</span>
          </button>
        </div>

        {isAdmin && (
          <div className="lg:hidden md:hidden flex justify-center items-center px-3 py-2">
            <button onClick={() => navigate('/admin')} className="rounded-lg px-3 py-3 bg-orange-400 hover:bg-orange-500 text-white w-full justify-center font-semibold lg:text-xl md:text-xl text-sm">
              <span className="flex text-lg justify-center items-center">Admin Panel</span>
            </button>
          </div>
        )}

        {/* Dropdown for orders on small screens */}
        <div className="lg:hidden md:hidden block py-4 px-3 min-w-full">
          <select
            className="block w-full py-2 px-4 bg-[#383636] text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-orange-300"
            onChange={(e) => openModal(Number(e.target.value))}
            value={selectedOrderIndex !== null ? selectedOrderIndex : ""}
          >
            <option value="">View your orders...</option>
            {allOrders && allOrders.map((_order: any, index: number) => (
              <option key={index} value={index}>Order {index + 1}</option>
            ))}
          </select>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg">
              {renderModalContent()}
            </div>
          </div>
        )}



        {/* Second div (Yellow) - Now takes 2 parts, equal to the third div */}
        <div className="lg:col-span-4 md:col-span-4 flex flex-col bg-[#383636] rounded-md lg:h-full md:h-full h-[80vh] p-4">
          {/* Messages visible */}
          {!showChat ? (
            // Let's order text and button
            <div className="flex-grow flex flex-col items-center justify-center p-4">
              <h2 className="lg:text-5xl md:text-5xl text-4xl text-white font-bold mb-4">Let's order!</h2>
              <button
                onClick={() => setShowChat(true)}
                className="bg-[#F27B35] text-white py-4 px-8 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none text-xl"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow p-4 overflow-y-auto max-h-[600px]">
                {msgAr.map((msg, index) => (
                  <div key={index} className="mb-2 flex items-start">
                    {/* Render user Identicon */}
                    {index % 2 === 0 && (
                      <div className="rounded-full min-w-fit mr-2">
                        <Avatar initials={user.name[0] || 'default'} />
                      </div>
                    )}

                    {/* Render AI logo for odd-indexed messages */}
                    {index % 2 !== 0 && (
                      <div className="rounded-full flex-shrink-0 mr-2">
                        {/* Replace the placeholder with the actual path or component for the AI image */}
                        <img src={logo} alt="AI Logo" className="w-8 h-8" />
                      </div>
                    )}

                    <div className={`rounded-lg p-2 font-bold text-md ${index % 2 !== 0 ? 'text-white' : 'text-orange-500'}`}>
                      {msg}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#F27B35" />
                  </div>
                )}
              </div>


              {/* Input */}
              <div className="flex flex-col items-center justify-center">
                {/* Area for input of message */}
                <form onSubmit={handleSubmit} className="flex items-center min-w-full">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Say 'Hi' to start a converstation.."
                      className="border-2 p-3 w-full rounded-l-lg rounded-r-lg focus:outline-none bg-[#383636] text-white"
                    />
                    <button
                      type="submit"
                      className="bg-orange-400 text-white border border-white border-l-orange-400 px-3 py-1 absolute right-0 top-0 bottom-0 rounded-r-lg rounded-l-none transition duration-300 hover:bg-orange-300 focus:outline-none"
                    >
                      <CornerDownLeft />
                    </button>
                  </div>
                </form>
              </div>


            </>
          )}

        </div>
      </div>


    </section>

  );
};

export default ChatSection;
