import firebase from 'firebase/app';
// import bootstrap from 'bootstrap.esm.js ';
import { hide } from 'bootstrap';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

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

const auth = firebase.auth();
const db = firebase.firestore();

const signForm = document.querySelector('#signForm');
signForm.addEventListener('submit', e => {
	e.preventDefault();

	const email = signForm['emailToSignIn'].value;
	const password = signForm['passwordToSignIn'].value;
	console.log(email, password);

	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		console.log('cred', cred);
	});
});

// logout
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const signupBtn = document.querySelector('.signup-btn');
const navSpinner = document.querySelector('.render');

const setupLoginBtns = user => {
	if (user) {
		logoutBtn.classList.remove('d-none');
		loginBtn.classList.add('d-none');
		signupBtn.classList.add('d-none');
	} else {
		logoutBtn.classList.add('d-none');
		loginBtn.classList.remove('d-none');
		signupBtn.classList.remove('d-none');
	}
};

logoutBtn.addEventListener('click', e => {
	e.preventDefault();
	auth.signOut();
});

// log in
const myModal = document.getElementById('loginModal');

const logForm = document.getElementById('logForm');
logForm.addEventListener('submit', e => {
	e.preventDefault();
	console.log('clicked');
	// myModal.modal('hide');
	const email = logForm['emailToLogIn'].value;
	const password = logForm['passwordToLogIn'].value;
	console.log(email, password);

	auth.signInWithEmailAndPassword(email, password);
});

const toRender = document.querySelector('.render');

const renderBtns = () => {
	logoutBtn.classList.remove('invisible');
	loginBtn.classList.remove('invisible');
	signupBtn.classList.remove('invisible');
	navSpinner.classList.add('invisible');
	console.log('render btns');
};

// listen to user status
auth.onAuthStateChanged(user => {
	console.log('change', user);
	renderBtns();
	if (user) {
		setupLoginBtns(user);
		console.log('logged user', user.email);
	} else {
		setupLoginBtns();
		console.log('logged out', user);
	}
});
