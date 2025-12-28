<script lang="tsx">
import { defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'
import { useManager, useConfiger, useGlobal, useStore } from '@/store'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'LayoutCommonSider',

    setup(props, ctx) {
        const router = useRouter()
        const manager = useManager()
        const configer = useConfiger()
        const { menuOptions } = useStore(useGlobal)

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
                icon-size={16}
                root-indent={18}
                collapsed-width={64}
                value={configer.router}
                options={menuOptions.value}
                render-icon={fetchIconRender}
                on-update:value={fetchSelecter}
            ></n-menu>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-common-sider {
    margin-top: 8px;
    // --n-font-size: 14px;
    // --n-item-height: 40px;
    > :deep(.n-menu-item):first-child {
        margin-top: 0;
    }
}
</style>
