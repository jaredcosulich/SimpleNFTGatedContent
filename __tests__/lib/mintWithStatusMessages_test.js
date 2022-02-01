import mintWithStatusMessages from "../../lib/mintWithStatusMessages.js";
    
import initiateMintWithURIAndPrice from '../../lib/initiateMintWithURIAndPrice'
jest.mock('../../lib/initiateMintWithURIAndPrice')

describe("mintWithStatusMessages", () => {
  const contract = jest.fn()
  const provider = jest.fn()
  const pendingTransaction = {
    wait: jest.fn(() => ({}))
  }
  const onStatusChange = jest.fn()
  const onMint = jest.fn()
  const onFailure = jest.fn()
  const metadataUri = 'METADATA_URI'
  const mintPriceInWei = Math.pow(10, 16).toString()

  describe("with successful mint", () => {
    beforeEach(async () => {
      initiateMintWithURIAndPrice.mockReturnValueOnce(
        pendingTransaction
      )

      await mintWithStatusMessages({
        contract,
        provider,
        metadataUri,
        mintPriceInWei,
        onStatusChange,
        onMint,
        onFailure
      })
    })

    afterEach(() => {
      [contract, provider, pendingTransaction.wait,
      onStatusChange, onMint, onFailure].forEach(
        (mockFn) => mockFn.mockReset() 
      )
    })

    it("should initialize the minting process", () => {
      expect(initiateMintWithURIAndPrice.mock.calls).toHaveLength(1)
    })

    it('should report status changes', () => {
      expect(onStatusChange).toHaveBeenCalledTimes(1)
    })

    it('should call onMint when complete', () => {
      expect(onMint).toHaveBeenCalledTimes(1)
    })
  })
  
  it('should report status and failure on error', async () => {
    initiateMintWithURIAndPrice.mockImplementation(() => {
      throw {code: 4001}
    });

    await mintWithStatusMessages({
      contract,
      provider,
      metadataUri,
      mintPriceInWei,
      onStatusChange,
      onMint,
      onFailure
    })

    expect(onStatusChange).toHaveBeenLastCalledWith("You've rejected the minting. Please try again below.")
    expect(onFailure).toHaveBeenCalledTimes(1)
  })

})