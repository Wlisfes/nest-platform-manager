<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonDatabaseSettings',
    emits: ['update:columns', 'update:checkboxs'],
    props: {
        /**表头配置**/
        columns: { type: Array as PropType<Array<Omix<DataTableColumn>>>, default: () => [] },
        /**表头复选配置**/
        checkboxs: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, ctx) {
        const { columns, checkboxs } = useVModels(props)
        const { state, setState } = useState({ visible: false, checked: false, checkboxs: [] })

        return () => (
            <common-element-popover
                style={{ padding: 0, '--v-offset-left': '-4px' }}
                v-model:visible={state.visible}
                on-update:show={(visible: boolean) => setState({ visible })}
            >
                {{
                    trigger: () => (
                        <div
                            class="common-database-settings h-full flex items-center overflow-hidden"
                            onClick={() => setState({ visible: true })}
                        >
                            <common-element-button text icon="nest-settings" icon-size={22}></common-element-button>
                        </div>
                    ),
                    default: () => (
                        <n-element class="w-220 flex flex-col overflow-hidden">
                            <div class="flex items-center p-inline-10 p-block-10">
                                <n-checkbox focusable={false} v-model:checked={state.checked}>
                                    列设置
                                </n-checkbox>
                            </div>
                            <n-divider style={{ margin: 0 }} />
                            <div class="flex flex-col p-block-10 overflow-hidden">
                                <n-scrollbar class="max-h-50vh" trigger="none">
                                    <div class="flex flex-col gap-10 overflow-hidden">
                                        {columns.value.map(item => (
                                            <div class="flex items-center overflow-hidden" key={item.key}>
                                                <div class="min-w-40 flex p-is-8 p-ie-10 box-border cursor-move">
                                                    <common-element-icon size={22} name="nest-mobile"></common-element-icon>
                                                </div>
                                                <n-checkbox focusable={false} v-model:checked={item.checked}>
                                                    <n-ellipsis class="max-w-140" tooltip={false}>
                                                        {item.title}
                                                    </n-ellipsis>
                                                </n-checkbox>
                                            </div>
                                        ))}
                                    </div>
                                </n-scrollbar>
                            </div>
                        </n-element>
                    )
                }}
            </common-element-popover>
        )
    }
})
</script>
