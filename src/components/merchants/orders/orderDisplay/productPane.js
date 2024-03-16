import { Tab } from '@headlessui/react'
import React from 'react'
import ProfileFields from '../../../profile/fields'
import formatNumber from '../../../../util/formatNumber'
import { format, fromUnixTime } from 'date-fns'

const ProductPanel = ({ product }) => {

  const handleStatus = (status) => {
    switch (status) {
      case 1:
        return 'Complete'

      default:
        return 'Pending';
    }
  }

  return (
    <Tab.Panel>
      <div className="grid grid-cols-12 gap-4 mb-3">
        <ProfileFields
          value={product?.name}
          label="name"
          classProp="col-span-6"
        />
        <ProfileFields
          value={formatNumber(product?.amount)}
          label="amount"
          classProp="col-span-6"
        />
      </div>
      <ProfileFields value={product.transId} label="Transaction id" classProp="my-10" />
      <div className="grid grid-cols-12 gap-4 my-10 ">
        <ProfileFields
          value={format(new Date(fromUnixTime(product?.transDate)), 'MM/dd/yyyy')}
          label="Transaction Date"
          classProp="col-span-6"
        />
        <ProfileFields
          value={handleStatus(product.status)}
          label="status"
          classProp="col-span-6"
        />
      </div>
    </Tab.Panel>
  )
}

export default ProductPanel