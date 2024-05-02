import React, { useMemo, useState } from 'react';
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
  useRowSelect,
} from 'react-table';
import { COLUMNS } from './columns';
import GlobalFilter from './GlobalFilter';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ProductDeleteModal from './deleteModal';
import './table.css';
import Button from '../button/button';
import Modal from '../modal/modal';

const AllTableHooks = ({ data, userType }) => {
  const userProfile = JSON.parse(localStorage.getItem('__profile__'));

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
    setDeleteModalOpen(false);
  };
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []);

  localStorage.removeItem('__editID__');

  const handleRowDelete = (row) => {
    const { values } = row;
    setDeleteProduct(values);
    setModalIsOpen(true);
    setDeleteModalOpen(true);
  };

  const handleRowEdit = (row) => {
    const {
      values: { id },
    } = row;
    localStorage.setItem('__editID__', JSON.stringify(id));
    navigate('/category/edit');
  };

  const handleRowPreview = (row) => {
    const {
      values: { id },
    } = row;
    localStorage.setItem('__previewID__', JSON.stringify(id));
    navigate('/products/preview');
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    // pagination
    gotoPage,
    pageCount,
    setPageSize,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    page,
    // global filter
    setGlobalFilter,
    //row selection
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks?.visibleColumns.push((columns) => [
        {
          Cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
        },
        ...columns,
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => <div>Actions</div>,
          Cell: ({ row }) => {
            return (
              <div className="flex justify-between items-center">
                {userType === 'admin' && (
                  <>
                    <p
                      className="cursor-pointer px-2 text-green-700 w-full"
                      onClick={() => handleRowEdit(row)}
                    >
                      Edit
                    </p>
                    <p
                      className="cursor-pointer px-2 text-red-800 w-full"
                      onClick={() => handleRowDelete(row)}
                    >
                      Delete
                    </p>
                  </>
                )}
                {userType === 'merchant' && (
                  <p
                    className="cursor-pointer px-2 text-yellow-700 w-full"
                    onClick={() => handleRowPreview(row)}
                  >
                    Preview
                  </p>
                )}
              </div>
            );
          },
        },
      ]);
    }
  );
  const { pageIndex, pageSize, globalFilter, selectedRowIds } = state;
  const getSelectedRows = (selectedFlatRows) => {
    console.log(selectedFlatRows, 'gets selected row of the table in function');
  };
  return (
    <>
      <section className="overflow-hidden">
        <aside className="flex items-center justify-between text-black my-6">
          <h3 className="text-sm uppercase">All Categories</h3>

          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </aside>
        {userType === 'admin' && (
          <aside className="flex justify-end  ">
            <p className="w-3/5 sm:w-2/5 lg:w-1/6">
              <Button
                text={'create category'}
                handleClick={() => navigate('/category')}
                classProp={'w-[160px]'}
              />
            </p>
          </aside>
        )}
        <aside className="min-h-[500px] overflow-x-scroll">
          <table
            {...getTableProps()}
            className="uppercase text-sm text-center "
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup?.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column?.getHeaderProps()} className="font-normal">
                      {' '}
                      {column?.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page?.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row?.getRowProps()}>
                    {row?.cells?.map((cell) => {
                      return (
                        <td {...cell?.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </aside>
        <section className="text-center text-black text-sm uppercase">
          <p>
            page {pageIndex + 1} of {pageOptions.length}
          </p>
          <p>
            {pageOptions.length > 3 && (
              <p>
                Go to page :{' '}
                <input
                  className="py-1 px-4 border-0 shadow-md outline-none rounded-md"
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  type="number"
                  defaultValue={pageIndex + 1}
                  style={{ width: '50px', textAlign: 'center' }}
                />
              </p>
            )}
          </p>
          <aside className="border flex mx-auto justify-between overflow-hidden text-sm my-2 uppercase rounded-full w-[400px] ">
            <p
              className="bg-gray-100 py-2 px-3 cursor-pointer"
              disabled={!canPreviousPage}
              onClick={() => gotoPage(0)}
            >
              {'<<'}
            </p>
            <p
              className="bg-gray-100 py-2 px-3 cursor-pointer"
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
            >
              Previous
            </p>
            <p
              className="bg-gray-100 py-2 px-3 cursor-pointer"
              disabled={!canNextPage}
              onClick={() => nextPage()}
            >
              Next
            </p>
            <p
              className="bg-gray-100 py-2 px-3 cursor-pointer"
              disabled={!canNextPage}
              onClick={() => gotoPage(pageCount - 1)}
            >
              {'>>'}
            </p>
          </aside>
        </section>
      </section>

      {modalIsOpen && (
        <Modal handleModal={handleModalClose}>
          <section>
            {deleteModalOpen && (
              <ProductDeleteModal
                handleModal={handleModalClose}
                product={deleteProduct}
              />
            )}
          </section>
        </Modal>
      )}
    </>
  );
};

export default AllTableHooks;
