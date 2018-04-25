const ark = require('../../../lib/client')
const transactionTests = require('./__shared__/transaction')

let tx

beforeEach(() => {
  tx = ark.getBuilder().multiPayment()

  global.tx = tx
})

describe('Multi Payment Transaction', () => {
  transactionTests()

  it('should have its specific properties', () => {
    expect(tx).toHaveProperty('payments')
    expect(tx).toHaveProperty('vendorFieldHex')
  })

  describe('setVendorField', () => {
    xit('should generate and set the vendorFieldHex', () => {
      tx.setVendorField('fake')
      expect(tx.vendorFieldHex).toBe('fake')
    })
  })

  describe('addPayment', () => {
    it('should add new payments', () => {
      tx.addPayment('address', 'amount')
      tx.addPayment('address', 'amount')
      tx.addPayment('address', 'amount')

      expect(tx.payments).toEqual({
        address1: 'address',
        address2: 'address',
        address3: 'address',
        amount1: 'amount',
        amount2: 'amount',
        amount3: 'amount'
      })
    })
  })
})