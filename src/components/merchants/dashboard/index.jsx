import products from '../products/produts';
import CountUp from 'react-countup';

import { LineChart } from './lineChart';
import { useGetMerchantProductCategories } from '../../../api/merchants/products';
import { useGetOrders } from '../../../api/merchants/orders';

import { ReactComponent as ProductIcon } from './productIcon.svg';
import { ReactComponent as ShipIcon } from './shipIcon.svg';
import { ReactComponent as MoneyIcon } from './moneyIcon.svg';
import { ReactComponent as CategoryIcon } from './categoryIcon.svg';
import { ReactComponent as SalesIcon } from './salesIcon.svg';
import cls from 'classnames';
import formatNumber from '../../../util/formatNumber';

// import { useGetMerchantProductCategories } from '../../../api/merchants/products';
const MerchantDashboard = () => {
  const { data: merchantProduct = [], isFetched: merchantFetched } =
    useGetMerchantProductCategories();

  const { data: getOrders } = useGetOrders();

  const merchantCategories =
    merchantProduct?.length > 0 &&
    merchantProduct?.reduce((acc, item) => {
      const category = item.category.name;
      if (Boolean(acc[category])) {
        acc[category].push(item);
      } else {
        acc[category] = [item];
      }
      return acc;
    }, {});

  const successFullOrders = getOrders?.content?.filter(
    (data) => data?.receipt?.successful
  );
  const totalRevenue = successFullOrders?.reduce(
    (acc, amount) => amount?.totalAmount + acc,
    0
  );

  const merchantDetails = [
    {
      name: 'total revenue',
      amount: totalRevenue,
      icon: <MoneyIcon />,
    },
    {
      name: 'Number of products',
      amount: merchantProduct?.length,
      icon: <ProductIcon />,
    },
    {
      name: 'Number of products Category',
      amount: Object.keys(merchantCategories)?.length,
      icon: <CategoryIcon />,
    },
    {
      name: 'Total sales',
      amount: 10,
      icon: <SalesIcon />,
    },
    {
      name: 'Total orders',
      amount: getOrders?.content?.length,
      icon: <ShipIcon />,
    },
    {
      name: 'Total Successful Orders',
      amount: successFullOrders?.length,
      icon: <ProductIcon />,
    },
  ];

  return (
    <section className="text-black">
      <article className="grid grid-cols-12 gap-2 my-3">
        <aside className="col-span-12 grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-9 grid grid-cols-12 gap-2">
            {merchantDetails?.map((details, id) => (
              <aside
                className={cls(
                  `shadow-md w-full p-3 rounded-md py-10 flex items-center text-sm uppercase col-span-12 sm:col-span-6 md:col-span-4 bg-white`
                )}
                key={id}
              >
                <div className="flex justify-between items-center mr-4">
                  <p className="bg-[#002e62f2] text-white p-2 rounded-full">
                    {details.icon}
                  </p>
                </div>
                <div>
                  <h3 className=" text-gray-400 font-semibold">
                    {details.name}
                  </h3>
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
            ))}
          </div>
          <aside className="relative col-span-3 2xl:max-h-full hidden md:block overflow-y-scroll md:h-[350px] shadow-md p-3  rounded-md text-sm uppercase bg-white">
            <h3 className="flex justify-between items-center w-full">
              <p className="font-semibold ">Product</p>
              <p>Base Amount</p>
            </h3>
            <ul>
              {merchantFetched ? (
                merchantProduct?.map((product, id) => (
                  <li
                    key={id}
                    className="my-2 border-b py-3 flex justify-between items-center"
                  >
                    <span className="">{product?.name}</span>
                    <span className="text-green-400 font-semibold">
                      {formatNumber(product?.baseAmount)}
                    </span>
                  </li>
                ))
              ) : (
                <div className=" animate-pulse">loading ...</div>
              )}
            </ul>
          </aside>
        </aside>
        <section className="col-span-12 grid grid-cols-12 my-4 rounded-md bg-white shadow-md p-4 ">
          <LineChart orders={getOrders?.content} />
        </section>

        <section className="col-span-12 grid grid-cols-12 rounded-md bg-white shadow-md p-4 ">
          <aside className="col-span-9">
            <section>
              <aside className="flex justify-between items-center">
                <h3 className="font-semibold">Order history</h3>
                {/* <Button classProp={'w-[100px]'} text={'view product'} /> */}
              </aside>
            </section>
          </aside>
        </section>
      </article>
    </section>
  );
};

export default MerchantDashboard;
