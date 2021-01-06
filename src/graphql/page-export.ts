export const pageExportExportItem = /* GraphQL */ `
  mutation PageExportExportItem(
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
