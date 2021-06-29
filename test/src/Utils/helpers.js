//SORT TABLE

function ascendingComparator(a, b, orderBy) {
	let firstItem = a[orderBy];
	let secondItem = b[orderBy];
	if (orderBy === 'birthday') {
		firstItem = new Date(firstItem).getTime();
		secondItem = new Date(secondItem).getTime();
	}
	if (secondItem < firstItem) {
		return 1;
	}
	if (secondItem > firstItem) {
		return -1;
	}
	return 0;
}

function descendingComparator(a, b, orderBy) {
	let firstItem = a[orderBy];
	let secondItem = b[orderBy];
	if (orderBy === 'birthday') {
		firstItem = new Date(firstItem).getTime();
		secondItem = new Date(secondItem).getTime();
	}
	if (secondItem < firstItem) {
		return -1;
	}
	if (secondItem > firstItem) {
		return 1;
	}
	return 0;
}

export function sortTableByOrder(list, order, orderBy) {
	const newTableList = [ ...list ];
	newTableList.sort((a, b) => {
		if (order === 'asc') {
			return ascendingComparator(a, b, orderBy);
		}
		return descendingComparator(a, b, orderBy);
	});
	return newTableList;
}

//FILTER TABLE

export function filterTableByCategory(filteredList, filterCategory) {
	console.log('filterTableByCategory', filteredList, filterCategory);
	if (!filterCategory) {
		return filteredList;
	}
	const filteredTable = [ ...filteredList ].filter((item) => {
		return item.category.toLowerCase().includes(filterCategory.toLowerCase());
	});
	return filteredTable;
}

export function filterSelectedBirthday(tableList, selectDate) {
	const minimumDate = selectDate.startDate;
	const maximumDate = selectDate.endDate;

	const filteredTable = [ ...tableList ].filter((item) => {
		const birthdayDate = new Date(item.birthday);
		const isValidDate = isNaN(birthdayDate.getTime());
		if (isValidDate) {
			return false;
		}
		return birthdayDate.getTime() > minimumDate.getTime() && birthdayDate.getTime() < maximumDate.getTime();
	});
	return filteredTable;
}

export function filterAll(filteredItems, selectDate, inputCategory) {
	let filteredList = [ ...filteredItems ];
	if (selectDate.startDate && selectDate.endDate) {
		filteredList = filterSelectedBirthday(filteredItems, selectDate);
	}
	filteredList = filterTableByCategory(filteredList, inputCategory);
	return filteredList;
}
