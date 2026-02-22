<script lang="tsx">
import { defineComponent, h } from 'vue'
import { useState, useSelectService, useBaseService } from '@/hooks'
import { SendFilled, Grid } from '@vicons/carbon'
import { stop, isEmpty, isNotEmpty } from '@/utils'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRole',
    setup(props, ctx) {
        /**角色列表**/
        const { faseNode, faseState, setState, fetchRefresh } = useBaseService(() => Service.httpBaseSystemColumnRole(), {
            callback: fetchReadyCallback,
            immediate: true,
            options: {
                active: 'account',
                selectedKeys: [] as Array<number>,
                expandedKeys: [] as Array<number>
            }
        })
        /**初始化回调**/
        async function fetchReadyCallback(data: Omix) {
            if (data.list.length === 0 || faseState.selectedKeys.length > 0) {
                return false
            }
            return await setState({ expandedKeys: [], selectedKeys: [data.list[0].keyId] })
        }
        /**左侧树展开变更回调**/
        async function fetchUpdateExpanded(keys: Array<number>) {
            return await setState({ expandedKeys: keys })
        }
        /**左侧树选中变更回调**/
        async function fetchUpdateSelected(keys: Array<number>) {
            return await setState({ selectedKeys: keys })
        }

        /**新增、编辑岗位角色**/
        async function fetchDeployUpdateSystemRole(event: MouseEvent, node: Omix = {}) {
            return await stop(event).then(async () => {
                console.log(node)
                if (isEmpty(node.keyId)) {
                    return await feedback.fetchDeploySystemRole({
                        title: '新增岗位角色',
                        command: 'CREATE',
                        onSubmit: fetchRefresh
                    })
                }
                return await feedback.fetchDeploySystemRole({
                    node,
                    title: '编辑岗位角色',
                    command: 'UPDATE',
                    onSubmit: fetchRefresh
                })
            })
        }

        return () => (
            <n-layout has-sider position="absolute" class="flex flex-col bg-transparent" content-class="flex-1 overflow-hidden">
                <n-layout-sider
                    width={320}
                    collapsed-width={0}
                    show-collapsed-content={false}
                    class="flex flex-col bg-transparent"
                    content-class="flex flex-col flex-1 overflow-hidden! p-block-14 p-is-14"
                >
                    <n-card class="flex-1 overflow-hidden" content-class="flex flex-col flex-1 p-0! overflow-hidden">
                        <common-element-spiner opacity={0} loading={faseState.initialize}>
                            <n-scrollbar trigger="none" class="flex-1 overflow-hidden">
                                <n-element class="flex flex-col gap-10 overflow-hidden">
                                    <div class="flex flex-col p-inline-14 overflow-hidden">
                                        <div class="flex items-center justify-between p-block-14 overflow-hidden">
                                            <n-h4 class="line-height-21 m-0">岗位角色</n-h4>
                                            <common-element-button
                                                {...{ text: true, type: 'primary' }}
                                                onClick={(event: MouseEvent) => fetchDeployUpdateSystemRole(event)}
                                            >
                                                新增角色
                                            </common-element-button>
                                        </div>
                                        {(faseNode.value.list ?? []).length > 0 && (
                                            <n-radio-group
                                                class="chunk-block flex flex-col overflow-hidden"
                                                value={faseState.selectedKeys[0]}
                                                on-update:value={(keyId: number) => fetchUpdateSelected([keyId])}
                                            >
                                                <common-element-draggable
                                                    class="flex flex-col overflow-hidden"
                                                    handle=".cursor-move"
                                                    animation={200}
                                                    v-model={faseNode.value.list}
                                                >
                                                    {(faseNode.value.list ?? []).map((item: Omix) => (
                                                        <n-radio class="chunk-block-element" key={item.keyId} value={item.keyId}>
                                                            <div class="flex items-center p-inline-7 cursor-move overflow-hidden">
                                                                <n-icon size={16} color="var(--primary-color)">
                                                                    <Grid />
                                                                </n-icon>
                                                            </div>
                                                            <div title={item.name} class="flex-1 overflow-hidden">
                                                                {item.name}
                                                            </div>
                                                            <div class="flex items-center p-inline-7 overflow-hidden" title="编辑角色">
                                                                <common-element-button
                                                                    {...{ text: true, iconSize: 16, icon: 'nest-settings' }}
                                                                    onClick={(e: MouseEvent) => fetchDeployUpdateSystemRole(e, item)}
                                                                ></common-element-button>
                                                            </div>
                                                        </n-radio>
                                                    ))}
                                                </common-element-draggable>
                                            </n-radio-group>
                                        )}
                                    </div>
                                    <div class="flex flex-col p-inline-14 overflow-hidden">
                                        <n-h4 class="line-height-21 m-0 p-block-14">部门角色</n-h4>
                                        <n-tree
                                            block-line
                                            cancelable={false}
                                            key-field="keyId"
                                            label-field="name"
                                            children-field="children"
                                            selected-keys={faseState.selectedKeys}
                                            expanded-keys={faseState.expandedKeys}
                                            data={faseNode.value.dept ?? []}
                                            render-switcher-icon={() => h(SendFilled)}
                                            on-update:selected-keys={fetchUpdateSelected}
                                            on-update:expanded-keys={fetchUpdateExpanded}
                                        />
                                    </div>
                                </n-element>
                            </n-scrollbar>
                        </common-element-spiner>
                    </n-card>
                </n-layout-sider>
                <n-layout class="bg-transparent" content-class="flex flex-col flex-1 p-14 overflow-hidden">
                    <n-card class="flex-1 overflow-hidden" content-class="flex flex-col flex-1 p-0! overflow-hidden">
                        <common-element-spiner opacity={0} loading={faseState.initialize}>
                            <n-tabs
                                animated
                                type="line"
                                default-value="account"
                                class="chunk-wrapper h-full overflow-hidden"
                                v-model:value={faseState.active}
                            >
                                <n-tab-pane name="account" tab="关联账号" display-directive="if">
                                    {!faseState.initialize && faseState.selectedKeys.length > 0 && (
                                        <deploy-system-role-account
                                            active={faseState.active}
                                            role-id={faseState.selectedKeys[0]}
                                        ></deploy-system-role-account>
                                    )}
                                </n-tab-pane>
                                <n-tab-pane name="sheet" tab="关联权限" display-directive="show:lazy">
                                    Hey Jude
                                </n-tab-pane>
                                <n-tab-pane name="model" tab="数据权限" display-directive="show:lazy">
                                    七里香
                                </n-tab-pane>
                            </n-tabs>
                        </common-element-spiner>
                    </n-card>
                </n-layout>
            </n-layout>
        )
    }
})
</script>

