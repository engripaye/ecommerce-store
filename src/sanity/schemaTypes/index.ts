import { type SchemaTypeDefinition } from 'sanity'
import { promotionCode } from './schema/promotion-codes'
import { promotionCampaign } from './schema/promotion-campaign'
import { productCategory } from './schema/product-category'
import { product } from './schema/product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    promotionCode,
    promotionCampaign,
    productCategory,
    product
  ],
}
