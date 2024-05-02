import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { ReactComponent as CheckIcon } from './CheckIcon.svg'
import { ReactComponent as UpDownIcon } from './upDown.svg'



export default function ComboBox({ items, handleProductCategory }) {
  // console.log(items)
  const [selected, setSelected] = useState(items[0])
  const [query, setQuery] = useState('')

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const handleFormSubmit = (selected) => {

    handleProductCategory(selected)
  }
  // console.log(items)
  const filtered =
    query === ''
      ? items
      : items?.filter((item) =>
        item?.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <div className="w-full md:w-72 ">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 z-10">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 uppercase"
              displayValue={(person) => person?.name}
              onChange={handleInputChange}
            />
            <Combobox.Button className="absolute bg-transparent  w-2/4 inset-y-0 right-0 flex items-center justify-end pr-2">
              <UpDownIcon />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filtered?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Not found.
                </div>
              ) : (
                filtered?.map((person) => (
                  <Combobox.Option
                    key={person?.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 uppercase ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                    onClick={() => handleFormSubmit(person)}

                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                          {person?.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                              }`}
                          >
                            <CheckIcon aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
