/* Amplify Params - DO NOT EDIT
	API_JDDHINVENTORY_GRAPHQLAPIENDPOINTOUTPUT
	API_JDDHINVENTORY_GRAPHQLAPIIDOUTPUT
	API_JDDHINVENTORY_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const axios = require('axios')
const gql = require('graphql-tag')
const graphql = require('graphql')
const { print } = graphql
const appsyncUrl = process.env.API_JDDHINVENTORY_GRAPHQLAPIENDPOINTOUTPUT
const apiKey = process.env.API_JDDHINVENTORY_GRAPHQLAPIKEYOUTPUT

const graphqlQuery = gql`
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
    }
  }
`

const createTransaction = async (record) =>
  new Promise((resolve, reject) => {
    const newImage = record.dynamodb.NewImage
    const itemId = newImage.id.S
    const price = newImage.price.N
    const quantity = newImage.quantity.N
    const searchField = newImage.searchField.S
    const notes = newImage.notes.S
    const createdAt = newImage.createdAt.S
    const variables = {
      input: {
        itemId,
        price,
        quantity,
        searchField,
        notes,
        createdAt,
        type: 'IN',
        modelType: 'TRANSACTION',
      },
    }
    const request = {
      url: appsyncUrl,
      method: 'post',
      headers: {
        'x-api-key': apiKey,
      },
      data: {
        query: print(graphqlQuery),
        variables,
      },
    }

    axios(request)
      .then((response) => resolve(response.data))
      .catch(reject)
  })

exports.handler = async (event) => {
  const result = await Promise.allSettled(
    event.Records.filter(({ eventName }) => eventName === 'INSERT').map(
      createTransaction,
    ),
  )

  console.log(JSON.stringify(result, null, 2))

  return Promise.resolve('new item processed')
}
