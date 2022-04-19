import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode;
  angle: number;
  dimensions: Dimensions
};

type Dimensions = {
    coreSize: number
    nodeSize: number
    distanceFromCore: number
    linkOffset: number
    linkLength?: number
}

export const NodeWithLink = ({ children, angle = 0, dimensions }: Props) => {
  const { coreSize, distanceFromCore } = dimensions
  const wrapperHeight = coreSize + 4 * distanceFromCore

  return (
    <Wrapper angle={angle} wrapperHeight={wrapperHeight} {...dimensions}>
      {children}
      <Link {...dimensions} />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ angle: number, wrapperHeight: number } & Dimensions>`
  position: absolute;
  top: 0;
  left: 0;
  top: ${({ coreSize, wrapperHeight }) => (coreSize - wrapperHeight) / 2}px;
  z-index: 9999;
  left: ${({ coreSize, nodeSize }) => (coreSize - nodeSize) / 2}px;
  height: ${({ wrapperHeight }) => wrapperHeight}px;
  width: ${({ nodeSize }) => nodeSize}px;
  transform: rotate(${({ angle }) => angle}deg);
`

const Link = styled.div<Dimensions>`
  background-color: #3C4254;
  z-index: 1;
  width: 1px;
  height: ${({ distanceFromCore, linkOffset, linkLength }) => linkLength || distanceFromCore + linkOffset}px;
  position: absolute;
  top: ${({ nodeSize, linkOffset }) => nodeSize + linkOffset}px;
  left: ${({ nodeSize }) => nodeSize / 2}px;
`
