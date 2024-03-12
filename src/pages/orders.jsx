import React from 'react';
import { useGetOrders } from '../api/merchants/orders';
import MerchantOrders from '../components/merchants/orders';

const Orders = () => {
  const { data: getOrders } = useGetOrders();
  console.log(getOrders);
  return (
    <section className="text-black">
      <aside>
        <p>
          <MerchantOrders />
        </p>
      </aside>
    </section>
  );
};

export default Orders;
