import { serverSupabaseClient } from '#supabase/server'

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
    const {data, error} = await client.from('Chats').select('*').eq("id", body.chat_id)
    console.log(error);
    return data[0].name;
    
})