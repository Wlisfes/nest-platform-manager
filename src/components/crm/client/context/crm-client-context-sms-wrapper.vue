<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { Chat } from '@vicons/carbon'

export default defineComponent({
    name: 'CrmClientContextSmsWrapper',
    emits: ['update:faseNode'],
    props: {
        /**详情数据**/
        faseNode: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { faseNode } = useVModels(props, emit)

        return () => (
            <common-element-scrollbar class="crm-client-context-sms-wrapper">
                <common-element is-white class="flex flex-col flex-1 overflow-hidden">
                    <common-element-columns-template class="gap-14 p-14" type="auto-fit" number={400}>
                        {Array.from({ length: 5 }, () => (
                            <n-card content-class="flex flex-col p-0! overflow-hidden">
                                <div class="flex gap-x-10 p-inline-14 p-block-14 overflow-hidden">
                                    <common-element-alert-wrapper class="p-10" type="info">
                                        <n-icon size={28} color="var(--n-icon-color)">
                                            <Chat />
                                        </n-icon>
                                    </common-element-alert-wrapper>
                                    <div class="flex flex-col flex-1 justify-between overflow-hidden">
                                        <n-text class="text-16 line-height-24" depth={1}>
                                            LYNSK1233001OTP
                                        </n-text>
                                        <n-text depth={3}>应用名称</n-text>
                                    </div>
                                    <div class="m-be-auto flex items-center gap-x-5 overflow-hidden">
                                        <n-tag round bordered={false} type="warning">
                                            营销短信
                                        </n-tag>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-y-10 p-inline-14 overflow-hidden">
                                    <common-element-columns-wrapper class="flex-col" label="已激活方向">
                                        {faseNode.value.name ?? '-'}
                                    </common-element-columns-wrapper>
                                    <common-element-columns-wrapper class="flex-col" label="备注">
                                        {faseNode.value.name ?? '-'}
                                    </common-element-columns-wrapper>
                                </div>
                                <n-divider class="m-block-12!" />
                                <div class="grid-auto-168 gap-x-14 gap-y-10 p-inline-14 p-be-14 overflow-hidden">
                                    <common-element-columns-wrapper class="flex-col" label="应用ID">
                                        {faseNode.value.name ?? '-'}
                                    </common-element-columns-wrapper>
                                    <common-element-columns-wrapper class="flex-col" label="应用名称">
                                        {faseNode.value.name ?? '-'}
                                    </common-element-columns-wrapper>
                                </div>
                            </n-card>
                        ))}
                    </common-element-columns-template>
                </common-element>
            </common-element-scrollbar>
        )
    }
})
</script>
