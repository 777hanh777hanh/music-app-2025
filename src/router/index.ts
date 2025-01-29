import { createRouter, createWebHistory, Router } from 'vue-router';
import { pathNames } from '@/constants';

interface CustomRouter extends Router {
	pages: any[];
	first: string;
}

// const importView = (name: string): Promise<any> =>
// 	import(/* webpackChunkName: "[request]" */`@/views/${name}/index.js`);
// const importView = (name: string): Promise<any> =>
// 	import(`@/views/${name}/index.ts`);

const router: CustomRouter = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: pathNames.home,
			name: 'HomeView',
			component: () =>
				import(/* webpackChunkName: "HomeView" */ '@/views/HomeView')
		},
		{
			path: pathNames.about,
			name: 'AboutView',
			// component: () => importView('AboutView')
			component: () =>
				import(/* webpackChunkName: "AboutView" */ '@/views/AboutView')
		},
		{
			path: pathNames.demo,
			name: 'DemoView',
			component: () =>
				import(/* webpackChunkName: "DemoView" */ '@/views/DemoView')
		},
		{
			path: pathNames.notFound,
			name: 'NotFoundView',
			component: () =>
				import(
					/* webpackChunkName: "NotFoundView" */ '@/views/NotFoundView'
				)
		},
		{
			path: pathNames.soundClick,
			name: 'SoundView',
			component: () =>
				import(/* webpackChunkName: "SoundView" */ '@/views/SoundView')
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: pathNames.notFound
		}
	]
}) as CustomRouter;

router.pages = [];
router.first = '';

router.beforeEach((to, from) => {
	router.pages.push(to);
	if (!router.first) {
		router.first = `${to}`;
	}
});

export default router;
