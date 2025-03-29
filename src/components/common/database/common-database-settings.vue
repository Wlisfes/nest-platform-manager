<script lang="tsx">
import { defineComponent } from 'vue'
import { isEmpty } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonDatabaseSettings',
    props: {
        /**开启设置列**/
        settings: { type: Boolean, default: true },
        /**开启操列**/
        command: { type: Boolean, default: false },
        /**是否居中**/
        fixedCenter: { type: Boolean, default: false }
    },
    setup(props, ctx) {
        return () => (
            <div class="common-database-settings h-full flex items-center overflow-hidden" style={{ columnGap: 'var(--n-th-padding)' }}>
                {props.command && <div class={{ 'flex-1 overflow-hidden': true, 'text-center': props.fixedCenter }}>操作</div>}
                {props.settings && (
                    <n-button text>
                        <common-element-icon size={22} name="nest-settings"></common-element-icon>
                    </n-button>
                )}
            </div>
        )
    }
})
</script>
