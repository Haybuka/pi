import React, { useState } from 'react'
import styles from './products.module.css'
import { useGetProductCategories } from '../../api/products';
import { ReactComponent as FuelIcon } from '../../images/gas.svg'
import ProductModal from './productModal';
import Button from '../button/button';
const Index = ({ category }) => {

  const [file, setFile] = useState()

  function handleFileChange(e) {

    setFile(URL.createObjectURL(e?.target?.files[0]));
  }
  console.log(file)
  return (
    <section className="text-black my-10 grid grid-cols-12 gap-2">
      <aside className="border min-h-[600px] flex justify-center items-center shadow-md bg-white text-center p-10 rounded-lg col-span-4 row-span-3 ">
        <article className="">
          <div className="w-[120px] h-[120px] mx-auto bg-gray-100 rounded-full overflow-hidden">
            {file && <img src={file} alt='product ' className='w-full h-full' />}
          </div>
          <div className="my-4">
            <h3 className="uppercase text-sm"> Name : {category?.name}</h3>
            <p className="uppercase text-sm my-4"> {category?.details}</p>
            <p className="uppercase text-sm relative text-white bg-[#002d62] rounded-xl py-2 px-6">
              Edit Image
              <input type='file' onChange={handleFileChange} className='absolute top-0 left-0 w-full h-full opacity-0 px-6' />
            </p>
          </div>
        </article>
      </aside>
      <aside className="col-span-8 min-h-[300px] rounded-lg shadow-md"></aside>
      <aside className="col-span-8 min-h-[300px] rounded-lg shadow-md"></aside>
    </section>
  )
}

export default Index


// const Index = () => {
//   const { data: categories, isLoading, refetch } = useGetProductCategories({
//     refetchOnMount: true,

//   });
//   const [category, setCategory] = useState({})
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const handleCategorySelect = (category) => {
//     setIsModalOpen(true)
//     setCategory(category)
//   }

//   const handleClose = () => {
//     setIsModalOpen(prev => false)
//   }
//   return (
//     <section className="flex relative">
//       {isLoading ? (
//         <p>loading</p>
//       ) : (
//         <>
//           <section className="px-3 md:px-[60px] flex flex-wrap gap-3">
//             {categories?.map((category) => (
//               <aside className={styles.card} key={category.id} >
//                 <div className={styles.card_img}>
//                   <FuelIcon />
//                 </div>
//                 <div className={styles.card_body}>
//                   <h3 className='capitalize font-semibold text-xl'>{category.name}</h3>
//                   <p>{category.details}</p>
//                 </div>
//                 <div className='flex justify-between items-center mt-4'>
//                   <p className='bg-gray-300 py-2 px-4 rounded-xl'>edit</p>
//                   <p className='bg-gray-300 py-2 px-4 rounded-xl' onClick={() => handleCategorySelect(category)}>preview</p>
//                   <p className='bg-gray-300 py-2 px-4 rounded-xl'>delete</p>
//                 </div>
//               </aside>
//             ))}
//           </section>
//           {
//             // isModalOpen && (
//             <ProductModal category={category} modalClose={handleClose} modalOpen={isModalOpen} />
//             // )
//           }
//         </>

//       )}
//     </section>
//   )
// }