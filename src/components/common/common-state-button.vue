<script lang="tsx">
import { defineComponent, PropType, VNode } from 'vue'
import { IconProps } from 'naive-ui'
import { isNotEmpty } from 'class-validator'

export default defineComponent({
    name: 'CommonStateButton',
    props: {
        icon: { type: Object as PropType<VNode> },
        iconProps: { type: Object as PropType<IconProps>, default: () => ({}) }
    },
    setup(props, { slots }) {
        function fetchIconRender() {
            if (isNotEmpty(props.icon)) {
                return <n-icon component={props.icon} {...props.iconProps}></n-icon>
            }
            return null
        }

        return () => (
            <n-button class="common-state-button" style={{ '--n-padding': '0 12px', '--n-icon-margin': '4px' }} focusable={false}>
                {{ icon: fetchIconRender, default: slots.default }}
            </n-button>
        )
    }
})
</script>
