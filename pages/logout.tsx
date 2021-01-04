import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Auth } from '@aws-amplify/auth'

const LogOut = () => {
  const router = useRouter()
  useEffect(() => {
    const signOut = async () => {
      await Auth.signOut()

      router.push('/')
    }

    signOut()
  })
  return null
}

export default LogOut
