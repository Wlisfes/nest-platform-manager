<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'CommonElement',
    props: {
        /**卡片容器样式**/
        className: { type: String, default: '' },
        /**开启边框**/
        border: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => (
            <Fragment>
                <n-card
                    content-class={props.className}
                    bordered={props.border}
                    style={{ '--n-padding-left': '0px', '--n-padding-bottom': '0px', '--n-border-radius': '0px' }}
                >
                    {slots}
                </n-card>
            </Fragment>
        )
    }
})
</script>
