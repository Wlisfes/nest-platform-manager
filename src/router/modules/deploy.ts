export default [
    {
        path: '/deploy/system/router',
        name: 'DeploySystemRouter',
        meta: { title: '菜单管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/router/router.vue')
    },
    {
        path: '/deploy/system/role',
        name: 'DeploySystemRole',
        meta: { title: '角色管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/role/role.vue')
    },
    {
        path: '/deploy/system/user',
        name: 'DeploySystemUser',
        meta: { title: '用户管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/user/user.vue')
    }
]
