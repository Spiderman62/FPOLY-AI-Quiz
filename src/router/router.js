import {createRouter,createWebHistory} from 'vue-router';
import dashboard from './dashboard.js';
import quiz from './quizz.js';
const routes = [...dashboard,...quiz];
export default createRouter({
	history:createWebHistory(),
	routes
});