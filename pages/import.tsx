import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { PageSection } from 'src/components/page-section'
import { SEO } from 'src/components/seo'
import { withAuth } from 'src/components/with-auth'
import { MdAdd } from 'react-icons/md'
import { Button } from 'src/components/button'
import { PageLayout } from 'src/components/page-layout'
import { sharedText } from 'src/shared/text'
import { H2, H3 } from 'src/components/heading'
import { useForm } from 'react-hook-form'
import {
  CreateItemMutation,
  CreateItemMutationVariables,
  ItemModelType,
  ListItemsSortedByCreatedAtQuery,
  ListItemsSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  PageImportImportItemMutation,
  PageImportImportItemMutationVariables,
  TransactionModelType,
  TransactionType,
} from 'src/graphql/types'
import { getTextWithoutAccents } from 'src/shared/get-text-without-accents'
import { gqlOp } from 'src/shared/gql-op'
import { createItem } from 'src/graphql/mutations'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { pageImportImportItem } from 'src/graphql/page-import'
import { listItemsSortedByCreatedAt } from 'src/graphql/queries'
import { debounce } from 'lodash'
import { format } from 'date-fns'
import { getNumberValue } from 'src/shared/get-number-value'

const importItemListQueryKey = 'import-item-list'

const text = {
  'Import quantity': 'Số lượng nhập',
  'Import item': 'Nhập hàng',
  Inventory: 'Kho',
  notesLabel: 'Ghi chú (tên đơn vị nhập, lưu ý, etc...)',
  notesPlaceholder: 'Tên đơn vị nhập, lưu ý, etc...',
  dateLabel: 'Ngày nhập',
}

