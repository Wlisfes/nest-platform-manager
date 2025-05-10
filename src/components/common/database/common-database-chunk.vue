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
        iconSize: { type: Number, default: 18 },
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
            <div class="common-database-chunk relative flex whitespace-nowrap overflow-hidden">
                {slots.default ? (
                    <Fragment>{slots.default(props.content, props.json)}</Fragment>
                ) : props.element === 'text' ? (
                    <div class="common-database-chunk-text flex-1 overflow-hidden">
                        {isEmpty(props.content) ? (
                            <span>-</span>
                        ) : (
                            <n-ellipsis tooltip={{ scrollable: true, style: { maxWidth: '540px', maxHeight: '540px' } }}>
                                {props.content}
                            </n-ellipsis>
                        )}
                    </div>
                ) : props.element === 'icon' ? (
                    <div class="common-database-chunk-icon flex items-center">
                        {isEmpty(props.content) ? (
                            <span>-</span>
                        ) : (
                            <common-element-button
                                text
                                style={{ '--n-icon-size': props.iconSize + 'px' }}
                                icon={<common-element-icon size={props.iconSize} name={props.content}></common-element-icon>}
                            ></common-element-button>
                        )}
                    </div>
                ) : props.element === 'avatar' ? (
                    <div class="common-database-chunk-avatar flex items-center">
                        {isEmpty(props.url) ? (
                            <n-avatar size="medium" color="var(--primary-color)">
                                {String(props.content ?? '-').slice(0, 1)}
                            </n-avatar>
                        ) : (
                            <n-avatar size="medium" src={props.url}></n-avatar>
                        )}
                    </div>
                ) : (
                    <n-tag class="common-database-chunk-tag" bordered={props.bordered} type={props.json.type || undefined}>
                        {props.content}
                    </n-tag>
                )}
            </div>
        )
    }
})
</script>
