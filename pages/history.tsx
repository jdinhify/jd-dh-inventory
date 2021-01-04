import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { PageSection } from 'src/components/page-section'
import { SEO } from 'src/components/seo'
import { withAuth } from 'src/components/with-auth'
import { Button } from 'src/components/button'
import { PageLayout } from 'src/components/page-layout'
import { sharedText } from 'src/shared/text'

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
  <Box marginTop="8">
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

const History = () => (
  <PageLayout activeNavItem="history">
    <SEO title="History" />
    <PageSection>
      <ItemList />
    </PageSection>
  </PageLayout>
)

export default withAuth(History)
