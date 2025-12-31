import { ref, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useStore, useConfiger } from '@/store'
import { useState } from '@/hooks/hook-state'
import { delCompose } from '@/utils/utils-cookie'
import { omit } from 'lodash-es'
import * as utils from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

export const useGlobal = defineStore('APP_STORE_GLOBAL', () => {
    const flowUser = ref<Omix>({})
    const { setState: fetchStateConfiger } = useStore(useConfiger)
    const { state, setState } = useState({
        /**登录权限菜单**/
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
        return await Promise.all([fetchAuthAccountTokenResolver(), fetchAuthAccountTokenResource()])
    }

    /**登录账户信息**/
    async function fetchAuthAccountTokenResolver() {
        return await Service.httpAuthAccountTokenResolver().then(async ({ data }) => {
            return (flowUser.value = data ?? {})
        })
    }

    /**登录账户权限**/
    async function fetchAuthAccountTokenResource() {
        return await Service.httpAuthAccountTokenResource().then(async ({ data }) => {
            const items = data.list.map((item: Omix) => Object.assign(omit(item, ['icon']), { iconName: item.icon }))
            return await setState({ menuOptions: items })
        })
    }

    return {
        ...toRefs(state),
        flowUser,
        setState,
        fetchReset,
        fetchBaseInitialize,
        fetchAuthAccountTokenResolver,
        fetchAuthAccountTokenResource
    }
})
