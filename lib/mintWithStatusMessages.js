import {
  initiateMintWithURIAndPrice,
  waitForContractTransactionToComplete,
  humanReadableMetamaskError
} from 'nod-eth'

import {
  MintingEtherscanLinkMessage
} from '../components'

const mintWithStatusMessages = async ({ 
  contract,
  provider,
  metadataUri,
  mintPriceInWei,
  onStatusChange,
  onMint,
  onFailure
}) => {
  try {
    const mintTxn = await initiateMintWithURIAndPrice(
      contract,
      provider,
      metadataUri, 
      mintPriceInWei
    );

    const message = (
      <MintingEtherscanLinkMessage
        provider={provider}
        transaction={mintTxn}
      />
    );
    onStatusChange(message);
    await waitForContractTransactionToComplete(mintTxn);

    if (onMint) {
      onMint()
    }
  } catch (error) {
    let code = (error.error || error).code
    
    if (!code) {
      throw error;
    }    
    
    const message = humanReadableMetamaskError(code)
    onStatusChange(message)
    onFailure()
  }
}

export default mintWithStatusMessages;