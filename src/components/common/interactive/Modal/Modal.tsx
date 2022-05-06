import { CoreCard } from '@deversifi/dvf-shared-ui'
import { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import SimpleBar from 'simplebar-react'
import styled from 'styled-components'

import { ReactComponent as ExitIcon } from '../../../../assets/icons/exit.svg'
import { usePrevious } from '../../../../hooks/usePrevious'

type Props = {
  children: any
  onClose: any
  title: string
  limitHeight?: boolean
  isVisible?: boolean
  maxWidth?: number
}

export const Modal = ({
  children,
  onClose,
  title,
  limitHeight = true,
  isVisible = true,
  maxWidth
}: Props) => {
  const prevIsVisible = usePrevious(isVisible)

  const cssTransitionRef = useRef(null)

  useEffect(() => {
    if (!prevIsVisible && isVisible) {
      document.body.classList.add('no-scroll')
    } else if (prevIsVisible && !isVisible) {
      document.body.classList.remove('no-scroll')
    }
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isVisible])

  return (
    <CSSTransition
      in={isVisible}
      timeout={100}
      appear={isVisible}
      classNames='modal-transition'
      unmountOnExit
      nodeRef={cssTransitionRef}
    >
      <ModalWrapper ref={cssTransitionRef}>
        <ModalOverlay />
        <NeonWrapper $maxWidth={maxWidth}>
          <CoreCard title={title}>
            <CloseWrapper>
              <ExitIcon onClick={onClose} />
            </CloseWrapper>
            {limitHeight
              ? (
                <SimpleBar style={{ maxHeight: 554 }}>
                  <div>{children}</div>
                </SimpleBar>
              )
              : (
                <div>{children}</div>
              )}
          </CoreCard>
        </NeonWrapper>
      </ModalWrapper>
    </CSSTransition>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  overflow: auto;
  margin: auto auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &.modal-transition-appear,
  &.modal-transition-enter {
    opacity: 0;
  }

  &.modal-transition-appear-active,
  &.modal-transition-enter-active,
  &.modal-transition-exit {
    opacity: 1;
  }

  &.modal-transition-exit-active {
    opacity: 0;
  }

  &.modal-transition-appear-active,
  &.modal-transition-enter-active,
  &.modal-transition-exit-active {
    transition: opacity 100ms linear;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-family: ${props => props.theme.defaultFont};
  // background: ${({ theme }) => theme.background};
  transition: all 0.15s ease-in-out;
`

export const ModalContentWrapper = styled.div`
  padding: 24px 32px 16px 32px;
`

export const ModalFooter = styled.div`
  margin-top: 8px;
  padding: 16px 32px 16px 32px;
  border-top: 1px solid rgba(163, 166, 194, 0.2);
  width: 100%;
  text-align: center;
  box-sizing: border-box;
`

export const ModalFooterRow = styled.div`
  display: flex;
  align-items: center;

  button:first-of-type {
    margin-bottom: 0;
  }

  margin-bottom: 16px;

  & > *:not(:first-child) {
    margin-left: 16px;
  }
`

export const CloseWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 20px;
  transition: opacity 0.15s ease-in-out;
  cursor: pointer;
  z-index: 100;

  &:hover {
    opacity: 0.8;
  }

  @media all and (max-width: 600px) {
    right: 16px;
  }
`

type NeonWrapperProps = {
  $maxWidth?: number
}
const NeonWrapper = styled.div<NeonWrapperProps>`
  max-height: calc(100vh - 32px);

  & > div {
    width: ${({ $maxWidth }) => `${$maxWidth}px` || '100%'};
    padding: 16px 0;

    & > div {
      position: relative;
    }
  }

  @media all and (max-width: 600px) {
    box-sizing: border-box;
    padding-bottom: 128px;
    max-width: 95vw;

    & > div {
      width: 95vw;
      height: 100%;
    }
  }
`
