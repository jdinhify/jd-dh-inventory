import React, { FC, ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export const PageSection: FC<
  {
    children: ReactNode
    alt?: boolean
  } & BoxProps
> = ({ children, alt, ...rest }) => (
  <Box>
    <Box maxWidth="6xl" margin="0 auto" paddingX="4" position="relative">
      {children}
    </Box>
  </Box>
)
