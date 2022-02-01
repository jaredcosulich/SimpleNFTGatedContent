import MintOrGatedContent from "../../components/MintOrGatedContent.jsx";
    
import renderer from 'react-test-renderer';
const { act } = renderer;

import TWCircleSpinner from '../../components/TWCircleSpinner'
import PlaceholderGatedComponent from '../../components/PlaceholderGatedComponent'

import MintNFTWithPrice from '../../components/MintNFTWithPrice'
jest.mock('../../components/MintNFTWithPrice')
MintNFTWithPrice.mockReturnValue(<div></div>)

import providerSignerHasToken from '../../lib/providerSignerHasToken'
jest.mock('../../lib/providerSignerHasToken')

const provider = {}
const contract = {}

async function fullyRenderComponent() {
  let component;
  await act(async () => {
    component = renderer.create(
      <MintOrGatedContent
        provider={provider}
        contract={contract}
      />
    )
  })
  return component;
}

describe("MintOrGatedContent", () => {
  it("should display only a spinner to start", async () => {
    const initialComponent = renderer.create(
      <MintOrGatedContent
        provider={provider}
        contract={contract}
      />
    )
    
    const root = initialComponent.root;

    const spinners = root.findAllByType(TWCircleSpinner)
    expect(spinners).toHaveLength(1)

    const mintWithPrices = root.findAllByType(MintNFTWithPrice)
    expect(mintWithPrices).toHaveLength(0)

    const gatedContents = root.findAllByType(PlaceholderGatedComponent)
    expect(gatedContents).toHaveLength(0)
  })

  it("should display minting component if the user does not yet have a token", async () => {
    providerSignerHasToken.mockReturnValue(false)
    const component = await fullyRenderComponent()
    
    const root = component.root

    const spinners = root.findAllByType(TWCircleSpinner)
    expect(spinners).toHaveLength(0)

    const mintWithPrices = root.findAllByType(MintNFTWithPrice)
    expect(mintWithPrices).toHaveLength(1)

    const gatedContents = root.findAllByType(PlaceholderGatedComponent)
    expect(gatedContents).toHaveLength(0)
  })

  it("should display the gated content if the user has a token", async () => {
    providerSignerHasToken.mockReturnValue(true)
    const component = await fullyRenderComponent()

    const root = component.root;

    const spinners = root.findAllByType(TWCircleSpinner)
    expect(spinners).toHaveLength(0)

    const mintWithPrices = root.findAllByType(MintNFTWithPrice)
    expect(mintWithPrices).toHaveLength(0)

    const gatedContents = root.findAllByType(PlaceholderGatedComponent)
    expect(gatedContents).toHaveLength(1)
  })

})