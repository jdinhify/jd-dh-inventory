/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      name
      price
      quantity
      modelType
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      name
      price
      quantity
      modelType
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      name
      price
      quantity
      modelType
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction {
    onCreateTransaction {
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
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction {
    onUpdateTransaction {
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
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction {
    onDeleteTransaction {
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
        updatedAt
      }
      updatedAt
    }
  }
`;
