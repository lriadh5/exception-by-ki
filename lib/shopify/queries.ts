// Storefront API 2024-10 query strings. See shopify-fetch.ts for the
// "not yet exercised against a live store" caveat.

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    productType
    images(first: 6) {
      edges {
        node {
          url
          altText
        }
      }
    }
    options {
      name
      values
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    collections(first: 10) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          handle
          title
          description
        }
      }
    }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      handle
      title
      description
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;
