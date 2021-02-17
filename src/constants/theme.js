export const ClassicBlue = () => {
    return {
        'top-menu' : '#5289B5',
        'top-menu-font': '#ffffff',
        'button': '#FF805A',
        'button-font': '#ffffff',
        'home-background': '#F0F6F9',
        'home-background-font': '#000000',
        'background': '#F0F6F9',
        'background-font': '#000000',
        'header-color': '#000000',
        'box-shadow': '#000000',
        'name': 'classic-blue'
    }
}
export const CleanWhite = () => {
    return {
        'button-font': '#ffffff',
        'top-menu-font': '#000000',
        'background-font': '#000000',
        'home-background-font': '#000000',
        'background': '#F7F7F7',
        'home-background': '#F7F7F7',
        'box-shadow': '#000000',
        'top-menu': '#FFFFFF',
        'button': '#3032C8',
        'name': 'clean-white'
    }
}
export const Editorial = () => {
    return {
        'button-font': '#ffffff',
        'top-menu-font': '#ffffff',
        'background-font': '#000000',
        'home-background-font': '#000000',
        'background': '#DCDCDC',
        'home-background': '#DCDCDC',
        'box-shadow': '#000000',
        'top-menu': '#000000',
        'button': '#E35555',
        'name': 'editorial'
    }
}

export const MagentaMagic = () => {
    return {
        'button-font': '#ffffff',
        'top-menu-font': '#ffffff',
        'background-font': '#000000',
        'home-background-font': '#000000',
        'background': '#FBF2EF',
        'home-background': '#FBF2EF',
        'box-shadow': '#000000',
        'top-menu': '#CB48B7',
        'button': '#462D70',
        'name': 'magenta-magic'
    }
}

export const MidnightBlue = () => {
    return {
        'button-font': '#ffffff',
        'top-menu-font': '#ffffff',
        'background-font':'#000000',
        'home-background-font': '#ffffff',
        'background': '#f7f7f7',
        'home-background': '#0C0C35',
        'box-shadow': '#090d0f',
        'top-menu': '#000000',
        'button': '#506BF0',
        'name': 'midnight-blue'
    }
}

export const NapaRed = () => {
    return {
        'button-font': '#ffffff',
        'top-menu-font': '#ffffff',
        'background-font': '#000000',
        'home-background-font': '#000000',
        'background': '#FEF6EB',
        'home-background': '#FEF6EB',
        'box-shadow': '#000000',
        'top-menu': '#7D2C2C',
        'button': '#E4B233',
        'name': 'napa-red'
    }
}

export const OliveGreen = () => {
    return {
        'button-font': '#ffffff',
        'top-menu-font': '#ffffff',
        'background-font':'#000000',
        'home-background-font': '#000000',
        'background': '#F1F1E8',
        'home-background': '#F1F1E8',
        'box-shadow': '#000000',
        'top-menu': '#5D7749',
        'button': '#CD765C',
        'name': 'olive-green'
    }
}

export const RoyalBlue = () => {
    return {
        'button-font': '#ffffff',
        'top-menu-font': '#ffffff',
        'background-font': '#000000',
        'home-background-font': '#000000',
        'background': '#FEF6EB',
        'home-background': '#FEF6EB',
        'box-shadow': '#000000',
        'top-menu': '#09015F',
        'button': '#55ACE3',
        'name': 'royal-blue'
    }
}
export const UltraViolet = () => {
    return {
        'button-font': '#ffffff',
        'top-menu-font': '#ffffff',
        'background-font': '#000000',
        'home-background-font': '#000000',
        'background': '#FEF6EB',
        'home-background': '#FEF6EB',
        'box-shadow': '#000000',
        'top-menu': '#7051A1',
        'button': '#E4B233',
        'name': 'ultra-violet'
    }
}

export const DefaultCustomColor = () => {
    return {
        'top-menu' : '#5289B5',
        'top-menu-font': '#ffffff',
        'button': '#FF805A',
        'button-font': '#ffffff',
        'home-background': '#F0F6F9',
        'home-background-font': '#000000',
        'background': '#F0F6F9',
        'background-font': '#000000',
        'header-color': '#000000',
        'box-shadow': '#000000',
        'name': 'custom-color'
    }
}
export const AllColors = () => {
    return([
        { label: 'Classic Blue', value: ClassicBlue() },
        { label: 'Midnight Blue', value: MidnightBlue() },
        { label: 'Clean White', value: CleanWhite() },
        { label: 'Magenta Magic', value: MagentaMagic() },
        { label: 'Editorial', value: Editorial() },
        { label: 'Ultra Violet', value: UltraViolet() },
        { label: 'Napa Red', value: NapaRed() },
        { label: 'Olive Green', value: OliveGreen() },
        { label: 'Royal Blue', value: RoyalBlue() },
        //{ label: 'Custom Color', value: DefaultCustomColor() }
    ])
}