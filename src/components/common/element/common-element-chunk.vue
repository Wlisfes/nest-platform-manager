<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { isEmpty } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonElementChunk',
    inheritAttrs: false,
    props: {
        /**渲染类型**/
        element: { type: String as PropType<'chunk' | 'text' | 'icon'>, default: 'chunk' },
        /**icon图标渲染**/
        iconSize: { type: Number, default: 0 },
        /**icon图标按钮类型**/
        iconType: { type: String },
        /**文本内容**/
        content: { type: String },
        /**标签边框**/
        bordered: { type: Boolean, default: false },
        /**标签配置**/
        json: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { slots }) {
        return () => (
            <Fragment>
                {slots.default ? (
                    slots.default(props.content, props.json)
                ) : props.element === 'text' ? (
                    <span class="common-element-chunk-content">{isEmpty(props.content) ? '-' : props.content}</span>
                ) : props.element === 'icon' ? (
                    <div class="common-element-chunk-icon flex items-center justify-center">
                        {isEmpty(props.content) ? (
                            <span>-</span>
                        ) : (
                            <n-button text focusable={false} props={props.iconType}>
                                <common-icon size={props.iconSize} name={props.content}></common-icon>
                            </n-button>
                        )}
                    </div>
                ) : (
                    <n-tag class="common-element-chunk" bordered={props.bordered} type={props.json.type || undefined}>
                        {props.content}
                    </n-tag>
                )}
            </Fragment>
        )
    }
})
</script>
