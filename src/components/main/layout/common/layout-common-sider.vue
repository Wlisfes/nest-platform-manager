<script lang="tsx">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'LayoutCommonSider',
    setup(props, ctx) {
        const menuOptions = computed(() => {
            return [
                { label: '工作台', key: '/manager', icon: () => <local-nest-compass /> },
                { label: '销售管理', key: '/crm', icon: () => <local-nest-market /> },
                { label: '采购管理', key: '/srm', icon: () => <local-nest-stock /> },
                { label: '报价管理', key: '/system/basic/simple', icon: () => <local-nest-offer /> },
                { label: '财务中心', key: '/srm', icon: () => <local-nest-finance /> },
                { label: '客服中心', key: '/srm', icon: () => <local-nest-monit /> },
                { label: '信息查询', key: '/srm', icon: () => <local-nest-infratsr /> },
                { label: '报表分析', key: '/srm', icon: () => <local-nest-histogr /> },
                { label: '运营中心', key: '/srm', icon: () => <local-nest-trade /> },
                { label: '综合设置', key: '/system/basic/simple', icon: () => <local-nest-settings /> }
            ]
        })

        return () => (
            <n-menu
                class="layout-common-sider"
                accordion
                root-indent={24}
                collapsed-width={64}
                collapsed-icon-size={24}
                icon-size={24}
                value="/manager"
                options={menuOptions.value}
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
