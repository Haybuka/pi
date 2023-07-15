// import format from "date-fns/format";
// import ColumnFilter from './ColumnFilter';
export const COLUMNS = [
  {
    Header: '',
    Footer: '',
    accessor: 'catImage',
    Cell: ({ value }) => {
      return <p className="bg-gray-200 w-6 h-6 mx-auto rounded-full"></p>;
    },
    // Filter : ColumnFilter
  },
  {
    //Table hooks up to the id to figure out what to render
    Header: 'Id',
    Footer: 'Id',
    //Accessor connects body to header
    accessor: 'id',
    // Filter: ColumnFilter,
    // to Disable filtering for a field
    disableFilters: true,
  },
  {
    Header: 'Name',
    Footer: 'name',
    accessor: 'name',
    // Filter: ColumnFilter,
  },

  {
    Header: 'Description',
    Footer: 'Description',
    accessor: 'details',
    // controls what is rendered on ui
    // this is how changes are made on the table value
    // Cell : ({value}) => {return format(new Date(value),'dd/MM/yyyy')},
    // Cell: ({ value }) => {
    //   return `${value}.`;
    // },

    // Filter : ColumnFilter
  },
  // {
  //   Header: 'Actions',
  //   Footer: 'Actions',
  //   accessor: '',
  //   Cell: ({ value }) => {
  //     return <p onClick={() => console.log(value)}>hi</p>;
  //   },
  // },
  // {
  //   Header: 'Country',
  //   Footer: 'Country',
  //   accessor: 'country',
  //   // Filter : ColumnFilter
  // },
  // {
  //   Header: 'Phone',
  //   Footer: 'Phone',
  //   accessor: 'phone',
  //   // Filter : ColumnFilter
  // },
];
