import { createRouter, createWebHistory } from 'vue-router';
import { pathNames } from '@/constants';
var importView = function (name) {
    return import(/* webpackChunkName: "[request]" */ "@/views/".concat(name, "/index.ts"));
};
var router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: pathNames.home,
            name: 'HomeView',
            component: function () { return importView('HomeView').then(); }
        },
        {
            path: pathNames.about,
            name: 'AboutView',
            component: function () { return importView('AboutView').then(); }
        },
        {
            path: pathNames.demo,
            name: 'DemoView',
            component: function () { return importView('DemoView').then(); }
        },
        {
            path: pathNames.notFound,
            name: 'NotFoundView',
            component: function () { return importView('NotFoundView').then(); }
        },
        {
            path: pathNames.soundClick,
            name: 'SoundView',
            component: function () { return importView('SoundView').then(); }
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: pathNames.notFound
        }
    ]
});
router.pages = [];
router.first = '';
router.beforeEach(function (to, from) {
    router.pages.push(to);
    if (!router.first) {
        router.first = "".concat(to);
    }
});
export default router;
//# sourceMappingURL=index.js.map