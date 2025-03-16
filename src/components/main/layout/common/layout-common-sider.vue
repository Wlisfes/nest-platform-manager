<script lang="tsx">
import { defineComponent, computed } from 'vue'
import * as icons from '@vicons/ionicons5'

export default defineComponent({
    name: 'LayoutCommonSider',
    setup(props, ctx) {
        const menuOptions = computed(() => {
            return [
                { label: '工作台', key: '/manager', icon: () => <icons.DesktopSharp></icons.DesktopSharp> },
                { label: '销售管理', key: '/crm' },
                { label: '采购管理', key: '/srm' },
                { label: '报价管理', key: '/system/basic/simple' },
                { label: '财务中心', key: '/srm' },
                { label: '客服中心', key: '/srm' },
                { label: '信息查询', key: '/srm' },
                { label: '报表分析', key: '/srm' },
                { label: '运营中心', key: '/srm' },
                { label: '综合设置', key: '/system/basic/simple' }
            ]
        })

        console.log(icons.DesktopSharp)

        return () => (
            <n-menu
                accordion
                root-indent={24}
                collapsed-width={64}
                collapsed-icon-size={28}
                icon-size={28}
                value="/manager"
                options={menuOptions.value}
                style={{ '--n-font-size': '16px', '--n-item-height': '48px' }}
            ></n-menu>
        )
    }
})
</script>
