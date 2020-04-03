import {useEffect} from 'react'

export const useDebouncedEffect = (callback, delay, deps = []) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [delay, ...deps])
}
