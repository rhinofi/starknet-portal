export const shortenAddress = (address: string = '') => {
  if (address.length < 12) {
    return address
  }
  return `${address.substring(0, 7)}...${address.substring(address.length - 5)}`
}
