import humanReadableMetamaskError from "../../lib/humanReadableMetamaskError.js";
    
describe("humanReadableMetamaskError", () => {
  it("returns an overwritten value", () => {
    const message = humanReadableMetamaskError("4001")
    expect(message).toEqual("You've rejected the minting. Please try again below.")
  })
  
  it("should return a generic metamask error if not otherwise defined", () => {
    const message = humanReadableMetamaskError("-32600")
    expect(message).toEqual("The JSON sent is not a valid Request object.")
  })

  it('works for raw number codes as well', () => {
    const message = humanReadableMetamaskError(4001)
    expect(message).toEqual("You've rejected the minting. Please try again below.")
  })
})