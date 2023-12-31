import { serverSupabaseClient } from '#supabase/server'
import * as jose from "jose";


export default defineEventHandler(async (event)=>{
    const hanko = event.context.hanko;
    if (!hanko || !hanko.sub) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }
    const body = await readBody(event)
    const client = await serverSupabaseClient(event)
    async function userId() {
        const token = getCookie(event, 'hanko')
        const payload = jose.decodeJwt(token ?? "")
        return payload.sub
    }
    const userID = await userId()
    const { data, error } = await client.from('Chats').insert({
        name: body.name,
        agent_name: body.agent_name,
        user_id: userID
    }).select()
    console.log(error)
    return data[0].id
    
})