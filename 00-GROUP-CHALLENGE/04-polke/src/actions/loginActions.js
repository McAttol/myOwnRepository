import dispatcher from '../appDispatcher';
import actionTypes from './actionTypes';
import { authMethods } from '../firebase/firebaseAuthMethods';
import firebase from 'firebase';

export function login(email, password) {
	return authMethods
		.signin(email, password)
		.then(({ user }) => {
			dispatcher.dispatch({
				type: actionTypes.LOGIN,
				data: user
			});
		})
		.catch((error) => console.error(error.message));
}

export function loginGoogle() {
	return authMethods
		.signInWithGoogle()
		.then((data) => {
			dispatcher.dispatch({
				type: actionTypes.LOGIN,
				data
			});
		})
		.catch((error) => console.error(error.message));
}

export function loginGitHub() {
	return authMethods
		.signInWithGitHub()
		.then((data) => {
			console.log(data);
			dispatcher.dispatch({
				type: actionTypes.LOGIN,
				data
			});
		})
		.catch((error) => console.error(error.message));
}

export function loginAnonyomously() {
	return authMethods
		.signInAnonymously()
		.then((data) => {
			dispatcher.dispatch({
				type: actionTypes.LOGIN,
				data
			});
		})
		.catch((error) => console.error(error.message));
}

export function logout() {
	return authMethods
		.logout()
		.then(() => {
			dispatcher.dispatch({
				type: actionTypes.LOGOUT
			});
		})
		.catch((error) => console.error(error.message));
}

export function createNewUser(email, password) {
	return authMethods.createUser(email, password);
}
