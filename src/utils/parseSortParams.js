import { sortOrderList } from '../constants/sorting.js';

const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
};

export default parseSortParams;
