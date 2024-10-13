import { computed, ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useConfiger, useStore } from '@/store'

export interface CustomThemeCommonVars extends Omix<ThemeCommonVars> {
    '--app-back-color': string
}

export function useProvider() {
    const { theme, primaryColor, fetchThemeUpdate } = useStore(useConfiger)
    const vars = useThemeVars() as ComputedRef<CustomThemeCommonVars>

    /**主题反转**/
    const inverted = computed(() => theme.value === 'dark')
    const themeStyle = computed(() => (inverted.value ? darkTheme : lightTheme))

    const themeOverrides = computed(() => {
        return inverted.value ? darkThemeOverrides.value : lightThemeOverrides.value
    })

    function addLight(color: string, amount: number) {
        const cc = parseInt(color, 16) + amount
        const c = cc > 255 ? 255 : cc
        return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
    }

    function lighten(color: string, amount: number) {
        color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
        amount = Math.trunc((255 * amount) / 100)
        return `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(
            color.substring(4, 6),
            amount
        )}`
    }
    const lightenStr = computed(() => lighten(primaryColor.value, 6))

    const lightThemeOverrides = computed<GlobalThemeOverrides & { common: Partial<CustomThemeCommonVars> }>(() => ({
        common: {
            primaryColor: primaryColor.value,
            primaryColorHover: lightenStr.value,
            primaryColorPressed: lightenStr.value,
            primaryColorSuppl: primaryColor.value,
            '--app-back-color': '#eef1f5'
        },
        Scrollbar: { width: '7px', height: '7px' }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides & { common: Partial<CustomThemeCommonVars> }>(() => ({
        common: {
            primaryColor: primaryColor.value,
            primaryColorHover: lightenStr.value,
            primaryColorPressed: lightenStr.value,
            primaryColorSuppl: primaryColor.value,
            '--app-back-color': '#101014'
        },
        Scrollbar: { width: '7px', height: '7px' }
    }))

    return { theme, themeStyle, themeOverrides, vars, inverted, fetchThemeUpdate }
}