const NewItem = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const queryClient = useQueryClient()
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    reset: formReset,
  } = useForm<{
    name: string
    quantity: string
    price: string
    notes: string
    date: string
  }>()
  const { mutate, status: mutationStatus, reset: mutationReset } = useMutation(
    () => {
      const { name, price, quantity, notes, date } = getValues()
      const input = {
        modelType: ItemModelType.ITEM,
        name: name,
        price: getNumberValue(price),
        quantity: getNumberValue(quantity),
        notes: notes,
        searchField: `${getTextWithoutAccents(
          name,
        ).toLowerCase()} ${price} ${getTextWithoutAccents(
          notes,
        ).toLowerCase()}`,
        createdAt: new Date(date).toISOString(),
      }

      return gqlOp<CreateItemMutation, CreateItemMutationVariables>(
        createItem,
        {
          input,
        },
      )
    },
  )

  useEffect(() => {
    if (mutationStatus === 'success') {
      queryClient.invalidateQueries(importItemListQueryKey)
      formReset()
      mutationReset()
      onClose()
    }
  }, [mutationStatus, formReset, mutationReset, queryClient, onClose])

  const onSubmit = () => mutate()
  const closeModal = () => {
    if (mutationStatus !== 'loading') {
      formReset()
      mutationReset()
      onClose()
    }
  }

  return (
    <>
      <IconButton
        aria-label="New item"
        icon={<MdAdd />}
        onClick={onOpen}
        variant="outline"
        colorScheme="green"
      />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{sharedText['New item']}</ModalHeader>
          <ModalBody>
            <Stack spacing="4">
              <FormControl id="name" isInvalid={!!errors.name?.type}>
                <FormLabel>{sharedText.Name}</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder={sharedText['Printer ink']}
                  ref={register({ required: 'Required' })}
                />
              </FormControl>
              <Stack direction="row">
                <FormControl id="quantity" isInvalid={!!errors.quantity?.type}>
                  <FormLabel>{sharedText.Quantity}</FormLabel>
                  <Input
                    type="text"
                    name="quantity"
                    placeholder="10"
                    ref={register({
                      required: 'Required',
                      validate: (value) =>
                        Number.isInteger(getNumberValue(value)),
                    })}
                  />
                </FormControl>
                <FormControl id="price" isInvalid={!!errors.price?.type}>
                  <FormLabel>{sharedText.Price}</FormLabel>
                  <Input
                    type="text"
                    name="price"
                    placeholder="150,000"
                    ref={register({
                      required: 'Required',
                      validate: (value) =>
                        Number.isInteger(getNumberValue(value)),
                    })}
                  />
                </FormControl>
              </Stack>
              <FormControl id="notes" isInvalid={!!errors.notes?.type}>
                <FormLabel>{text.notesLabel}</FormLabel>
                <Input
                  type="text"
                  name="notes"
                  placeholder={text.notesPlaceholder}
                  ref={register({ required: 'Required' })}
                />
              </FormControl>
              <FormControl id="date" isInvalid={!!errors.date?.type}>
                <FormLabel>{text.dateLabel}</FormLabel>
                <Input
                  type="date"
                  name="date"
                  defaultValue={format(new Date(), 'yyyy-MM-dd')}
                  ref={register}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              marginRight="4"
              onClick={closeModal}
              secondary
            >
              {sharedText.Close}
            </Button>
            <Button
              isLoading={mutationStatus === 'loading'}
              onClick={handleSubmit(onSubmit)}
            >
              {sharedText.Import}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const ImportItemModal: FC<
  {
    isOpen: boolean
    onClose: () => void
  } & ListItemsSortedByCreatedAtQuery['listItemsSortedByCreatedAt']['items'][0]
> = ({ id, name, quantity, price, searchField, notes, isOpen, onClose }) => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    reset: formReset,
  } = useForm<{
    'import-quantity': string
    date: string
  }>()
  const { status, reset, mutate } = useMutation(() => {
    const formValues = getValues()
    return gqlOp<
      PageImportImportItemMutation,
      PageImportImportItemMutationVariables
    >(pageImportImportItem, {
      createTransactionInput: {
        itemId: id,
        modelType: TransactionModelType.TRANSACTION,
        price: price,
        quantity: getNumberValue(formValues['import-quantity']),
        searchField,
        notes,
        type: TransactionType.IMPORT,
        createdAt: new Date(formValues.date).toISOString(),
      },
      updateItemInput: {
        id,
        quantity: quantity + getNumberValue(formValues['import-quantity']),
      },
    })
  })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (status === 'success') {
      queryClient.invalidateQueries(importItemListQueryKey)
      reset()
      onClose()
    }
  }, [queryClient, reset, status, onClose])

  const onSubmit = () => mutate()

  const closeModal = () => {
    if (status !== 'loading') {
      formReset()
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{text['Import item']}</ModalHeader>
        <ModalBody>
          <H3 marginBottom="6">{`${name} - ${price} - ${notes} - (${quantity})`}</H3>
          <FormControl
            id="import-quantity"
            marginBottom="4"
            isInvalid={!!errors['import-quantity']?.type}
          >
            <FormLabel>{text['Import quantity']}</FormLabel>
            <Input
              type="string"
              placeholder="15"
              name="import-quantity"
              ref={register({
                required: 'Required',
                validate: (value) => getNumberValue(value) > 0,
              })}
            />
          </FormControl>
          <FormControl id="date" isInvalid={!!errors.date?.type}>
            <FormLabel>{text.dateLabel}</FormLabel>
            <Input
              type="date"
              name="date"
              defaultValue={format(new Date(), 'yyyy-MM-dd')}
              ref={register}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={closeModal} marginRight="4">
            Close
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            isLoading={status === 'loading'}
          >
            {sharedText['Import']}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const Item: FC<
  {
    onClick: () => void
  } & ListItemsSortedByCreatedAtQuery['listItemsSortedByCreatedAt']['items'][0]
> = ({ name, quantity, price, notes, onClick }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="4"
      width="100%"
      borderWidth="1px"
      borderRadius="5px"
      borderColor="gray.300"
      _hover={{ borderColor: 'gray.500', cursor: 'pointer' }}
      onClick={onClick}
    >
      <Box display="flex">
        <Text>{name}</Text>
        <Text paddingRight="2" paddingLeft="2">
          - {`${price} - ${notes}`}
        </Text>{' '}
      </Box>
      <Text>({quantity})</Text>
    </Box>
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
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>()
  const selectedItem = data?.data?.listItemsSortedByCreatedAt?.items?.find(
    ({ id }) => id === selectedItemId,
  )

  const onSearchValueChange = debounce((text) => {
    setSearchValue(getTextWithoutAccents(text).toLowerCase())
    refetch()
  }, 300)

  return (
    <Box marginTop="8">
      <Stack direction="row" justifyContent="space-between">
        <H2>{text.Inventory}</H2>
        <NewItem />
      </Stack>
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
        <Stack>
          {data.data.listItemsSortedByCreatedAt.items.map((item) => (
            <Item
              key={item.id}
              {...item}
              onClick={() => setSelectedItemId(item.id)}
            />
          ))}
        </Stack>
      )}
      <ImportItemModal
        {...selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItemId(undefined)}
      />
    </Box>
  )
}

const Import = () => (
  <PageLayout activeNavItem="import">
    <SEO title="Import" />
    <PageSection>
      <ItemList />
    </PageSection>
  </PageLayout>
)

export default withAuth(Import)
