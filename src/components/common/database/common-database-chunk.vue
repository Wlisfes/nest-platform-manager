<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { isEmpty } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonDatabaseChunk',
    inheritAttrs: false,
    props: {
        /**渲染类型**/
        element: { type: String as PropType<'chunk' | 'text' | 'icon'>, default: 'chunk' },
        /**icon图标渲染**/
        iconSize: { type: Number, default: 0 },
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
                    <span class="common-database-chunk-text">{isEmpty(props.content) ? '-' : props.content}</span>
                ) : props.element === 'icon' ? (
                    <div class="common-database-chunk-icon flex items-center justify-center">
                        {isEmpty(props.content) ? (
                            <span>-</span>
                        ) : (
                            <n-button text focusable={false}>
                                <common-element-icon size={props.iconSize} name={props.content}></common-element-icon>
                            </n-button>
                        )}
                    </div>
                ) : (
                    <n-tag class="common-database-chunk" bordered={props.bordered} type={props.json.type || undefined}>
                        {props.content}
                    </n-tag>
                )}
            </Fragment>
        )
    }
})
</script>
