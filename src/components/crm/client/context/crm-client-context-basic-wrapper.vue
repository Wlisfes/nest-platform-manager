<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CrmClientContextBasicWrapper',
    props: {},
    setup(props, { slots }) {
        return () => (
            <common-element-scrollbar class="crm-client-context-basic-wrapper">
                <common-element is-white class="flex flex-col flex-1 p-14 overflow-hidden">
                    <div class="flex flex-col overflow-hidden">
                        <common-business-header bar title="基本信息"></common-business-header>

                        <div class="basic-auto-360">
                            {Array.from({ length: 50 }, () => (
                                <div>crm-client-context-daily-wrapper</div>
                            ))}
                        </div>
                    </div>
                </common-element>
            </common-element-scrollbar>
        )
    }
})
</script>

<style lang="scss" scoped>
.basic-auto-360 {
    --label-width: 130px;
    --content-width: 230px;
    display: grid;
    grid-template-columns: repeat(auto-fill, calc(var(--label-width) + var(--content-width)));
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px 12px;
}
</style>
