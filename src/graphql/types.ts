/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateItemInput = {
  id?: string | null,
  name: string,
  price: number,
  quantity: number,
  modelType: ItemModelType,
  createdAt?: string | null,
  searchField: string,
  notes: string,
};

export enum ItemModelType {
  ITEM = "ITEM",
}


export type ModelItemConditionInput = {
  name?: ModelStringInput | null,
  price?: ModelIntInput | null,
  quantity?: ModelIntInput | null,
  modelType?: ModelItemModelTypeInput | null,
  createdAt?: ModelStringInput | null,
  searchField?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelItemConditionInput | null > | null,
  or?: Array< ModelItemConditionInput | null > | null,
  not?: ModelItemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelItemModelTypeInput = {
  eq?: ItemModelType | null,
  ne?: ItemModelType | null,
};

export type UpdateItemInput = {
  id: string,
  name?: string | null,
  price?: number | null,
  quantity?: number | null,
  modelType?: ItemModelType | null,
  createdAt?: string | null,
  searchField?: string | null,
  notes?: string | null,
};

export type DeleteItemInput = {
  id?: string | null,
};

export type UpdateTransactionInput = {
  id: string,
  itemId?: string | null,
  quantity?: number | null,
  price?: number | null,
  type?: TransactionType | null,
  modelType?: TransactionModelType | null,
  createdAt?: string | null,
  searchField?: string | null,
  notes?: string | null,
};

export enum TransactionType {
  IMPORT = "IMPORT",
  EXPORT = "EXPORT",
  EXPORT_REVERTED = "EXPORT_REVERTED",
}


export enum TransactionModelType {
  TRANSACTION = "TRANSACTION",
}


export type ModelTransactionConditionInput = {
  itemId?: ModelIDInput | null,
  quantity?: ModelIntInput | null,
  price?: ModelIntInput | null,
  type?: ModelTransactionTypeInput | null,
  modelType?: ModelTransactionModelTypeInput | null,
  createdAt?: ModelStringInput | null,
  searchField?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  not?: ModelTransactionConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTransactionTypeInput = {
  eq?: TransactionType | null,
  ne?: TransactionType | null,
};

export type ModelTransactionModelTypeInput = {
  eq?: TransactionModelType | null,
  ne?: TransactionModelType | null,
};

export type DeleteTransactionInput = {
  id?: string | null,
};

export type CreateTransactionInput = {
  id?: string | null,
  itemId: string,
  quantity: number,
  price: number,
  type: TransactionType,
  modelType: TransactionModelType,
  createdAt?: string | null,
  searchField: string,
  notes: string,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelTransactionFilterInput = {
  id?: ModelIDInput | null,
  itemId?: ModelIDInput | null,
  quantity?: ModelIntInput | null,
  price?: ModelIntInput | null,
  type?: ModelTransactionTypeInput | null,
  modelType?: ModelTransactionModelTypeInput | null,
  createdAt?: ModelStringInput | null,
  searchField?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  not?: ModelTransactionFilterInput | null,
};

export type ModelItemFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  price?: ModelIntInput | null,
  quantity?: ModelIntInput | null,
  modelType?: ModelItemModelTypeInput | null,
  createdAt?: ModelStringInput | null,
  searchField?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelItemFilterInput | null > | null,
  or?: Array< ModelItemFilterInput | null > | null,
  not?: ModelItemFilterInput | null,
};

export type CreateItemMutationVariables = {
  input: CreateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type CreateItemMutation = {
  createItem:  {
    __typename: "Item",
    id: string,
    name: string,
    price: number,
    quantity: number,
    modelType: ItemModelType,
    createdAt: string,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type UpdateItemMutationVariables = {
  input: UpdateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type UpdateItemMutation = {
  updateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    price: number,
    quantity: number,
    modelType: ItemModelType,
    createdAt: string,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type DeleteItemMutationVariables = {
  input: DeleteItemInput,
  condition?: ModelItemConditionInput | null,
};

export type DeleteItemMutation = {
  deleteItem:  {
    __typename: "Item",
    id: string,
    name: string,
    price: number,
    quantity: number,
    modelType: ItemModelType,
    createdAt: string,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  input: UpdateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type UpdateTransactionMutation = {
  updateTransaction:  {
    __typename: "Transaction",
    id: string,
    itemId: string,
    quantity: number,
    price: number,
    type: TransactionType,
    modelType: TransactionModelType,
    createdAt: string,
    item:  {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  input: DeleteTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type DeleteTransactionMutation = {
  deleteTransaction:  {
    __typename: "Transaction",
    id: string,
    itemId: string,
    quantity: number,
    price: number,
    type: TransactionType,
    modelType: TransactionModelType,
    createdAt: string,
    item:  {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type CreateTransactionMutationVariables = {
  input: CreateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type CreateTransactionMutation = {
  createTransaction:  {
    __typename: "Transaction",
    id: string,
    itemId: string,
    quantity: number,
    price: number,
    type: TransactionType,
    modelType: TransactionModelType,
    createdAt: string,
    item:  {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type PageExportExportItemMutationVariables = {
  createTransactionInput: CreateTransactionInput,
  createTransactionCondition?: ModelTransactionConditionInput | null,
  updateItemInput: UpdateItemInput,
  updateItemCondition?: ModelItemConditionInput | null,
};

export type PageExportExportItemMutation = {
  createTransaction:  {
    __typename: "Transaction",
    id: string,
  } | null,
  updateItem:  {
    __typename: "Item",
    id: string,
  } | null,
};

export type PageHomeListTransactionsQueryVariables = {
  modelType?: TransactionModelType | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PageHomeListTransactionsQuery = {
  listTransactionsSortedByCreatedAt:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      quantity: number,
      price: number,
      type: TransactionType,
      createdAt: string,
      notes: string,
      item:  {
        __typename: "Item",
        id: string,
        name: string,
        price: number,
        quantity: number,
      } | null,
    } | null > | null,
  } | null,
};

export type RevertTransactionMutationVariables = {
  updateTransactionInput: UpdateTransactionInput,
  updateTransactionCondition?: ModelTransactionConditionInput | null,
  updateItemInput: UpdateItemInput,
  updateItemCondition?: ModelItemConditionInput | null,
};

export type RevertTransactionMutation = {
  updateTransaction:  {
    __typename: "Transaction",
    id: string,
  } | null,
  updateItem:  {
    __typename: "Item",
    id: string,
  } | null,
};

export type PageImportImportItemMutationVariables = {
  createTransactionInput: CreateTransactionInput,
  createTransactionCondition?: ModelTransactionConditionInput | null,
  updateItemInput: UpdateItemInput,
  updateItemCondition?: ModelItemConditionInput | null,
};

export type PageImportImportItemMutation = {
  createTransaction:  {
    __typename: "Transaction",
    id: string,
  } | null,
  updateItem:  {
    __typename: "Item",
    id: string,
  } | null,
};

export type GetItemQueryVariables = {
  id: string,
};

export type GetItemQuery = {
  getItem:  {
    __typename: "Item",
    id: string,
    name: string,
    price: number,
    quantity: number,
    modelType: ItemModelType,
    createdAt: string,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type ListItemsQueryVariables = {
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsQuery = {
  listItems:  {
    __typename: "ModelItemConnection",
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTransactionQueryVariables = {
  id: string,
};

export type GetTransactionQuery = {
  getTransaction:  {
    __typename: "Transaction",
    id: string,
    itemId: string,
    quantity: number,
    price: number,
    type: TransactionType,
    modelType: TransactionModelType,
    createdAt: string,
    item:  {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      itemId: string,
      quantity: number,
      price: number,
      type: TransactionType,
      modelType: TransactionModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListItemsSortedByCreatedAtQueryVariables = {
  modelType?: ItemModelType | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsSortedByCreatedAtQuery = {
  listItemsSortedByCreatedAt:  {
    __typename: "ModelItemConnection",
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListTransactionsSortedByCreatedAtQueryVariables = {
  modelType?: TransactionModelType | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsSortedByCreatedAtQuery = {
  listTransactionsSortedByCreatedAt:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      itemId: string,
      quantity: number,
      price: number,
      type: TransactionType,
      modelType: TransactionModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateItemSubscription = {
  onCreateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    price: number,
    quantity: number,
    modelType: ItemModelType,
    createdAt: string,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateItemSubscription = {
  onUpdateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    price: number,
    quantity: number,
    modelType: ItemModelType,
    createdAt: string,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteItemSubscription = {
  onDeleteItem:  {
    __typename: "Item",
    id: string,
    name: string,
    price: number,
    quantity: number,
    modelType: ItemModelType,
    createdAt: string,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction:  {
    __typename: "Transaction",
    id: string,
    itemId: string,
    quantity: number,
    price: number,
    type: TransactionType,
    modelType: TransactionModelType,
    createdAt: string,
    item:  {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction:  {
    __typename: "Transaction",
    id: string,
    itemId: string,
    quantity: number,
    price: number,
    type: TransactionType,
    modelType: TransactionModelType,
    createdAt: string,
    item:  {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction:  {
    __typename: "Transaction",
    id: string,
    itemId: string,
    quantity: number,
    price: number,
    type: TransactionType,
    modelType: TransactionModelType,
    createdAt: string,
    item:  {
      __typename: "Item",
      id: string,
      name: string,
      price: number,
      quantity: number,
      modelType: ItemModelType,
      createdAt: string,
      searchField: string,
      notes: string,
      updatedAt: string,
    } | null,
    searchField: string,
    notes: string,
    updatedAt: string,
  } | null,
};
