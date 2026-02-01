<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    props: {
        /**初始化状态**/
        initialize: { type: Boolean, default: true },
        /**折叠收缩配置**/
        when: { type: Boolean, default: true },
        /**边距值**/
        limit: { type: Number, default: 14 },
        /**根节点样式**/
        className: { type: String, default: '' }
    },
    setup(props, { emit, slots }) {
        return () => (
            <n-element
                class="layout-common-container flex flex-col flex-1 overflow-hidden"
                style={{ '--common-limit-width': `${props.limit}px` }}
            >
                {props.initialize ? (
                    <Fragment>
                        <n-card class="flex flex-col overflow-hidden" content-style={{ padding: `var(--common-limit-width)` }}></n-card>
                    </Fragment>
                ) : (
                    <Fragment>{slots.default && slots.default()}</Fragment>
                )}
            </n-element>
        )
    }
})
</script>
