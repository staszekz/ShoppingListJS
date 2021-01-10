import firebase from 'firebase';
import firebaseui from 'firebaseui';

const ui = new firebaseui.auth.AuthUI(firebase.auth());

console.log('ui', ui);
