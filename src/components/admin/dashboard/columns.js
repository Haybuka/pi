// import format from "date-fns/format";
// import ColumnFilter from './ColumnFilter';
export const COLUMNS = [
  // {
  //   Header: '',
  //   Footer: '',
  //   accessor: 'catImage',
  //   Cell: ({ value }) => {
  //     return <p className="bg-gray-200 w-6 h-6 mx-auto rounded-full"></p>;
  //   },
  //   // Filter : ColumnFilter
  // },
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
    Header: 'Id',
    Footer: 'id',
    accessor: 'id',
  },
  {
    Header: 'Product Name',
    Footer: 'name',
    accessor: 'productName',
  },

  {
    Header: 'Product Category',
    Footer: 'Product Category',
    accessor: 'productCategory',
    // controls what is rendered on ui
    // this is how changes are made on the table value
    // Cell : ({value}) => {return format(new Date(value),'dd/MM/yyyy')},
    // Cell: ({ value }) => {
    //   return `${value}.`;
    // },

    // Filter : ColumnFilter
  },

  {
    Header: 'Trans. Id',
    Footer: 'Trans. Id',
    accessor: 'transactionId',
    // Filter : ColumnFilter
  },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'status',
    Cell: ({ value }) => {
      switch (value) {
        case 1:
          return <span className="bg-green-200 text-green-500 inline-block px-4 py-1 rounded-full">Order successful</span>
        case -1:
          return <span className="bg-red-200 text-red-500 inline-block px-4 py-1 rounded-full">Order Cancelled</span>
        default:
          return <span className="bg-yellow-200 text-yellow-500 inline-block px-4 py-1 rounded-full">Order Pending</span>;
      }
    },
  },
  {
    Header: 'Amount',
    Footer: 'Amount',
    accessor: 'amount',
    Cell: ({ value }) => {
      const formatNumber = (number) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'NGN',
        }).format(number);
      return formatNumber(value);
    }
  },
];
