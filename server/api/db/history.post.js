import { serverSupabaseClient } from '#supabase/server'
// import * as jose from "jose";


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
    const cookies = parseCookies(event)
    // async function userId() {
    //     const token = cookies?.hanko?.value
    //     const payload = jose.decodeJwt(token ?? "")
    //     return payload.sub
    // }
    // const userID = await userId()
    const {data, error} = await client.from('ChatHistory').select('*').eq("chat_id", body.chat_id).order('created_at', { ascending: true })
    console.log(error)
    return data

})