<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { Observer } from '@/utils'
import { useColumnService, useState, useChunkService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/finance/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'CrmClientContextWrapper',
    setup(props, ctx) {
        const tags = ref([
            { label: '你没见过不等于没有', value: 'hello world 1' },
            {
                label: '不要给自己设限',
                value: 'hello world 2',
                active: true
            },
            {
                label: '不要说连升两级',
                value: 'hello world 3'
            },
            {
                label: '直接升到 CEO 都是有可能的',
                value: 'hello world 4'
            }
        ])
        const { chunkState } = useChunkService({
            type: ['CHUNK_CLIENT_STAGE']
        })

        return () => (
            <n-card class="crm-client-context-wrapper flex flex-col" content-class="p-16! flex flex-col gap-14">
                <div class="flex flex-col overflow-hidden">
                    <div class="flex justify-between gap-20 overflow-hidden">
                        <div class="flex flex-col overflow-hidden">
                            <div class="flex gap-20 text-12 line-height-16 overflow-hidden">
                                <n-text depth="3">创建时间：2022-05-25 15:03:43</n-text>
                            </div>
                            <div class="flex items-center p-block-10 gap-10 overflow-hidden">
                                <n-h1 class="m-0 text-20 font-500 line-height-24">测试客户名称 (100054170)</n-h1>
                            </div>
                        </div>
                        <div class="flex items-center m-be-auto">
                            <n-button>刷新</n-button>
                        </div>
                    </div>
                    <div class="flex gap-20 text-12 line-height-16 overflow-hidden">
                        <n-text depth="3">归属人：李逸飞</n-text>
                        <n-text depth="3">共享人：郭国荣、丁振东、马梓诚、郭国荣、阎梓浩、萧若汐、杨浩辰</n-text>
                    </div>
                </div>
                <n-dynamic-tags v-model:value={tags.value}></n-dynamic-tags>
                <common-business-progressbar stage="testing" items={chunkState.CHUNK_CLIENT_STAGE}></common-business-progressbar>
            </n-card>
        )
    }
})
</script>

<style lang="scss" scoped>
.crm-client-context-progressbar {
    position: relative;
    .common-block {
        position: relative;
        &:first-child {
            margin-inline-start: 0;
            clip-path: polygon(0% 0%, 93% 0%, 100% 50%, 93% 100%, 0% 100%);
        }
        &:last-child {
            clip-path: polygon(100% 0, 100% 100%, 0% 100%, 7% 50%, 0% 0%);
        }
        &:not(:first-child):not(:last-child) {
            clip-path: polygon(93% 0%, 100% 50%, 93% 100%, 0% 100%, 7% 50%, 0% 0%);
        }
    }
}
</style>
