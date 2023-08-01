import React, { useEffect } from 'react';
import products from '../products/produts';
import CountUp from 'react-countup';
import { ReactComponent as ProductIcon } from './productIcon.svg';
import cls from 'classnames';
import { LineChart } from './lineChart';
// import { useGetMerchantProductCategories } from '../../../api/merchants/products';
const MerchantDashboard = () => {
  const merchantDetails = [
    {
      name: 'total revenue',
      amount: 3600,
      icon: <ProductIcon />,
    },
    {
      name: 'Number of products',
      amount: 10,
      icon: <ProductIcon />,
    },

    // {
    //   name: 'Product views',
    //   amount: 36,
    //   icon: <ProductIcon />,
    // },
    // {
    //   name: 'Total orders',
    //   amount: 150,
    //   icon: <ProductIcon />,
    // },
  ];

  const formatNumber = (number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  return (
    <section className="text-black">
      <article className="grid grid-cols-12 gap-2 my-3">
        {merchantDetails.map((details, id) => (
          <aside
            className={cls(
              `shadow-md w-full p-3 rounded-md text-sm uppercase col-span-3 bg-white col-start-10 row-span-1 row-start-${
                id + 1
              }`
            )}
            key={id}
          >
            <div className="flex justify-between items-center my-4">
              <p className="bg-[#002e62f3] text-white p-2 rounded-full">
                {details.icon}
              </p>
              {/* <p>icon</p> */}
            </div>
            <h3 className="my-2 text-gray-400">{details.name}</h3>
            <p className="my-2 font-semibold text-xl 2xl:text-2xl">
              {details?.name === 'total revenue' ? (
                formatNumber(details?.amount)
              ) : (
                <CountUp end={details.amount} />
              )}
            </p>
            <p className="border-t py-2 hidden">View report</p>
          </aside>
        ))}

        <aside className="col-span-3 max-h-[200px] 2xl:max-h-full  overflow-y-scroll shadow-md p-3 rounded-md text-sm uppercase bg-white row-start-3">
          <h3 className="font-semibold">product history</h3>
          <ul>
            {products.map((product, id) => (
              <li
                key={id}
                className="my-2 border-b py-3 flex justify-between items-center"
              >
                <span className="">{product.name}</span>
                <span className="text-green-400 font-semibold">
                  {formatNumber(product?.baseAmount)}
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <aside className="col-span-9 rounded-md bg-white shadow-md row-start-1 col-start-1 row-span-3 p-4">
          <LineChart />
        </aside>
      </article>
    </section>
  );
};

export default MerchantDashboard;
