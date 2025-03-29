<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { isEmpty } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonElementCommand',
    setup(props, ctx) {
        return () => (
            <div class="common-element-command">
                <n-button type="primary" text>
                    小
                </n-button>
            </div>
        )
    }
})
</script>
