<script lang="tsx">
import { defineComponent, h, PropType, VNode } from 'vue'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonElementButton',
    props: {
        /**图标名称、图标节点**/
        icon: { type: [String, Object] as PropType<string | VNode> }
    },
    setup(props, { slots }) {
        /**渲染图标**/
        function fetchIconRender() {
            if (utils.isEmpty(props.icon)) {
                return null
            } else if (utils.isString(props.icon)) {
                return <common-element-icon name={props.icon}></common-element-icon>
            }
            return h(props.icon as VNode)
        }

        return () => (
            <n-button class="common-element-button" focusable={false}>
                {{ icon: utils.isEmpty(props.icon) ? undefined : fetchIconRender, default: slots.default }}
            </n-button>
        )
    }
})
</script>
