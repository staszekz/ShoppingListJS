import Product from './product';
// import * as auth from './auth';
import { Tooltip, Toast, Popover } from 'bootstrap';

import './auth';
import './loginui';
// You can specify which plugins you need
import { productBlueprint, emptyListAlert } from './createList';
import '../scss/index.scss';

// products list
let products = [];
console.log('prod', products);
// catching things
const summary = document.querySelector('.items__summary');
const form = document.querySelector('#form');
const saveBtn = document.querySelector('.btn__save');
const notification = document.querySelector('.notification');
const btnPrint = document.querySelector('.btn__print');
const sumItemsPlace = document.querySelector('.sum__items');
const sumKilosPlace = document.querySelector('.sum__kilos');

// summary of quantity of all products
const addSum = () => {
	summary.innerText = `Razem pozycji: ${products.length}`;
};

// quantity sum of each unit
const units = {
	item: 'szt.',
	kilos: 'kg',
};

const sumOfItems = unit => {
	const items = products
		.filter(product => product.unit === unit)
		.map(item => parseFloat(item.quantity, 10))
		.reduce((curr, next) => {
			return curr + next;
		}, 0);
	return items;
};

// rendering of list - first cleaning old list, and renders again
const renderList = products => {
	const all = document.querySelectorAll('.list__to__remove');
	all.forEach(el => {
		el.remove();
	});
	if (products.length) {
		products.map(product => productBlueprint(product));
		addListenersToDeleteButtons();
	} else {
		emptyListAlert();
	}
	sumItemsPlace.innerText = sumOfItems(units.item);
	sumKilosPlace.innerText = sumOfItems(units.kilos);
	addSum();
};

// handling delete buttons
const deleteProduct = e => {
	if (buttons.length === 0) {
		return;
	}
	document.getElementById(`${e.target.value}`).remove();
	products = products.filter(product => product.id !== parseInt(e.target.value, 10));
	if (buttons.length === 1) {
		emptyListAlert();
	}
};

const clickDel = e => {
	deleteProduct(e);
	renderList(products);
};

let buttons = [];
const addListenersToDeleteButtons = () => {
	buttons = [...document.getElementsByClassName('item__delete')];
	buttons.forEach(button => {
		return button.addEventListener('click', clickDel);
	});
};

// getting value from radio input
const unitInput = () => {
	return Array.from(document.getElementsByName('unit')).find(unit => unit.checked);
};

// handling submit from modal - form
form.addEventListener('submit', e => {
	e.preventDefault();
	const nameInput = document.querySelector('#nameInput');
	const categoryInput = document.querySelector('#categoryInput');
	const quantityInput = document.querySelector('#quantityInput');
	const unit = unitInput().value;
	products.push(new Product(nameInput.value, categoryInput.value, quantityInput.value, unit));
	renderList(products);

	form.reset();
});

// saving list into localStorage
const displayNotification = () => {
	notification.classList.toggle('invisible');
	setTimeout(() => {
		notification.classList.toggle('invisible');
	}, 1500);
};

const handleLocalStorage = () => {
	localStorage.setItem('Shopping List', JSON.stringify(products));
	displayNotification();
};

saveBtn.addEventListener('click', handleLocalStorage);

const readList = () => {
	const fromLocalStorage = localStorage.getItem('Shopping List');
	products = JSON.parse(fromLocalStorage);
	renderList(products);
};
document.onload = readList();

// printing
btnPrint.addEventListener('click', () => window.print());
