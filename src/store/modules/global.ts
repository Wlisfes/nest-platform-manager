import { ref, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useStore, useConfiger } from '@/store'
import { useState } from '@/hooks/hook-state'
import { delCompose } from '@/utils/utils-cookie'
import * as utils from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

export const useGlobal = defineStore('APP_STORE_GLOBAL', () => {
    const { setState: fetchStateConfiger } = useStore(useConfiger)
    /**用户信息**/
    const flowUser = ref<Omix>({})
    const { state, setState } = useState({
        menuOptions: []
    })

    /**退出登录时重置store数据**/
    async function fetchReset() {
        const { device, collapsed } = utils.fetchScreenResize()
        return await fetchStateConfiger({ device, collapsed, router: '/manager', menuRouter: [] }).then(async data => {
            await delCompose()
            return (flowUser.value = {})
        })
    }

    /**初始化**/
    async function fetchBaseInitialize() {
        return await Promise.all([fetchCommonAuthAccountTokenResolver(), fetchCommonAuthAccountTokenResource()])
    }

    /**登录账户信息**/
    async function fetchCommonAuthAccountTokenResolver() {
        return await Service.httpCommonAuthAccountTokenResolver().then(async ({ data }) => {
            return (flowUser.value = data ?? {})
        })
    }

    /**登录账户权限**/
    async function fetchCommonAuthAccountTokenResource() {
        return await Service.httpCommonAuthAccountTokenResource().then(async ({ data }) => {
            console.log(data)
        })
    }

    return {
        ...toRefs(state),
        flowUser,
        setState,
        fetchStateConfiger,
        fetchReset,
        fetchBaseInitialize,
        fetchCommonAuthAccountTokenResolver,
        fetchCommonAuthAccountTokenResource
    }
})
