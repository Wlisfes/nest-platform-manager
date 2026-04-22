<script lang="tsx">
import { defineComponent } from 'vue'
import { Observer } from '@/utils'
import { useColumnService, useState } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/finance/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'CrmClientContextWrapper',
    setup(props, ctx) {
        return () => (
            <n-card class="crm-client-context-wrapper flex flex-col" content-class="p-16!">
                <div class="flex justify-between">
                    <div class="flex flex-col overflow-hidden">
                        <div class="text-12 line-height-16 flex overflow-hidden">
                            <n-text depth="3">创建时间：2022-05-25 15:03:43</n-text>
                        </div>
                        <div class="flex items-center p-block-5 overflow-hidden">
                            <n-h1 class="m-0 text-20 font-500 line-height-24">测试客户名称 (100054170)</n-h1>
                        </div>
                    </div>
                    <div class="flex items-center m-be-auto">
                        <n-button>刷新</n-button>
                    </div>
                </div>
            </n-card>
        )
    }
})
</script>
