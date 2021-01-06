import { Box, Stack } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import { Link } from './link'
import { BiImport, BiExport, BiHistory } from 'react-icons/bi'
import { sharedText } from 'src/shared/text'

const NavItem: FC<{
  href: string
  label: string
  isActive?: boolean
  icon: ReactNode
}> = ({ href, label, isActive, icon }) => (
  <Link
    href={href}
    padding="4"
    _hover={{ textDecoration: 'none', color: 'orange.400' }}
    color={isActive ? 'white' : 'gray.400'}
  >
    <Stack alignItems="center" spacing="1px">
      <Box>{icon}</Box>
      <Box>{label}</Box>
    </Stack>
  </Link>
)

export type navItemId = 'import' | 'export' | 'home'

const navItems = [
  {
    key: 'import',
    label: sharedText['Import'],
    icon: BiImport,
    href: '/import',
  },
  {
    key: 'export',
    label: sharedText['Export'],
    icon: BiExport,
    href: '/export',
  },
  {
    key: 'home',
    label: sharedText['Activity'],
    icon: BiHistory,
    href: '/',
  },
]

const Nav: FC<{ activeNavItem: navItemId }> = ({ activeNavItem }) => (
  <Box
    display="flex"
    justifyContent="center"
    width="100%"
    backgroundColor="purple.500"
  >
    <Stack
      direction="row"
      maxWidth="6xl"
      justifyContent="space-around"
      width="100%"
    >
      {navItems.map((navItem) => (
        <NavItem
          key={navItem.key}
          href={navItem.href}
          label={navItem.label}
          icon={<navItem.icon size={20} />}
          isActive={navItem.key === activeNavItem}
        />
      ))}
    </Stack>
  </Box>
)

export const PageLayout: FC<{
  children: ReactNode
  activeNavItem: navItemId
}> = ({ children, activeNavItem }) => (
  <Stack height="100vh">
    <Box flexGrow={1} overflow="auto">
      {children}
    </Box>
    <Nav activeNavItem={activeNavItem} />
  </Stack>
)
