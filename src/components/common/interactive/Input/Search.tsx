import styled from 'styled-components'
import { ChangeEvent, HTMLInputTypeAttribute, MutableRefObject } from 'react'
import searchIcon from '../../../../assets/icons/search.svg'

type SearchProps = {
  type: HTMLInputTypeAttribute,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  innerRef: MutableRefObject<any>
}

const Search = ({
  type = 'text',
  placeholder = 'Type to search',
  innerRef,
  ...props
}: SearchProps) => {
  return (
    <Wrapper>
      <SearchInput
        type={type}
        placeholder={placeholder}
        ref={innerRef}
        {...props}
      />
    </Wrapper>
  )
}

export default Search

const SearchInput = styled.input`
  position: relative;
  width: 100%;
  background: ${props => props.theme.neutral700};
  border-radius: 4px;
  padding-left: 44px;
  height: 44px;
  box-sizing: border-box;
  outline: none;
  font-style: normal;
  font-family: ${({ theme }) => theme.mainFont};
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  color: #fff;
  border: none;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #fff;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #fff;
  }
`

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 12px;
    margin: auto;
    z-index: 1;
    content: ' ';
    display: block;
    width: 24px;
    height: 24px;
    background: url(${searchIcon}) center no-repeat;
  }
`
