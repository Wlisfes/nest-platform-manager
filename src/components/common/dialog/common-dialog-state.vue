<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonDialogState',
    props: {
        /**前缀描述文案**/
        document: { type: String, default: '' },
        /**选择数量**/
        count: { type: Number, default: 0 }
    },
    setup(props, ctx) {
        return () => (
            <n-element class="common-dialog-state">
                <n-text depth="2">{`此操作将${props.document}`}</n-text>
                <n-text type="error" class="p-inline-5">
                    {props.count}
                </n-text>
                <n-text depth="2">条数据，是否继续？</n-text>
            </n-element>
        )
    }
})
</script>
