<script lang="tsx">
import { defineComponent, computed, nextTick, PropType } from 'vue'
import { DataTableColumn, PaginationInfo } from 'naive-ui'
import { useVModels } from '@vueuse/core'
import { useConfiger } from '@/store'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonDatabaseTable',
    emits: ['update:page', 'update:size', 'update:columns', 'update:rowKeys', 'update:rowNodes', 'update:checked'],
    props: {
        /**表格是否自动分页数据，在异步的状况下你可能需要把它设为 true**/
        remote: { type: Boolean, default: true },
        /**是否让表格主体的高度自动适应整个表格区域的高度**/
        flexHeight: { type: Boolean, default: true },
        /**开启分页**/
        pagination: { type: Boolean, default: false },
        /**分页数**/
        page: { type: Number, default: 1 },
        /**分页大小**/
        size: { type: Number, default: 20 },
        /**总条数**/
        total: { type: Number, default: 0 },
        /**表格内容的横向宽度**/
        scrollX: { type: Number },
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
        const configer = useConfiger()
        const { columns, page, size, total, rowKeys, rowNodes } = useVModels(props)
        /**表头列数据**/
        const faseColumns = computed(() => columns.value.filter(item => item.checked))
        /**表格内容的横向宽度**/
        const width = computed<number>(() => {
            if (utils.isNotEmpty(props.scrollX)) {
                return Number(props.scrollX)
            }
            return faseColumns.value.reduce((num, next) => num + Number(next.width ?? 0), 40)
        })

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
                /**字段命名插槽**/
                if (['command'].includes(base.key)) {
                    return slots.command!(data, base)
                }
                return slots[base.key]!(value, data, base)
            } else if (slots.default) {
                /**默认插槽**/
                return slots.default(value, data, base)
            } else if (utils.isEmpty(value)) {
                return <span>-</span>
            }
            return value
        }

        return () => (
            <n-data-table
                class="common-database-table"
                row-key={(row: Omix) => row.keyId}
                columns={faseColumns.value}
                size={configer.elementSize}
                flex-height={props.flexHeight}
                remote={props.remote}
                data={props.data}
                scroll-x={width.value}
                checked-row-keys={rowKeys.value}
                default-checked-row-keys={rowKeys.value}
                render-cell={fetchColumnContentRender}
                on-update:checked-row-keys={fetchUpdateChecked}
                pagination={utils.fetchWhere<boolean | Omix>(!props.pagination, false, {
                    suffix: utils.fetchWhere(props.showQuickJumper, () => <span>页</span>),
                    goto: () => <span>前往</span>,
                    prefix: () => <span>{`共 ${total.value} 条`}</span>,
                    label: (data: Omix<{ node: number; active: boolean }>) => (
                        <common-element-button size="small" secondary type={data.active ? 'primary' : undefined}>
                            {data.node}
                        </common-element-button>
                    ),
                    prev: (data: Omix<PaginationInfo>) => (
                        <common-element-button size="small" secondary disabled={data.page <= 1}>
                            上一页
                        </common-element-button>
                    ),
                    next: (data: Omix<PaginationInfo>) => (
                        <common-element-button size="small" secondary disabled={data.page >= data.pageCount}>
                            下一页
                        </common-element-button>
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
