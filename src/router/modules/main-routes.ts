export default []

// export const childRoutes: Array<Omix<RouteRecordRaw>> = concat(systemRoutes, [
//     {
//         path: '/manager',
//         name: 'Manager',
//         meta: { title: '工作台', AUTH: APP_NEST.AUTH },
//         component: () => import('@/views/main/manager/manager.vue')
//     }
// ])

// export const mainRoutes: Array<Omix<RouteRecordRaw>> = [
//     {
//         path: '/login',
//         name: 'Login',
//         meta: { title: '登录', AUTH: APP_NEST.AUTH_NONE },
//         component: () => import('@/views/main/login/login.vue')
//     },
//     {
//         path: '/',
//         redirect: '/manager',
//         name: 'LayoutContainer',
//         meta: { title: '骊珠服务平台', AUTH: APP_NEST.AUTH },
//         component: () => import('@/components/layouts/layout-container.vue'),
//         children: childRoutes
//     }
// ]
