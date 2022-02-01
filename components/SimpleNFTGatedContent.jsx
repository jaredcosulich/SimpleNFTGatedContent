import {
  TWFullScreen,
  TWCenteredContent,
  ConnectWallet
} from '.'

import {
  SimpleURIAndPriceNFTWithWithdrawalRoyalty
} from '../contracts'

const SimpleNFTGatedContent = ({ infuraId }) => {
  return (
    <TWFullScreen>
      <TWCenteredContent>
        <ConnectWallet 
          infuraId={infuraId}
          contractInfo={SimpleURIAndPriceNFTWithWithdrawalRoyalty}
        />
      </TWCenteredContent>
    </TWFullScreen>
  )
}

SimpleNFTGatedContent.defaultProps = {
  infuraId: process.env.INFURA_ID ||
            process.env.NEXT_PUBLIC_INFURA_ID
}

export default SimpleNFTGatedContent;