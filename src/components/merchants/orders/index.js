import { useState } from 'react';
import { COLUMNS } from './columns';
import { useGetOrders } from '../../../api/merchants/orders';
import OrderTable from './orderTable';
import Modal from '../../modal/modal';
import OrderDisplay from './orderDisplay';


const MerchantOrders = () => {

  const { data: getOrders, isFetched } = useGetOrders();
  const [modalData, setModalData] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const orderData = getOrders?.content?.map((order) => {
    return {
      ...order,
      productName: order?.product?.name
    }
  })


  const handleModalDisplay = (data) => {
    setModalData(data);
    setModalIsOpen(true)

  }

  const handleModalClose = () => setModalIsOpen(false)

  return (
    <aside>

      {
        isFetched && (
          <OrderTable
            label={'transactions'}
            data={orderData}
            COLUMNS={COLUMNS}
            handleModal={handleModalDisplay}
          />
        )
      }

      {modalIsOpen && (
        <Modal
          handleModal={handleModalClose}
          classAdd={'w-full md:w-[800px] h-3/4 overflow-y-scroll relative bg-red-400'}
          title="Order details"
        >
          <OrderDisplay data={modalData} />

        </Modal>
      )}
    </aside>

  )
}

export default MerchantOrders