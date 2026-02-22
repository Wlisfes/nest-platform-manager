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
        component: () => import('@/views/deploy/system/role/index.vue')
    },
    {
        path: '/deploy/system/account',
        name: 'DeploySystemAccount',
        meta: { title: '员工管理', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/account/index.vue')
    },
    {
        path: '/deploy/system/dept',
        name: 'DeploySystemDepartment',
        meta: { title: '部门组织', AUTH: 'AUTH' },
        component: () => import('@/views/deploy/system/dept/index.vue')
    }
]
