import { serverSupabaseClient } from '#supabase/server'
import * as jose from "jose";


export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const client = await serverSupabaseClient(event)
    async function userId() {
        const token = getCookie(event, 'hanko')
        const payload = jose.decodeJwt(token ?? "")
        return payload.sub
    }
    const userID = body.userID || await userId()
    const {data, error} = await client.from('ChatHistory').insert({
        user_id: userID,
        chat_id: body.chat_id,
        message: {
            role: body.type,
            message: body.message
        }
    }).select()
    console.log(error)
    return data

})