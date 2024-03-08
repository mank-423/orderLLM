import Navbar from "../Components/Navbar"
import logo from '../assets/Images/logoCirclebg.png'
import people from '../assets/svg/people.svg'
import chat from '../assets/svg/chat.svg'
import auth from '../assets/svg/authentication.svg'
import orderComplete from '../assets/svg/orderComplete.svg'
import orderConfirm from '../assets/svg/orderconfirm.svg'
import history from '../assets/svg/history.svg'
import fast from '../assets/svg/fast.svg'
import error from '../assets/svg/error.svg'
import payment from '../assets/svg/payment.svg'
import { ArrowRight, ArrowDown } from "react-feather-icon"
import { useNavigate } from "react-router-dom"

const Landing = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      {/* Logo and heading */}
      <section className="bg-[#818181] pb-6 h-1/5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center items-end">
            <img src={logo} alt="logo" />
          </div>

          <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left">
            <div className="flex flex-col items-center">
              <h1 className="text-orange-400 font-bold text-4xl">ORDER LLM</h1>
              <h2 className="text-white font-semibold text-xl mb-5">Effortless ordering, no lines attached.</h2>
              <button
                className="bg-[#F27B35] text-white py-4 px-8 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none font-bold text-2xl"
                onClick={() => { navigate('/auth') }}
              >
                Try yourself!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro to the product */}

      {/* Showcase of the product in a grid layout */}
      <section className="bg-[#383636] grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-24 h-1/5">
        {/* Product description */}
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4 text-orange-400 font-bold text-3xl md:text-4xl text-center">
            <span className="text-white">Order LLM</span> revolutionizes <br />the way you order
          </p>
          <p className="text-white font-semibold text-lg md:text-xl pt-8">Scroll to know more</p>
          <p className="text-white rotate-180 font-bold mt-[-10px]">^</p>
        </div>

        {/* Product image */}
        <div className="flex justify-center">
          <img src={people} className="h-80 w-160 object-cover" alt="Order LLM Product" />
        </div>
      </section>

      {/* Use of product */}
      <section className="bg-orange-100 p-8 md:p-10 h-1/5">
        <h1 className="flex justify-center items-center font-bold text-3xl md:text-4xl mb-5 text-[#383636]">What is ORDER LLM ?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center items-center">
            <img src={orderConfirm} className="h-80 w-80" alt="order" />
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-orange-400 font-semibold text-3xl md:text-4xl my-3">
              A multi-functionality chatbot,
              which can help consumers to <span className="text-[#484848]">explore the catalog</span> effortlessly and <span className="text-[#484848]">place the orders</span> easily.
            </h1>
          </div>
        </div>
      </section>

      {/* Steps to use it */}
      {/* Consumer */}
      <section className="bg-[#484848] p-8 md:p-16 h-1/5">
        <div className="mb-8">
          <h1 className="text-orange-400 font-bold text-3xl md:text-4xl flex justify-center items-center">Using Order LLM</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 p-10">
          <div>
            <img src={auth} alt="chat" className="h-50 w-50" />
            <h1 className="text-white text-center mt-2 md:mt-0">Authenticate and enter the portal</h1>
          </div>

          <div className="flex px-4 justify-center items-center font-bold text-orange-100">
            {/* Use ArrowDown for mobile and ArrowRight for others */}
            <ArrowDown className="md:hidden font-bold" />
            <ArrowRight className="hidden md:block font-bold" />
          </div>

          <div>
            <img src={chat} alt="chat" className="h-40 w-50 mt-5" />
            <h1 className="text-white text-center mt-2 md:mt-0">Chat to place your order</h1>
          </div>

          <div className="flex justify-center items-center text-orange-300 px-4 font-bold">
            {/* Use ArrowDown for mobile and ArrowRight for others */}
            <ArrowDown className="md:hidden font-bold" />
            <ArrowRight className="hidden md:block font-bold" />
          </div>

          <div>
            <img src={orderComplete} alt="chat" className="h-50 w-60" />
            <h1 className="text-white text-center mt-2 md:mt-0">Complete your order and pay!</h1>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#818181] p-8 md:px-12 md:py-16 h-1/5">
        <h1 className="text-orange-400 font-bold text-3xl md:text-4xl text-center mb-10 p-7">Key Features of ORDER LLM</h1>

        {/* List of Features */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
          {/* Feature 1: Quick Order Placement */}
          <li className="flex flex-col items-center mb-8">
            <img src={fast} alt="Quick Order Placement" className="h-20 w-20 mb-4" />
            <div>
              <h2 className="text-xl font-bold">Quick Order Placement</h2>
              <p>Place your orders swiftly through a seamless chat experience.</p>
            </div>
          </li>

          {/* Feature 2: Payment Triggers */}
          <li className="flex flex-col items-center mb-8">
            <img src={payment} alt="Payment Triggers" className="h-20 w-20 mb-4" />
            <div>
              <h2 className="text-xl font-bold">Payment Triggers</h2>
              <p>Initiate and complete payments directly within the chat interface.</p>
            </div>
          </li>

          {/* Feature 3: Order History */}
          <li className="flex flex-col items-center mb-8">
            <img src={history} alt="Order History" className="h-20 w-20 mb-4" />
            <div>
              <h2 className="text-xl font-bold">Order History</h2>
              <p>Access and review your order history for quick reference.</p>
            </div>
          </li>

          {/* Feature 4: Error-Free Processing */}
          <li className="flex flex-col items-center">
            <img src={error} alt="Error-Free Processing" className="h-20 w-20 mb-4" />
            <div>
              <h2 className="text-xl font-bold">Error-Free Processing</h2>
              <p>Enjoy a streamlined ordering process with minimal room for errors.</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Landing;
