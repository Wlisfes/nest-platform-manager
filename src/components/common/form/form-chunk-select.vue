<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FormChunkSelect',
    props: {
        /**选项label的字段名**/
        labelField: { type: String, default: 'name' },
        /**选项value的字段名**/
        labelValue: { type: String, default: 'value' }
    },
    setup(props) {
        return () => <n-select class="form-chunk-select" label-field={props.labelField} value-field={props.labelValue}></n-select>
    }
})
</script>
