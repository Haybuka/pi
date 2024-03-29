import React, { useMemo } from 'react';
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
  useRowSelect,
} from 'react-table';

import GlobalFilter from './tableGlobalFilter';
import { useNavigate } from 'react-router-dom';
import './table.css';

const AdminTable = ({ data, userType, COLUMNS, label }) => {
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    gotoPage,
    pageCount,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    page,
    setGlobalFilter,
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
      hooks?.visibleColumns.push((columns) => [...columns]);
    }
  );
  const { pageIndex, globalFilter } = state;

  return (
    <>
      <section>
        <aside className="flex justify-between text-black my-6">
          <h3 className=" capitalize">{label}</h3>

          <GlobalFilter
            label={label}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
        </aside>
        <aside className="min-h-[500px]">
          <table
            {...getTableProps()}
            className="capitalize text-sm text-center"
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
        <section className="text-center text-black text-sm capitalize">
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
          <aside className="border flex mx-auto justify-between overflow-hidden text-sm my-2 capitalize rounded-full w-[400px] ">
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
    </>
  );
};

export default AdminTable;
