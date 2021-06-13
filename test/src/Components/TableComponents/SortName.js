// import React, { useState } from 'react';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import FilterListIcon from '@material-ui/icons/FilterList';

// function SortName({info}) {

//     const [ names ] = useState([])

//     const elements = info.map((el) => {
//         names.push(el.name);
//     })

//     function descendingComparator(a, b, orderBy) {
//         if (b[orderBy] < a[orderBy]) {
//             return -1;
//         }
//         if (b[orderBy] > a[orderBy]) {
//             return 1;
//         }
//         return 0;
//     }

//     function getComparator(order, orderBy) {
//         return order === 'desc' 
//             ? (a, b) => descendingComparator(a, b, orderBy)
//             : (a, b) => -descendingComparator(a, b, orderBy) 
//     }

//     function stableSort(array, comparator) {
//         const stabilizedThis = array.map((el, index) => [el, index]);
//         stabilizedThis.sort((a, b ) => {
//             const order = comparator(a[0], b[0]);
//             if (order !== 0) {
//                 return order;
//             }
//             return a[1] - b[1];
//         })
//         return stabilizedThis.map((el) => el[0]);
//     }

//     function EnhancedTableHead(props) {
//         const { order, orderBy, onRequestSort } = props;
//         const createSortHandler = (property) => (event) => {
//             onRequestSort(event, property)
//         }

//         return names.map((element) => (
//                 <TableCell
//                   key={names.id}
//                   sortDirection={orderBy === names.id ? order : false}
//                 >
//                   <TableSortLabel
//                     active={orderBy === names.id}
//                     direction={orderBy === names.id ? order : 'asc'}
//                     onClick={createSortHandler(names.id)}
//                   >
//                     {names.label}
//                     {orderBy === names.id ? (
//                       <span className={classes.visuallyHidden}>
//                         {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                       </span>
//                     ) : null}
//                   </TableSortLabel>
//                 </TableCell>
//               ))
//     }

//     return (
//         <div>
//             <FilterListIcon onClick={}/>
//         </div>
//     )
// }

// export default SortName;