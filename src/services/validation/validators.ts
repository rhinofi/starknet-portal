import Decimal from 'decimal.js'
import * as Yup from 'yup'

const errorMessages = {
  required: 'Field is required.',
  positive: 'Value must be greater than 0.',
  insufficientBalance: 'Insufficient balance.'
}

export const amountSchema = Yup.number()
  .typeError('Invalid number.')
  .positive(errorMessages.positive)
  .test('insufficient-balance', errorMessages.insufficientBalance, function (
    value
  ) {
    if (!value) return true
    const balance = this.options.context?.balance
    return !new Decimal(value.toString()).gt(balance || 0)
  })
  .required(errorMessages.required)

export const tokenSchema = Yup.string().required(errorMessages.required)
