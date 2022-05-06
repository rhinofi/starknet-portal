import { FunctionComponent } from 'react'
import styled from 'styled-components'

type Props = {
  visible?: boolean
  width?: number
  modal?: boolean
  isWhiteBg?: boolean
}

const Widget: FunctionComponent<Props> = ({
  children,
  visible,
  width,
  modal,
  isWhiteBg,
  ...props
}) => (
  <PositionWrapper width={width} {...props}>
    <NeonWrapper className='fade-in-animation' visible={visible} />
    <NeonBorder className='fade-in-animation' />
    <NeonBackground
      className='neon-background'
      isModal={modal}
      isWhiteBg={isWhiteBg}
    >
      {children}
    </NeonBackground>
  </PositionWrapper>
)

export default Widget

const PositionWrapper = styled.div<{ width?: number }>`
  position: relative;
  height: fit-content;
  max-width: ${({ width = 500 }) => `${width}px`};
  margin: 0 auto;
  padding: 1px;
  width: ${({ width = 500 }) => `${width}px`};
  min-width: ${({ width = 500 }) => `${width}px`};

  // Avoids flickering on iOS
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-transform: translate3d(0, 0, 0);

  @media screen and (max-width: 600px) {
    max-width: 95vw !important;
  }
`

interface NeonWrapperProps {
  visible?: boolean
}

const NeonWrapper = styled.div<NeonWrapperProps>`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  border-radius: 20px;
  margin: auto;
  content: ' ';
  display: block;
  background: conic-gradient(
    from -80.97deg at 46.18% 51.15%,
    #8feaec -54.94deg,
    #4619dc 28.29deg,
    #eb6f61 157.82deg,
    #e867d3 220.83deg,
    #8feaec 305.06deg,
    #4619dc 388.29deg
  );
  filter: blur(15px);
`

const NeonBorder = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  mix-blend-mode: soft-light;
  background-blend-mode: soft-light;
  border-radius: 20px;
`

interface NeonBackgroundProps {
  isWhiteBg?: boolean
  isModal?: boolean
}

const NeonBackground = styled.div<NeonBackgroundProps>`
  position: relative;
  z-index: 3;
  background: ${({ theme, isWhiteBg }) =>
    isWhiteBg ? theme.defaultFontColor : theme.background};
  border-radius: 20px;
  padding: 40px 30px;

  & > p:first-child,
  & form > p:first-child {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 600px) {
    padding: ${({ isModal }) => (isModal ? '56px' : '24px')} 16px 24px 16px;
  }
`

export const WidgetFormWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.greyBorder};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 16px 8px;
`

export const WidgetSeparator = styled.div`
  background: ${({ theme }) => theme.greyBorder};
  height: 1px;
  width: 100%;
  margin: 20px 0px;
`