<style lang="scss" scoped>
.chunk-wrapper.n-tabs {
    --n-tab-padding: 14px 0;
    --n-tab-gap: 24px;
    position: relative;
    :deep(.n-tabs-wrapper) {
        padding-inline-start: 14px;
        padding-inline-end: 14px;
    }
    :deep(.n-tabs-pane-wrapper) {
        position: relative;
        overflow: hidden;
        flex: 1;
    }
    :deep(.n-tab-pane) {
        position: absolute;
        inset: 0;
        overflow: hidden;
        padding: 0;
    }
}
.chunk-block.n-radio-group {
    --chunk-block-height: 36px;
    --chunk-block-line-height: 30px;
    position: relative;
    :deep(.n-radio__dot-wrapper) {
        display: none;
    }
    :deep(.n-radio__label) {
        width: 100%;
        display: flex;
        padding-inline-start: 0;
        padding-inline-end: 0;
        height: var(--chunk-block-line-height);
        line-height: var(--chunk-block-line-height);
        border-radius: var(--border-radius-small);
        transition: background-color 0.3s var(--n-bezier);
    }
    :deep(.chunk-block-element) {
        height: var(--chunk-block-height);
        padding-block-start: 3px;
        padding-block-end: 3px;
        box-sizing: border-box;
        &:hover .n-radio__label {
            background-color: var(--hover-color);
        }
        &:has(.n-radio__dot--checked) .n-radio__label {
            background-color: color-mix(in srgb, var(--primary-color) 10%, transparent);
        }
    }
}
</style>
