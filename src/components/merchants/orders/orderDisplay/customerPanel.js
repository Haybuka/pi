import { Tab } from '@headlessui/react'
import ProfileFields from '../../../profile/fields'

const CustomerPanel = ({ customer }) => {
  return (
    <Tab.Panel>
      <ProfileFields value={customer?.customerName} label="Name" classProp="my-10" />
      <div className="grid grid-cols-12 gap-4 mb-3">
        <ProfileFields
          value={customer?.phone}
          label="Phone number"
          classProp="col-span-6"
        />
        <ProfileFields
          value={customer?.phone}
          label="phone number 2"
          classProp="col-span-6"
        />
      </div>
      <ProfileFields value={customer?.option?.name} label="Delivery option" classProp="my-10" />

    </Tab.Panel>
  )
}

export default CustomerPanel