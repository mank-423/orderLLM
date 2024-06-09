import React from 'react';
import auth from '../assets/svg/authentication.svg';
import chat from '../assets/svg/chat.svg';
import orderComplete from '../assets/svg/orderComplete.svg';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
}

const imageMap: Record<number, string> = {
  1: auth,
  2: chat,
  3: orderComplete,
};

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col items-center gap-10 justify-center xl:w-full lg:w-full md:w-full overflow-hidden shadow-lg py-5 border rounded-2xl bg-[#484848] transition-transform transform hover:scale-105 hover:shadow-2xl mb-4 font-dm-sans">
      <img className="h-48 w-48 md:w-auto object-contain" src={imageMap[stepNumber]} alt={`Step ${stepNumber}`} />
      <div className='p-4'>
        <div className="text-white text-2xl mb-2">
          Step {stepNumber}: {title}
        </div>
        <p className="text-orange-400 text-lg">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
