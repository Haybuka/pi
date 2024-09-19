
import { Tab } from '@headlessui/react'
import classNames from 'classnames';
import ProfileFields from '../../../profile/fields';
import { format, fromUnixTime } from 'date-fns';
import formatNumber from '../../../../util/formatNumber';
import ProductPanel from './productPane';
import CustomerPanel from './customerPanel';
import DeliveryPanel from './deliveryPanel';

function OrderDisplay({ data }) {


  const headers = ["Product", "Customer", "Delivery details"];


  const customer = {
    ...data?.customer,
    option: data.deliveryOption

  };

  const deliveryAddress = {
    ...data?.deliveryAddress,
    option: data.deliveryOption
  };

  const product = {
    ...data?.product,
    amount: data?.totalAmount,
    dateSold: data?.transDate,
    transId: data?.transID,
    transDate: data?.transDate,
    status: data?.status
  }


  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-12">

        {
          headers.map((header, id) => (
            <Tab
              key={id}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 uppercase',

                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {header}
            </Tab>
          ))
        }
      </Tab.List>
      <Tab.Panels>
        <ProductPanel product={product} />
        <CustomerPanel customer={customer} />
        <DeliveryPanel delivery={deliveryAddress} />
        {/* <Tab.Panel><p> Nothing to display.</p></Tab.Panel> */}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default OrderDisplay