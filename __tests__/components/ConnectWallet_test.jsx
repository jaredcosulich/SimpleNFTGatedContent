import ConnectWallet from "../../components/ConnectWallet.jsx";
    
import renderer from 'react-test-renderer';
const { act } = renderer;

import TWCircleSpinner from '../../components/TWCircleSpinner'

import CheckNetwork from '../../components/CheckNetwork';
jest.mock('../../components/CheckNetwork')

import Web3ModalConnectButton from '../../components/Web3ModalConnectButton';
jest.mock('../../components/Web3ModalConnectButton')

describe("ConnectWallet", () => {
  const provider = {}

  Web3ModalConnectButton.mockImplementation(
    ({onConnect}) => (
      <button onClick={() => onConnect(provider)} />
    )
  )

  CheckNetwork.mockImplementation(
    () => <div></div>
  )

  let component = null;
  beforeEach(async () => { 
    await act(async () => {
      component = renderer.create(
        <ConnectWallet
          infuraId="INFURA_ID"
          contractInfo={{}}
        />
      )
    })
  })

  it("should render a spinner while loading web3modal", () => {
    const initialComponent = renderer.create(
      <ConnectWallet
        infuraId="INFURA_ID"
        contractInfo={{}}
      />
    )
    const root = initialComponent.root
    const connectButtons = root.findAllByType(Web3ModalConnectButton)
    expect(connectButtons).toHaveLength(0)

    const spinners = root.findAllByType(TWCircleSpinner)
    expect(spinners).toHaveLength(1)
  })

  it('should render a Web3ModalConnectButton after loading web3modal', () => {
    const root = component.root
    const connectButtons = root.findAllByType(Web3ModalConnectButton)
    expect(connectButtons).toHaveLength(1)
  })

  it('should render a CheckNetwork once a provider is established', async () => {
    const web3ConnectButton = component.root.findByType('button')

    await act(async () => {
      web3ConnectButton.props.onClick()
    })

    const checkNetworks = component.root.findAllByType(CheckNetwork)
    expect(checkNetworks).toHaveLength(1)
  })

})