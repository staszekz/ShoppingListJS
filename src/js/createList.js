// creation of list elements

import { pickColor, nameChanger } from './switches';

const productsList = document.querySelector('.list-group');

const createLiElement = () => {
	const liElement = document.createElement('li');
	liElement.classList.add(
		'list-group-item',
		'fs-5',
		'd-flex',
		'justify-content-around',
		'align-items-center',
		'list__to__remove',
	);
	return liElement;
};

// alert when list is empty
export const emptyListAlert = () => {
	const liElement = createLiElement();
	liElement.classList.remove('list-group-item');
	liElement.classList.add('alert', 'alert-warning');
	liElement.innerText = 'lista zakupów jest pusta';
	productsList.appendChild(liElement);
};

export const productBlueprint = ({ name, category, quantity, unit, id }) => {
	const elementHTML = `
      <span class="item__name col-6">${name}</span>
      <span class="item__group col-3 badge bg-${pickColor(category)} me-1"
      >${nameChanger(category)}</span>
      <span class="badge bg-primary rounded-pill item__count col-2"
      >${quantity}
      <span class="item__unit">${unit}</span>
      </span>

     <button value=${id} class="item__delete bg-danger badge col-1 ms-1 px-1 noPrint text-center" role="button" 
     
      ><i value=${id} class="far fa-trash-alt"></i
      ></button>
      `;
	const liElement = createLiElement();
	liElement.setAttribute('id', id);
	liElement.innerHTML = elementHTML;
	return productsList.appendChild(liElement);
};
