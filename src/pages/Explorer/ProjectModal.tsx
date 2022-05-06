import { Button, Spacing, Text } from '@deversifi/dvf-shared-ui'
import styled from 'styled-components'

import { Modal } from '../../components/common/interactive/Modal/Modal'
import { MODALS } from '../../constants/modals'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectModalData, toggleModal } from '../../redux/slices/modalSlice'
import { ProjectData } from './Explorer'

type Props = {
  isVisible: boolean
}

export const ProjectModal = ({ isVisible }: Props) => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectModalData) as ProjectData

  return (
    <Modal
      title={project.name}
      onClose={() =>
        dispatch(toggleModal({ activeModal: MODALS.PROJECT_DETAILS }))
      }
      limitHeight={false}
      isVisible={isVisible}
      maxWidth={600}
    >
      <Content>
        <img src={project.icon} alt={`${project.name}-icon`} />
        <Spacing size='24' />
        <Text>{project.description}</Text>
        <Spacing size='24' />
        <Button onClick={() => {}} fullWidth>
          Visit website
        </Button>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  & img {
    display: block;
    margin: 0 auto;
    height: 100px;
  }
`
