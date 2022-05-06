import styled from 'styled-components'

import { MODALS } from '../../constants/modals'
import { useAppDispatch } from '../../redux/hooks'
import { toggleModal } from '../../redux/slices/modalSlice'
import { ProjectData } from './Explorer'
import { NodeWithLink } from './NodeWithLink'

type Props = {
  angle: number;
  cumulatedAngle: number;
  project: ProjectData;
};

const dimensions = {
  coreSize: 38,
  nodeSize: 44,
  distanceFromCore: 40,
  linkOffset: -2
}

export const Project = ({ angle = 0, cumulatedAngle, project }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <NodeWithLink angle={angle} dimensions={dimensions}>
      <ProjectCore cumulatedAngle={cumulatedAngle} onClick={() => dispatch(toggleModal({ activeModal: MODALS.PROJECT_DETAILS, modalData: project }))}>
        <img src={project.icon} alt={`${project.name}-icon`} />
      </ProjectCore>
    </NodeWithLink>
  )
}

const ProjectCore = styled.div<{ cumulatedAngle: number }>`
  width: ${dimensions.nodeSize}px;
  height: ${dimensions.nodeSize}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.neutral};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-${({ cumulatedAngle }) => cumulatedAngle}deg);
  z-index: 3;
  cursor: pointer;
  & img {
    width: ${dimensions.nodeSize * 0.7}px;
  }
  &:hover {
    filter: drop-shadow(0px 0px 25px #246CF9);
  }
`
