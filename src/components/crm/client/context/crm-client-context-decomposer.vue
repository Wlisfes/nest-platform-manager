<script lang="tsx">
import { defineComponent } from 'vue'
import { Observer } from '@/utils'
import { useColumnService, useState } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/finance/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'CrmClientContextDecomposer',
    setup(props, ctx) {
        const { state } = useState({ initialize: false })

        return () => (
            <crm-client-context-skeleton initialize={state.initialize}>
                <common-element class="p-inline-14 p-block-14">
                    <crm-client-context-wrapper></crm-client-context-wrapper>
                </common-element>
            </crm-client-context-skeleton>
        )
    }
})
</script>
