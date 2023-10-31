import { client } from '@gradio/client'
import * as jose from "jose";

export default defineEventHandler(async (event) => {
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
    const message = body.message
    const history = body.history
    let previousMessages = []
    let count = 0;
    history.forEach(element => {
        if(element.role=="user"){
            previousMessages.push(["Me: " + element.message])
        }
        else {
            count++;
        }
    });
    let tempcount = 0;
    history.forEach(element=>{
        if(tempcount<=count){ 
            if(element.role=="agent"){
                previousMessages[tempcount].push("Joey: "+element.message)
                tempcount++
            }
        }
    })
    previousMessages = previousMessages.slice(0, -1)
    console.log(previousMessages)
    console.log(message)
    let status_gradio = "";
    let data_gradio = null;
    const data = {
        role: "agent",
        message: ""
    }
    console.log("initiating client....")
    const gradio_app = await client("https://manan05-friends.hf.space/--replicas/9rpn5/");
    console.log("client initiated, sending request...")
    await new Promise((resolve)=>{
        gradio_app.submit(1, [message, previousMessages])
        .on("status", (evt) => {
            status_gradio = evt.stage;
            // callback({ type: evt.type, data: evt });
        })
        .on("data", (evt) => {
            console.log(evt.data[1])
            const data_length = evt.data[1].length
            data_gradio = evt.data[1][data_length-1][1];
            console.log(data_gradio)
            data.message = data_gradio.split("Joey: ")[1]
            resolve()
        });
    })
    // function timeout(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // timeout(120000)
    async function userId() {
        const token = getCookie(event, 'hanko')
        const payload = jose.decodeJwt(token ?? "")
        return payload.sub
    }
    const userID = await userId()
    const serverResponse = await $fetch("/api/db/message", {
        body: {
            chat_id: body.chat_id,
            message: data.message,
            type: "agent",
            userID: userID
        },
        method: "POST"
    })
    // console.log(serverResponse)
    // console.log(data)
    return data

})
