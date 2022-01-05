import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import buttonBackground from './assets/button-bg.svg'
import buttonBackgroundActive from './assets/button-bg-active.svg'

interface Coordinates {
  x: number
  y: number
}

interface CurvedButtonProps {
  text: string
  arc?: number
  radius?: number
  textRotation?: number
  imgRotation?: number
  textTranslation?: Coordinates
  setActive: Function
}

const CurvedButton: FunctionComponent<CurvedButtonProps> = ({
  text = '',
  arc = 100,
  radius = 100,
  textRotation = 0,
  imgRotation = 0,
  textTranslation = { x: 0, y: 0 },
  setActive
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const onMouseEnter = () => {
    setIsHovered(true)
    setActive(false)
  }
  
  const onMouseLeave = () => {
    setIsHovered(false)
    setActive(true)
  }

  const characters = text.split('')
  const degree = arc / characters.length

  return (
    <Wrapper>
      <Image
        src={isHovered ? buttonBackgroundActive : buttonBackground}
        alt='background'
        rotation={imgRotation}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <Content
        rotation={textRotation}
        translation={textTranslation}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        active={isHovered}
      >
        {characters.map((char, i) => (
          <Character
            key={i}
            index={i}
            degree={degree}
            arc={arc}
            radius={radius}
          >
            {char}
          </Character>
        ))}
      </Content>
    </Wrapper>
  )
}

export default CurvedButton

const Wrapper = styled.div``

interface ImageProps {
  rotation: number
}

const Image = styled.img<ImageProps>`
  ${({ rotation }) => `
        -webkit-transform: rotate(${rotation}deg);
        -ms-transform: rotate(${rotation}deg);
        transform: rotate(${rotation}deg);
    `}
`

interface ContentProps {
  rotation: number
  translation: Coordinates
  active: boolean
}

const Content = styled.div<ContentProps>`
  font-family: ${({ theme }) => theme.mainFont};
  font-size: 16px;
  color: ${({ theme, active }) =>
    active ? theme.defaultFontColor : 'rgba(255, 255, 255, 0.5)'};
  text-align: center;
  cursor: default;
  ${({ rotation, translation }) => `
        -webkit-transform: rotate(${rotation}deg) translate(${translation.x}px, ${translation.y}px);
        -ms-transform: rotate(${rotation}deg) translate(${translation.x}px, ${translation.y}px);
        transform: rotate(${rotation}deg) translate(${translation.x}px, ${translation.y}px);
    `}
`

interface CharacterProps {
  index: number
  degree: number
  arc: number
  radius: number
}

const Character = styled.span<CharacterProps>`
  position: absolute;
  ${({ index, degree, arc, radius }) => `
        height: ${index}px;
        transform: rotate(${degree * index - arc / 2}deg);
        transform-origin: 0 ${radius}px 0;
    `}
`
