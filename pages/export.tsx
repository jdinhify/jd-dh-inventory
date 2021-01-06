import {
  Box,
  FormControl,
  FormLabel,
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
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { PageSection } from 'src/components/page-section'
import { SEO } from 'src/components/seo'
import { withAuth } from 'src/components/with-auth'
import { Button } from 'src/components/button'
import { PageLayout } from 'src/components/page-layout'
import { sharedText } from 'src/shared/text'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { gqlOp } from 'src/shared/gql-op'
import {
  ItemModelType,
  ListItemsSortedByCreatedAtQuery,
  ListItemsSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  PageExportExportItemMutation,
  PageExportExportItemMutationVariables,
  TransactionModelType,
  TransactionType,
} from 'src/graphql/types'
import { pageExportExportItem } from 'src/graphql/page-export'
import { listItemsSortedByCreatedAt } from 'src/graphql/queries'
import { debounce } from 'lodash'
import { getTextWithoutAccents } from 'src/shared/get-text-without-accents'
import { H2, H3 } from 'src/components/heading'
import { useForm } from 'react-hook-form'

const exportItemListQueryKey = 'export-list-items'

const text = {
  'Export quantity': 'Số lượng xuất',
  'Export price': 'Giá xuất',
  'Export item': 'Xuất hàng',
  Inventory: 'Kho',
}

const Item: FC<{
  name: string
  quantity: number
  price: number
  onClick: () => void
}> = ({ name, quantity, price, onClick }) => {
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
          - {`${price}K`}
        </Text>{' '}
      </Box>
      <Text>({quantity})</Text>
    </Box>
  )
}

const ExportItemModal: FC<{
  isOpen: boolean
  id: string
  name: string
  quantity: number
  price: number
  searchField: string
  onClose: () => void
}> = ({ id, name, quantity, price, searchField, isOpen, onClose }) => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    reset: formReset,
  } = useForm<{
    'export-price': string
    'export-quantity': string
  }>()
  const { status, reset, mutate } = useMutation(() => {
    const formValues = getValues()
    return gqlOp<
      PageExportExportItemMutation,
      PageExportExportItemMutationVariables
    >(pageExportExportItem, {
      createTransactionInput: {
        itemId: id,
        modelType: TransactionModelType.TRANSACTION,
        price: Number(formValues['export-price']),
        quantity: Number(formValues['export-quantity']),
        searchField,
        type: TransactionType.OUT,
      },
      updateItemInput: {
        id,
        quantity: quantity - Number(formValues['export-quantity']),
      },
    })
  })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (status === 'success') {
      queryClient.invalidateQueries(exportItemListQueryKey)
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
        <ModalHeader>{text['Export item']}</ModalHeader>
        <ModalBody>
          <H3 marginBottom="6">{`${name} - ${price}K (${quantity})`}</H3>
          <FormControl
            id="export-quantity"
            marginBottom="4"
            isInvalid={!!errors['export-quantity']?.message}
          >
            <FormLabel>{text['Export quantity']}</FormLabel>
            <Input
              type="number"
              placeholder="10"
              name="export-quantity"
              ref={register({
                required: 'Required',
                min: { value: 0, message: 'Minimum value' },
                max: { value: quantity, message: 'Maximum value' },
              })}
            />
          </FormControl>
          <FormControl
            id="export-price"
            isInvalid={!!errors['export-price']?.message}
          >
            <FormLabel>{text['Export price']} (K)</FormLabel>
            <Input
              type="number"
              placeholder="100"
              name="export-price"
              ref={register({ required: 'Required' })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            onClick={closeModal}
            marginRight="4"
            secondary
          >
            {sharedText.Close}
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            isLoading={status === 'loading'}
          >
            {sharedText['Export']}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const ItemList = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data, status, refetch, isFetching } = useQuery(
    exportItemListQueryKey,
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
      <ExportItemModal
        {...selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItemId(undefined)}
      />
    </Box>
  )
}

const Export = () => (
  <PageLayout activeNavItem="export">
    <SEO title="Export" />
    <PageSection>
      <ItemList />
    </PageSection>
  </PageLayout>
)

export default withAuth(Export)
