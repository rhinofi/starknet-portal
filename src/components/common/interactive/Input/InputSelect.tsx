import isEmpty from 'lodash/isEmpty'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'
import styled from 'styled-components'
import { ReactComponent as ArrowRight } from '../../../../assets/icons/arrow-right.svg'
import { ReactComponent as BackIcon } from '../../../../assets/icons/back.svg'
import { useOutsideClickHandler } from '../../../../hooks/dom'
import { Text, Title3 } from '../../presentation/Text'
import { InputLabel } from './InputLabel'
import Search from './Search'
import TokenIcon from './TokenIcon'

type Props = {
  label: string
  selectedItem: SelectItemProps
  handleSearch?: (value: string) => void
  options: SelectItemProps[]
  onSelect: (value: SelectItemProps) => void
  showIcons?: boolean
}

export type SelectItemProps = {
  id: string | number
  title: string
  subtitle?: string
}

const InputSelect = ({
  label = '',
  selectedItem = {} as SelectItemProps,
  handleSearch,
  options = [],
  onSelect,
  showIcons = false
}: Props) => {
  const selectWrapperRef = useRef(null)
  const searchRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isEmpty(selectedItem) && options.length > 0) {
      onSelect(options[0])
    }
    // eslint-disable-next-line
  }, [options])

  useOutsideClickHandler(selectWrapperRef, () => {
    setIsOpen(false)
  })

  const handleSelect = (item: SelectItemProps) => {
    onSelect(item)
    setIsOpen(false)
  }

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select ref={selectWrapperRef}>
        <SelectButton type='button' onClick={() => setIsOpen(!isOpen)}>
          {selectedItem?.title && (
            <div>
              {showIcons && (
                <TokenIcon token={selectedItem.title.toLowerCase()} />
              )}
              <Text>{selectedItem.title}</Text>
            </div>
          )}
          <ArrowRight />
        </SelectButton>
        {isOpen && (
          <SelectList>
            <BackWrapper onClick={() => setIsOpen(!isOpen)}>
              <BackIcon />
              <Text>Back</Text>
            </BackWrapper>
            {handleSearch && (
              <SearchWrapper>
                <Search
                  type='text'
                  placeholder='Type to search'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSearch(e.target.value)
                  }
                  innerRef={searchRef}
                />
              </SearchWrapper>
            )}
            <SelectSimpleBar autoHide={false}>
              {options.length === 0 ? (
                <SelectEmptyListText>No items found.</SelectEmptyListText>
              ) : (
                options.map((item, index) => (
                  <SelectItem
                    key={index}
                    isSelected={item.title === selectedItem.title}
                    onClick={() => handleSelect(item)}
                  >
                    <SelectItemBg>
                      {showIcons && (
                        <TokenIcon token={item.title.toLowerCase()} />
                      )}
                      <Text>{item.title}</Text>
                    </SelectItemBg>
                  </SelectItem>
                ))
              )}
            </SelectSimpleBar>
          </SelectList>
        )}
      </Select>
    </>
  )
}

export default InputSelect

export const Select = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  &.small button {
    height: 34px;
    font-size: 13px;
    margin: 0;
  }
`

export const SelectTitle = styled(Title3)`
  margin: 0 8px;
  text-transform: initial;
`

export const SelectButton = styled.button`
  position: relative;
  width: 100%;
  height: 52px;
  padding: 14px 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${({ theme }) => theme.neutral900};

  text-align: ${props => (props.disabled ? 'center' : 'left')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  outline: none;

  transition: all 0.15s ease-in-out;

  & > div {
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.neutral900 : theme.neutral300};
  }
`

export const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`

export const SearchWrapper = styled.div`
  margin-bottom: 36px;
`

export const SelectItem = styled.li<{ isSelected?: boolean }>`
  position: relative;
  display: flex;
  height: 52px;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 8px;
  border: 1px solid #323e60;
  border-radius: 4px;
  transition: all 0.15s ease-in-out;
  padding: 1px;
  background: ${({ isSelected, theme }) =>
    isSelected
      ? 'conic-gradient(from 266.09deg at 46.18% 51.15%, #37FF9F 0deg, #FFEA32 28.29deg, #FF3446 136.88deg, #3A66FF 253.13deg, #37FF9F 360deg)'
      : theme.neutral900};
  scroll-margin-top: 300px;
`

export const SelectItemBg = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 8px 12px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.background : theme.neutral900};

  &:hover {
    background-color: ${props => props.theme.background};
  }
`

export const SelectSimpleBar = styled(SimpleBar)`
  max-height: 420px;
`

export const SelectEmptyListText = styled(Text)`
  text-align: center;
  margin: 16px 0;
`

export const SelectList = styled.ul`
  position: absolute;
  z-index: 16;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 56px 30px 30px 30px;
  overflow: hidden;

  background: ${props => props.theme.background};
  border-radius: 20px;
  list-style: none;

  &.select-transition-appear,
  &.select-transition-enter {
    opacity: 0;
  }

  &.select-transition-appear-active,
  &.select-transition-enter-active,
  &.select-transition-exit {
    opacity: 1;
  }

  &.select-transition-exit-active {
    opacity: 0;
  }

  &.select-transition-appear-active,
  &.select-transition-enter-active,
  &.select-transition-exit-active {
    transition: opacity 100ms linear;
  }
`
