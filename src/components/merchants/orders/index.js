
import OrderTable from './orderTable'
import { COLUMNS } from './columns';

const MerchantOrders = () => {
  return (
    <aside>

      <OrderTable
        label={'transactions'}
        data={[]}
        COLUMNS={COLUMNS}
      />
    </aside>

  )
}

export default MerchantOrders