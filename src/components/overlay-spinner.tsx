import React, { FC, ReactNode } from 'react'
import { Spinner, Box } from '@chakra-ui/react'

export const OverlaySpinner: FC<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children?: ReactNode
}> = ({ size = 'lg', children = null }) => (
  <Box
    position="absolute"
    top="0"
    right="0"
    bottom="0"
    left="0"
    opacity={0.5}
    display="flex"
    justifyContent="center"
    alignItems="center"
    zIndex={50}
    backgroundColor="gray.50"
    flexDirection="column"
  >
    <Spinner size={size} />
    {children}
  </Box>
)
