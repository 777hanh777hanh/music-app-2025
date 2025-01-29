import { createRouter, createWebHistory, Router } from 'vue-router';
import { pathNames } from '@/constants';

interface CustomRouter extends Router {
	pages: any[];
	first: string;
}

const importView = (name: string): Promise<any> =>
	import(`@/views/${name}/index.ts`);

const router: CustomRouter = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: pathNames.home,
			name: 'HomeView',
			component: () => importView('HomeView')
		},
		{
			path: pathNames.about,
			name: 'AboutView',
			component: () => importView('AboutView')
		},
		{
			path: pathNames.demo,
			name: 'DemoView',
			component: () => importView('DemoView')
		},
		{
			path: pathNames.notFound,
			name: 'NotFoundView',
			component: () => importView('NotFoundView')
		},
		{
			path: pathNames.soundClick,
			name: 'SoundView',
			component: () => importView('SoundView')
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
