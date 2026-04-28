<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonElementColumnsTemplate',
    props: {},
    setup(props, { slots, emit }) {
        return () => <common-element class="common-element-columns-template"></common-element>
    }
})
</script>
