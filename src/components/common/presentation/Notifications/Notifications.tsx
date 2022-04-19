import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'

import { useAppSelector } from '../../../../redux/hooks'
import { selectNotifications } from '../../../../redux/slices/notificationsSlice'
import { SingleNotification } from './SingleNotification'

export const Notifications = () => {
  const notifications = useAppSelector(selectNotifications)

  if (isEmpty(notifications)) {
    return <></>
  }

  return (
    <Wrapper>
      {Object.keys(notifications).map((id) => <SingleNotification key={id} id={id} notification={notifications[id]} />)}
    </Wrapper>
  )
}

const Wrapper = styled.div`
position: fixed;
bottom: 35px;
right: 10px;
z-index: 10000;

@media screen and (max-width: 600px) {
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: unset;
  height: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 8px;

  & > div {
    margin-bottom: 8px;
  }
}
`
