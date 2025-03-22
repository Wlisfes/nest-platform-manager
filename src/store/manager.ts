import { toRefs, computed } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import * as Service from '@/api/instance.service'

const list = [
    { name: '工作台', router: '/manager', iconName: 'nest-compass' },
    { name: '销售管理', router: '/crm', iconName: 'nest-market' },
    { name: '采购管理', router: '/srm', iconName: 'nest-stock' },
    { name: '报价管理', router: '/offer', iconName: 'nest-offer' },
    { name: '财务中心', router: '/finance', iconName: 'nest-finance' },
    { name: '信息查询', router: '/infor', iconName: 'nest-infratsr' },
    { name: '报表分析', router: '/report', iconName: 'nest-histogr' },
    { name: '运营中心', router: '/fiseek', iconName: 'nest-trade' },
    {
        name: '综合设置',
        router: '/deploy',
        iconName: 'nest-settings',
        children: [
            {
                name: '系统管理',
                router: '/deploy/system',
                children: [
                    { name: '资源管理', router: '/deploy/system/resource' },
                    { name: '权限管理', router: '/deploy/system/authorize' },
                    { name: '用户管理', router: '/deploy/system/consumer' }
                ]
            }
        ]
    }
]
export const useManager = defineStore('APP_STORE_MANAGER', () => {
    const { state, setState } = useState({
        uid: '',
        account: '',
        email: '',
        nickname: '',
        avatar: '',
        status: 'enable',
        system: false,
        menuOptions: [] as Array<Omix>
    })

    /**获取账号基本信息**/
    async function fetchCommonUserResolver() {
        return await Service.httpCommonUserResolver().then(async ({ data }) => {
            return await setState({
                uid: data.uid,
                account: data.account,
                email: data.email,
                nickname: data.nickname,
                avatar: data.avatar,
                status: data.status,
                system: data.system,
                menuOptions: list
            })
        })
    }

    return {
        state: computed(() => state),
        ...toRefs(state),
        setState,
        fetchCommonUserResolver
    }
})
