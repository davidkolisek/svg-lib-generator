const useWindow = () => {
    const isMobile = () => {
        return window.innerWidth < 991
    }

    return {
        isMobile
    }
}

export default useWindow
