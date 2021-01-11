import firebase from 'firebase/app';
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
console.log(firebase);

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
// const logoutBtn = document.querySelector('#logout-btn');
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const signinBtn = document.querySelector('.signin-btn');

logoutBtn.addEventListener('click', e => {
	e.preventDefault();
	auth.signOut().then(() => console.log('user loged out'));
	console.log('btn', loginBtn, logoutBtn, signinBtn);
});

// log in

const logForm = document.querySelector('#logForm');
logForm.addEventListener('submit', e => {
	e.preventDefault();

	const email = logForm['emailToLogIn'].value;
	const password = logForm['passwordToLogIn'].value;
	console.log(email, password);

	auth
		.signInWithEmailAndPassword(email, password)
		.then(cred => console.log('logged', cred.user))
		.then(() => {
			logoutBtn.classList.toggle('d-block');
			loginBtn.classList.toggle('d-none');
			signinBtn.classList.toggle('d-none');
		});
});
