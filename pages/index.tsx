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
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { PageSection } from 'src/components/page-section'
import { SEO } from 'src/components/seo'
import { withAuth } from 'src/components/with-auth'
import { PageLayout } from 'src/components/page-layout'
import { sharedText } from 'src/shared/text'
import { gqlOp } from 'src/shared/gql-op'
import {
  ModelSortDirection,
  PageHomeListTransactionsQuery,
  PageHomeListTransactionsQueryVariables,
  RevertTransactionMutation,
  RevertTransactionMutationVariables,
  TransactionModelType,
  TransactionType,
} from 'src/graphql/types'
import {
  pageHomeListTransactions,
  revertTransaction,
} from 'src/graphql/page-home'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { debounce } from 'lodash'
import { getTextWithoutAccents } from 'src/shared/get-text-without-accents'
import { H2, H3 } from 'src/components/heading'
import { MdClose } from 'react-icons/md'
import { Button } from 'src/components/button'
import { getNumberDisplayValue } from 'src/shared/get-number-display-value'

const transactionListQueryKey = 'home-transaction-list'

const text = {
  revertTransactionModalHeader: 'Huỷ hoạt động',
  revertTransactionModalSubtitle: 'Xác nhận huỷ hoạt động?',
  Confirm: 'Xác nhận',
}

const RevertTransactionModal: FC<
  {
    isOpen: boolean
    onClose: () => void
  } & PageHomeListTransactionsQuery['listTransactionsSortedByCreatedAt']['items'][0]
> = ({ isOpen, onClose, id, item, quantity, price, notes, createdAt }) => {
  const { mutate, status, reset } = useMutation(() =>
    gqlOp<RevertTransactionMutation, RevertTransactionMutationVariables>(
      revertTransaction,
      {
        updateTransactionInput: {
          id: id,
          type: TransactionType.EXPORT_REVERTED,
        },
        updateItemInput: {
          id: item.id,
          quantity: item.quantity + quantity,
        },
      },
    ),
  )
  const queryClient = useQueryClient()

  useEffect(() => {
    if (status === 'success') {
      queryClient.invalidateQueries(transactionListQueryKey)
      reset()
      onClose()
    }
  }, [queryClient, reset, status, onClose])

  const closeModal = () => {
    if (status !== 'loading') {
      reset()
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{text.revertTransactionModalHeader}</ModalHeader>
        <ModalBody>
          <H2 marginBottom="4">{text.revertTransactionModalSubtitle}</H2>
          <H3>{`${sharedText.Export}: ${
            item?.name
          } - ${price} - ${notes} - ${new Date(
            createdAt,
          ).toLocaleDateString()}`}</H3>
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
          <Button isLoading={status === 'loading'} onClick={() => mutate()}>
            {text.Confirm}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const ItemList = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data, status, refetch, isFetching } = useQuery(
    transactionListQueryKey,
    () =>
      gqlOp<
        PageHomeListTransactionsQuery,
        PageHomeListTransactionsQueryVariables
      >(pageHomeListTransactions, {
        modelType: TransactionModelType.TRANSACTION,
        filter: {
          type: { ne: TransactionType.EXPORT_REVERTED },
          searchField: { contains: searchValue },
        },
        sortDirection: ModelSortDirection.DESC,
      }),
  )
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | undefined
  >()
  const selectedTransaction = data?.data.listTransactionsSortedByCreatedAt.items.find(
    ({ id }) => id === selectedTransactionId,
  )

  const onSearchValueChange = debounce((text) => {
    setSearchValue(getTextWithoutAccents(text).toLowerCase())
    refetch()
  }, 300)

  return (
    <Box marginTop="8">
      <H2>{sharedText.Activity}</H2>
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
      <Box overflow="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>{sharedText.Name}</Th>
              <Th>{sharedText.Type}</Th>
              <Th>{sharedText.Notes}</Th>
              <Th>{sharedText.Time}</Th>
              <Th>{sharedText.Quantity}</Th>
              <Th>{sharedText['Import price']}</Th>
              <Th>{sharedText['Export price']}</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {status === 'success' &&
              data.data.listTransactionsSortedByCreatedAt.items.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.item.name}</Td>
                  <Td>
                    {item.type === TransactionType.IMPORT
                      ? sharedText.Import
                      : sharedText.Export}
                  </Td>
                  <Td>{item.notes}</Td>
                  <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>
                    {item.type === TransactionType.IMPORT &&
                      getNumberDisplayValue(item.price)}
                  </Td>
                  <Td>
                    {item.type === TransactionType.EXPORT &&
                      getNumberDisplayValue(item.price)}
                  </Td>
                  <Td>
                    {item.type === TransactionType.EXPORT && (
                      <IconButton
                        icon={<MdClose />}
                        aria-label="Revert transaction"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => setSelectedTransactionId(item.id)}
                      />
                    )}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <RevertTransactionModal
        {...selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransactionId(undefined)}
      />
    </Box>
  )
}

const Home = () => (
  <PageLayout activeNavItem="home">
    <SEO title="Home" />
    <PageSection>
      <ItemList />
    </PageSection>
  </PageLayout>
)

export default withAuth(Home)
