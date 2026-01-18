<script lang="tsx">
import { defineComponent, ref, computed, nextTick, PropType } from 'vue'
import { fetchWherer, isNotEmpty, isEmpty, concat } from '@/utils'
import { DataTableColumn, PaginationInfo } from 'naive-ui'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'CommonDatabaseTable',
    emits: ['update:page', 'update:size', 'update:loading', 'update:data', 'update:select', 'update:items'],
    props: {
        /**分页数**/
        page: { type: Number, default: 1 },
        /**分页大小**/
        size: { type: Number, default: 50 },
        /**总条数**/
        total: { type: Number, default: 0 },
        /**加载状态**/
        loading: { type: Boolean, default: true },
        /**开启分页**/
        pagination: { type: Boolean, default: true },
        /**开启边框**/
        bordered: { type: Boolean, default: true },
        /**被选中的行的对象列表**/
        select: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**表头配置自定义排版规则**/
        items: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**表数据列表**/
        data: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**表头配置**/
        columns: { type: Array as PropType<Array<Omix<DataTableColumn>>>, default: () => [] },
        /**分页跳转**/
        showQuickJumper: { type: Boolean, default: false },
        /**分页条数列表**/
        showSizePicker: { type: Boolean, default: true },
        /**列设置**/
        showSettings: { type: Boolean, default: false },
        /**操作设置**/
        showCommand: { type: Boolean, default: false }
    },
    setup(props, { emit, slots }) {
        const headerRef = ref<Omix<{ $el: HTMLElement }>>()
        const tableRef = ref<HTMLElement>()
        const { data, page, size, loading, select, items } = useVModels(props)
        /**表头配置**/
        const columns = computed(() => {
            // return columns.value.filter(item => item.check)

            return fetchBaseColumns(props.columns)
        })
        /**表头列数据**/
        const faseColumns = computed(() => {
            // return fetchBaseColumns().map((item: Omix, index) => {
            //     if (props.settings && !props.command && index === columns.value.length - 1) {
            //         /**未开启操作列且开启设置列的时候需要把设置列前一个字段合并单元格**/
            //         const cols = (item.colSpan ?? (() => 1))() + 1
            //         return { ...item, align: 'left', colSpan: () => cols }
            //     }
            //     return item
            // })
        })

        /**默认操作列、设置列配置**/
        function fetchBaseColumns(columns: Array<Omix<DataTableColumn>>) {
            return concat(columns, [
                {
                    title: '操作',
                    key: 'command',
                    fixed: 'right'
                    //width: 46
                }
            ])

            // if (!props.command && props.settings) {
            //     return utils.concat(columns.value, {
            //         key: 'settings',
            //         width: 46,
            //         fixed: props.fixed,
            //         title: () => (
            //             <n-element class="flex items-center justify-center">
            //                 <common-element-button
            //                     text
            //                     icon={<common-element-icon size={22} name="nest-settings"></common-element-icon>}
            //                 ></common-element-button>
            //             </n-element>
            //         )
            //     })
            // }
            // return utils.concat(columns.value, {
            //     key: (props.command && props.settings) || props.command ? 'command' : 'settings',
            //     width: (props.command && props.settings) || props.command ? props.fixedWidth ?? 110 : 46,
            //     center: props.fixedCenter,
            //     fixed: props.fixed,
            //     title: () => (
            //         <n-element class="flex items-center overflow-hidden" style={{ columnGap: 'var(--n-th-padding)' }}>
            //             {props.command && <div class={{ 'flex-1 overflow-hidden': true, 'text-center': props.fixedCenter }}>操作</div>}
            //             {props.settings && (
            //                 <common-element-button
            //                     text
            //                     icon={<common-element-icon size={22} name="nest-settings"></common-element-icon>}
            //                 ></common-element-button>
            //             )}
            //         </n-element>
            //     )
            // })
        }
        /**选择列事件**/
        async function fetchUpdateSelecter(keys: Array<string>, data: Array<Omix>) {
            return await nextTick(() => (select.value = data)).then(() => {
                return emit('update:select', select.value)
            })
        }
        /**节点渲染**/
        function fetchCellRender(value: any, data: Omix, base: Omix<DataTableColumn>) {
            if (isNotEmpty(base.key) && isNotEmpty(slots[`col_${base.key}`])) {
                if (['command'].includes(base.key)) {
                    return slots[`col_${base.key}`]?.(value, data, base)
                }

                return slots[`col_${base.key}`]?.(value, data, base)
            } else if (isEmpty(value)) {
                return <span>-</span>
            }
            return <n-ellipsis tooltip={{ scrollable: true, style: { maxWidth: '540px', maxHeight: '540px' } }}>{value}</n-ellipsis>
        }

        return () => (
            <n-element
                class="common-database-container flex flex-col flex-1 overflow-hidden"
                style={{ padding: 'var(--common-limit-width)' }}
            >
                <n-card class="flex flex-col flex-1 overflow-hidden" content-class="flex flex-col flex-1 overflow-hidden p-0!">
                    <n-element class="common-database-table flex flex-col flex-1 overflow-hidden">
                        {slots.default && (
                            <n-element ref={headerRef} class="flex flex-col line-height-22 overflow-hidden">
                                {slots.default && slots.default()}
                            </n-element>
                        )}
                        <div ref={tableRef} class="common-database-table-container flex flex-col flex-1 overflow-hidden">
                            <n-data-table
                                remote
                                flex-height
                                size="small"
                                row-key={(e: Omix) => e.keyId}
                                loading={loading.value}
                                scroll-x={0}
                                bordered={props.bordered}
                                data={data.value}
                                columns={columns.value}
                                style={{ flex: 1 }}
                                scrollbar-props={{ size: 100 }}
                                render-cell={fetchCellRender}
                                on-update:checked-row-keys={fetchUpdateSelecter}
                            ></n-data-table>
                        </div>
                    </n-element>
                    {props.pagination && (
                        <n-element class="common-database-pagination flex justify-end">
                            <n-pagination
                                page={page.value}
                                item-count={props.total}
                                page-size={size.value}
                                v-model:page={page.value}
                                page-sizes={[20, 30, 50, 100, 200, 300]}
                                show-size-picker={props.showSizePicker}
                                show-quick-jumper={props.showQuickJumper}
                                on-update:page={(value: number) => (page.value = value)}
                                on-update:page-size={(value: number) => (size.value = value)}
                            >
                                {{
                                    uffix: fetchWherer(props.showQuickJumper, () => <span>页</span>),
                                    goto: () => <span>前往</span>,
                                    prefix: () => <span class="whitespace-nowrap">{`共 ${props.total} 条`}</span>,
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
                                    )
                                }}
                            </n-pagination>
                        </n-element>
                    )}
                </n-card>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-database-container {
    position: relative;
    padding: var(--common-limit-width);
    .n-element.common-database-table {
        padding: var(--common-limit-width);
        overflow: hidden;
        :deep(.n-data-table-loading-wrapper) {
            font-size: 48px;
        }
        :deep(.n-data-table-td):has(.n-data-table-expand-trigger) {
            display: flex;
            align-items: center;
        }
    }
    .n-element.common-database-pagination {
        transition: border-color 0.3s var(--n-bezier);
        padding: 0 var(--common-limit-width) var(--common-limit-width);
        overflow: hidden;
        :deep(.n-pagination > .n-pagination-item) {
            border: none;
            padding: 0;
        }
    }
}
</style>
