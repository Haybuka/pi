// import format from "date-fns/format";

import { format, fromUnixTime } from "date-fns";

// import ColumnFilter from './ColumnFilter';
export const COLUMNS = [

  // {
  //   //Table hooks up to the id to figure out what to render
  //   Header: 'Id',
  //   Footer: 'Id',
  //   //Accessor connects body to header
  //   accessor: 'id',
  //   // Filter: ColumnFilter,
  //   // to Disable filtering for a field
  //   disableFilters: true,
  // },
  {
    Header: 'Product Name',
    Footer: 'name',
    accessor: 'productName',
    Cell: ({ value }) => {
      return value;
    },
  },

  {
    Header: 'Transaction Id',
    Footer: 'Trans. Id',
    accessor: 'transID'
  },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'status',
    Cell: ({ value }) => {
      switch (value) {
        case 1:
          return <span className="text-green-600 bg-green-200 inline-block px-5 py-1 rounded-full">Order successful</span>
        case -1:
          return <span className="bg-red-100 text-red-400 inline-block px-5 py-1 rounded-full">Order Cancelled</span>
        default:
          return <span className="text-gray-700 bg-gray-200 inline-block px-5 py-1 rounded-full">Order Pending</span>;
      }
    },
  },
  {
    Header: 'Amount',
    Footer: 'Amount',
    accessor: 'totalAmount',
    Cell: ({ value }) => {
      const formatNumber = (number) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'NGN',
        }).format(number);
      return formatNumber(value);
    }
  },
  {
    Header: 'Date',
    Footer: 'Amount',
    accessor: 'transDate',
    Cell: ({ value }) => {
      return format(
        fromUnixTime(value),
        'MM/dd/yyyy'
      )
    }
  },
];
