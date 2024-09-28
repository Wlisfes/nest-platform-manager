<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useForm } from '@/hooks/hook-form'

export default defineComponent({
    name: 'MainLogin',
    setup(props) {
        const { formRef, form, state } = useForm({
            form: {},
            rules: {}
        })

        return () => (
            <n-element class="login-element h-full p-24">
                <n-form size="large" ref={formRef} model={form.value} rules={state.rules} disabled={state.loading} show-label={false}>
                    <n-form-item path="email">
                        <n-input
                            class="n-deep-style"
                            maxlength={32}
                            type="text"
                            placeholder="请输入登录账号"
                            v-model:value={form.value.email}
                            input-props={{ autocomplete: 'on' }}
                            //onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                            //v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuUser />}></n-icon> }}
                        ></n-input>
                    </n-form-item>
                </n-form>
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
