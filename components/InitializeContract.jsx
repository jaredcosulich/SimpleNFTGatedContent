import {
  instantiateContract
} from 'nod-eth'

import {
  MintOrGatedContent
} from '.'

import {
  TWCircleSpinner
} from './tailwind'

import { useEffect, useState } from 'react';

const InitializeContract = ({ provider, contractInfo }) => {
  const [contract, setContract] = useState();

  useEffect(() => {
    const simpleNFT4Contract = instantiateContract(
        contractInfo, 
        provider
      )

    setContract(simpleNFT4Contract)
  }, [provider])

  if (!contract) {
    return (
      <TWCircleSpinner
        message="Looking up contract..."
      />
    )
  }

  return (
    <MintOrGatedContent
      contract={contract}
      provider={provider}
    />
  )
}

export default InitializeContract;