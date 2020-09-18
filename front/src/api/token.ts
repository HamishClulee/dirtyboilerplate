export const gettoken = (): string => {
    let token = localStorage.getItem('QToken')
    return token ? token : ''
}

export const settoken = (token: string): void => {
    localStorage.setItem('QToken', token)
}

export const removetoken = (): void => {
    localStorage.setItem('QToken', '')
}

export const checktoken = (): Boolean => {
    return !!localStorage.getItem('QToken') && localStorage.getItem('QToken') !== ''
}

