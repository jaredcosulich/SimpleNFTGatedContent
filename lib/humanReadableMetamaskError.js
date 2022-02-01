import {
  MetamaskErrorCodes
} from '.'

const humanReadableMetamaskError = (code) => {
  const codeString = code.toString();
  switch (codeString) {
    case "4001":
      return "You've rejected the minting. Please try again below."
    case "-32000":
      return "Insufficient funds to mint. Please try again below."
    default:
      const metamaskErrorCode = MetamaskErrorCodes[codeString]
      if (metamaskErrorCode) {
        return metamaskErrorCode.message
      } 
  }
}

export default humanReadableMetamaskError;