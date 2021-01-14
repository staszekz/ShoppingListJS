import Product from './product';
// import * as auth from './auth';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/alert';
import './cssEffects';
import './auth';

import { productBlueprint, emptyListAlert } from './createList';
import '../scss/index.scss';

// catching things
const summary = document.querySelector('.items__summary');
const form = document.querySelector('#form');
export const saveBtn = document.querySelector('.btn__save');
export const resetBtn = document.querySelector('.btn__reset');
export const loadBtn = document.querySelector('.btn__load');
export const btnPrint = document.querySelector('.btn__print');
const notification = document.querySelector('.notification');
const sumItemsPlace = document.querySelector('.sum__items');
const sumKilosPlace = document.querySelector('.sum__kilos');

// products list
let products = [];

// summary of quantity of all products
const addSum = () => {
	summary.innerText = `Razem pozycji: ${products.length}`;
};

// quantity sum of each unit
const units = {
	item: 'szt.',
	kilos: 'kg',
};

// sum of items without kilos
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
	const value = e.target.getAttribute('value');
	if (buttons.length === 0) {
		return;
	}
	if (e.target.closest('button').classList.contains('item__delete')) {
		document.getElementById(value).remove();
	}
	products = products.filter(product => product.id !== parseInt(value, 10));
	if (buttons.length === 1) {
		emptyListAlert();
	}
};

const clickDel = e => {
	deleteProduct(e);
	renderList(products);
};

// adding listeners to delete buttons after each rendering
let buttons = [];
const addListenersToDeleteButtons = () => {
	buttons = [...document.getElementsByClassName('item__delete')];
	buttons.forEach(button => {
		return button.addEventListener('click', clickDel);
	});
};

// getting value from radio input (items or kilos)
const unitInput = () => {
	return Array.from(document.getElementsByName('unit')).find(unit => unit.checked);
};

// handling form for adding new Item to list
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

// cleaning list after reset btn clicked
resetBtn.addEventListener('click', () => {
	products = [];
	renderList(products);
});

// restoring saved list of product from local storage
const readList = () => {
	const fromLocalStorage = localStorage.getItem('Shopping List');
	if (fromLocalStorage !== null) {
		products = JSON.parse(fromLocalStorage);
	}
	renderList(products);
};

document.onload = readList();
loadBtn.addEventListener('click', readList);

// printing
btnPrint.addEventListener('click', () => window.print());
