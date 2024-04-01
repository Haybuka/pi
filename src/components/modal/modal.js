
import styles from './modal.module.css';

import cls from "classnames"
const Modal = ({ handleModal, id = '', children, classAdd, title }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleModal();
  };

  return (
    <>
      <section className={styles.modal} onClick={handleModal}></section>
      <article className={cls(classAdd, styles.modal_sub)}>
        <div
          className=" text-[#002D62] inline-block hover:bg-pi-500 hover:text-white cursor-pointer"
          onClick={handleModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 className='font-semibold my-3'>{title}</h3>
        <section >
          {children}
        </section>
      </article>

    </>
  );
};

export default Modal;
