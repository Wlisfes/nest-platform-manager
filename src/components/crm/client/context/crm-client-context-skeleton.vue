<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CrmClientContextSkeleton',
    props: {
        /**线索骨架屏**/
        initialize: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => (
            <common-element-skeleton loading={props.initialize} v-slots={{ render: slots.default }}>
                <div></div>
            </common-element-skeleton>
        )
    }
})
</script>
