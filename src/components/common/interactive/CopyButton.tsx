import { Text } from '@deversifi/dvf-shared-ui'
import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as CopyIcon } from '../../../assets/icons/copy.svg'

interface CopyProps {
  text: string
  successPosition?: SuccessPosition
}

type SuccessPosition = 'right' | 'bottom'

export const CopyButton: FunctionComponent<CopyProps> = ({ text, successPosition }) => {
  const [showSuccess, setShowSuccess] = useState(false)

  const copyToClipboard = () => {
    const input = document.createElement('input')
    input.style.position = 'fixed'
    input.style.opacity = '0'
    input.value = text
    document.body.appendChild(input)
    /* Get the text field */
    try {
      /* Select the text field */
      input.focus()
      input.select()

      /* Copy the text inside the text field */
      document.execCommand('copy')
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 500)
    } catch (e) {}
    document.body.removeChild(input)
  }
  return (
    <CopyWrapper onClick={copyToClipboard} $active={showSuccess}>
      <CopyIcon />
      {showSuccess && (
        <FloatingMessage position={successPosition} size='small'>
          Copied!
        </FloatingMessage>
      )}
    </CopyWrapper>
  )
}

interface CopyWrapperProps {
  $active: boolean
}

const CopyWrapper = styled.div<CopyWrapperProps>`
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 18px;

  svg {
    transition: opacity 0.1s linear;
  }

  path {
    fill: ${({ theme, $active }) => $active && theme.secondary500};
  }

  &:active {
    path {
      fill: ${props => props.theme.secondary500};
    }
  }

  &:hover {
    svg {
      opacity: 0.8;
    }
  }
`

const FloatingMessage = styled(Text)<{ position?: SuccessPosition }>`
  position: absolute;
  top: ${({ position }) => (position === 'bottom' ? '25px' : 0)};
  left: ${({ position }) =>
    position === 'bottom' ? '-10px' : 'calc(100% + 8px)'};
  color: ${({ theme }) => theme.secondary500};
`
