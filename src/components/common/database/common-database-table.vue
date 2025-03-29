<script lang="tsx">
import { defineComponent, computed, nextTick, PropType } from 'vue'
import { DataTableColumn, PaginationInfo } from 'naive-ui'
import { useVModels } from '@vueuse/core'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonDatabaseTable',
    emits: ['update:page', 'update:size', 'update:columns', 'update:rowKeys', 'update:rowNodes', 'update:checked'],
    props: {
        /**开启设置列**/
        settings: { type: Boolean, default: true },
        /**开启操列**/
        command: { type: Boolean, default: false },
        /**是否固定操作列、设置列**/
        fixed: { type: String as PropType<'right' | 'left'> },
        /**操作列是否居中**/
        fixedCenter: { type: Boolean, default: false },
        /**操作列、设置列默认宽度**/
        fixedWidth: { type: Number },
        /**表格size**/
        elementSize: { type: String, default: 'medium' },
        /**开启分页**/
        pagination: { type: Boolean, default: false },
        /**分页数**/
        page: { type: Number, default: 1 },
        /**分页大小**/
        size: { type: Number, default: 20 },
        /**总条数**/
        total: { type: Number, default: 0 },
        /**被选中的行的keyId列表**/
        rowKeys: { type: Array as PropType<Array<string>>, default: () => [] },
        /**被选中的行的对象列表**/
        rowNodes: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**表头配置**/
        columns: { type: Array as PropType<Array<Omix<DataTableColumn>>>, default: () => [] },
        /**表数据列表**/
        data: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**分页跳转**/
        showQuickJumper: { type: Boolean, default: false },
        /**分页条数列表**/
        showSizePicker: { type: Boolean, default: true }
    },
    setup(props, { emit, slots }) {
        const { columns, page, size, total, rowKeys, rowNodes } = useVModels(props)

        /**表头列数据**/
        const faseColumns = computed(() => {
            return fetchBaseColumns().map((item: Omix, index) => {
                if (props.settings && !props.command && index === columns.value.length - 1) {
                    /**未开启操作列且开启设置列的时候需要把设置列前一个字段合并单元格**/
                    const cols = (item.colSpan ?? (() => 1))() + 1
                    return { ...item, align: 'left', colSpan: () => cols }
                }
                return item
            })
        })

        /**默认操作列、设置列配置**/
        function fetchBaseColumns() {
            if (!props.command && props.settings) return columns.value
            return utils.concat(columns.value, {
                key: (props.command && props.settings) || props.command ? 'command' : 'settings',
                width: (props.command && props.settings) || props.command ? props.fixedWidth ?? 126 : 46,
                center: props.fixedCenter,
                fixed: props.fixed,
                title: () => (
                    <common-database-settings
                        settings={props.settings}
                        command={props.command}
                        fixed-center={props.fixedCenter}
                    ></common-database-settings>
                )
            })
        }

        /**选择列事件**/
        async function fetchUpdateChecked(keys: Array<string>, items: Array<Omix>) {
            rowKeys.value = keys
            rowNodes.value = items
            return await nextTick().then(() => {
                return emit('update:checked', keys, items)
            })
        }

        /**节点渲染**/
        function fetchColumnContentRender(value: any, data: Omix, base: Omix<DataTableColumn>) {
            if (utils.isNotEmpty(slots[base.key])) {
                if (['command'].includes(base.key)) {
                    return slots.command!(data, base)
                }
                return slots[base.key]!(value, data, base)
            } else if (slots.default) {
                return slots.default(value, data, base)
            } else if (utils.isEmpty(value)) {
                return <span>-</span>
            }
            return value
        }

        return () => (
            <n-data-table
                class="common-database-table"
                remote
                row-key={(row: Omix) => row.keyId}
                columns={faseColumns.value}
                size={props.elementSize}
                data={props.data}
                render-cell={fetchColumnContentRender}
                on-update:checked-row-keys={fetchUpdateChecked}
                pagination={utils.fetchWhere<boolean | Omix>(!props.pagination, false, {
                    suffix: utils.fetchWhere(props.showQuickJumper, () => <span>页</span>),
                    goto: () => <span>前往</span>,
                    prefix: () => <span>{`共 ${total.value} 条`}</span>,
                    label: (data: Omix<{ node: number; active: boolean }>) => (
                        <n-button size="small" secondary type={data.active ? 'primary' : undefined}>
                            {data.node}
                        </n-button>
                    ),
                    prev: (data: Omix<PaginationInfo>) => (
                        <n-button size="small" secondary disabled={data.page <= 1}>
                            上一页
                        </n-button>
                    ),
                    next: (data: Omix<PaginationInfo>) => (
                        <n-button size="small" secondary disabled={data.page >= data.pageCount}>
                            下一页
                        </n-button>
                    ),
                    showQuickJumper: props.showQuickJumper,
                    showSizePicker: props.showSizePicker,
                    itemCount: total.value,
                    page: page.value,
                    pageSize: size.value,
                    pageSizes: [10, 20, 30, 50, 100],
                    onChange: (value: number) => (page.value = value),
                    onUpdatePageSize: (value: number) => (size.value = value)
                })}
            ></n-data-table>
        )
    }
})
</script>

<style lang="scss" scoped>
.n-data-table.common-database-table {
    :deep(.n-data-table-td.n-data-table-td--last-row) {
        border-bottom-width: 1px;
    }
    :deep(.n-data-table__pagination .n-pagination-item) {
        border: none;
        padding: 0;
    }
}
</style>
