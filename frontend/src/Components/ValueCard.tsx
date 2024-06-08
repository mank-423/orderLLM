import React from 'react';
import historyImg from '../assets/svg/history.svg';
import fastImg from '../assets/svg/fast.svg';
import errorImg from '../assets/svg/error.svg';
import paymentImg from '../assets/svg/payment.svg';

interface PropType {
  image: 'history' | 'fast' | 'error' | 'payment';
  title: string;
  description: string;
}

type ImageKey = 'history' | 'fast' | 'error' | 'payment';

const imageMap: Record<ImageKey, string> = {
  history: historyImg,
  fast: fastImg,
  error: errorImg,
  payment: paymentImg,
};

const ValueCard: React.FC<PropType> = (props) => {
  const { image, title, description } = props;

  return (
    <div className="bg-[#f6e4c4] max-w-sm overflow-hidden shadow-lg p-5 border rounded-2xl custom-border transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img className="w-full" src={imageMap[image]} alt={title} />
      <div className="px-6 py-4">
        <div className="flex justify-center items-center text-black font-bold text-xl mb-2">
          {title}
        </div>
        <p className="text-orange-400 text-lg">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ValueCard;
