/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      price
      quantity
      modelType
      createdAt
      searchField
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        quantity
        modelType
        createdAt
        searchField
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      itemId
      quantity
      price
      type
      modelType
      createdAt
      item {
        id
        name
        price
        quantity
        modelType
        createdAt
        searchField
        updatedAt
      }
      searchField
      updatedAt
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemId
        quantity
        price
        type
        modelType
        createdAt
        searchField
        updatedAt
      }
      nextToken
    }
  }
`;
export const listItemsSortedByCreatedAt = /* GraphQL */ `
  query ListItemsSortedByCreatedAt(
    $modelType: ItemModelType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsSortedByCreatedAt(
      modelType: $modelType
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        price
        quantity
        modelType
        createdAt
        searchField
        updatedAt
      }
      nextToken
    }
  }
`;
export const listTransactionsSortedByCreatedAt = /* GraphQL */ `
  query ListTransactionsSortedByCreatedAt(
    $modelType: TransactionModelType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactionsSortedByCreatedAt(
      modelType: $modelType
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        itemId
        quantity
        price
        type
        modelType
        createdAt
        searchField
        updatedAt
      }
      nextToken
    }
  }
`;
