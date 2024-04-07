import React from 'react';

interface AvatarProps {
  initials: string;
}

const generateColor = (initials: string): string => {
  const charCode = initials.charCodeAt(0);
  const r = (charCode * 2) % 255;
  const g = (charCode * 3) % 255;
  const b = (charCode * 5) % 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const Avatar: React.FC<AvatarProps> = ({ initials }) => {
  const backgroundColor = generateColor(initials);

  // const style = {
  //   backgroundColor,
  //   color: 'black', // or any other text color you prefer
  //   width: '40px', // adjust the width and height as needed
  //   height: '40px',
  //   fontWeight:'bold',
  //   borderRadius: '50%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // };

  return (
    // <div style={style}>
    //   {initials}
    // </div>
    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold rounded-full" 
         style={{ backgroundColor, color: 'black' }}>
      {initials}
    </div>
  );
};

export default Avatar;
