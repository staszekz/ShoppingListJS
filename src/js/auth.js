import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

import { resetBtn, saveBtn, loadBtn, btnPrint, getBtn, sendBtn, readList, products, renderList, displayNotification } from './index';
import { productsList } from './createList'

const firebaseConfig = {
	apiKey: 'AIzaSyBh1FUATgC4cxDngnk084fSC9CRb9383EY',
	authDomain: 'shopping-list-d75b7.firebaseapp.com',
	projectId: 'shopping-list-d75b7',
	storageBucket: 'shopping-list-d75b7.appspot.com',
	messagingSenderId: '89018749105',
	appId: '1:89018749105:web:558125e51d613a77855290',
	measurementId: 'G-26N7JYMGZW',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const signupBtn = document.querySelector('.signup-btn');
const navSpinner = document.querySelector('.render');
const closeLogInBtn = document.querySelector('.closeLogBtn');
const closeSignUpBtn = document.querySelector('.closeSignBtn');
const userName = document.querySelector('.user__name');
const weakPassAlert = document.querySelector('.weakPassAlert');
const wrongPassAlert = document.querySelector('.wrongPassAlert');
const linkToLogIn = document.querySelector('.linkToLogIn');
const linkToSignUp = document.querySelector('.linkToSignUp');
const signForm = document.querySelector('#signForm');
const logForm = document.getElementById('logForm');
const liItem = document.getElementsByClassName('list-group-item')

// creating new user
signForm.addEventListener('submit', e => {
	e.preventDefault();

	const email = signForm['emailToSignUp'].value;
	const password = signForm['passwordToSignUp'].value;
	const name = signForm['nameToSignUp'].value;
	auth
		.createUserWithEmailAndPassword(email, password)
		.then(cred => {
			cred.user.updateProfile({
				displayName: name,
			});
		})
		.then(() => closeSignUpBtn.click())
		// .then(() => window.reload())
		.then(() => console.log(`bbbb`, auth.currentUser))
		.catch(error => {
			console.error(error.code);
			weakPassAlert.innerText = error.message;
			weakPassAlert.classList.remove('d-none');
		});
});

// clearing forms after closin
closeLogInBtn.addEventListener('click', () => {
	logForm.reset();
	wrongPassAlert.classList.add('d-none');
});
closeSignUpBtn.addEventListener('click', () => {
	signForm.reset();
	weakPassAlert.classList.add('d-none');
});

// conditionally showing login buttons
const setupLoginBtns = user => {
	if (user) {
		logoutBtn.classList.remove('d-none');
		loginBtn.classList.add('d-none');
		signupBtn.classList.add('d-none');
		console.log(user.displayName);
		userName.innerText = user.displayName;
	} else {
		logoutBtn.classList.add('d-none');
		loginBtn.classList.remove('d-none');
		signupBtn.classList.remove('d-none');
		userName.innerText = 'Guest';
	}
};

// log out
logoutBtn.addEventListener('click', e => {
	e.preventDefault();
	auth
		.signOut()
		.then(() => {
			logForm['logSubmit'].classList.remove('d-none');
			document.querySelector('#loggedInAlert').classList.add('d-none');
		})
		.catch(error => {
			console.error(error.code);
			console.error(error.message);
		});
});

// log in on prev created account
logForm.addEventListener('submit', e => {
	e.preventDefault();
	const email = logForm['emailToLogIn'].value;
	const password = logForm['passwordToLogIn'].value;
	auth
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			document.querySelector('#loggedInAlert').classList.remove('d-none');
			logForm['logSubmit'].classList.add('d-none');
		})
		.then(() => closeLogInBtn.click())
		.then(() => logForm.reset())
		.catch(error => {
			console.error(error.code);
			wrongPassAlert.innerText = `Wrong e-mail or password`;
			wrongPassAlert.classList.remove('d-none');
		});
});

const renderBtns = () => {
	logoutBtn.classList.remove('invisible');
	loginBtn.classList.remove('invisible');
	signupBtn.classList.remove('invisible');
	navSpinner.classList.add('invisible');
	resetBtn.removeAttribute('disabled');
	loadBtn.removeAttribute('disabled');
	saveBtn.removeAttribute('disabled');
	btnPrint.removeAttribute('disabled');
	sendBtn.removeAttribute('disabled');
	getBtn.removeAttribute('disabled');

};

// already have/do not have an account buttons
linkToLogIn.addEventListener('click', () => {
	closeSignUpBtn.click();
	loginBtn.click();
});
linkToSignUp.addEventListener('click', () => {
	closeLogInBtn.click();
	signupBtn.click();
});


const changeLoggedColor = (user) => {
	if (user) {
		document.body.classList.add('loggedColor')
		liItem.forEach(li => li.classList.add('loggedColor'))
	} else {
		document.body.classList.remove('loggedColor')
		liItem.forEach(li => li.classList.remove('loggedColor'))
	}
}

// saving new shopping list
const saveNewList = () => {
	// deleting every document in forestore
	db.collection(auth.currentUser.uid).get().then((querySnapshot) => {
		const batch = db.batch()
		querySnapshot.forEach(doc => {
			batch.delete(doc.ref);
		});
		return batch.commit()
		// seving new shopping list
	})
		.then(() => {
			products.forEach(product => {
				db.collection(auth.currentUser.uid).add(Object.assign({}, product))
			})
		})
		.then(() => displayNotification())
}

// buttons to fetch or localStorage
const showFetchingBtns = (user) => {
	if (user) {
		sendBtn.classList.remove('d-none');
		getBtn.classList.remove('d-none');
		saveBtn.classList.add('d-none');
		loadBtn.classList.add('d-none');
		sendBtn.addEventListener('click', saveNewList);
	} else {
		sendBtn.classList.add('d-none');
		getBtn.classList.add('d-none');
		saveBtn.classList.remove('d-none');
		loadBtn.classList.remove('d-none');
	}
}

// fetch data from firestore
const fetchList = (user) => {
	// to empty list before fetching
	products.length = 0;
	// set new list
	db.collection(user.uid).get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			products.push(doc.data())
		})
	}).then(() => {
		renderList(products)
		changeLoggedColor(user);
	}
	)
}

// listen to user status
auth.onAuthStateChanged(user => {
	renderBtns();
	if (user) {
		getBtn.addEventListener('click', () => fetchList(user))
		// setting buttons
		setupLoginBtns(user);
		showFetchingBtns(user);
		// rendering fetched list
		fetchList(user)
	} else {
		setupLoginBtns();
		changeLoggedColor()
		showFetchingBtns()
		readList()
	}
});
