<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useManager, useStore } from '@/store'
import { useState } from '@/hooks/hook-state'
import { useProvider } from '@/hooks/hook-provider'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'LayoutCommonUser',
    setup(props, ctx) {
        const { theme, fetchThemeUpdate } = useProvider()
        const { avatar, uid, name, email } = useStore(useManager)
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
            return await utils.fetchHandler(!state.visible && !state.delay, async () => {
                return await setState({ visible: true })
            })
        }

        /**退出登录**/
        async function fetchCompose() {
            return await setState({ visible: false })
        }

        return () => (
            <n-popover
                placement="bottom-end"
                trigger="click"
                width={300}
                show={state.visible}
                style={{ padding: 0 }}
                onClickoutside={fetchClickoutside}
                v-slots={{
                    trigger: () => (
                        <div class="h-full flex items-center cursor-pointer" onClick={fetchOpenCollapse}>
                            <common-element-image
                                width={36}
                                height={36}
                                preview-disabled
                                class="b-rd-50% block overflow-hidden"
                                src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg"
                            ></common-element-image>
                        </div>
                    )
                }}
            >
                <n-element class="flex flex-col overflow-hidden">
                    <div class="flex items-center gap-10 p-16 select-none cursor-pointer border-b border-b-solid border-b-[var(--divider-color)]">
                        <common-element-image
                            width={44}
                            height={44}
                            preview-disabled
                            class="b-rd-50% block overflow-hidden"
                            src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg"
                        ></common-element-image>
                        <div class="flex flex-col flex-1">
                            <n-text depth={1} style={{ fontSize: '16px', lineHeight: '24px' }}>
                                <n-ellipsis tooltip={false}>{name.value}</n-ellipsis>
                            </n-text>
                            <n-text depth={3} style={{ lineHeight: '20px' }}>
                                <n-ellipsis tooltip={false}>{`UID：${uid.value}`}</n-ellipsis>
                            </n-text>
                        </div>
                    </div>
                    <n-list hoverable clickable show-divider={false} class="p-inline-10 p-block-10 select-none">
                        <n-list-item style={{ padding: 0 }}>
                            <div class="h-24 flex items-center gap-10 p-inline-10 p-block-10">
                                <common-element-icon size={22} name="nest-settings"></common-element-icon>
                                <n-text>账户设置</n-text>
                            </div>
                        </n-list-item>
                        <n-list-item style={{ padding: 0 }} onClick={() => fetchThemeUpdate(theme.value === 'dark' ? 'light' : 'dark')}>
                            <div class="h-24 flex items-center gap-10 p-inline-10 p-block-10">
                                {theme.value === 'dark' ? (
                                    <Fragment>
                                        <common-element-icon size={24} name="nest-light"></common-element-icon>
                                        <n-text>浅色模式</n-text>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <common-element-icon size={24} name="nest-dark"></common-element-icon>
                                        <n-text>深色模式</n-text>
                                    </Fragment>
                                )}
                            </div>
                        </n-list-item>
                    </n-list>
                    <div class="p-inline-10 p-block-10 flex flex-col p-bs-0">
                        <common-element-button size="large" icon="nest-quit" secondary onClick={fetchCompose}>
                            立即登录
                        </common-element-button>
                    </div>
                </n-element>
            </n-popover>
        )
    }
})
</script>
