import store from '../store'

const {
  CognitoUser,
  CognitoUserPool,
  // CognitoUserAttribute,
  AuthenticationDetails
} = window.AWSCognito.CognitoIdentityServiceProvider

const userPool = new CognitoUserPool({
  UserPoolId: 'eu-west-1_uPimxXveF',
  ClientId: 'ab9r3e42euifvloa40rptc0j2'
})

export let cognitoUser = null

export function logout () {
  cognitoUser.signOut()
  cognitoUser = null
  store.dispatch({ type: 'user/user', user: cognitoUser })
}

export function login(form) {

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

        window.AWSCognito.config.credentials = new window.AWSCognito.CognitoIdentityCredentials({
          Logins: {
            'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_uPimxXveF': result.getIdToken().getJwtToken()
          }
        })

        store.dispatch({ type: 'user/user', user: cognitoUser })
        resolve(result)
      }

    })

  })
}

export function reducer(state = { user: false }, action) {

  switch (action.type) {

    case 'user/user':
      return Object.assign({}, state, { user: action.user })

    default:
      return state;
  }
}
