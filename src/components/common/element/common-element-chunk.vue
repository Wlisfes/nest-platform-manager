<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { isEmpty } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonElementChunk',
    inheritAttrs: false,
    props: {
        /**内容渲染**/
        content: { type: Boolean, default: false },
        /**icon图标渲染**/
        iconSize: { type: Number, default: 0 },
        /**标签名称**/
        name: { type: String },
        /**标签边框**/
        bordered: { type: Boolean, default: false },
        /**标签配置**/
        json: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { slots }) {
        return () => (
            <Fragment>
                {slots.default ? (
                    slots.default(props.name, props.json)
                ) : props.content ? (
                    <span class="common-element-chunk-content">{isEmpty(props.name) ? '-' : props.name}</span>
                ) : props.iconSize > 0 ? (
                    <div class="common-element-chunk-icon flex items-center justify-center">
                        {isEmpty(props.name) ? '-' : <common-icon size={props.iconSize} name={props.name}></common-icon>}
                    </div>
                ) : (
                    <n-tag class="common-element-chunk" bordered={props.bordered} type={props.json.type || undefined}>
                        {props.name}
                    </n-tag>
                )}
            </Fragment>
        )
    }
})
</script>
