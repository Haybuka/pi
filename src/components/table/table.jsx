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

const AllTableHooks = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
  };
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []);

  localStorage.removeItem('__editID__');

  const handleRowDelete = (row) => {
    const {
      values: { id },
    } = row;
    setDeleteId(id);
    setModalIsOpen(true);
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
                <p
                  className="cursor-pointer px-2 text-green-700"
                  onClick={() => handleRowEdit(row)}
                >
                  Edit
                </p>
                <p
                  className="cursor-pointer px-2 text-yellow-700"
                  onClick={() => handleRowPreview(row)}
                >
                  Preview
                </p>
                <p
                  className="cursor-pointer px-2 text-red-800"
                  onClick={() => handleRowDelete(row)}
                >
                  Delete
                </p>
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
      <section>
        <aside className="flex justify-between text-black my-6">
          <h3 className="text-sm uppercase">All Categories</h3>

          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </aside>
        <aside className="min-h-[500px]">
          <table {...getTableProps()} className="uppercase text-sm text-center">
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

          {/* <select
          value={pageSize}
          style={{ margin: '0 15px', padding: '0 10px' }}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}

          {/* <p>
          <button onClick={() => getSelectedRows(selectedFlatRows)}>
            Submit row
          </button>
        </p> */}
        </section>
      </section>
      {modalIsOpen && (
        <ProductDeleteModal handleModal={handleModalClose} id={deleteId} />
      )}
    </>
  );
};

export default AllTableHooks;
