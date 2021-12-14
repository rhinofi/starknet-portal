const fonts = {
    mainFont: 'Lexend, sans-serif',
    secondaryFont: 'Lato, sans-serif',
    defaultFontSize: '14px'
}

export const commonColors = {
    defaultFontColor: '#fff',
    background: '#0A1017',
    neutral900: '#191F30',
    neutral800: '#1E2639',
    neutral300: '#647496',
    neutral200: '#8CA0C6',
    neutral100: '#B0C0E0',
    primary300: '#A365FE'
}

const themes = {
    light: {
        theme: 'light',
        ...fonts,
        ...commonColors
    },
    dark: {
        theme: 'dark',
        ...fonts,
        ...commonColors,
        defaultTextColorRGB: '100,116,150'
    }
}

export default themes
