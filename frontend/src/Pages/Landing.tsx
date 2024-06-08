import Navbar from "../Components/Navbar"
// import logo from '../assets/Images/logoCirclebg.png'
// import people from '../assets/svg/people.svg'
import '../styles/LandingPage.css'
import twitter from '../assets/social/twitter.jpg';
import twitter2 from '../assets/social/twitter2.jpg';
import twitter3 from '../assets/social/twitter3.jpg';
// import orderConfirm from '../assets/svg/orderconfirm.svg'
import bg from '../assets/Images/bgnew.png';
import { ArrowDown } from "react-feather-icon"
import ImageCarousel from "../Components/ImageCarousel";
import ValueCard from "../Components/ValueCard";
import StepCard from "../Components/StepCard";
import { Twitter, Linkedin, Mail, Smartphone } from 'react-feather';
import { useNavigate } from "react-router-dom"

const Landing = () => {

  const navigate = useNavigate();
  const images = [twitter3, twitter, twitter2]

  return (
    <div className="font-dm-sans">
      <Navbar />

      {/* Logo and heading */}
      <section className="relative bg-gray-600">
        <div className="relative flex justify-center items-center">
          <div className="flex flex-col absolute top-20 z-30 justify-center items-center text-center md:text-left bg-gray-600 bg-opacity-50 p-8 rounded-md">
            <h1 className="text-white font-medium text-6xl md:text-7xl lg:text-9xl mb-4">Order LLM</h1>
            <p className="text-white text-md md:text-xl lg:text-2xl mb-0">Effortless ordering, no lines attached!</p>
          </div>
        </div>
        <div className="relative w-full lg:h-[600px] md:h-[600px] h-[500px] overflow-hidden blur-sm">
          <img src={bg} className="absolute w-full h-full object-cover filter" />
          <div className="absolute inset-0 bg-opacity-4"></div>
        </div>
      </section>



      {/* Intro to the product */}

      {/* Showcase of the product in a grid layout */}
      <section className="bg-[#f6e4c4] absolute lg:w-4/5 md:w-4/5 w-full z-100 lg:top-[620px] md:top-[620px] top-[540px] lg:left-36 md:left-10 rounded-3xl font-dm-sans border border-black">
        {/* Product description */}
        <div className="lg:px-20 md:px-20 lg:py-10 md:py-5 py-5 flex font-bold justify-center items-center lg:gap-20 md:gap-1">
          <div className="flex justify-center items-center xl:gap-28 lg:gap-20 md:gap-10 gap-5">
            <p className="xl:text-3xl lg:text-2xl md:text-lg text-sm xl:w-[200px] lg:w-[150px] md:w-[160px] w-[85px] flex justify-center items-center">Order Easily</p>
            <p className="lg:text-[50px] md:text-[50px] text-[40px] lg:mr-0 md:mr-0 mr-3 font-thin">|</p>
          </div>
          <div className="flex justify-center items-center lg:gap-20 md:gap-10 gap-5">
            <p className="xl:text-3xl lg:text-2xl md:text-lg text-sm xl:w-[250px] lg:w-[200px] md:w-[160px] w-[110px] flex justify-center items-center">Cost-Effective</p>
            <p className="lg:text-[50px] md:text-[50px] text-[40px] lg:mr-0 md:mr-0 mr-3 font-thin">|</p>
          </div>
          <div className="flex justify-center items-center lg:gap-20 md:gap-10 gap-5">
            <p className="xl:text-3xl lg:text-2xl md:text-lg text-sm xl:w-[200px] lg:w-[150px] md:w-[160px] w-[85px] flex justify-center items-center">No Queues</p>
          </div>
        </div>
      </section>

      {/* Negative */}
      <section className="bg-[#383636] p-8 md:p-10 min-h-screen">
        <div className="p-12 md:p-24 text-orange-400 flex flex-col items-center gap-10 text-2xl md:text-4xl">

          <div className="flex flex-col justify-center items-center w-full py-10">
            <h1 className="text-center lg:mb-8 flex justify-center items-center lg:text-6xl md:text-4xl text-2xl">Ever faced these issues while dining out?</h1>
            <div className="flex flex-col gap-16 w-full">
              <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-20 md:gap-20 w-full py-10">

                <div className="bg-[#707070] hover:bg-[#706f6f] rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border custom-border-value p-10 lg:w-[500px] md:w-[300px] w-[300px]">
                  <h2 className="text-orange-300 lg:text-5xl md:text-2xl text-3xl flex justify-center items-center mb-5 lg:w-[450px] md:w-[200px]">As Consumer?</h2>
                  <ul className="flex flex-col gap-3 pb-2 justify-center items-start">
                    <li className="lg:text-4xl md:text-lg text-[16px] lg:py-5">⎯ Customizing orders is hard</li>
                    <li className="lg:text-4xl md:text-lg text-[16px] lg:py-5">⎯ Long queues</li>
                    <li className="lg:text-4xl md:text-lg text-[16px] lg:py-5">⎯ Payment issues</li>
                  </ul>
                </div>

                <div className="bg-[#707070] hover:bg-[#706f6f] rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border custom-border-value p-10 lg:w-[500px] md:w-[300px] w-[300px]">
                  <h2 className="text-orange-300 lg:text-5xl md:text-2xl text-3xl flex justify-center items-center mb-5 lg:w-[450px] md:w-[200px]">As Owner?</h2>
                  <ul className="flex flex-col gap-3 lg:text-4xl md:text-lg text-md pb-2 justify-center items-start">
                    <li className="lg:text-4xl md:text-lg text-[16px] lg:py-5">⎯ No reliable ordering system</li>
                    <li className="lg:text-4xl md:text-lg text-[16px] lg:py-5">⎯ Less staff, more work</li>
                    <li className="lg:text-4xl md:text-lg text-[16px] lg:py-5">⎯ App management</li>
                  </ul>
                </div>
              </div>

            </div>

          </div>

          <div className="text-white flex lg:flex-row md:flex-row flex-col gap-12 py-10">
            <div className="flex justify-center items-center gap-2">
              <h1 className="lg:text-5xl md:text-3xl text-xl flex justify-center items-center">And then we see</h1>
            </div>

            <div className="lg:w-[400px] md:w-[350px]">
              <ImageCarousel images={images} />
            </div>

            <div className="flex justify-center items-center gap-2">
              <h1 className="lg:text-5xl md:text-3xl text-xl flex justify-center items-center">these posts</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-[#818181] p-8 md:px-12 md:py-16 h-1/5 font-dm-sans">
        <h1 className="text-orange-200 text-3xl md:text-4xl text-center mb-10 p-7 font-dm-sans">
          We cannot help you with all of it
        </h1>

        <h1 className="text-orange-400 text-4xl md:text-4xl lg:text-5xl xl:text-5xl text-center mb-10 p-7 font-dm-sans">
          But!
        </h1>

        <h1 className="text-orange-400 text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-10 p-7 font-dm-sans">
          We can make ordering and payments very easy and fast!
        </h1>

        <h1 className="text-orange-400 text-4xl md:text-4xl lg:text-5xl xl:text-5xl text-center mb-10 p-7 font-dm-sans">
          How Order LLM can do wonders for you!
        </h1>

        {/* List of Features */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white p-10">
          <ValueCard
            image="history"
            title="Order History"
            description="Access and review your order history for quick reference."
          />
          <ValueCard
            image="fast"
            title="Quick Order Placement"
            description="Place your orders swiftly through a seamless chat experience."
          />
          <ValueCard
            image="error"
            title="Error-Free Processing"
            description="Enjoy a streamlined ordering process with minimal room for errors."
          />
          <ValueCard
            image="payment"
            title="Payment Triggers"
            description="Initiate and complete payments directly within the chat interface."
          />
        </ul>
      </section>


      {/* Steps to use it */}
      {/* Consumer */}
      {/* 484848 */}
      <section className="bg-[#f6e4c4] p-8 md:p-16 h-1/5">
        <div className="mb-8">
          <h1 className="text-orange-400 font-bold text-3xl md:text-4xl flex justify-center items-center">How you can use ORDER LLM?</h1>
        </div>

        <div className="grid grid-cols-1 justify-center xl:px-40 lg:px-20 px-8 gap-6">
          <StepCard
            stepNumber={1}
            title="Authenticate"
            description="Authenticate and enter the portal to start your order."
          />

          <div className="flex px-4 justify-center items-center font-bold text-black">
            {/* Use ArrowDown for mobile and ArrowRight for others */}
            <ArrowDown className="font-bold" />
          </div>

          <StepCard
            stepNumber={2}
            title="Place Order"
            description="Chat to place your order swiftly and effortlessly."
          />

          <div className="flex justify-center items-center text-black px-4 font-bold">
            {/* Use ArrowDown for mobile and ArrowRight for others */}
            <ArrowDown className="font-bold" />
          </div>

          <StepCard
            stepNumber={3}
            title="Complete Payment"
            description="Complete your order and pay directly within the chat interface."
          />
        </div>
      </section>

      <section className="bg-[#818181]">
        <h1 className="text-orange-200 text-3xl md:text-4xl text-center mb-2 p-7 font-dm-sans">
          So Why Order LLM ??
        </h1>

        <div className="p-5">
          <p className="px-10 py-10 xl:text-3xl lg:text-3xl md:text-2xl text-lg leading-10 font-semibold custom-border-value rounded-xl text-[#242424]">
            Welcome to Order LLM, your ultimate solution for effortless and streamlined ordering experiences without the hassle of waiting in long queues. Whether you're a customer looking to customize your orders according to your preferences or a business owner seeking a reliable ordering system, Order LLM has you covered. With our intuitive chat-based interface, you can place orders swiftly, manage payments seamlessly, and access your order history with ease. Say goodbye to complexities and hello to convenience with Order LLM. Join us today and revolutionize the way you order!
          </p>
          <br />
          <div className="flex justify-center items-center xl:hidden lg:hidden md:hidden">
            <button
              onClick={() => { navigate(location.pathname === '/auth' ? '/' : '/auth') }}
              className="bg-[#F27B35] text-white py-4 px-8 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none font-bold text-lg custom-border-value"
            >
              Try it out!
            </button>
          </div>
        </div>
      </section>
      {/* Features */}

      <section className="bg-[#484848] p-8 md:p-16 h-auto">
        <div className="mb-8">
          <h1 className="text-orange-400 font-bold text-3xl md:text-4xl flex justify-center items-center">Get in Touch</h1>
        </div>

        <div className="flex justify-center items-center gap-6 xl:px-40 lg:px-20 px-16">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center max-w-[500px] max-h-[800px]">
            <h2 className="text-xl font-bold mb-4 flex justify-center items-center">Interested in trying out Order LLM?</h2>
            <p className="text-gray-700 mb-4">Contact us and we'll set up a demo for you!</p>
            <p className="text-gray-700 mb-4">You can also reach out for any inquiries or questions.</p>
            <p className="text-gray-700 mb-4">Email: contact@orderllm.com</p>
            <p className="text-gray-700 mb-4">Phone: +1 (123) 456-7890</p>
            <p className="text-gray-700 mb-4">Message: "Demo Request" or "Inquiry" in the subject line.</p>
            <div className="flex justify-center items-center gap-4 mt-6">
              <a href="https://twitter.com/orderllm" target="_blank" rel="noopener noreferrer">
                <Twitter className="text-blue-500 hover:text-blue-700 cursor-pointer" />
              </a>
              <a href="https://linkedin.com/company/orderllm" target="_blank" rel="noopener noreferrer">
                <Linkedin className="text-blue-500 hover:text-blue-700 cursor-pointer" />
              </a>
              <a href="mailto:contact@orderllm.com">
                <Mail className="text-blue-500 hover:text-blue-700 cursor-pointer" />
              </a>
              <a href="tel:+11234567890">
                <Smartphone className="text-blue-500 hover:text-blue-700 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-100 px-5 py-20">
        <div className="flex justify-center items-center">
          <h1 className="text-lg font-bold my-2">Developed by <a href="https://github.com/mank-423" className="text-blue-500">@Mayank</a> with ❤️</h1>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-lg font-bold my-2">Project Source code: <a href="https://github.com/mank-423/orderLLM" className="text-blue-400">Link🔗</a></h1>
        </div>
      </section>
    </div>
  )
}

export default Landing;
