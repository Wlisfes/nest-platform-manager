<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { isEmpty } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonDatabaseCommand',
    props: {
        /**是否居中**/
        center: { type: Boolean, default: false }
    },
    setup(props, ctx) {
        return () => (
            <div class={{ 'common-database-command flex items-center gap-10': true, 'justify-center': props.center }}>
                <common-element-button type="primary" text>
                    编辑
                </common-element-button>
                <common-element-button type="error" text>
                    删除
                </common-element-button>
            </div>
        )
    }
})
</script>
