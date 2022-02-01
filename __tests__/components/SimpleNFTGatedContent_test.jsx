import SimpleNFTGatedContent from "../../components/SimpleNFTGatedContent.jsx";
    
import renderer from 'react-test-renderer';
const { act } = renderer;

import ConnectWallet from '../../components/ConnectWallet'
jest.mock('../../components/ConnectWallet')

describe("SimpleNFTGatedContent", () => {
  let component = null;
  beforeEach(async () => { 
    ConnectWallet.mockImplementation(
      () => <div></div>
    )
       
    await act(async () => {
      component = renderer.create(
        <SimpleNFTGatedContent />
      )
    })
  })

  it("should render the connect wallet component", () => {
    const connectWallet = component.root.findAllByType(ConnectWallet)
    expect(connectWallet).toHaveLength(1)
  })
})