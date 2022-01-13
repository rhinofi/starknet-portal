import React, {FunctionComponent} from 'react'
import styled from 'styled-components'
import {getStarknet} from "@argent/get-starknet"
import {Button, TextButton} from "../common/interactive/Button";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectAddress, setAddress} from '../../redux/slices/userSlice'
import LabelCard from "../common/presentation/LabelCard";
import CopyButton from "../common/interactive/CopyButton";

const ConnectArgentWallet: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const address = useAppSelector(selectAddress)

  const initiateArgentX = async () => {
    // check if wallet extension is installed and initialized. Shows a modal prompting the user to download ArgentX otherwise.
    const starknet = getStarknet({showModal: true})
    const [userWalletContractAddress] = await starknet.enable() // may throws when no extension is detected
    dispatch(setAddress(userWalletContractAddress))

    // check if connection was successful
    if (starknet.isConnected) {
      // If the extension was installed and successfully connected, you have access to a starknet.js Signer object to do all kind of requests through the users wallet contract.
      console.log('connected!')
    } else {
      // In case the extension wasn't successfully connected you still have access to a starknet.js Provider to read starknet states and sent anonymous transactions
      console.log('failed!')
    }
  }

  return (
    <div>
      {
        !address ? <Button onClick={initiateArgentX}>
          Connect wallet
        </Button>
          : <LabelCard>
            <ExplorerLink href={`https://voyager.online/contract/${address}`}>
              {address.substr(0,7)}...{address.substr(-5)}
            </ExplorerLink>
            &nbsp;
            <CopyButton text={address} />
            <Spacing />
            <TextButton>Disconnect</TextButton>
          </LabelCard>
      }
    </div>
  )
}

export default ConnectArgentWallet

const ExplorerLink = styled.a`
  color: #fff;
  margin-right: 12px;
`

const Spacing = styled.div`
  display: inline-block;
  width: 60px;
`
