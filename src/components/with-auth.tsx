import React, { ComponentType, FC, useEffect, useState } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import {
  appendToCognitoUserAgent,
  CognitoHostedUIIdentityProvider,
} from '@aws-amplify/auth'
import { setAuthData } from 'src/app-data/auth-data'
import { Box } from '@chakra-ui/react'
import { Link } from './link'
import { Button } from './button'
import { useRouter } from 'next/router'

const AuthContainer = ({ children }) => (
  <Box
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    {children}
  </Box>
)

export const withAuth = (Component: ComponentType) => {
  const AppWithAuthenticator: FC = () => {
    const router = useRouter()
    const [sessionInfo, setSessionInfo] = useState<{
      signedIn: boolean
      userGroups?: string[]
    }>({ signedIn: false })

    useEffect(() => {
      appendToCognitoUserAgent('withAuth')
      const checkAuth = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser()
          if (user) {
            setSessionInfo({
              signedIn: true,
              userGroups:
                user.signInUserSession.accessToken.payload['cognito:groups'],
            })
          }
        } catch (err) {
          console.error(err)
        }
      }
      checkAuth()

      return onAuthUIStateChange((authState, authData: any) => {
        if (
          authState === AuthState.SignedIn ||
          authState === AuthState.VerifyContact
        ) {
          setAuthData(authData)

          setSessionInfo({
            signedIn: true,
            userGroups:
              authData.signInUserSession.accessToken.payload['cognito:groups'],
          })
        } else if (authState === AuthState.SignedOut) {
          setSessionInfo({ signedIn: false })
        }
      })
    }, [])

    useEffect(() => {
      Hub.listen('auth', ({ payload: { event, data } }) => {
        if (event === 'signIn') {
          setSessionInfo({
            signedIn: true,
            userGroups:
              data.signInUserSession.accessToken.payload['cognito:groups'],
          })
        }

        if (event === 'customOAuthState') {
          const { redirect } = JSON.parse(data)
          router.replace(redirect)
        }
      })
    }, [router])

    return sessionInfo.signedIn ? (
      sessionInfo?.userGroups?.includes('AppUser') ? (
        <Component />
      ) : (
        <AuthContainer>
          <Link href="/logout">Logout</Link>
        </AuthContainer>
      )
    ) : (
      <AuthContainer>
        <Button
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
              customState: JSON.stringify({
                redirect: router.pathname,
              }),
            })
          }
        >
          Login with Google
        </Button>
      </AuthContainer>
    )
  }

  return AppWithAuthenticator
}
