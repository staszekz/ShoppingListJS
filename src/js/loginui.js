import firebase from 'firebase';
import './auth';
import { auth as authui } from 'firebaseui';

const ui = new authui.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.password,
			requireDisplayName: false,
		},
	],
});

console.log('ui', ui);
