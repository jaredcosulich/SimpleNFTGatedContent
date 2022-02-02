import {
  providerSignerHasToken
} from '../lib'

import {
  PlaceholderGatedComponent,
  MintNFTWithPrice
} from '.'

import {
  TWCircleSpinner
} from './tailwind'

import { useState, useEffect } from 'react';

const MintOrGatedContent = ({ provider, contract }) => {
  const [hasToken, setHasToken] = useState()
  const [checking, setChecking] = useState(true)

  useEffect(() => {

    const checkForToken = async () => {
      const _hasToken = await providerSignerHasToken(
        provider,
        contract
      );
      
      setHasToken(_hasToken)

      setChecking(false); 
    }

    checkForToken()
  }, [])

  if (checking) {
    return (
      <TWCircleSpinner
        message="Checking your wallet..."
      />
    )
  }

  if (hasToken) {
    return <PlaceholderGatedComponent />
  } else {
    return (
      <MintNFTWithPrice
        contract={contract}
        provider={provider}
        onMint={() => setHasToken(true)}
      />
    )
  }
}

MintOrGatedContent.defaultProps = {
}

export default MintOrGatedContent;