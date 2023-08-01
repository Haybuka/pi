import React from 'react';
import cls from 'classnames';
import CountUp from 'react-countup';
import { LineChart } from '../../merchants/dashboard/lineChart';
import DoughnutChart from './doughnut';

const AdminDashboard = () => {
  const formatNumber = (number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  return (
    <section className="text-black uppercase text-sm">
      <article className="flex gap-6 my-6">
        <aside
          className={cls(
            `shadow-md w-full p-3 rounded-md text-sm uppercase col-span-3 bg-white col-start-10 row-span-1`
          )}
        >
          <div className="flex justify-between items-center my-4">
            <p className="bg-[#002e62f3] text-white p-2 rounded-full">
              {/* {details.icon} */}
            </p>
            {/* <p>icon</p> */}
          </div>
          <h3 className="my-2 text-gray-400">Number of categories</h3>
          <p className="my-2 font-semibold text-xl 2xl:text-2xl">
            <CountUp end={30} />
          </p>
          <p className="border-t py-2 hidden">View report</p>
        </aside>
        <aside
          className={cls(
            `shadow-md w-full p-3 rounded-md text-sm uppercase col-span-3 bg-white col-start-10 row-span-1`
          )}
        >
          <div className="flex justify-between items-center my-4">
            <p className="bg-[#002e62f3] text-white p-2 rounded-full">
              {/* {details.icon} */}
            </p>
            {/* <p>icon</p> */}
          </div>
          <h3 className="my-2 text-gray-400">Number of merchants</h3>
          <p className="my-2 font-semibold text-xl 2xl:text-2xl">
            <CountUp end={10} />
          </p>
          <p className="border-t py-2 hidden">View report</p>
        </aside>
        <aside
          className={cls(
            `shadow-md w-full p-3 rounded-md text-sm uppercase col-span-3 bg-white col-start-10 row-span-1`
          )}
        >
          <div className="flex justify-between items-center my-4">
            <p className="bg-[#002e62f3] text-white p-2 rounded-full">
              {/* {details.icon} */}
            </p>
            {/* <p>icon</p> */}
          </div>
          <h3 className="my-2 text-gray-400">Transactions Made</h3>
          <p className="my-2 font-semibold text-xl 2xl:text-2xl">
            {formatNumber(40000)}
          </p>
          <p className="border-t py-2 hidden">View report</p>
        </aside>
      </article>
      <article className="grid grid-cols-12">
        <aside className="col-span-8 p-3 w-full rounded-md text-sm uppercase">
          <LineChart />
        </aside>
        <aside className="col-span-4 p-4">
          <DoughnutChart />
        </aside>
      </article>
    </section>
  );
};

export default AdminDashboard;
