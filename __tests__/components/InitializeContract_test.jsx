import InitializeContract from "../../components/InitializeContract.jsx";
    
import renderer from 'react-test-renderer';
const { act } = renderer;

import TWCircleSpinner from '../../components/TWCircleSpinner'

import MintOrGatedContent from '../../components/MintOrGatedContent'
jest.mock('../../components/MintOrGatedContent')

import instantiateContract from '../../lib/instantiateContract'
jest.mock('../../lib/instantiateContract')

describe("InitializeContract", () => {
  const provider = {}
  const contractInfo = {}

  instantiateContract.mockReturnValue({})
  MintOrGatedContent.mockReturnValue(<div></div>)

  let component = null;
  beforeEach(async () => {    
    await act(async () => {
      component = renderer.create(
        <InitializeContract
          provider={provider}
          contractInfo={contractInfo}
        />
      )
    })
  })

  it("should render a spinner while the contract is instantiated", () => {
    const initialComponent = renderer.create(
      <InitializeContract
        provider={provider}
        contractInfo={contractInfo}
      />
    )
    
    const root = initialComponent.root
    const spinners = root.findAllByType(TWCircleSpinner)
    expect(spinners).toHaveLength(1)
  })

  it("should render a MintOrGatedContent once the contract is instantiated", () => {
    const mintOrGateds = component.root.findAllByType(MintOrGatedContent)
    expect(mintOrGateds).toHaveLength(1)
  })

})