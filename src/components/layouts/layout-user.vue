<script lang="tsx">
import { defineComponent } from 'vue'
import { useManager, useStore } from '@/store'
import { useState } from '@/hooks/hook-state'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'LayoutUser',
    setup(props, ctx) {
        const { avatar, nickname, email, account } = useStore(useManager)
        const { state, setState } = useState({ visible: false, delay: false })

        /**异步关闭用户信息popover组件**/
        async function fetchClickoutside() {
            return await setState({ visible: false, delay: true }).then(async () => {
                await utils.fetchDelay(0)
                return await setState({ delay: false })
            })
        }

        /**异步开启用户信息popover组件**/
        async function fetchOpenCollapse(evt: MouseEvent) {
            await utils.stop(evt)
            return await utils.fetchHandler(!state.visible && !state.delay, {
                async handler() {
                    return await setState({ visible: true })
                }
            })
        }

        return () => (
            <n-popover
                placement="bottom-end"
                trigger="click"
                width={260}
                show={state.visible}
                style={{ padding: 0 }}
                onClickoutside={fetchClickoutside}
                v-slots={{
                    trigger: () => (
                        <div class="h-full flex items-center cursor-pointer" onClick={fetchOpenCollapse}>
                            <common-image
                                width={34}
                                height={34}
                                preview-disabled
                                class="b-rd-50% block overflow-hidden"
                                src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg"
                            ></common-image>
                        </div>
                    )
                }}
            >
                <n-element class="flex flex-col overflow-hidden">
                    <div class="flex items-center gap-10 p-16 select-none cursor-pointer border-b border-b-solid border-b-[var(--divider-color)]">
                        <common-image
                            width={40}
                            height={40}
                            preview-disabled
                            class="b-rd-50% block overflow-hidden"
                            src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg"
                        ></common-image>
                        <div class="flex flex-col flex-1">
                            <n-text depth={1} style={{ fontSize: '16px', lineHeight: '22px' }}>
                                <n-ellipsis tooltip={false}>{nickname.value}</n-ellipsis>
                            </n-text>
                            <n-text depth={3} style={{ lineHeight: '18px' }}>
                                <n-ellipsis tooltip={false}>{account.value}</n-ellipsis>
                            </n-text>
                        </div>
                    </div>
                </n-element>
            </n-popover>
        )
    }
})
</script>
