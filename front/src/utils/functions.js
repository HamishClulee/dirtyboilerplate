const debounce = (func, wait, immediate = false) => {

    let timeout

    return () => {
        
        const context = this, args = arguments

        const later = () => {

            timeout = null
            if (!immediate) func.apply(context, args)
            
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
        
    }

}

export default debounce