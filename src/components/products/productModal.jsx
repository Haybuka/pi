import React from 'react';
import styles from './products.module.css';
import cls from 'classnames';
import { useGetProductCategory } from '../../api/products';
import FieldSelection from './fieldSelect/fieldSelect';
const ProductModal = ({ category, modalClose, modalOpen }) => {
  const options = {
    enabled: true,
    id: category?.id,
  };
  const { data, isLoading } = useGetProductCategory(options);

  return (
    <section
      className={
        modalOpen
          ? cls(styles.product_modal, styles.modal_open)
          : cls(styles.product_modal, styles.modal_close)
      }
    >
      <aside>
        <h3 className="flex justify-between items-center">
          <span className="text-xl uppercase font-semibold inline-block">
            {category.name}
          </span>
          <p
            className="border rounded-lg py-2 px-3 capitalize cursor-pointer"
            onClick={modalClose}
          >
            close
          </p>
        </h3>
        <p>{category?.details}</p>
      </aside>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <section>
          {data?.productDetails.map((product, id) => (
            <div key={id} className="my-4">
              <p className="my-2 font-semibold text-lg">{product.field} :</p>
              <p className="my-2">
                {product?.description
                  ? product.description
                  : '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ipsa inv'}
              </p>
            </div>
          ))}
          {data?.productOptions.map((options, id) => (
            <FieldSelection key={id} options={options} />
          ))}
        </section>
      )}
    </section>
  );
};

export default ProductModal;
