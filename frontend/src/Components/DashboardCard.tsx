const DashboardCard: React.FC<{ title: string; value: number; symbol?:string }> = ({ title, symbol, value }) => (
    <div className="bg-orange-400 hover:bg-orange-500 p-20 mt-4 rounded-lg lg:w-1/2 md:w-1/2">
      <p className="text-white text-2xl font-bold flex justify-center items-center">{title}</p>
      <p className="text-white text-4xl font-bold flex justify-center items-center">{symbol} {value}</p>
    </div>
  );

export default DashboardCard;