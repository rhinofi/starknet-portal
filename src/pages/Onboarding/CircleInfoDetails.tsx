import { Text } from '@deversifi/dvf-shared-ui'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

import { Container } from '../../components/common/presentation/Container'

interface CircleInfoDetailsProps {
  visible: boolean
  title: string
  text: string
}

export const CircleInfoDetails: FunctionComponent<CircleInfoDetailsProps> = ({
  visible = true,
  title = '',
  text = ''
}) => (
  <Wrapper direction='column'>
    {visible && (
      <>
        <Text size={TypographySizes.Big}>{title}</Text>
        <Text>{text}</Text>
      </>
    )}
  </Wrapper>
)

const Wrapper = styled(Container)`
  width: 290px;
  padding-top: 100px;
`
