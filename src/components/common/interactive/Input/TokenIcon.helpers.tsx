import styled, { css } from 'styled-components'

export const Token = styled.img<{ small?: boolean, shifted?: boolean }>`
  height: ${({ small }) => small ? '16px' : '24px'};
  width: ${({ small }) => small ? '16px' : '24px'};

  ${({ shifted }) => shifted && css`
    position: relative;
    left: -4px;
  `}
`

export const NonExistingToken = styled.div<{ small?: boolean, shifted?: boolean }>`
  height: ${({ small }) => small ? '16px' : '24px'};
  width: ${({ small }) => small ? '16px' : '24px'};
  font-size: ${({ small }) => small ? '10px' : '14px'};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.neutral500};
  color: ${({ theme }) => theme.defaultFontColor};
  text-transform: uppercase;

  ${({ shifted }) => shifted && css`
    position: relative;
    left: -4px;
    display: inline-flex;
  `}
`

export const TokenGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
