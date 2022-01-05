import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/common/presentation/Container'
import { Text, Title3 } from '../../components/common/presentation/Text'

interface CircleInfoDetailsProps {
  visible: boolean
  title: string
  text: string
}

const CircleInfoDetails: FunctionComponent<CircleInfoDetailsProps> = ({
  visible = true,
  title = '',
  text = ''
}) => (
  <Wrapper direction='column'>
    {visible && (
      <>
        <Title3>{title}</Title3>
        <Text>{text}</Text>
      </>
    )}
  </Wrapper>
)

export default CircleInfoDetails

const Wrapper = styled(Container)`
  width: 290px;
  padding-top: 100px;
`
