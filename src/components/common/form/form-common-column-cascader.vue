<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FormCommonColumnCascader',
    props: {
        /**选项label的字段名**/
        labelField: { type: String, default: 'name' },
        /**选项value的字段名**/
        labelValue: { type: String, default: 'keyId' }
    },
    setup(props) {
        return () => (
            <n-cascader class="form-common-column-cascader" label-field={props.labelField} value-field={props.labelValue}></n-cascader>
        )
    }
})
</script>
