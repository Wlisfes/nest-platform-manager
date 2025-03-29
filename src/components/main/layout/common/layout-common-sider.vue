<script lang="tsx">
import { defineComponent, h } from 'vue'
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

        /**渲染图标**/
        function fetchIconRender(data: Omix) {
            if (utils.isEmpty(data.iconName)) {
                return null
            }
            return h(<common-element-icon name={data.iconName}></common-element-icon>)
        }

        return () => (
            <n-menu
                class="layout-common-sider"
                label-field="name"
                key-field="router"
                accordion={true}
                icon-size={20}
                root-indent={20}
                collapsed-width={64}
                value={configer.router}
                options={manager.menuOptions}
                render-icon={fetchIconRender}
                on-update:value={fetchSelecter}
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
