export const pageImportCreateTransaction = /* GraphQL */ `
  mutation PageImportCreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const pageImportUpdateItem = /* GraphQL */ `
  mutation PageImportUpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
    }
  }
`;
