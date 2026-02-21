export default [
    {
        path: '/deploy/system/sheet',
        name: 'DeploySystemSheet',
        meta: { title: '菜单管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/sheet/index.vue')
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
    },
    {
        path: '/deploy/system/dept',
        name: 'DeploySystemDepartment',
        meta: { title: '部门组织', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/dept/index.vue')
    }
]
