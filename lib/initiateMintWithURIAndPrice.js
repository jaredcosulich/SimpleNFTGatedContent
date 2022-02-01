const initiateMintWithURIAndPrice = async (contract, provider, metadataUri, mintPriceInWei) => {
  if (!contract.mint) {
    throw "Contract must implement mint() with a uri as a parameter."
  }

  const signer = provider.getSigner();
  const connectedContract = contract.connect(signer)
  return await connectedContract.mint(
    metadataUri, 
    { value: mintPriceInWei }
  );
}

export default initiateMintWithURIAndPrice;