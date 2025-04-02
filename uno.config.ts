import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetTagify from '@unocss/preset-tagify'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
    presets: [presetUno(), presetAttributify(), presetTagify(), presetRemToPx({ baseFontSize: 4 })],
    rules: [
        ['text-naive-primary', { color: 'var(--primary-color)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-naive-success', { color: 'var(--success-color)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-naive-warning', { color: 'var(--warning-color)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-naive-error', { color: 'var(--error-color)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-primary', { color: 'var(--text-color-1)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-secondary', { color: 'var(--text-color-2)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-regular', { color: 'var(--text-color-3)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-placeholder', { color: 'var(--placeholder-color)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-disabled', { color: 'var(--placeholder-color-disabled)', transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-transition', { transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['bg-primary', { 'background-color': 'var(--primary-color)', transition: 'background-color 0.3s var(--cubic-bezier-ease-in-out)' }],
        ['bg-success', { 'background-color': 'var(--success-color)', transition: 'background-color 0.3s var(--cubic-bezier-ease-in-out)' }],
        ['bg-warning', { 'background-color': 'var(--warning-color)', transition: 'background-color 0.3s var(--cubic-bezier-ease-in-out)' }],
        ['bg-error', { 'background-color': 'var(--error-color)', transition: 'background-color 0.3s var(--cubic-bezier-ease-in-out)' }],
        ['bg-transition', { transition: 'background-color 0.3s var(--cubic-bezier-ease-in-out)' }],
        [/^grid-columns-(\d+)$/, ([, d]) => ({ display: 'grid', 'grid-template-columns': `repeat(${d}, minmax(0px, 1fr))` })]
    ],
    shortcuts: [{ 'border-divider': 'border border-solid border-[var(--divider-color)]' }]
})
