import { formatNumber } from 'chart.js/helpers';
import cls from 'classnames';
import CountUp from 'react-countup';

const DashboardCard = ({ details }) => {
  return (
    <aside
      className={cls(
        `shadow-md w-full min-h-[150px]  rounded-md overflow-hidden flex md:flex-col md:items-start md:justify-center lg:justify-start md:p-2 lg:p-0 lg:flex-row lg:items-center items-center text-sm uppercase col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 bg-white relative`
      )}
    >
      <div className="flex justify-between items-center mr-4 rounded-full overflow-hidden ">
        <p className=" text-white mx-3 relative z-10">{details.icon}</p>
        <p
          className={` ${details.bgColor} bg-white opacity-60
        absolute w-full h-full top-0 left-0`}
        ></p>
      </div>
      <div className="md:my-3 lg:my-0 relative z-10">
        <h3 className=" text-gray-400 font-semibold">{details.name}</h3>
        <p className=" font-semibold text-xl md:text-2xl ">
          {details?.name === 'total revenue' ? (
            formatNumber(details?.amount)
          ) : (
            <CountUp end={details.amount} />
          )}
        </p>
        <p className="border-t py-2 hidden">View report</p>
      </div>
    </aside>
  );
};

export default DashboardCard;
