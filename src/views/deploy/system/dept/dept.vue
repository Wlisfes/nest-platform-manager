<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService, fetchKineColumns } from '@/hooks/hook-service'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemDept',
    setup(props, ctx) {
        const { root, state, form, full, setState, toggle, fetchCheckboxs, fetchRefresh } = useColumnService({
            request: (data, base, opts) => Service.httpBaseSystemDeptColumn(opts.body),
            // document: '用户管理自定义表头',
            // dynamic: 'base:deploy:system:user',
            form: { vague: undefined },
            columns: fetchKineColumns(true, [
                { title: 'UID', key: 'uid', width: 190 },
                { title: '头像', key: 'avatar', width: 80, align: 'center', check: true },
                { title: '名称', key: 'name', width: 120, check: true },
                { title: '邮箱', key: 'email', width: 200, check: true },
                { title: '手机号', key: 'phone', width: 150, check: true },
                { title: '归属部门', key: 'depts', width: 150, check: true },
                { title: '已关联角色', key: 'roles', width: 150, check: true },
                { title: '状态', key: 'statusChunk', width: 100, align: 'center', check: true },
                { title: '入职时间', key: 'createTime', width: 170, check: true }
            ])
        })

        return () => (
            <layout-common-container
                transition
                initialize={state.initialize}
                class="deploy-system-role-container absolute inset-0 p-12"
                class-name="p-12 gap-12 overflow-hidden"
            ></layout-common-container>
        )
    }
})
</script>
