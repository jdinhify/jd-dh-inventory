export const pageHomeListTransactions = /* GraphQL */ `
  query PageHomeListTransactions(
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
        quantity
        price
        type
        createdAt
        notes
        item {
          id
          name
          price
          quantity
        }
      }
    }
  }
`;

export const revertTransaction = /* GraphQL */ `
  mutation RevertTransaction(
    $updateTransactionInput: UpdateTransactionInput!
    $updateTransactionCondition: ModelTransactionConditionInput
    $updateItemInput: UpdateItemInput!
    $updateItemCondition: ModelItemConditionInput
  ) {
    updateTransaction(input: $updateTransactionInput, condition: $updateTransactionCondition) {
      id
    }
    updateItem(input: $updateItemInput, condition: $updateItemCondition) {
      id
    }
  }
`;
