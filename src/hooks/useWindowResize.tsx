import { useEffect, useState } from "react"

export const useWindowResize = () => {

    const [windowSize, setWindowSize] = useState({windowWidth:window.innerWidth, windowHeight:window.innerHeight})

    useEffect(() => {

        const resizer = (e:UIEvent) => {
            if(!e) return
            setWindowSize({windowWidth: window.innerWidth,windowHeight:window.innerHeight})
        }
        window.addEventListener('resize',resizer)

        return() => window.removeEventListener('resize',resizer)
    },[])

    return windowSize
} 