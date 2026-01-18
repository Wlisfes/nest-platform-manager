<script lang="tsx">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'CommonDatabaseTableSettings',
    emits: ['update:data', 'update:width'],
    props: {
        /**列设置**/
        showSettings: { type: Boolean, default: false },
        /**自定义宽度**/
        width: { type: Number, default: 46 },
        /**表数据列表**/
        data: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, { emit, slots }) {
        return () => (
            <div class="common-database-table-settings flex items-center justify-center">
                <common-element-button
                    style={{ '--n-icon-size': '22px' }}
                    text
                    icon={<common-element-icon size={22} name="nest-settings"></common-element-icon>}
                ></common-element-button>
            </div>
        )
    }
})
</script>
