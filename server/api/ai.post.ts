import {Configuration, OpenAIApi} from "openai";

import * as agents from '@/agents'
export default defineEventHandler(async (event) => {
  const {OPENAI_API_KEY} = useRuntimeConfig()
  const body = await readBody(event)
  const agent = body.agent || 'customerSupportAgent'
  if(!Object.keys(agents).includes(agent)){
    throw new Error(`${agent} does not exist`)
  }
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
  })
const openai = new OpenAIApi(configuration)

  const completion = await openai.createChatCompletion({
    messages: body.messages || [],
    model: "gpt-3.5-turbo",
    temperature: body.temperature || 1,
    //@ts-expect-error checking if agent exists in above if statement
    ...agents[agent](body)
  });

return completion.data;


})
