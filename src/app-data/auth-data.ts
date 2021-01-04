export type AuthData = {
  attributes: {
    email: string
    sub: string
  }
}

let authData: AuthData

export const setAuthData = (data: AuthData) => {
  authData = data
}

export const getAuthData = () => authData
