import styled, { css } from 'styled-components'

type IconProps = {
    id: string
    spinning?: boolean
    active?: boolean
}

const Icon = ({
  id,
  active = false,
  spinning = false
}: IconProps) => {
  const c = `
    fa fa-${id}
    ${spinning ? 'fa-spin' : ''}
  `

  return <HtmlIcon active={active} className={c} />
}

export default Icon

type HtmlIconProps = {
    active: boolean
}
const HtmlIcon = styled.i<HtmlIconProps>`
  color: ${({ theme, active }) => active ? theme.activeColor : (theme?.iconColor || theme.text)};
  transition: opacity 0.1s linear;
  ${({ active }) => active && css`
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
  `}
`
