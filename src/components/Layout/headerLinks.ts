import { ReactComponent as moreIcon } from '../../assets/icons/more.svg'
import { ReactComponent as sendIcon } from '../../assets/icons/send.svg'
import { ReactComponent as portfolioIcon } from '../../assets/icons/portfolio.svg'
import {FunctionComponent} from "react";

interface NavigationLink {
    tab: string;
    path: string;
    Icon: FunctionComponent
}

export const mainLinks: NavigationLink[] = [
    { tab: 'Portfolio', path: '/portfolio', Icon: portfolioIcon },
    { tab: 'Bridge funds', path: '/trade', Icon: sendIcon },
    { tab: 'Explore Starknet', path: '/swap', Icon: moreIcon }
]
