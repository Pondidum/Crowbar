import { userChanged } from './actions'
import uuid from 'uuid/v4'

const {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails
} = window.AWSCognito.CognitoIdentityServiceProvider

const userPool = new CognitoUserPool({
  UserPoolId: 'eu-west-1_uPimxXveF',
  ClientId: 'ab9r3e42euifvloa40rptc0j2'
})

export let cognitoUser = null

export function register(userData, dispatch) {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: userData.username }),
    new CognitoUserAttribute({ Name: 'nickname', Value: userData.name })
  ]

  return new Promise((resolve, reject) => {
    userPool.signUp(
      uuid(),
      userData.password,
      attributeList,
      null,
      (err, result) => {
        if (err) return reject(err)
        cognitoUser = result.user
        dispatch(userChanged(cognitoUser))
        resolve(result.user)
      }
    )
  })
}

export function verify(form, dispatch) {
  return new Promise((resolve, reject) =>
    cognitoUser.confirmRegistration(form.code, false, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  )
}

export function logout(dispatch) {
  cognitoUser.signOut()
  cognitoUser = null
  dispatch(userChanged(cognitoUser))
}

export function login(form, dispatch) {
  const { username, password } = form

  return new Promise((resolve, reject) => {
    var auth = {
      Username: username,
      Password: password
    }

    const authenticationDetails = new AuthenticationDetails(auth)
    const userData = {
      Username: username,
      Pool: userPool
    }

    cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onFailure: reject,
      onSuccess: result => {
        window.AWSCognito.config.credentials = new window.AWSCognito
          .CognitoIdentityCredentials({
          Logins: {
            'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_uPimxXveF': result
              .getIdToken()
              .getJwtToken()
          }
        })

        dispatch(userChanged(cognitoUser))
        resolve(result)
      }
    })
  })
}

export function reducer(state = { user: false }, action) {
  switch (action.type) {
    case 'USER_CHANGED':
      return Object.assign({}, state, { user: action.user })

    default:
      return state
  }
}
