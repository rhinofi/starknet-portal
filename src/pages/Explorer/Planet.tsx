import { Text } from '@deversifi/dvf-shared-ui'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'
import styled from 'styled-components'

import planet from '../../assets/backgrounds/planet.svg'
import { Container } from '../../components/common/presentation/Container'
import { HubData } from './Explorer'
import { Hub } from './Hub'
import { NodeWithLink } from './NodeWithLink'

type Props = {
  title: string;
  angle: number;
  hubs: HubData[]
};

const dimensions = {
  coreSize: 316,
  nodeSize: 100,
  distanceFromCore: 75,
  linkOffset: -15
}

export const Planet = ({ title, angle = 0, hubs }: Props) => {
  return (
    <NodeWithLink angle={angle} dimensions={dimensions}>
      <PlanetContainer alignItems="center" justifyContent="center">
        <PlanetText size={TypographySizes.Small} angle={angle}>{title}</PlanetText>
        {hubs.map((hub, index) => (
          <Hub key={index} angle={50} cumulatedAngle={angle + 50} projects={hub} />
        ))}
      </PlanetContainer>
    </NodeWithLink>
  )
}

const PlanetContainer = styled(Container)`
  transform: scale(1.1);
  width: ${dimensions.nodeSize}px;
  height: ${dimensions.nodeSize}px;
  background-image: url(${planet});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: relative;
  z-index: 2;
`

const PlanetText = styled(Text)<{ angle: number }>`
  transform: rotate(-${({ angle }) => angle}deg);
`
