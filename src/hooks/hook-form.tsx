import { ref, Ref, toRefs, onMounted } from 'vue'
import { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import * as utils from '@/utils/utils-common'

export type FormState<R> = Omix & {
    initialize: boolean
    disabled: boolean
    visible: boolean
    loading: boolean
    rules: R
}
export type FormOption<T, R, U> = Partial<FormState<R>> & {
    mounted?: boolean
    options?: Omix<U>
    form: Omix<T>
    callback?: Function
}

/**自定义表单Hooks**/
export function useFormService<T extends Omix, R extends FormRules, U extends Omix>(options: FormOption<T, R, U>) {
    const formRef = ref<FormInst>() as Ref<FormInst & Omix<{ $el: HTMLFormElement }>>
    const form = ref<typeof options.form>(options.form)
    const { state, setState } = useState({
        initialize: options.initialize ?? true,
        disabled: options.disabled ?? false,
        visible: options.visible ?? false,
        loading: options.loading ?? false,
        rules: options.rules ?? {},
        ...(options.option ?? {})
    } as FormState<R> & typeof options.options)

    onMounted(async () => {
        return await utils.fetchHandler(Boolean(options.mounted ?? true), async () => {
            return await setState({ visible: true } as never).then(() => {
                return options.callback?.()
            })
        })
    })

    async function setForm(data: Partial<T>) {
        return Object.assign(form.value, data)
    }

    /**批量验证表单字段**/
    function fetchRuleCheck(keys: Array<string>, rule: FormItemRule) {
        if (keys.length === 0 || utils.isEmpty(rule.key)) {
            return true
        }
        return keys.includes(rule.key as string)
    }

    /**验证表单**/
    function fetchValidater(keys: Array<string> = []): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            try {
                await setState({ loading: true, disabled: true } as never)
                return formRef.value.validate(
                    errors => {
                        if (errors) {
                            return resolve(errors)
                        }
                        return resolve(false)
                    },
                    rule => fetchRuleCheck(keys, rule)
                )
            } catch (err) {
                return await setState({ loading: false, disabled: false } as never).then(() => {
                    return resolve(false)
                })
            }
        })
    }

    /**重置表单校验结果**/
    function fetchRestore() {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return resolve(formRef.value.restoreValidation())
        })
    }

    return {
        form,
        formRef,
        state,
        ...toRefs(state),
        setState,
        setForm,
        fetchValidater,
        fetchRestore
    }
}
