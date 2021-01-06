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
        item {
          id
          name
          price
        }
      }
    }
  }
`;
