import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

const isExternalLink = (href?: string) =>
  href ? /^((https?:)?\/\/|mailto:|tel:)/.test(href) : true

export const Link = ({ href, isExternal, ...restProps }: LinkProps) => {
  return isExternal || isExternalLink(href) ? (
    <ChakraLink isExternal={true} href={href} color="teal.500" {...restProps} />
  ) : (
    <NextLink href={href}>
      <ChakraLink color="teal.500" {...restProps} />
    </NextLink>
  )
}
