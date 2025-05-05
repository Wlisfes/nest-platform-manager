<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService, fetchKineColumns } from '@/hooks/hook-service'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemUser',
    setup(props, ctx) {
        const { root, state, form, full, setState, toggle, fetchCheckboxs, fetchRefresh } = useColumnService({
            request: (data, base, opts) => Service.httpBaseSystemColumnUser(opts.body),
            document: '用户管理自定义表头',
            dynamic: 'base:deploy:system:user',
            form: {
                vague: undefined
            },
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
            <layout-common-container ref={root} abstract class="absolute inset-0 p-12" class-name="p-12 gap-12 overflow-hidden">
                <common-database-compute
                    element-class="flex-row-reverse justify-between"
                    keys={['refresh', 'settings', 'size', 'full']}
                    v-model:full={full.value}
                    v-model:loading={state.loading}
                    v-model:columns={state.columns}
                    toggle={toggle}
                    onRefresh={fetchRefresh}
                    onCheckboxs={fetchCheckboxs}
                >
                    <n-element class="flex gap-10 items-center"></n-element>
                    <common-element-action
                        label-width="7.2em"
                        cols={2}
                        v-model:initialize={state.initialize}
                        v-model:loading={state.loading}
                        v-model:event={state.event}
                        v-model:vague={form.value.vague}
                        onSubmit={() => fetchRefresh()}
                    ></common-element-action>
                </common-database-compute>
                <common-database-container element-table v-model:initialize={state.initialize} v-model:loading={state.loading}>
                    <common-database-table
                        pagination
                        loading={state.loading}
                        data={state.dataSource}
                        v-model:columns={state.columns}
                        v-model:page={state.page}
                        v-model:size={state.size}
                        v-model:total={state.total}
                        v-model:row-keys={state.rowKeys}
                        v-model:row-nodes={state.rowNodes}
                        onUpdate:page={(page: number) => fetchRefresh()}
                        onUpdate:size={(size: number) => fetchRefresh({ page: 1 })}
                    >
                        {{
                            avatar: (url: Omix, node: Omix) => {
                                return <common-database-chunk element="avatar" url={url} content={node.name}></common-database-chunk>
                            },
                            statusChunk: (data: Omix) => {
                                return <common-database-chunk content={data.name} json={data.json}></common-database-chunk>
                            },
                            depts: (items: Array<Omix>) => (
                                <common-database-chunk
                                    element="text"
                                    content={items.map(k => k.deptNode.name).join('、')}
                                ></common-database-chunk>
                            ),
                            roles: (items: Array<Omix>) => (
                                <common-database-chunk
                                    element="text"
                                    content={items.map(k => k.roleNode.name).join('、')}
                                ></common-database-chunk>
                            )
                        }}
                    </common-database-table>
                </common-database-container>
            </layout-common-container>
        )
    }
})
</script>
