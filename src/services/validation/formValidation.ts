import { validateYupSchema, yupToFormErrors } from 'formik'
import * as Yup from 'yup'

import { amountSchema, tokenSchema } from './validators'

export const dynamicSchemaCreator = (
  value: any,
  schema: any,
  additionalContext = {}
) => {
  try {
    validateYupSchema(value, schema, true, {
      ...value,
      ...additionalContext
    })
  } catch (err) {
    return yupToFormErrors(err)
  }
  return {}
}

export const BridgeValidationSchema = Yup.object({
  amount: amountSchema,
  token: tokenSchema,
  fromNetwork: Yup.string().required(),
  toNetwork: Yup.string().required(),
  toAddress: Yup.string().required()
})
