import { useEffect, useRef, useCallback } from 'react';
 
// export const useInterval = (callback: () => void, delay: number | null) => {

//   const savedCallback = useRef(callback);
 
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);
 
//   useEffect(() => {
//     if (delay === null) {
//       return
//     }

//     const id = setInterval(() => {
//       savedCallback.current()
//     }, delay)

//     return () => {
//       clearInterval(id)
//     }

//   }, [delay]);
// }

export const useAnimationFrame = (callback:(deltaTime:number) => void, delay: number | null, step:number) => {
  
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const deltaTimeRef = useRef<number>(0)
  const savedCallback = useRef(callback);
 
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  const animate = useCallback((time:number) => {
    if (!delay) return
    if (previousTimeRef.current != undefined) {
      deltaTimeRef.current += time - previousTimeRef.current
      if(deltaTimeRef.current > delay) {
        deltaTimeRef.current = step
        callback(deltaTimeRef.current)
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  },[callback, delay, step])
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if(!requestRef.current) return
      cancelAnimationFrame(requestRef.current);
    }
  }, [animate]);
}