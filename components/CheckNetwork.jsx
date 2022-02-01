import {
  TWCircleSpinner,
  WrongEthereumNetworkMessage,
  InitializeContract
} from '.'

import { useEffect, useState } from 'react';

const CheckNetwork = ({ provider, contractInfo }) => {
  const [networkName, setNetworkName] = useState();

  const correctNetwork = () => (
    networkName === contractInfo.network
  )

  useEffect(() => {
    const getNetwork = async () => {
      const _network = await provider.getNetwork()

      if (_network) {
        setNetworkName(_network.name)
      }
    }

    getNetwork();
  }, [provider])

  if (!networkName) {
    return (
      <TWCircleSpinner
        message="Checking the network..."
      />
    )
  }

  if (!correctNetwork()) {
    return (
      <WrongEthereumNetworkMessage 
        badNetwork={networkName}
        goodNetwork={contractInfo.network}
      />
    )
  }

  return (
    <InitializeContract
      provider={provider}
      contractInfo={contractInfo}
    />
  )
}

export default CheckNetwork;