import Amplify from 'aws-amplify'

Amplify.configure({
    aws_appsync_graphqlEndpoint: 'YOUR_URL',
    aws_appsync_region: 'us-east-2',
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: 'YOUR_API_KEY'
})
