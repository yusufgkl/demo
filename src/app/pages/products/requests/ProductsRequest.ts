export const GETPRODUCTS = `
query Product {
  products(first: 6) {
    edges {
      node {
        title
        id
        description
        priceRange{
          minVariantPrice {
            amount
          }
        }
        images(first:2) {
          edges{
            node{
              id
              transformedSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
`


export const CREATECHECKOUT = (id:string) => { return `
mutation CheckoutCreate($variantId:ID = "`+id+`") {
  checkoutCreate(input:{
    lineItems:{
      variantId: $variantId,
      quantity:1
    }
  }){
    checkout {
      webUrl
    }
  }
}
`}