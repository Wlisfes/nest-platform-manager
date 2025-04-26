<script lang="tsx">
import { defineComponent } from 'vue'
import { stop } from '@/utils/utils-common'

export default defineComponent({
    name: 'FormChunkStatusSelect',
    props: {
        /**选项label的字段名**/
        labelField: { type: String, default: 'name' },
        /**选项value的字段名**/
        labelValue: { type: String, default: 'value' }
    },
    setup(props) {
        /**自定义渲染tag**/
        function fetchCustomLabelRender(data: Omix) {
            return (
                <div class="flex items-center">
                    <n-tag bordered={false} type={data.json?.type} onMousedown={(e: FocusEvent) => stop(e)}>
                        {data[props.labelField]}
                    </n-tag>
                </div>
            )
        }

        /**自定义渲染tag**/
        function fetchCustomTagRender(data: Omix<{ option: Omix; handleClose: Function }>) {
            return (
                <n-tag
                    bordered={false}
                    type={data.option.json?.type}
                    onMousedown={(e: FocusEvent) => stop(e)}
                    onClose={(e: MouseEvent) => stop(e, data.handleClose)}
                >
                    {data.option[props.labelField]}
                </n-tag>
            )
        }

        return () => (
            <n-select
                label-field={props.labelField}
                value-field={props.labelValue}
                render-label={fetchCustomLabelRender}
                render-tag={fetchCustomTagRender}
            ></n-select>
        )
    }
})
</script>
