<script lang="tsx">
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/hook-form'
import { enter } from '@/utils/utils-common'
import { setCompose } from '@/utils/utils-cookie'
import { router } from '@/router'
import { fetchRefresh } from '@/components/common/common.instance'
import * as Service from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'MainLogin',
    setup(props) {
        const { formRef, form, state, setState, fetchValidate } = useForm({
            form: {
                jobNumber: '',
                password: '',
                code: ''
            },
            rules: {
                jobNumber: { required: true, trigger: 'blur', min: 4, max: 4, message: '请输入4位工号' },
                password: { required: true, trigger: 'blur', min: 6, max: 18, message: '请输入6~18位登录密码' },
                code: { required: true, trigger: 'blur', message: '请输入验证码' }
            }
        })

        async function onSubmit() {
            await setState({ loading: true })
            return await fetchValidate().then(async valid => {
                if (!valid) {
                    return await fetchRefresh(300).then(() => {
                        return setState({ loading: false })
                    })
                }
                try {
                    const { data } = await Service.httpAuthMember({
                        code: form.value.code,
                        jobNumber: form.value.jobNumber,
                        password: window.btoa(encodeURIComponent(form.value.password))
                    })
                    return await setCompose(data).then(() => {
                        return router.push({ path: '/', replace: true })
                    })
                } catch (err) {
                    return await fetchRefresh(300).then(() => {
                        return setState({ loading: false })
                    })
                }
            })
        }

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
                        <n-form-item path="jobNumber">
                            <n-input
                                maxlength={32}
                                type="text"
                                placeholder="请输入登录账号"
                                v-model:value={form.value.jobNumber}
                                input-props={{ autocomplete: 'on' }}
                                onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
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
                                            onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
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
                                    onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                                    v-slots={{ prefix: () => <n-icon size={22} component={<local-naive-codex />}></n-icon> }}
                                ></n-input>
                                <common-codex disabled={state.loading}></common-codex>
                            </n-flex>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                class="w-full"
                                type="info"
                                focusable={false}
                                disabled={state.loading}
                                loading={state.loading}
                                onClick={onSubmit}
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
    :deep(.n-input) {
        --n-padding-left: 0;
        --n-padding-right: 0;
        --input-password-right: 14px;
        .n-input__prefix {
            position: absolute;
            z-index: 1;
            height: 100%;
            margin: 0;
            left: 14px;
        }
        .n-input__suffix {
            position: absolute;
            z-index: 1;
            height: 100%;
            margin: 0;
            right: 14px;
        }
        .n-input__placeholder,
        .n-input__input-el {
            padding-right: var(--input-password-right);
            padding-left: 46px;
        }
    }
}
</style>
