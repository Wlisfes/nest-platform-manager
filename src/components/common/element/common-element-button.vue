<script lang="tsx">
import { defineComponent, h, PropType, VNode } from 'vue'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonElementButton',
    props: {
        /**是否表格操作按钮**/
        database: { type: Boolean, default: false },
        /**图标名称、图标节点**/
        icon: { type: [String, Object] as PropType<string | VNode> },
        /**图标size**/
        iconSize: { type: Number, default: 18 },
        /**按钮文案**/
        content: { type: [String, Object] as PropType<string | VNode> }
    },
    setup(props, { slots }) {
        /**渲染图标**/
        function fetchIconRender() {
            if (utils.isEmpty(props.icon)) {
                return null
            } else if (utils.isString(props.icon)) {
                return <common-element-icon size={props.iconSize} name={props.icon}></common-element-icon>
            }
            return h(props.icon as VNode)
        }

        function fetchContentRender() {
            return slots.default ? slots.default() : props.content
        }

        return () => (
            <n-button class={{ 'common-element-button': true, 'element-database': props.database }} focusable={false}>
                {{ icon: utils.isEmpty(props.icon) ? undefined : fetchIconRender, default: fetchContentRender }}
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-element-button.element-database {
    --n-icon-margin: 3px;
}
</style>
