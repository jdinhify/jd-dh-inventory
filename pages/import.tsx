import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { PageSection } from 'src/components/page-section'
import { SEO } from 'src/components/seo'
import { withAuth } from 'src/components/with-auth'
import { MdAdd, MdClose } from 'react-icons/md'
import { Button } from 'src/components/button'
import { PageLayout } from 'src/components/page-layout'
import { sharedText } from 'src/shared/text'
import { H2 } from 'src/components/heading'
import { useForm } from 'react-hook-form'
import {
  CreateItemMutation,
  CreateItemMutationVariables,
  ItemModelType,
  ListItemsSortedByCreatedAtQuery,
  ListItemsSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  PageImportCreateTransactionMutation,
  PageImportCreateTransactionMutationVariables,
  PageImportUpdateItemMutation,
  PageImportUpdateItemMutationVariables,
  TransactionModelType,
  TransactionType,
} from 'src/graphql/types'
import { getTextWithoutAccents } from 'src/shared/get-text-without-accents'
import { gqlOp } from 'src/shared/gql-op'
import { createItem } from 'src/graphql/mutations'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  pageImportCreateTransaction,
  pageImportUpdateItem,
} from 'src/graphql/page-import'
import { listItemsSortedByCreatedAt } from 'src/graphql/queries'
import { debounce } from 'lodash'

const importItemListQueryKey = 'import-list-items'

const text = {
  'Import more': 'Nhập thêm',
  'Import quantity': 'Số lượng nhập',
  Inventory: 'Kho',
}

const NewItemForm = () => {
  const queryClient = useQueryClient()
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    reset: formReset,
  } = useForm<{
    name: string
    quantity: number
    price: number
  }>()
  const { mutate, status: mutationStatus, reset: mutationReset } = useMutation(
    (input: CreateItemMutationVariables['input']) =>
      gqlOp<CreateItemMutation, CreateItemMutationVariables>(createItem, {
        input,
      }),
  )

  useEffect(() => {
    if (mutationStatus === 'success') {
      queryClient.invalidateQueries(importItemListQueryKey)
      formReset()
      mutationReset()
    }
  }, [mutationStatus, formReset, mutationReset, queryClient])

  const onSubmit = async () => {
    const values = getValues()
    const item = {
      modelType: ItemModelType.ITEM,
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      searchField: `${getTextWithoutAccents(values.name).toLowerCase()} ${
        values.price
      }`,
    }
    mutationStatus === 'idle' && mutate(item)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="4">
        <FormControl id="name" isInvalid={!!errors.name?.message}>
          <FormLabel>{sharedText.Name}</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder={sharedText['Printer ink']}
            ref={register({ required: 'Required' })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <Stack direction="row">
          <FormControl id="quantity" isInvalid={!!errors.quantity?.message}>
            <FormLabel>{sharedText.Quantity}</FormLabel>
            <Input
              type="number"
              name="quantity"
              placeholder="10"
              ref={register({ required: 'Required' })}
            />
            <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="price" isInvalid={!!errors.price?.message}>
            <FormLabel>{sharedText.Price} (K)</FormLabel>
            <Input
              type="number"
              name="price"
              placeholder="150"
              ref={register({ required: 'Required' })}
            />
            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Box>
          <Button type="submit" isLoading={mutationStatus === 'loading'}>
            {sharedText.Import}
          </Button>
        </Box>
      </Stack>
    </form>
  )
}
const NewItem = () => (
  <Accordion allowToggle marginY="8">
    <AccordionItem borderWidth="1px" borderColor="gray.300" borderRadius="5px">
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <H2>{sharedText['New item']}</H2>
            </Box>
            {isExpanded ? <MdClose /> : <MdAdd />}
          </AccordionButton>
          <AccordionPanel>
            <NewItemForm />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  </Accordion>
)

const Item: FC<{
  id: string
  name: string
  quantity: number
  price: number
  searchField: string
}> = ({ id, name, quantity, price, searchField }) => {
  const queryClient = useQueryClient()
  const [importQuantity, setImportQuantity] = useState<string>('')
  const { status, reset, mutate } = useMutation(() => {
    return Promise.all([
      gqlOp<
        PageImportCreateTransactionMutation,
        PageImportCreateTransactionMutationVariables
      >(pageImportCreateTransaction, {
        input: {
          itemId: id,
          modelType: TransactionModelType.TRANSACTION,
          price: price,
          quantity: Number(importQuantity),
          searchField,
          type: TransactionType.IN,
        },
      }),
      gqlOp<
        PageImportUpdateItemMutation,
        PageImportUpdateItemMutationVariables
      >(pageImportUpdateItem, {
        input: {
          id,
          quantity: quantity + Number(importQuantity),
        },
      }),
    ])
  })

  useEffect(() => {
    if (status === 'success') {
      queryClient.invalidateQueries(importItemListQueryKey)
      setImportQuantity('')
      reset()
    }
  }, [queryClient, reset, status])

  const onSubmit = () => {
    mutate()
  }

  return (
    <AccordionItem
      marginBottom="4"
      borderWidth="1px"
      borderRadius="5px"
      borderColor="gray.400"
    >
      <AccordionButton
        padding={0}
        border="0"
        borderTopRadius="5px"
        _expanded={{ backgroundColor: 'gray.100' }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          padding="4"
          width="100%"
        >
          <Box display="flex">
            <Text>{name}</Text>
            <Text paddingRight="2" paddingLeft="2">
              - {`${price}K`}
            </Text>{' '}
          </Box>
          <Text>({quantity})</Text>
        </Box>
      </AccordionButton>
      <AccordionPanel>
        <Stack spacing="4">
          <Stack direction="row" alignItems="flex-end">
            <FormControl id={`${id}-quantity`}>
              <FormLabel>{text['Import quantity']}</FormLabel>
              <Input
                type="number"
                placeholder="10"
                onChange={(e) => setImportQuantity(e.target.value)}
                value={importQuantity}
              />
            </FormControl>
            <Box>
              <Button
                isDisabled={importQuantity.trim().length === 0}
                isLoading={status === 'loading'}
                onClick={onSubmit}
              >
                {text['Import more']}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}

const ItemList = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data, status, refetch, isFetching } = useQuery(
    importItemListQueryKey,
    () =>
      gqlOp<
        ListItemsSortedByCreatedAtQuery,
        ListItemsSortedByCreatedAtQueryVariables
      >(listItemsSortedByCreatedAt, {
        modelType: ItemModelType.ITEM,
        filter: { searchField: { contains: searchValue } },
        sortDirection: ModelSortDirection.DESC,
      }),
  )

  const onSearchValueChange = debounce((text) => {
    setSearchValue(getTextWithoutAccents(text))
    refetch()
  }, 300)

  return (
    <Box>
      <H2>{text.Inventory}</H2>
      <FormControl id="search" marginBottom="4">
        <FormLabel>{sharedText.Search}</FormLabel>
        <InputGroup>
          <Input
            type="text"
            placeholder={`${sharedText['Printer ink']} 150`}
            defaultValue={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}
          />
          <InputRightElement children={isFetching ? <Spinner /> : null} />
        </InputGroup>
      </FormControl>
      {status === 'success' && (
        <Accordion allowMultiple>
          {data.data.listItemsSortedByCreatedAt.items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </Accordion>
      )}
    </Box>
  )
}

const Import = () => (
  <PageLayout activeNavItem="import">
    <SEO title="Import" />
    <PageSection>
      <Stack>
        <NewItem />
        <ItemList />
      </Stack>
    </PageSection>
  </PageLayout>
)

export default withAuth(Import)
