import { ref, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useStore, useConfiger } from '@/store'
import { useState } from '@/hooks/hook-state'
import { delCompose } from '@/utils/utils-cookie'
import * as utils from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

export const useGlobal = defineStore('APP_STORE_GLOBAL', () => {
    const { setState: fetchState } = useStore(useConfiger)
    /**用户信息**/
    const flowUser = ref<Omix>({})

    /**退出登录时重置store数据**/
    async function fetchReset() {
        const { device, collapsed } = utils.fetchScreenResize()
        return await fetchState({ device, collapsed, router: '/manager', menuRouter: [] }).then(async data => {
            await delCompose()
            return (flowUser.value = {})
        })
    }

    /**初始化**/
    async function fetchBaseInitialize() {
        return await Promise.all([fetchBaseAuthTokenResolver()])
    }

    /**登录账户信息**/
    async function fetchBaseAuthTokenResolver() {
        return await Service.httpCommonAuthAccountTokenResolver().then(async ({ data }) => {
            return (flowUser.value = data ?? {})
        })
    }

    return { flowUser, fetchReset, fetchBaseInitialize, fetchBaseAuthTokenResolver }
})
