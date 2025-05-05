<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { isEmpty } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonDatabaseChunk',
    inheritAttrs: false,
    props: {
        /**渲染类型**/
        element: { type: String as PropType<'chunk' | 'text' | 'icon' | 'avatar'>, default: 'chunk' },
        /**icon图标渲染**/
        iconSize: { type: Number, default: 0 },
        /**文本内容**/
        content: { type: [String, Number] },
        /**头像地址**/
        url: { type: String },
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
                    <div class="common-database-chunk-text overflow-hidden">
                        {isEmpty(props.content) ? (
                            '-'
                        ) : (
                            <n-ellipsis tooltip={{ scrollable: true, style: { maxWidth: '540px', maxHeight: '540px' } }}>
                                {props.content}
                            </n-ellipsis>
                        )}
                    </div>
                ) : props.element === 'icon' ? (
                    <div class="common-database-chunk-icon flex items-center justify-center">
                        {isEmpty(props.content) ? (
                            <span>-</span>
                        ) : (
                            <common-element-button
                                text
                                icon={<common-element-icon size={props.iconSize} name={props.content}></common-element-icon>}
                            ></common-element-button>
                        )}
                    </div>
                ) : props.element === 'avatar' ? (
                    <div class="common-database-chunk-avatar flex items-center justify-center">
                        {isEmpty(props.url) ? (
                            <n-avatar size="medium" color="var(--primary-color)">
                                {String(props.content ?? '-').slice(0, 1)}
                            </n-avatar>
                        ) : (
                            <n-avatar size="medium" src={props.url}></n-avatar>
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
