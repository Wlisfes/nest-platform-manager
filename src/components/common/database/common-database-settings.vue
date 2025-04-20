<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { isEmpty } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonDatabaseSettings',
    props: {
        /**表头配置**/
        columns: { type: Array as PropType<Array<Omix<DataTableColumn>>>, default: () => [] },
        /**表头复选配置**/
        checkboxs: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, ctx) {
        return () => (
            <div
                class="common-database-settings h-full flex items-center overflow-hidden"
                style={{ columnGap: 'var(--n-th-padding)' }}
            ></div>
        )
    }
})
</script>
