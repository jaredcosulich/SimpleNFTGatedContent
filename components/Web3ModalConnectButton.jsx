import {
  TWCircleSpinner,
  TWButton
} from '.'

import { useEffect, useState } from "react";
import { ethers } from "ethers";

const Web3ModalConnectButton = (props) => {
  const { web3Modal, onConnect, children, ...twButtonProps } = props
  const [cachedProvider, setCachedProvider] = useState(web3Modal.cachedProvider)

  const onConnectLocal = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      
      if (onConnect) {
        onConnect(provider)
      }
  
    } catch (e) {
      switch (e.toString()) {
        case 'Modal closed by user': break;
        case 'Error: User Rejected': 
          setCachedProvider(null)
          break;
        default:
          console.error(`Web3Modal Error: ${e}`)
      }
    }
  }

  useEffect(() => {
    if (cachedProvider) {
      onConnectLocal()
    }
  }, [])
  
  return (
    <>
      {cachedProvider && 
        <TWCircleSpinner />
      }
      {!cachedProvider && web3Modal &&
        <TWButton
          onClick={onConnectLocal}
          {...twButtonProps}
        >
          { children }
        </TWButton>
      }
      {!web3Modal && 
        <div>
          "Please Provide a Web3Modal" 
        </div>
      }
    </>
  )

}

Web3ModalConnectButton.defaultProps = {
  children: 'Connect Wallet',
  web3Modal: {}
}

export default Web3ModalConnectButton;