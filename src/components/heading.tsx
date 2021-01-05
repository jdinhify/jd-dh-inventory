import { Heading, HeadingProps } from '@chakra-ui/react'
import React, { FC } from 'react'

export const H1: FC<HeadingProps> = ({ children, ...props }) => (
  <Heading as="h1" size="xl" {...props}>
    {children}
  </Heading>
)

export const H2: FC<HeadingProps> = ({ children, ...props }) => (
  <Heading as="h2" size="lg" {...props}>
    {children}
  </Heading>
)

export const H3: FC<HeadingProps> = ({ children, ...props }) => (
  <Heading as="h3" size="md" {...props}>
    {children}
  </Heading>
)

export const H4: FC<HeadingProps> = ({ children, ...props }) => (
  <Heading as="h4" size="sm" {...props}>
    {children}
  </Heading>
)

export const H5: FC<HeadingProps> = ({ children, ...props }) => (
  <Heading as="h5" size="xs" {...props}>
    {children}
  </Heading>
)
