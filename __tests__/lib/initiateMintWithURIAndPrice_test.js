import initiateMintWithURIAndPrice from "../../lib/initiateMintWithURIAndPrice.js";
    
describe('initiateMintWithURIAndPrice', () => {
    const mockSigner = jest.fn()
    const mockProvider = {
      getSigner: jest.fn(() => mockSigner)
    }

    const pendingTransaction = jest.fn()
    const mockContract = {
      connect: jest.fn(() => mockContract),
      mint: jest.fn(() => pendingTransaction)
    }

    const metadataUri = 'ipfs://example';
    const mintPriceInWei = '1000000';

    let transaction;
    beforeEach(async () => {
      transaction = await initiateMintWithURIAndPrice(
        mockContract, 
        mockProvider, 
        metadataUri, 
        mintPriceInWei
      );        
    })

    it('connects to the contract', async () => {
      expect(mockContract.connect).lastCalledWith(mockSigner)
    })

    it('should pass metadataUri and ether to mint', async () => {
      expect(mockContract.mint).lastCalledWith(metadataUri, { "value": mintPriceInWei });
    });

    it('should return a pending minting transaction', async () => {
      expect(transaction).toBe(pendingTransaction);
    });

    it('should throw an error if the contract does not implement balanceOf', async () => {
      mockContract.mint = null;

      await expect(initiateMintWithURIAndPrice(mockContract, metadataUri, mintPriceInWei)).rejects.toEqual(
        'Contract must implement mint() with a uri as a parameter.',
      );
    })
});