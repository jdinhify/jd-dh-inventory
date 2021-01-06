export const pageImportImportItem = /* GraphQL */ `
  mutation PageImportImportItem(
    $createTransactionInput: CreateTransactionInput!
    $createTransactionCondition: ModelTransactionConditionInput
    $updateItemInput: UpdateItemInput!
    $updateItemCondition: ModelItemConditionInput
  ) {
    createTransaction(input: $createTransactionInput, condition: $createTransactionCondition) {
      id
    }
    updateItem(input: $updateItemInput, condition: $updateItemCondition) {
      id
    }
  }
`;
