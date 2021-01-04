import React, { FC } from 'react'
import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'

export const Button: FC<ButtonProps & { secondary?: Boolean }> = ({
  secondary,
  ...props
}) => <ChakraButton {...props} colorScheme={secondary ? 'yellow' : 'orange'} />
