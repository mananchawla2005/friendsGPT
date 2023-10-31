import { serverSupabaseClient } from '#supabase/server'


export default defineEventHandler(async (event)=>{
    const client = await serverSupabaseClient(event)
    const {data, error} = await client.from("distinct_agents").select()
    console.log(data)
    return data

})