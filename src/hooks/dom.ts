import { RefObject, useEffect } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideClickHandler = (
  ref: RefObject<any>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
