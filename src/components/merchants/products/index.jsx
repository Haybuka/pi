import { useState } from 'react';
import { useGetMerchantProductCategories } from '../../../api/merchants/products';
import {
  useGetProductCategories,
  useGetProductCategory,
} from '../../../api/products';
import ComboBox from '../../combobox/combobox';
import Button from '../../button/button';
import useMerchantProduct from '../../../hooks/useMerchantProduct';
import { useEffect } from 'react';
import Modal from '../../modal/modal';
import CreateMerchantProduct from '../../products/createMerchantProduct';
import ProductCard from './Card/card';
import DeleteProduct from './deleteProduct/delete';
import Upload from '../../imageUpload/upload';

const Index = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const { data: categories = [], isLoading } = useGetProductCategories();
  const { data: merchantProduct, isFetched: merchantFetching } =
    useGetMerchantProductCategories({ pageNumber });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [imageId, setImageId] = useState();
  const [editValues, setEditValues] = useState();
  const [searchID, setSearchID] = useState(categories[0]?.id);
  const [deleteProduct, setDeleteProduct] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    data: categoryRequest,
    refetch,
    isFetched,
    isFetching,
    remove,
  } = useGetProductCategory({
    id: searchID?.toLowerCase(),
    refetchOnMount: false,
    enabled: false,
  });

  const [category, setCategory] = useState({ id: 0, name: 'all' });
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [showMerchantProduct, setShowMerchantProduct] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
    setShowMerchantProduct(false);
    remove();
  };

  useEffect(() => {
    setCategory({ id: 0, name: 'all' });
    merchantFetching && setFilteredProducts(merchantProduct);
  }, [merchantFetching, merchantProduct]);

  const selectProductCategory = (category) => {
    setCategory(category);

    if (category?.name === 'all') {
      setFilteredProducts(merchantProduct);
    } else {
      const newFilteredProducts = merchantProduct?.filter(
        (product) =>
          product?.category?.name.toLowerCase() === category?.name.toLowerCase()
      );

      setFilteredProducts(newFilteredProducts);
    }
  };

  const handleProductEdit = (product) => {
    const categories = {
      productDetails: product?.productDetails && [...product?.productDetails],
      productOptions: product?.productOptions && [...product?.productOptions],
      deliveryOptions: product?.deliveryOptions
        ? [...product?.deliveryOptions]
        : [
            {
              deliveryType: 0,
              cost: 0,
            },
            {
              deliveryType: 1,
              cost: 10,
            },
          ],
      name: product?.name,
      baseAmount: product?.baseAmount,
      catImage: product?.images && product.images,
      details: product?.details,
      id: product?.id,
      category: product?.category?.id,
    };

    setEditValues(categories);
    setModalIsOpen(true);
    setIsEditing(true);
    setIsDeleteAlert(false);
    setIsImageUpload(false);
    setShowCategorySelect(false);
  };

  const handleImageUpload = (data) => {
    setImageId(data);
    setModalIsOpen(true);
    setIsImageUpload(true);
    setIsEditing(false);
    setIsDeleteAlert(false);
    setShowCategorySelect(false);
  };

  const handleProductCreate = () => {
    setShowCategorySelect(true);
    setModalIsOpen(true);
    setIsEditing(false);
    setIsImageUpload(false);
    setIsDeleteAlert(false);
  };

  const handleProductDelete = (product) => {
    setDeleteProduct(product);
    setShowCategorySelect(false);
    setModalIsOpen(true);
    setIsEditing(false);
    setIsImageUpload(false);
    setIsDeleteAlert(true);
  };
  const { merchantCategories = [] } = useMerchantProduct(pageNumber);

  console.log({ filteredProducts });
  return (
    <div className="text-black p-6">
      <section className="md:flex justify-between items-center">
        <ComboBox
          items={[{ id: 0, name: 'all' }, ...merchantCategories]}
          handleProductCategory={selectProductCategory}
        />

        <aside className="flex items-center justify-between my-6 flex-row-reverse md:flex-row">
          <div className="flex uppercase text-sm items-center mx-4">
            {pageNumber > 0 && (
              <p
                className="py-2 px-3 cursor-pointer"
                onClick={() =>
                  pageNumber >= 1 && setPageNumber((page) => page - 1)
                }
                disabled={pageNumber <= 0}
              >
                {'<'}
              </p>
            )}
            <p className="flex mx-4 gap-x-2">
              <span
                className={`   text-black rounded-full h-6 flex justify-center items-center w-6 ${
                  pageNumber + (1 % 2) !== 0 && 'bg-pi-500 text-white'
                }`}
              >
                {pageNumber + 1}
              </span>
              <span
                className={`   text-black rounded-full h-6 flex justify-center items-center w-6 ${
                  pageNumber + (1 % 2) === 0 && 'bg-gray-300'
                }`}
              >
                {pageNumber + 2}
              </span>
            </p>
            {filteredProducts?.length === 10 && (
              <p
                className="py-2 px-3 cursor-pointer"
                onClick={() => setPageNumber((page) => page + 1)}
              >
                {'>'}
              </p>
            )}
          </div>
          <div className="w-[150px]">
            <Button text={'Add product'} handleClick={handleProductCreate} />
          </div>
        </aside>
      </section>
      {merchantFetching ? (
        <section className="flex gap-4 my-10 flex-wrap">
          {filteredProducts?.length > 0 ? (
            filteredProducts?.map((product) => (
              <ProductCard
                options={{
                  handleProductEdit,
                  handleImageUpload,
                  handleProductDelete,
                }}
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <p className="text-sm uppercase text-center w-full">
              No product found
            </p>
          )}
        </section>
      ) : (
        <Button
          text={''}
          isSubmitting={!merchantFetching}
          classProp={'w-[130px]'}
          handleClick={handleProductCreate}
        />
      )}

      {/* Modal */}
      {modalIsOpen && (
        <Modal
          handleModal={handleModalClose}
          classAdd={
            showMerchantProduct || isEditing
              ? 'w-full md:w-[800px] h-3/4 overflow-y-scroll relative bg-red-400'
              : ''
          }
        >
          <section className="w-full">
            {showCategorySelect && (
              <aside className="my-2">
                <p className="uppercase text-sm">Select product category</p>
                <ComboBox
                  items={categories}
                  handleProductCategory={(selected) => {
                    setSearchID(selected?.id);
                  }}
                />
                <Button
                  text={'Continue'}
                  classProp={' my-4 '}
                  isSubmitting={isLoading}
                  handleClick={() => {
                    setModalIsOpen(true);
                    refetch();
                    setShowCategorySelect(false);
                    setShowMerchantProduct(true);
                    isFetched && setShowMerchantProduct(true);
                  }}
                />
              </aside>
            )}
            {isFetching && (
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                fetching
              </p>
            )}
            {isFetched && (
              <CreateMerchantProduct
                id={searchID}
                category={{
                  ...categoryRequest,
                  deliveryOptions: categoryRequest?.deliveryOptions
                    ? categoryRequest?.deliveryOptions
                    : [
                        {
                          deliveryType: 0,
                          cost: 0,
                        },
                        {
                          deliveryType: 1,
                          cost: 0,
                        },
                      ],
                }}
                closeModal={() => handleModalClose()}
              />
            )}
            {isEditing && (
              <CreateMerchantProduct
                id={searchID}
                category={editValues}
                isEdit={true}
                closeModal={() => handleModalClose()}
              />
            )}
            {isImageUpload && (
              <Upload
                product={imageId}
                uploadType={'product'}
                handleModalClose={handleModalClose}
              />
            )}
            {isDeleteAlert && (
              <DeleteProduct
                product={deleteProduct}
                handleModal={handleModalClose}
              />
            )}
          </section>
        </Modal>
      )}
    </div>
  );
};

export default Index;
