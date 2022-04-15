import styled from 'styled-components'

import { ProjectData } from './Explorer'
import NodeWithLink from './NodeWithLink'

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

const Project = ({ angle = 0, cumulatedAngle, project }: Props) => {
  return (
    <NodeWithLink angle={angle} dimensions={dimensions}>
      <ProjectCore cumulatedAngle={cumulatedAngle}>
        <img src={project.icon} alt='project-icon' />
      </ProjectCore>
    </NodeWithLink>
  )
}

export default Project

const ProjectCore = styled.div<{ cumulatedAngle: number }>`
  width: ${dimensions.nodeSize}px;
  height: ${dimensions.nodeSize}px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-${({ cumulatedAngle }) => cumulatedAngle}deg);
  z-index: 3;
  & img {
      width: ${dimensions.nodeSize * 0.7}px;
  }
`
