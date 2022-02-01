import walletHasToken from "../../lib/walletHasToken.js";
    
describe('walletHasToken', () => {
  const addressWithTokens = 'WALLET_WITH_TOKENS'
  const addressWithNoTokens = 'WALLET_WITH_NO_TOKENS'
  let mockContract = {
    balanceOf: jest.fn(
      (walletAddress) => {
        return walletAddress === addressWithTokens ? 3 : 0
      }
    )
  }

  it('should return false if has zero NFTs in wallet', async () => {
    const result = await walletHasToken(mockContract, addressWithNoTokens);
    expect(result).toBe(false);
  });

  it('should return true if has one or more NFT in wallet', async () => {
    const result = await walletHasToken(mockContract, addressWithTokens);
    expect(result).toBe(true);
  });

  it('should throw an error if the contract does not implement balanceOf', async () => {
    await expect(walletHasToken({}, "")).rejects.toEqual(
      'Contract must implement balanceOf()',
    );
  })
});