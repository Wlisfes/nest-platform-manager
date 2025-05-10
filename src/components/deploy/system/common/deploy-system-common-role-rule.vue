<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import { tree } from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemCommonRoleRule',
    props: {
        /**选中ID**/
        keyId: { type: String }
    },
    setup(props, ctx) {
        const { state, setState } = useState({
            initialize: true,
            loading: false,
            message: '',
            list: [] as Array<Omix>,
            next: [] as Array<string>,
            keys: [] as Array<string>
        })

        onBeforeMount(fetchInitialize)
        async function fetchInitialize() {
            try {
                await fetchBaseSystemTreeRouter()
                await fetchBaseSystemJoinColumnRoleRouter()
                return await setState({ initialize: false, message: '' })
            } catch (err) {
                return await setState({ initialize: false, message: '' })
            }
        }

        /**完整路由菜单树**/
        async function fetchBaseSystemTreeRouter() {
            return await Service.httpBaseSystemTreeRouter().then(async ({ data }) => {
                return await setState({ list: data.list ?? [] })
            })
        }

        /**角色关联菜单列表**/
        async function fetchBaseSystemJoinColumnRoleRouter() {
            return await Service.httpBaseSystemJoinColumnRoleRouter({ keyId: props.keyId }).then(async ({ data }) => {
                return await setState({ keys: data.keys, next: data.next })
            })
        }

        /**勾选菜单树结构数据转换**/
        async function fetchJoinNextKeys() {
            const items = tree.findPathAll(state.list, (item: Omix) => state.keys.includes(item.keyId))
            return [...new Set(items.flat(Infinity).map((item: Omix) => item.keyId))]
        }

        async function fetchSubmit() {
            try {
                await setState({ loading: true })
                return await Service.httpBaseSystemJoinRoleRouter({
                    keyId: props.keyId,
                    keys: await fetchJoinNextKeys()
                }).then(async ({ message }) => {
                    await fetchNotifyService({ title: message })
                    return await setState({ loading: false })
                })
            } catch (err) {
                return await setState({ loading: false }).then(async () => {
                    return await fetchNotifyService({ type: 'error', title: err.message })
                })
            }
        }

        return () => (
            <common-element class="deploy-system-common-role-rule p-bs-58 overflow-hidden" spin loading={state.initialize}>
                <n-scrollbar class="flex-1 overflow-hidden">
                    <n-element class="p-inline-12 p-be-12 overflow-hidden">
                        <n-tree
                            class="w-full max-w-680"
                            block-line
                            block-node
                            cascade
                            checkable
                            selectable={false}
                            key-field="keyId"
                            label-field="name"
                            style={{ '--n-node-content-height': '34px' }}
                            disabled={state.loading}
                            data={state.list}
                            checked-keys={state.keys}
                            on-update:checked-keys={(keys: Array<string>) => setState({ keys })}
                        ></n-tree>
                        <n-element class="flex gap-24 p-inline-28 p-block-12 overflow-hidden">
                            <common-element-button
                                class="min-w-80"
                                type="warning"
                                content="重置"
                                disabled={state.loading}
                                onClick={() => setState({ keys: state.next })}
                            ></common-element-button>
                            <common-element-button
                                class="min-w-80"
                                type="primary"
                                content="保存"
                                loading={state.loading}
                                disabled={state.loading}
                                onClick={fetchSubmit}
                            ></common-element-button>
                        </n-element>
                    </n-element>
                </n-scrollbar>
            </common-element>
        )
    }
})
</script>
