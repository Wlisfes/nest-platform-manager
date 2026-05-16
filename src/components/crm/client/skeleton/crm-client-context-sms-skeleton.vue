<script lang="tsx">
import { defineComponent } from 'vue'
import { Chat } from '@vicons/carbon'

export default defineComponent({
    name: 'CrmClientContextSmsSkeleton',
    props: {
        /**骨架屏**/
        initialize: { type: Boolean, default: true }
    },
    setup(props, { slots }) {
        return () => (
            <common-skeleton-provider
                is-white
                class-name="flex flex-col flex-1 overflow-hidden"
                loading={props.initialize}
                v-slots={{ render: slots.default }}
            >
                <common-element-columns-template class="gap-14 p-14" type="auto-fit" number={400}>
                    {Array.from({ length: 8 }, (_, index) => (
                        <common-skeleton-provider loading={true}>
                            <n-card content-class="flex flex-col p-0! overflow-hidden">
                                <div class="flex gap-x-10 p-inline-14 p-block-14 overflow-hidden">
                                    <common-skeleton-block>
                                        <common-element-alert-wrapper class="p-10" type="info">
                                            <n-icon size={28} color="var(--n-icon-color)">
                                                <Chat />
                                            </n-icon>
                                        </common-element-alert-wrapper>
                                    </common-skeleton-block>
                                    <div class="flex flex-col flex-1 gap-y-2 p-ie-40 overflow-hidden">
                                        <common-skeleton-block block="2px" class="line-height-24 m-ie-auto">
                                            LYNSK1233001OTP
                                        </common-skeleton-block>
                                        <common-skeleton-block block="2px" class="m-ie-auto">
                                            应用名称
                                        </common-skeleton-block>
                                    </div>
                                    <div class="m-be-auto flex items-center gap-x-5 overflow-hidden">
                                        <common-skeleton-block round>
                                            <n-tag round bordered={false} type="warning">
                                                营销短信
                                            </n-tag>
                                        </common-skeleton-block>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-y-10 p-inline-14 overflow-hidden">
                                    <div class="flex flex-col overflow-hidden">
                                        <common-skeleton-block block="2px" class="m-ie-auto">
                                            已激活方向
                                        </common-skeleton-block>
                                        <common-skeleton-block height="22px" block="2px"></common-skeleton-block>
                                    </div>
                                    <div class="flex flex-col overflow-hidden p-inline-0">
                                        <common-skeleton-block block="2px" class="m-ie-auto">
                                            备注
                                        </common-skeleton-block>
                                        <common-skeleton-block height="22px" block="2px"></common-skeleton-block>
                                    </div>
                                </div>
                                <n-divider class="m-block-12!" />
                                <div class="grid-auto-168 gap-x-14 gap-y-10 p-inline-14 p-be-14 overflow-hidden">
                                    <div class="flex flex-col overflow-hidden">
                                        <common-skeleton-block block="2px" class="m-ie-auto">
                                            应用ID
                                        </common-skeleton-block>
                                        <common-skeleton-block height="22px" block="2px"></common-skeleton-block>
                                    </div>
                                    <div class="flex flex-col overflow-hidden">
                                        <common-skeleton-block block="2px" class="m-ie-auto">
                                            应用名称
                                        </common-skeleton-block>
                                        <common-skeleton-block height="22px" block="2px"></common-skeleton-block>
                                    </div>
                                </div>
                            </n-card>
                        </common-skeleton-provider>
                    ))}
                </common-element-columns-template>
            </common-skeleton-provider>
        )
    }
})
</script>
