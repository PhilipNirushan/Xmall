let config = {}

if (process.env.NODE_ENV === 'production') {
  config = {
    googleProjectID: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionID: process.env.DIALOGFLOW_SESSION_ID,
    dialogFlowSessionLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
  }
} else {
  config = {
    googleProjectID: 'xmall-chat-bot',
    dialogFlowSessionID: 'xmall-bot-session',
    dialogFlowSessionLanguageCode: 'en-US',
    googleClientEmail:
      'dialogflow-client@xmall-chat-bot.iam.gserviceaccount.com',
    googlePrivateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyYRgo4fcHAoiF\nmp0QkE70xUEM24Pr2DR8GOKvXTTxs1jWsc6H3omKZuWpxQx3OzRywzFBHS62QITL\nDBr29AoyJueCqNKsrI01z3XJk1iIIODRQXNS7j7Ym5hNWcssMO1lgzdbyHsQ2QBX\nXOW4jU4hnpfmy85zlrOjo7EvAVU68t/SND4sUK7/XoNjrrF/7DMPiMZWySuBUR4z\nbGW7iAbbVhT2VQdi/zwMXdcUimcpf1QcHcIoCecNeJMhKALuvsRtchNIhG5W/O5w\nE57GEONqMrGHPoTmGqhPM/cewsRQHteyIVV1/BLB5/OHjPsyiTAVituf6WbBgePU\nGEehM0tfAgMBAAECggEAJUOpY2kJTRqXYKnTJBGxnOrUUxZMselh1YbxXEcxd0jL\nR1av2ayAuTwTwGqc1w+0PkFOudaZ2pMR6sUloO+Mbbu444/XKyGFAnfLmIfCl/We\nYbi1md6RnHis0YPvsNSr02gdGXyBURy0OIv8pZhHeTiDbUCoaXdTId1hd3tkzcJz\n091rmgKfnQ6IPoABBjL0PRY6ALFfOEWYH7/35bYrWovgd3McHp8dG94nmV5UOKKI\ngsgFV8VrhiZpcJg5MPXY7iG4gdbiaw2YD+/xly385k1Oqnzk6cAER7IoA/bjUPh0\nHD8hiL1gff2YHmKT/jsiGt4mKX3kqMwUh8Ny1+RjEQKBgQDi2wIrcompsi4yWKmP\ne8vhXdo5E3sUBbySzkKNmjS+Zik19NBjsy0J0vIufAnkU1dWXg7PVGg7KpPG58mp\ncu6Nnqjx6hCL9pjImcB/2xO6GHVQ+oSa7t2GhomWIpwuQwze+7vLYChXNsVh7hnz\n8Wv5L1lpVhTyLGlQeazdhLN8pwKBgQDJS8OOid4tJ2C4nOtM8aJImxqqFCQA07DP\nIhJiZGn7UDkP7v70K3gmUFI4UhXJx20sLvMRHzvQzhVnEMfU0KDth3Bk+NHIbJ6n\nKgmR7fhHliwNvP68PHFkusOzr5BW0M88QbuTLNPqTSXusv89nT0lIrveyIeCM10/\nrkOAMBJ6iQKBgDoqta+2Op4MVdQK788eivRKQD4KRLCpl+R8howQUh3PzBlNoHEv\n7Ahs0jQhEdg9llNK4rk+h0tEa4fAvvB3y7r8R41f2sZIgHxPEBC4d6JrywjsczvW\nq25m6LhaP3mNL6utGEXZbf6OyKWHi5gE+w51mZNswwolYQuFZ1GVSQBZAoGAZsQJ\nOFHmXYMG+/kQn52UziBxQnc50jpAv96TKCw/dxADscC/5IP0uQq0jxBJE1R+xdnK\nOemKLhWoE5AblOhV4C4PEV1+LCZX8NujOx8Ua+ec4f6kxhDNizFWC/wLYmcEBa1B\nR+fQ4IM2ZGB5skj+GGFdLGWP2MbESmh7CYyBQpECgYBlymto0p3rLHIcpNY3KTuA\nuOULCEwtFjU1EMxCo+2hXvOPlJmsF2c4YTACH7ZZxLOe95DaRZc7NnY09ZMJvuKg\nifc4e+n7cy47lFxWZG+S3b1ujpjU7c8Vb+FwcmwBrrjJW7rWoJZ8CmSNSe7wzUQo\n752jDXZLhUW5fybCklbMBw==\n-----END PRIVATE KEY-----\n',
  }
}

export default config
