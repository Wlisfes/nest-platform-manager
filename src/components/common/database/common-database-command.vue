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
                <n-button type="primary" text>
                    编辑
                </n-button>
                <n-button type="error" text>
                    删除
                </n-button>
            </div>
        )
    }
})
</script>
