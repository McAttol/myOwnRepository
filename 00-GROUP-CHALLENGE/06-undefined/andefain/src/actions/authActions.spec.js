import {
	login,
	logout,
	signInWithGoogle,
	signInAnonymously
} from './authActions';

import authStore from '../stores/authStore';

describe('Auth actions test', () => {
	const mail = 'test@gmail.com';
	const pass = '1234567';
	it('should login', () => {
		login(mail, pass);
		expect(authStore.getUserProfile().email).toEqual(mail);
	});
	it('should logout', () => {
		login(mail, pass);
		logout();
		expect(authStore.getUserProfile()).toBeUndefined();
	});
});
