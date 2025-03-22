<script lang="tsx">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useManager, useConfiger } from '@/store'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'LayoutCommonSider',
    setup(props, ctx) {
        const router = useRouter()
        const manager = useManager()
        const configer = useConfiger()

        async function fetchSelecter(path: string, data: Omix) {
            return await router.push({ path })
        }

        return () => (
            <n-menu
                class="layout-common-sider"
                label-field="name"
                key-field="router"
                accordion={true}
                icon-size={24}
                root-indent={20}
                collapsed-width={64}
                value={configer.router}
                options={manager.menuOptions}
                on-update:value={fetchSelecter}
                render-icon={(data: Omix) => (utils.isEmpty(data.iconName) ? null : <common-icon name={data.iconName}></common-icon>)}
            ></n-menu>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-common-sider {
    --n-font-size: 16px;
    --n-item-height: 48px;
    > :deep(.n-menu-item):first-child {
        margin-top: 0;
    }
}
</style>
