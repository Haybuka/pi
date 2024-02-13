import React from 'react';
import cls from 'classnames';
import CountUp from 'react-countup';
import { LineChart } from '../../merchants/dashboard/lineChart';
import DoughnutChart from './doughnut';
import AllTableHooks from '../../table/table';
import { COLUMNS } from './columns';

const AdminDashboard = () => {
  const formatNumber = (number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NGN',
    }).format(number);

  const transactions = [
    {
      id: 1,
      productName: 'Explorer Bag',
      productCategory: 'Bags',
      transactionId: '#262692wx',
      date: 'Feb 14, 2024',
      status: 1,
      amount: 2000,
    },
    {
      id: 2,
      productName: 'Ps4 console',
      productCategory: 'Gaming',
      transactionId: '#f443692wx',
      date: 'Jan 12, 2024',
      status: 0,
      amount: 1100,
    },
    {
      id: 3,
      productName: 'Petrol',
      productCategory: 'Petroleum',
      transactionId: '#262692wx',
      date: 'Feb 12, 2024',
      status: -1,
      amount: 12000,
    },
    {
      id: 4,
      productName: 'Pouch',
      productCategory: 'Phone Accessories',
      transactionId: '#345256ed',
      date: 'Feb 14, 2024',
      status: 1,
      amount: 2000,
    },
    {
      id: 5,
      productName: 'Explorer Bag',
      productCategory: 'Bags',
      transactionId: '#262692wx',
      date: 'Feb 14, 2024',
      status: -1,
      amount: 2000,
    },
    {
      id: 6,
      productName: 'Pouch',
      productCategory: 'Phone Accessories',
      transactionId: '#345256ed',
      date: 'Feb 14, 2024',
      status: 1,
      amount: 2000,
    },
    {
      id: 7,
      productName: 'Petrol',
      productCategory: 'Petroleum',
      transactionId: '#262692wx',
      date: 'Feb 12, 2024',
      status: 1,
      amount: 2000,
    },
    {
      id: 8,
      productName: 'Ps4 console',
      productCategory: 'Gaming',
      transactionId: '#f443692wx',
      date: 'Jan 12, 2024',
      status: 0,
      amount: 1100,
    },
    {
      id: 9,
      productName: 'Ps4 console',
      productCategory: 'Gaming',
      transactionId: '#f443692wx',
      date: 'Jan 12, 2024',
      status: 0,
      amount: 1100,
    },
    {
      id: 10,
      productName: 'Birking Bag',
      productCategory: 'Bags',
      transactionId: '#f443692wx',
      date: 'Jan 12, 2024',
      status: 1,
      amount: 1100,
    },
  ];
  return (
    <section className="text-black">
      <article className="flex gap-6 my-6">
        <aside
          className={cls(
            `shadow-md w-full p-3 rounded-md  capitalize col-span-3 bg-white col-start-10 row-span-1`
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
            `shadow-md w-full p-3 rounded-md  capitalize col-span-3 bg-white col-start-10 row-span-1`
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
            `shadow-md w-full p-3 rounded-md  capitalize col-span-3 bg-white col-start-10 row-span-1`
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
      <article className="grid grid-cols-12 my-10">
        <aside className="col-span-12 p-3 w-full rounded-md  capitalize">
          <LineChart />
        </aside>
        <aside className="col-span-4 p-4 hidden">
          <DoughnutChart />
        </aside>
      </article>
      <article className="my-6">
        <AllTableHooks
          label={'transactions'}
          data={transactions}
          COLUMNS={COLUMNS}
        />
      </article>
    </section>
  );
};

export default AdminDashboard;
