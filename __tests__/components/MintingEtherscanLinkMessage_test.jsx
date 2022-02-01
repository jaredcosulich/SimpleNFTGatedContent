import MintingEtherscanLinkMessage from "../../components/MintingEtherscanLinkMessage.jsx";
    
import renderer from 'react-test-renderer';
const { act } = renderer;

describe("MintingEtherscanLinkMessage", () => {
  const transactionHash = 'TRANSACTION_HASH'
  const transaction = {
    hash: transactionHash
  }
  let component = null;

  async function renderComponent(provider) {
    await act(async () => {
      component = renderer.create(
        <MintingEtherscanLinkMessage
          provider={provider}
          transaction={transaction}
        />
      )
    })    
  }

  describe("On the rinkeby test network", () => {
    const rinkebyProvider = {
      getNetwork: jest.fn(
        () => ({name: 'rinkeby'})
      )
    };

    it("should display an etherscan link for the rinkeby network", async () => {
      await renderComponent(rinkebyProvider)
      const etherscanLink = component.root.findByType('a')
      const href = 'https://rinkeby.etherscan.io/tx/' + transactionHash
      expect(etherscanLink.props.href).toEqual(href)
    })
  })

  describe("On mainnet (homestead)", () => {
    const provider = {
      getNetwork: jest.fn(
        () => ({name: 'homestead'})
      )
    };

    it("should display an etherscan link", async () => {
      await renderComponent(provider)
      const etherscanLink = component.root.findByType('a')
      const href = 'https://etherscan.io/tx/' + transactionHash
      expect(etherscanLink.props.href).toEqual(href)
    })
  })
})