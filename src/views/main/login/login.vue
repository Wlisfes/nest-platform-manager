<script lang="tsx">
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/hook-form'
import { fetchRefresh } from '@/components/common/common.instance'

export default defineComponent({
    name: 'MainLogin',
    setup(props) {
        const { formRef, form, state } = useForm({
            form: {},
            rules: {}
        })

        return () => (
            <n-element class="login-element h-full p-24 flex justify-center items-center">
                <layout-stripe></layout-stripe>
                <n-card
                    class="w-full h-full max-w-520 max-h-520 p-24"
                    style={{ boxShadow: 'var(--box-shadow-1)' }}
                    content-class="p-0 flex flex-col justify-center"
                >
                    <n-form
                        class="w-full max-w-375 m-auto select-none"
                        size="large"
                        ref={formRef}
                        model={form.value}
                        rules={state.rules}
                        disabled={state.loading}
                        show-label={false}
                    >
                        <n-h2 class="text-28 font-500 text-center">
                            <n-text depth={2}>欢迎登录</n-text>
                        </n-h2>
                        <n-form-item path="email">
                            <n-input
                                maxlength={32}
                                type="text"
                                placeholder="请输入登录账号"
                                v-model:value={form.value.email}
                                input-props={{ autocomplete: 'on' }}
                                //onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                                v-slots={{ prefix: () => <n-icon size={22} component={<local-naive-user />}></n-icon> }}
                            ></n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <common-state>
                                {{
                                    default: (data: Omix<{ loading: boolean }>, done: Function) => (
                                        <n-input
                                            maxlength={32}
                                            placeholder="请输入登录密码"
                                            type={data.loading ? 'text' : 'password'}
                                            input-props={{ autocomplete: 'password' }}
                                            style={{ '--input-password-right': '46px' }}
                                            v-model:value={form.value.password}
                                            //onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                                        >
                                            {{
                                                prefix: () => <n-icon size={22} component={<local-naive-ockes />}></n-icon>,
                                                suffix: () => (
                                                    <n-button
                                                        text
                                                        focusable={false}
                                                        disabled={state.loading}
                                                        onClick={(evt: Event) => done({ loading: !data.loading })}
                                                    >
                                                        <n-icon
                                                            color="var(--text-color-3)"
                                                            size={22}
                                                            component={data.loading ? <local-naive-eys /> : <local-naive-eye />}
                                                        ></n-icon>
                                                    </n-button>
                                                )
                                            }}
                                        </n-input>
                                    )
                                }}
                            </common-state>
                        </n-form-item>
                        <n-form-item path="code">
                            <n-flex class="w-full">
                                <n-input
                                    class="flex-1"
                                    type="text"
                                    placeholder="验证码"
                                    maxlength={4}
                                    v-model:value={form.value.code}
                                    v-slots={{ prefix: () => <n-icon size={22} component={<local-naive-codex />}></n-icon> }}
                                ></n-input>
                                <common-codex></common-codex>
                            </n-flex>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                class="w-full"
                                type="info"
                                focusable={false}
                                //disabled={loading.value}
                                //loading={loading.value}
                                //onClick={onSubmit}
                            >
                                立即登录
                            </n-button>
                        </n-form-item>
                        <n-flex class="w-full" justify="space-between">
                            <n-button text focusable={false}>
                                忘记密码
                            </n-button>
                            <n-button text focusable={false}>
                                注册账号
                            </n-button>
                        </n-flex>
                        <n-flex size={32} wrap-item={false} justify="center" align="center" style={{ marginTop: '24px' }}>
                            <n-button text focusable={false}>
                                <n-icon size={44} component={<local-naive-github />}></n-icon>
                            </n-button>
                            <n-button text focusable={false}>
                                <n-icon size={24} component={<local-naive-specor />}></n-icon>
                            </n-button>
                            <n-button text focusable={false}>
                                <n-icon size={44} component={<local-naive-google />}></n-icon>
                            </n-button>
                        </n-flex>
                    </n-form>
                </n-card>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.login-element {
    overflow: hidden;
    box-sizing: border-box;
    transition: padding 0.3s var(--cubic-bezier-ease-in-out), background-color 0.3s var(--cubic-bezier-ease-in-out);
    background-image: url('@/assets/images/nest-element-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
