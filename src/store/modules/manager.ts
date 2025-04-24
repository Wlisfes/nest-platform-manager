import { ref, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useConfiger } from '@/store/modules/configer'
import { useState } from '@/hooks/hook-state'
import { delCompose } from '@/utils/utils-cookie'
import * as utils from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

export const useManager = defineStore('APP_STORE_MANAGER', () => {
    const configer = useConfiger()
    const flowUser = ref<Omix>({})
    const { state, setState } = useState({
        menuOptions: [] as Array<Omix>
    })

    /**退出登录时重置store数据**/
    async function fetchReset() {
        const { device, collapsed } = utils.fetchScreenResize()
        return await configer.setState({ device, collapsed, router: '/manager', menuRouter: [] }).then(async data => {
            await delCompose()
            return await fetchUpdateUser()
        })
    }

    /**更新用户信息对象**/
    async function fetchUpdateUser(data: Omix = {}) {
        return (flowUser.value = data)
    }

    /**获取账号基本信息**/
    async function fetchBaseSystemUserResolver() {
        return await Service.httpBaseSystemUserResolver().then(async ({ data }) => {
            return await fetchUpdateUser(data ?? {})
        })
    }

    async function fetchBaseSystemUserRouter() {
        return await Service.httpBaseSystemUserRouter().then(async ({ data }) => {
            return await setState({ menuOptions: data.list ?? [] })
        })
    }

    return {
        flowUser,
        ...toRefs(state),
        setState,
        fetchReset,
        fetchUpdateUser,
        fetchBaseSystemUserResolver,
        fetchBaseSystemUserRouter
    }
})
