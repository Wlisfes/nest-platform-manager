<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'CrmClientContextBasicWrapper',
    emits: ['update:faseNode'],
    props: {
        /**字段描述样式**/
        labelClass: { type: String, default: 'w-70' },
        /**客户详情信息**/
        faseNode: { type: Object as PropType<Omix>, default: () => ({}) },
        /**枚举对象信息**/
        chunkState: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { faseNode } = useVModels(props, emit)

        const columns = computed(() => {
            return [
                { label: '客户名称：', vague: faseNode.value.name },
                {
                    label: '客户类型：',
                    render: () => (
                        <common-database-table-chunk
                            element="content"
                            value={faseNode.value.classType}
                            options={props.chunkState.CHUNK_CLIENT_CLASS}
                        ></common-database-table-chunk>
                    )
                },
                { label: '品牌：', vague: faseNode.value.brandOptions?.name },
                { label: '邮箱：', vague: faseNode.value.email },
                { label: '电话号码：', vague: faseNode.value.phone },
                { label: '客户别名：', vague: faseNode.value.alias },
                {
                    label: '归属人：',
                    render: () => (
                        <common-database-table-user element="text" data={faseNode.value.accountOptions}></common-database-table-user>
                    )
                },
                { label: '归属部门：', vague: faseNode.value.deptOptions?.deptName },
                { label: '当前等级：', vague: faseNode.value.level },
                {
                    label: '当前阶段：',
                    render: () => (
                        <common-database-table-chunk
                            element="content"
                            value={faseNode.value.stage}
                            options={props.chunkState.CHUNK_CLIENT_STAGE}
                        ></common-database-table-chunk>
                    )
                },
                { label: '币种：', vague: faseNode.value.currency },
                {
                    label: '认证状态：',
                    render: () => (
                        <common-database-table-chunk
                            element="content"
                            value={faseNode.value.authStatus}
                            options={props.chunkState.CHUNK_CLIENT_AUTH_STATUS}
                        ></common-database-table-chunk>
                    )
                },
                {
                    label: '注册来源：',
                    render: () => (
                        <common-database-table-chunk
                            element="content"
                            value={faseNode.value.source}
                            options={props.chunkState.CHUNK_CLIENT_SOURCE}
                        ></common-database-table-chunk>
                    )
                },
                {
                    label: '付款模式：',
                    render: () => (
                        <common-database-table-chunk
                            element="content"
                            value={faseNode.value.payMode}
                            options={props.chunkState.CHUNK_CLIENT_PAY_MODE}
                        ></common-database-table-chunk>
                    )
                },
                { label: '信用额度：', vague: faseNode.value.credit }
            ]
        })

        return () => (
            <common-element-scrollbar class="crm-client-context-basic-wrapper">
                <common-element is-white class="flex flex-col flex-1 p-14 overflow-hidden">
                    <div class="flex flex-col overflow-hidden">
                        <common-business-header bar title="基本信息"></common-business-header>
                        <common-element-columns-template class="gap-y-10 gap-x-20 p-inline-10 p-block-10" type="auto-fit" number={400}>
                            {columns.value.map((col: Omix, index: number) => (
                                <common-element-columns-wrapper key={index} label-class={props.labelClass} label={col.label}>
                                    {col.render ? col.render() : (col.vague ?? '-')}
                                </common-element-columns-wrapper>
                            ))}
                        </common-element-columns-template>
                    </div>
                </common-element>
            </common-element-scrollbar>
        )
    }
})
</script>
