import {
  Web3ModalConnectButton,
  CheckNetwork
} from '.'

import {
  TWCircleSpinner
} from './tailwind'

import { useEffect, useState } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const ConnectWallet = ({ infuraId, contractInfo }) => {  
  const [web3Modal, setWeb3Modal] = useState()
  const [provider, setProvider] = useState()

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, 
        options: {
          infuraId: infuraId
        }
      }
    };

    const modal = new Web3Modal({
      providerOptions,
      network: "rinkeby",
      cacheProvider: false,
      disableInjectedProvider: false
    })

    setWeb3Modal(modal);
  }, [])

  if (!web3Modal) {
    return (
      <TWCircleSpinner />
    )
  }

  if (!provider) {
    return (
      <Web3ModalConnectButton
        web3Modal={web3Modal}
        onConnect={setProvider}
      />
    );
  }

  return (
    <CheckNetwork 
      provider={provider}
      contractInfo={contractInfo}
    />
  );
}

ConnectWallet.defaultProps = {
  infuraId: process.env.INFURA_ID ||
            process.env.NEXT_PUBLIC_INFURA_ID
}

export default ConnectWallet;