import dialogflow from 'dialogflow'
import config from '../config/keys.js'
import { jsonToStructProto } from './structjson.js'

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
}

// Create a new session
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials })

export const textQuery = async function (text, userID, parameters = {}) {
  let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID)
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: languageCode,
      },
    },
    queryParams: {
      payload: {
        data: parameters,
      },
    },
  }
  let responses = await sessionClient.detectIntent(request)
  responses = await handleAction(responses)
  return responses
}

export const eventQuery = async function (event, userID, parameters = {}) {
  let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID)
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: event,
        parameters: jsonToStructProto(parameters),
        languageCode: languageCode,
      },
    },
    queryParams: {
      payload: {
        data: parameters,
      },
    },
  }
  let responses = await sessionClient.detectIntent(request)
  responses = await handleAction(responses)
  return responses
}

export const handleAction = async function (responses) {
  return responses
}
