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

const logBtn = document.querySelector('#logForm');
logBtn.addEventListener('submit', e => {
	e.preventDefault();

	const email = logBtn['emailLogin'].value;
	const password = logBtn['passwordInput'].value;
	console.log(email, password);

	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		console.log('cred', cred);
	});
});