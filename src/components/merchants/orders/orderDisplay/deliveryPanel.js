import { Tab } from '@headlessui/react'
import React from 'react'
import ProfileFields from '../../../profile/fields'
import formatNumber from '../../../../util/formatNumber'
import { format, fromUnixTime } from 'date-fns'

const DeliveryPanel = ({ delivery }) => {

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
          value={delivery?.option?.name}
          label="Delivery Option"
          classProp="col-span-6"
        />
        <ProfileFields
          value={delivery?.lg}
          label="local government"
          classProp="col-span-6"
        />
      </div>
      <ProfileFields value={delivery?.address} label="Address" classProp="my-10" />
      <ProfileFields value={delivery?.landMark} label="Land Mark" classProp="my-10" />
      <div className="grid grid-cols-12 gap-4 my-10 ">
        <ProfileFields
          value={delivery?.stateID}
          label="State Id"
          classProp="col-span-6"
        />
        <ProfileFields
          value={delivery?.state}
          label="State"
          classProp="col-span-6"
        />
      </div>
    </Tab.Panel>
  )
}

export default DeliveryPanel