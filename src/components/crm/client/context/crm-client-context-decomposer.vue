<script lang="tsx">
import { defineComponent } from 'vue'
import { useBaseService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/finance/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'CrmClientContextDecomposer',
    inheritAttrs: false,
    props: {
        /**客户ID**/
        keyId: { type: [String, Number] }
    },
    setup(props) {
        const { faseNode, faseState, chunkState, setState } = useBaseService({
            request: () => Service.httpBaseCrmClientResolver({ keyId: props.keyId }),
            immediate: true,
            chunkNames: { CHUNK_CLIENT_STAGE: true },
            options: { tabName: 'basic' }
        })

        return () => (
            <crm-client-context-skeleton initialize={faseState.initialize}>
                <common-element class="flex flex-col flex-1 gap-14 p-inline-14 p-block-14">
                    <crm-client-context-wrapper fase-node={faseNode.value} chunk-state={chunkState}></crm-client-context-wrapper>
                    <n-tabs
                        animated
                        type="line"
                        tab-class="p-block-10!"
                        tabs-padding={14}
                        class="common-element-tabser inset-absolute flex-1 overflow-hidden "
                        v-model:value={faseState.tabName}
                    >
                        <n-tab-pane name="basic" tab="详情信息" display-directive="show">
                            <crm-client-context-basic-wrapper></crm-client-context-basic-wrapper>
                        </n-tab-pane>
                        <n-tab-pane name="conspire" tab="短信应用" display-directive="show">
                            <crm-client-context-basic-wrapper></crm-client-context-basic-wrapper>
                        </n-tab-pane>
                        <n-tab-pane name="conspire" tab="邮件应用" display-directive="show">
                            <crm-client-context-basic-wrapper></crm-client-context-basic-wrapper>
                        </n-tab-pane>
                        <n-tab-pane name="whatsapp" tab="社媒应用" display-directive="show">
                            <crm-client-context-basic-wrapper></crm-client-context-basic-wrapper>
                        </n-tab-pane>
                        <n-tab-pane name="deploy" tab="配置" display-directive="show">
                            <crm-client-context-basic-wrapper></crm-client-context-basic-wrapper>
                        </n-tab-pane>
                        <n-tab-pane name="attachment" tab="附件" display-directive="show">
                            <crm-client-context-basic-wrapper></crm-client-context-basic-wrapper>
                        </n-tab-pane>
                        <n-tab-pane name="daily" tab="日志" display-directive="show">
                            <crm-client-context-basic-wrapper></crm-client-context-basic-wrapper>
                        </n-tab-pane>
                    </n-tabs>
                </common-element>
            </crm-client-context-skeleton>
        )
    }
})
</script>
