import React, { useState } from 'react'
import styles from './products.module.css'
import { useGetProductCategories } from '../../api/products';
import { ReactComponent as FuelIcon } from '../../images/gas.svg'
import ProductModal from './productModal';
const Index = () => {
  const { data: categories, isLoading, refetch } = useGetProductCategories();
  const [category, setCategory] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleCategorySelect = (category) => {
    setIsModalOpen(true)
    setCategory(category)
  }

  const handleClose = () => {
    setIsModalOpen(prev => false)
  }
  return (
    <section className="flex relative">
      {isLoading ? (
        <p>loading</p>
      ) : (
        <>
          <section className="px-3 md:px-[60px] flex flex-wrap gap-3">
            {categories?.map((category) => (
              <aside className={styles.card} key={category.id} onClick={() => handleCategorySelect(category)}>
                <div className={styles.card_img}>
                  <FuelIcon />
                </div>
                <div className={styles.card_body}>
                  <h3 className='capitalize font-semibold text-xl'>{category.name}</h3>
                  <p>{category.details}</p>
                </div>
              </aside>
            ))}
          </section>
          {
            // isModalOpen && (
            <ProductModal category={category} modalClose={handleClose} modalOpen={isModalOpen} />
            // )
          }
        </>

      )}
    </section>
  )
}

export default Index