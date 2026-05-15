<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonSkeletonBlock',
    props: {
        /**额外的类名**/
        className: { type: String, default: '' },
        /**内容节点的类名**/
        elementClass: { type: String, default: '' },
        /**是否显示为直角骨架**/
        sharp: { type: Boolean, default: false },
        /**是否显示为圆形骨架**/
        circle: { type: Boolean, default: false },
        /**是否显示为圆角骨架**/
        round: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class="common-skeleton-block relative overflow-hidden">
                <div class={`flex flex-col opacity-0 pointer-events-none ${props.elementClass}`}>{slots.default && slots.default()}</div>
                <div class={`flex flex-col absolute inset-0 w-full h-full overflow-hidden box-border ${props.className}`}>
                    <n-skeleton class="w-full h-full" sharp={props.sharp} circle={props.circle} round={props.round} />
                </div>
            </n-element>
        )
    }
})
</script>
