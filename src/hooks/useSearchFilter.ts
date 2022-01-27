import { MutableRefObject, useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  searchRef: MutableRefObject<any>
}

export const useSearchFilter = ({ isOpen, searchRef }: Props) => {
  const [filterToken, setFilterToken] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (searchRef && searchRef.current && searchRef.current.focus) {
        searchRef.current.focus()
      }
    } else if (!isOpen) {
      setFilterToken('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return {
    filterToken,
    setFilterToken
  }
}
