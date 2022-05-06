import { TokenIcon } from '@deversifi/dvf-shared-ui'
import styled, { css } from 'styled-components'

import { ReactComponent as ErrorIcon } from '../../../../assets/icons/error.svg'
import { ReactComponent as ExitIcon } from '../../../../assets/icons/exit.svg'
import { useAppDispatch } from '../../../../redux/hooks'
import {
  Notification,
  NotificationStatuses
} from '../../../../redux/slices/notifications.types'
import { deleteNotification } from '../../../../redux/slices/notificationsSlice'
import {
  getExplorerLinkL1,
  getExplorerLinkL2
} from '../../../../utils/explorer'
import { Icon } from '../Icon'

type Props = {
  id: string
  notification: Notification
}

export const SingleNotification = ({ id, notification }: Props) => {
  const dispatch = useAppDispatch()

  const { title, status, meta } = notification
  const token = meta?.token
  const txHashL1 = meta?.txHashL1
  const txHashL2 = meta?.txHashL2
  const description = meta?.description

  const isPending = status === NotificationStatuses.PENDING
  const isError = status === NotificationStatuses.ERROR

  return (
    <Wrapper $isPending={isPending} $status={status}>
      <Status title={`${status} - ${title}`}>
        <Title>
          {token && <TokenIcon token={token} />}
          <p>{title}</p>
          {txHashL1 && (
            <a
              href={getExplorerLinkL1(txHashL1, 'tx')}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon active id='external-link' />
            </a>
          )}
          {txHashL2 && (
            <a
              href={getExplorerLinkL2(txHashL2, 'tx')}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon active id='external-link' />
            </a>
          )}
        </Title>
        <TxStatusLabel>
          {isPending && <Icon id='circle-o-notch' spinning />}
          {isError && <ErrorIcon />}
          {description}
        </TxStatusLabel>
      </Status>

      <Hide>
        <ExitIcon onClick={() => dispatch(deleteNotification(id))} />
      </Hide>
    </Wrapper>
  )
}

type WrapperProps = {
  $isPending: boolean
  $status: NotificationStatuses
}
const Wrapper = styled.div<WrapperProps>`
  --angle: 0deg;
  position: relative;
  box-sizing: border-box;
  margin-top: 8px;
  padding: 12px 16px;
  transition: transform 0.3s ease-in-out;
  border-radius: 14px;

  animation: slide-in 0.15s ease-in-out
    ${({ $isPending }) => $isPending && ', move-bg 3s ease-in-out infinite'};

  background-image: linear-gradient(180deg, #191f30 0%, #000000 100%),
    conic-gradient(
      from var(--angle) at 50% 50%,
      #faee87,
      #e84545,
      #e870fb,
      #b3fbf7
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border: 1px solid transparent;

  ${({ $status }) => handleTxStatus($status)}

  @media screen and (min-width: 600px) {
    min-width: 400px;
    max-width: 500px;
  }

  @media screen and (max-width: 600px) {
    width: 95vw;
    margin: 0 auto;
  }

  @property --angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  @keyframes move-bg {
    to {
      --angle: 360deg;
    }
  }
  @keyframes slide-in {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`

const Status = styled.div`
  font-family: ${props => props.theme.defaultFont};
  color: ${props => props.theme.textSecondary};
  margin: 0 auto;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 28px;
  color: ${props => props.theme.text};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 95%;
  margin-bottom: 4px;

  a {
    display: flex;
    height: 24px;
    align-items: center;
    text-decoration: none;
  }

  i {
    margin-left: 16px;
    position: relative;
    top: 2px;
    color: ${props => props.theme.text};
    transition: color 0.15s ease-in-out;

    &:hover {
      color: ${props => props.theme.text}BB;
    }
  }

  p {
    margin: 0;
    display: flex;
    align-items: center;
  }

  & > div:first-child,
  & > img:first-child {
    margin-right: 8px;
  }

  @media all and (max-width: 600px) {
    font-size: 14px;
    line-height: 144%;
  }
`

const TxStatusLabel = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.textSecondary};
  overflow: hidden;
  max-width: 95%;
  display: flex;
  align-items: center;

  i,
  svg {
    margin-right: 8px;
    color: ${p => p.theme.text};
  }
`

const Hide = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  right: 15px;
  margin: auto;
  display: flex;
  align-items: center;
  opacity: 1;
  transition: opacity 0.15s ease-in-out;

  svg {
    &:hover {
      opacity: 0.8;
    }
  }
`

const handleTxStatus = (status: NotificationStatuses) => {
  switch (status) {
  case NotificationStatuses.SUCCESS:
    return css`
        background: linear-gradient(180deg, #191f30 0%, #000000 100%);
        border: 1px solid ${p => p.theme.neutral};

        &::before {
          display: none;
        }
      `
  case NotificationStatuses.ERROR:
    return css`
        background: linear-gradient(180deg, #191f30 0%, #000000 100%);
        border: 1px solid ${p => p.theme.accentOrange};

        &::before {
          display: none;
        }
      `
  case NotificationStatuses.PENDING:
    return css`
        background-image: linear-gradient(180deg, #191f30 0%, #000000 100%),
          conic-gradient(
            from var(--angle) at 50% 50%,
            #faee87,
            #e84545,
            #e870fb,
            #b3fbf7
          );
      `
  default:
  }
}
