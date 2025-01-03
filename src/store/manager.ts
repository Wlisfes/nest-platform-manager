import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import * as Service from '@/api/instance.service'

export const useManager = defineStore('APP_STORE_MANAGER', () => {
    const { state, setState } = useState({
        uid: '',
        account: '',
        email: '',
        nickname: '',
        avatar: '',
        status: 'enable',
        system: false
    })

    /**获取账号基本信息**/
    async function fetchCommonBaseResolver() {
        return await Service.httpCommonBaseResolver().then(async ({ data }) => {
            return await setState({
                uid: data.uid,
                account: data.account,
                email: data.email,
                nickname: data.nickname,
                avatar: data.avatar,
                status: data.status,
                system: data.system
            })
        })
    }

    return { ...toRefs(state), setState, fetchCommonBaseResolver }
})
