<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonDatabaseCompute',
    emits: ['refresh'],
    props: {
        /**左侧容器样式**/
        elementClass: { type: String, default: '' },
        /**加载中**/
        loading: { type: Boolean, default: false }
    },
    setup(props, { slots, emit }) {
        return () => (
            <n-element class="flex gap-10">
                <n-element class={`flex flex-1 gap-10 ${props.elementClass}`}>{slots.default && slots.default()}</n-element>
                <div class="flex items-center p-inline-10">
                    <common-element-button class="h-full" text disabled={props.loading} onClick={() => emit('refresh')}>
                        <common-element-icon size={22} name="nest-refresh"></common-element-icon>
                    </common-element-button>
                    <n-divider class="m-inline-15" vertical />
                    <common-database-element-size></common-database-element-size>
                    <n-divider class="m-inline-15" vertical />
                    <common-database-settings></common-database-settings>
                    {/* <common-element-button text icon="nest-settings" icon-size={22}></common-element-button> */}
                </div>
            </n-element>
        )
    }
})
</script>
