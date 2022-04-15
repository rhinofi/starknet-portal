import styled from 'styled-components'

import { ProjectData } from './Explorer'
import NodeWithLink from './NodeWithLink'
import Project from './Project'

type Props = {
  angle: number;
  cumulatedAngle: number;
  projects: ProjectData[];
};

const dimensions = {
  coreSize: 100,
  nodeSize: 38,
  distanceFromCore: 40,
  linkOffset: 0,
  linkLength: 60
}

const Hub = ({ angle = 0, cumulatedAngle, projects = [] }: Props) => {
  const angles = [-90, -30, 30, 90, 120]

  return (
    <NodeWithLink angle={angle} dimensions={dimensions}>
      <HubCore>
        {projects.map((project, index) => (
          <Project key={index} project={project} angle={angles[index]} cumulatedAngle={cumulatedAngle + angles[index]} />
        )
        )}
      </HubCore>
    </NodeWithLink>
  )
}

export default Hub

const HubCore = styled.div`
  width: ${dimensions.nodeSize}px;
  height: ${dimensions.nodeSize}px;
  border-radius: 50%;
  background-color: #282C38;
  position: absolute;
`
