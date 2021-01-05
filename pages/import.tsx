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
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
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
} from 'src/graphql/types'
import { getTextWithoutAccents } from 'src/shared/get-text-without-accents'
import { gqlOp } from 'src/shared/gql-op'
import { createItem } from 'src/graphql/mutations'
import { useMutation } from 'react-query'

const NewItemForm = () => {
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
      formReset()
      mutationReset()
    }
  }, [mutationStatus, formReset, mutationReset])

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

const Item = () => (
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
        <Text>{sharedText['Printer ink']}</Text>
        <Text paddingRight="2" paddingLeft="2">
          150K
        </Text>{' '}
        <Text>(13)</Text>
      </Box>
    </AccordionButton>
    <AccordionPanel>
      <Stack spacing="4">
        <Stack direction="row">
          <FormControl id="quantity">
            <FormLabel>{sharedText.Quantity}</FormLabel>
            <Input type="number" placeholder="10" />
          </FormControl>
          <FormControl id="price">
            <FormLabel>{sharedText.Price} (K)</FormLabel>
            <Input type="number" placeholder="150" />
          </FormControl>
        </Stack>
        <Box>
          <Button>{sharedText.Export}</Button>
        </Box>
      </Stack>
    </AccordionPanel>
  </AccordionItem>
)

const ItemList = () => (
  <Box>
    <FormControl id="search" marginBottom="4">
      <FormLabel>{sharedText.Search}</FormLabel>
      <Input type="text" placeholder={`${sharedText['Printer ink']} 150`} />
    </FormControl>
    <Accordion allowMultiple>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Accordion>
  </Box>
)

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
