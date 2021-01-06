import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { useState } from 'react'
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
  TransactionModelType,
  TransactionType,
} from 'src/graphql/types'
import { pageHomeListTransactions } from 'src/graphql/page-home'
import { useQuery } from 'react-query'
import { debounce } from 'lodash'
import { getTextWithoutAccents } from 'src/shared/get-text-without-accents'
import { H2 } from 'src/components/heading'

const transactionListQueryKey = 'home-transaction-list'

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
        filter: { searchField: { contains: searchValue } },
        sortDirection: ModelSortDirection.DESC,
      }),
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
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>{sharedText.Name}</Th>
            <Th>{sharedText.Type}</Th>
            <Th>{sharedText.Time}</Th>
            <Th>{sharedText.Quantity}</Th>
            <Th>{sharedText['Import price']}</Th>
            <Th>{sharedText['Export price']}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {status === 'success' &&
            data.data.listTransactionsSortedByCreatedAt.items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.item.name}</Td>
                <Td>
                  {item.type === TransactionType.IN
                    ? sharedText.Import
                    : sharedText.Export}
                </Td>
                <Td>{new Date(item.createdAt).toLocaleString()}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.type === TransactionType.IN && item.price}</Td>
                <Td>{item.type === TransactionType.OUT && item.price}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
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
