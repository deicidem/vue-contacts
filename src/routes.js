
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import ContactsList from './components/ContactsList';
import Contact from './components/Contact';
import E404 from './components/E404';

// import {store} from './store';

const routes = [
	{
		path: '',
		redirect: {name: 'contacts'}
	},
	{
		path: '/contacts',
		name: 'contacts',
		component: ContactsList
	},
	{
		path: '/contacts/:id',
		component: Contact
	},
	{
		path: '*',
		component: E404
	}
	
];

export const router = new VueRouter ({
	routes,
	mode: 'history'
});