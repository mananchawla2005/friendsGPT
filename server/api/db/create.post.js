import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const client = await serverSupabaseClient(event)
    const { data, error } = await client.from('Chats').insert({
        name: body.name,
        agent_name: body.agent_name
    }).select()
    console.log(error)
    return data[0].id
    
})