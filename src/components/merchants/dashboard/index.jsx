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
import { ReactComponent as SuccessfulOrder } from './successfulOrders.svg';
import cls from 'classnames';
import formatNumber from '../../../util/formatNumber';
import { format, fromUnixTime } from 'date-fns';
import Button from '../../button/button';
import { useNavigate } from 'react-router-dom';

// import { useGetMerchantProductCategories } from '../../../api/merchants/products';
const MerchantDashboard = () => {
  const { data: merchantProduct = [], isFetched: merchantFetched } =
    useGetMerchantProductCategories();

  const navigate = useNavigate();
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
      amount: totalRevenue ? totalRevenue : 0,
      icon: <MoneyIcon />,
      bgColor: 'bg-piboard-200',
    },
    {
      name: 'Number of products Category',
      amount: Object.keys(merchantCategories)?.length,
      icon: <CategoryIcon />,
      bgColor: 'bg-piboard-100',
    },
    {
      name: 'Number of products',
      amount: merchantProduct?.length,
      icon: <ProductIcon />,
      bgColor: 'bg-piboard-300',
    },

    {
      name: 'Total sales',
      amount: successFullOrders?.length,
      icon: <SalesIcon />,
      bgColor: 'bg-piboard-600',
    },
    {
      name: 'Total orders',
      amount: getOrders?.content?.length,
      icon: <ShipIcon />,
      bgColor: 'bg-piboard-400',
    },
    {
      name: 'Total Successful Orders',
      amount: successFullOrders?.length,
      icon: <SuccessfulOrder />,
      bgColor: 'bg-piboard-700',
    },
    {
      name: 'Customers',
      amount: Object.keys(merchantCategories)?.length,
      icon: <CategoryIcon />,
      bgColor: 'bg-piboard-100',
    },
  ];

  const statusPill = (status) => {
    switch (status) {
      case -1:
        return (
          <p className="text-red-700  bg-red-200 rounded-xl px-3">Cancelled</p>
        );
      case 0:
        return (
          <p className="text-gray-700 bg-gray-200 rounded-xl px-3">Pending</p>
        );
      case 1:
        return (
          <p className="text-green-600 bg-green-200 rounded-xl px-3">
            Successful
          </p>
        );
      case 2:
        return (
          <p className="text-yellow-700 bg-yellow-200 rounded-xl px-3">
            Awaiting
          </p>
        );
      case 3:
        return <p>Accepted</p>;
      case 4:
        return <p>Delivered</p>;
      case 5:
        return <p>Completed</p>;
      default:
        return <p>Pending</p>;
    }
  };

  const handleNavigateOrder = () => {
    navigate('/orders');
  };
  return (
    <section className="text-black">
      <article className="grid grid-cols-12 gap-2 my-3">
        <aside className="col-span-12 grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-8 lg:col-span-9 grid grid-cols-12 gap-2">
            {merchantDetails?.map((details, id) => (
              <aside
                className={cls(
                  `shadow-md w-full min-h-[150px]  rounded-md overflow-hidden  flex md:flex-col md:items-start md:justify-center lg:justify-start md:p-2 lg:p-0 lg:flex-row lg:items-center items-center text-sm uppercase col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 bg-white relative`
                )}
                key={id}
              >
                <div className="flex justify-between items-center mr-4 rounded-full overflow-hidden ">
                  <p className=" text-white mx-3 relative z-10">
                    {details.icon}
                  </p>
                  <p
                    className={` ${details.bgColor} opacity-50
                    absolute w-full h-full top-0 left-0`}
                  ></p>
                </div>
                <div className="md:my-3 lg:my-0 relative z-10">
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
          <aside className="relative col-span-12 h-[400px] md:h-full md:col-span-4 lg:col-span-3 2xl:max-h-full md:block overflow-y-scroll  lg:h-[340px] shadow-md p-3  rounded-md text-sm uppercase bg-white">
            <h3 className="flex justify-between items-center w-full">
              <p className="font-semibold ">Product</p>
              <p>Base Amount</p>
            </h3>
            <ul>
              {merchantFetched ? (
                merchantProduct?.length > 0 ? (
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
                  <li className="my-2 border-b py-3 flex justify-between items-center">
                    <span className="">No product</span>
                    <span className="text-green-400 font-semibold">00</span>
                  </li>
                )
              ) : (
                <div className=" animate-pulse">loading ...</div>
              )}
            </ul>
          </aside>
        </aside>
        <section className="col-span-12 grid grid-cols-12 my-4 rounded-md bg-white shadow-md p-4 hidden">
          <LineChart orders={getOrders?.content} />
        </section>

        <section className="col-span-12 grid grid-cols-12 rounded-md bg-white shadow-md p-4 ">
          <aside className="col-span-12">
            <section>
              <aside className="p-3">
                <h3 className=" my-3 flex justify-between items-center">
                  <span className="font-semibold">Order History</span>
                  <span
                    onClick={handleNavigateOrder}
                    className="  bg-pi-500 text-white py-2 px-4 rounded-full uppercase text-sm cursor-pointer"
                  >
                    View More
                  </span>
                </h3>
                <div>
                  <table className="text-center ">
                    <thead>
                      <th>S/N</th>
                      <th>Product Name</th>
                      <th>Total Amount</th>
                      <th>Product Id</th>
                      {/* <th>Status</th> */}
                      <th>Transaction Date</th>
                    </thead>
                    <tbody>
                      {getOrders?.content.slice(0, 10).map((orders, id) => (
                        <tr>
                          <td>{id + 1}</td>
                          <td>{orders?.product?.name}</td>
                          <td>{formatNumber(orders?.totalAmount)}</td>
                          <td>{orders?.productID}</td>
                          {/* <td className="text-center">
                            {statusPill(orders?.status)}
                          </td> */}
                          <td>
                            {format(
                              fromUnixTime(orders?.transDate),
                              'MM/dd/yyyy'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    {getOrders?.content?.length === 0 && (
                      <tfoot>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>No Orders found</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tfoot>
                    )}
                  </table>
                </div>
              </aside>
            </section>
          </aside>
        </section>
      </article>
    </section>
  );
};

export default MerchantDashboard;
