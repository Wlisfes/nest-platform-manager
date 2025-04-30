<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'CommonDatabaseCompute',
    emits: ['refresh', 'checkboxs', 'update:full', 'update:loading', 'update:columns', 'update:checkboxs'],
    props: {
        /**展示操作**/
        keys: { type: Array as PropType<Array<string>>, default: () => [] },
        /**开启全屏**/
        full: { type: Boolean, default: false },
        /**全屏方法**/
        toggle: { type: Function, default: () => false },
        /**左侧容器样式**/
        elementClass: { type: String, default: '' },
        /**加载中**/
        loading: { type: Boolean, default: false },
        /**表头配置**/
        columns: { type: Array as PropType<Array<Omix<DataTableColumn>>>, default: () => [] }
    },
    setup(props, { slots, emit }) {
        const { full, loading, columns } = useVModels(props)

        return () => (
            <n-element class="flex gap-10">
                <n-element class={`flex flex-1 gap-10 ${props.elementClass}`}>{slots.default && slots.default()}</n-element>
                {props.keys.length > 0 && (
                    <div class="flex items-center">
                        {props.keys.includes('refresh') && (
                            <common-element-button class="h-full p-inline-8" text disabled={loading.value} onClick={() => emit('refresh')}>
                                <common-element-icon size={22} name="nest-refresh"></common-element-icon>
                            </common-element-button>
                        )}
                        {props.keys.includes('size') && (
                            <Fragment>
                                <n-divider class="m-0!" vertical />
                                <common-database-element-size></common-database-element-size>
                            </Fragment>
                        )}
                        {props.keys.includes('settings') && (
                            <Fragment>
                                <n-divider class="m-0!" vertical />
                                <common-database-settings
                                    v-model:columns={columns.value}
                                    onCheckboxs={(s: Array<Omix<DataTableColumn>>) => emit('checkboxs', s)}
                                ></common-database-settings>
                            </Fragment>
                        )}
                        {props.keys.includes('full') && (
                            <Fragment>
                                <n-divider class="m-0!" vertical />
                                <common-element-button class="h-full p-inline-8" text onClick={props.toggle}>
                                    <common-element-icon size={22} name={full.value ? 'nest-shrink' : 'nest-screen'}></common-element-icon>
                                </common-element-button>
                            </Fragment>
                        )}
                    </div>
                )}
            </n-element>
        )
    }
})
</script>
