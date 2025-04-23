<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'CommonDatabaseCompute',
    emits: ['refresh', 'checkboxs', 'update:full', 'update:loading', 'update:columns', 'update:checkboxs'],
    props: {
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
                <div class="flex items-center">
                    <common-element-button class="h-full p-inline-8" text disabled={loading.value} onClick={() => emit('refresh')}>
                        <common-element-icon size={22} name="nest-refresh"></common-element-icon>
                    </common-element-button>
                    <n-divider class="m-0!" vertical />
                    <common-database-element-size></common-database-element-size>
                    <n-divider class="m-0!" vertical />
                    <common-database-settings
                        v-model:columns={columns.value}
                        onCheckboxs={(s: Array<Omix<DataTableColumn>>) => emit('checkboxs', s)}
                    ></common-database-settings>
                    <n-divider class="m-0!" vertical />
                    <common-element-button class="h-full p-inline-8" text onClick={props.toggle}>
                        <common-element-icon size={22} name={full.value ? 'nest-shrink' : 'nest-screen'}></common-element-icon>
                    </common-element-button>
                </div>
            </n-element>
        )
    }
})
</script>
