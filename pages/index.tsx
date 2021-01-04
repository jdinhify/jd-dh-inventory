import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'src/components/link'
import { PageSection } from 'src/components/page-section'
import { SEO } from 'src/components/seo'
import { withAuth } from 'src/components/with-auth'
import { sharedText } from 'src/shared/text'

const Home = () => (
  <>
    <SEO title="Home" />
    <PageSection>
      <Stack spacing="10" textAlign="center" marginTop="16">
        <Box>
          <Link href="/import">{sharedText.Import}</Link>
        </Box>
        <Box>
          <Link href="/export">{sharedText.Export}</Link>
        </Box>
        <Box>
          <Link href="/history">{sharedText.History}</Link>
        </Box>
      </Stack>
    </PageSection>
  </>
)

export default withAuth(Home)
