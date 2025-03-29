export default [
    {
        path: '/deploy/system/router',
        name: 'DeploySystemRouter',
        meta: { title: '菜单管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/router/router.vue')
    },
    {
        path: '/deploy/system/authorize',
        name: 'DeploySystemAuthorize',
        meta: { title: '权限管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/authorize/authorize.vue')
    },
    {
        path: '/deploy/system/user',
        name: 'DeploySystemUser',
        meta: { title: '用户管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/user/user.vue')
    }
]
