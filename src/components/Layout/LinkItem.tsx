import React, {ElementType, FunctionComponent} from 'react'
import styled, {css} from 'styled-components'
import {Link, useLocation} from 'react-router-dom'
import HeaderLabel from './HeaderLabel'

interface LinkItemProps {
    tab: string;
    path?: string;
    Icon: ElementType;
}

const LinkItem: FunctionComponent<LinkItemProps> = (
    {
        tab = '',
        path = '',
        Icon
    }
) => {
    const {pathname} = useLocation()

    return (
        <HeaderLink
            to={path}
            key={path}
            $isActive={pathname.indexOf(path) >= 0}
        >
            {Icon && <Icon />}
            <HeaderLabel tab={tab} />
        </HeaderLink>
    )
}

export default LinkItem

const HeaderLink = styled(Link)<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 44px;
  padding: 8px 16px;
  box-sizing: border-box;
  color: #fff;
  opacity: ${({$isActive}) => $isActive ? 1 : 0.7};
  transition: all 0.2s linear;

  svg {
    transition: all 0.3s, ease-in-out;
  }

  &:hover {
    background: ${({$isActive, theme}) => $isActive ? 'transparent' : theme.neutral300
    };
  }

  &:active {
    background: transparent;
    opacity: 1;

    div {
      opacity: 1;
    }

    .update-stroke {
      path {
        stroke: ${({theme}) => theme.primary300};
      }
    }

    .update-fill {
      path {
        fill: ${({theme}) => theme.primary300};
      }
    }
  }

  ${({
       $isActive,
       theme
     }) => $isActive && css`
    .update-stroke {
      path {
        stroke: ${theme.primary300};
      }
    }

    .update-fill {
      path {
        fill: ${theme.primary300};
      }
    }
  `}
`
