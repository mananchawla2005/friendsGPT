<script setup>
const route = useRoute()
const value = ref(route.query.chat)
const chatText = ref(null);
const pageName = ref('')
const isDisabled = ref(false)
const hanko = useHanko()
import contenteditable from 'vue-contenteditable';
import { createRouterMatcher } from 'vue-router';
// let data = reactive([{
//     role: "user",
//     message: "Hello World"
// }, {
//     role: "agent",
//     message: "hiii"
// }])
let data = reactive([])
onMounted(async ()=>{
    const historyData = await $fetch('/api/db/history', {
        body: {
            chat_id: route.params.id,
            
        },
        method: "POST"
    })
    console.log(historyData)
    if(!historyData) {
        const router = useRouter()
        router.push("/")
    }
    // if(historyData.body.message=="Unauthorized") {
    //     return
    // }
    historyData.forEach(element => {
        data.push(element.message)
    });
    
    $fetch("/api/db/getName", {
        method: "POST",
        body: {
            chat_id: route.params.id
        }
    }).then((x)=>{
        pageName.value = x
    })
    


})

async function pageNameChecker(){
    if(pageName.value==""){
        pageName.value = "Untitled"
    }
    await $fetch("/api/db/changeName", {
        method: "POST",
        body: {
            chat_id: route.params.id,
            name: pageName.value
        }
    })
 }



async function onEnter(){
    const messageValue = value.value
    const message = {
        role: "user",
        message: messageValue
    }
    const serverResponse = await $fetch("/api/db/message", {
        body: {
            chat_id: route.params.id,
            message: messageValue,
            type: "user"
        },
        method: "POST"
    })
    console.log(serverResponse)
    data.push(message)
    value.value="Loading Response...."
    chatText.value.focus
    isDisabled.value = true;
    const response = await $fetch("/api/joey/complete", {
        method: "POST",
        body: {
            message: messageValue,
            history: data,
            chat_id: route.params.id
        },
        timeout: 120000
    })
    value.value = ""
    isDisabled.value = false;
    data.push(response);
}

definePageMeta({
    pageTransition: {
        onAfterLeave: () =>{
            try {
                
                if(chatText){
                    chatText.value.focus()
                }
            } catch (error) {
                
            }
        }
    },
    middleware: [
    'hanko-logged-in'
    ]
})

</script>
<template>
    <div>
        <div class="text-center p-5 min-h-[100vh]">
            <div class="fixed w-full border-b-2 border-slate-200 right-0 py-5 min-h-[40px] bg-slate-100 top-0">
                <nuxt-link to="/chat" class="left-4 absolute">Go Back</nuxt-link>
                <contenteditable class="inline focus:outline-none" tag="div" :contenteditable="true" v-model="pageName" :no-nl="true" :no-html="true" @returned="pageNameChecker" @focusout="pageNameChecker"/>
                <nuxt-link to="/history" class="right-4 absolute lg:hidden">View History</nuxt-link>
            </div>
            <div class="lg:grid grid-cols-5">
                <div class="col-span-1 mt-20 hidden xl:block">
                    <h1 class="text-xl font-black">Chat History</h1>
                    <chat-history />
                </div>
                <div class="p-10 w-[450px] lg:w-[800px] mx-auto mb-20 col-span-3">
                    <p class="mt-56 text-3xl text-gray-400 absolute transform translate-x-1/2 translate-y-1/2 font-light">F.R.I.E.N.D.S.GPT</p>
                    <template v-for="(d, index) in data" :key="d.message">
                        <div class="bg-blue-900 text-white px-3 py-5 max-w-[800px] rounded-lg mt-5 text-left" v-if="d.role=='user'">
                            <p>
                                <span class=" bg-slate-100 text-black p-1 rounded-lg mr-2">You </span> {{ d.message }}
                            </p>
                        </div>
                        <div class="bg-slate-800 text-white px-3 py-5 max-w-[800px] rounded-lg mt-5 text-left" v-if="d.role=='agent'">
                            <p>
                                <span class=" bg-slate-100 text-black p-1 rounded-lg mr-2">Joey </span> {{ d.message }}
                            </p>
                        </div>            
                    </template>
                </div>
                <div class="col-span-1 mt-20 hidden xl:block">
                    <h1 class="text-xl font-black">Select Charachter</h1>
                    <charachter-selector />
                </div>
            </div>
            <input type="text" ref="chatText" v-bind:disabled="isDisabled" name="chatbox" v-model="value" class=" w-[450px] lg:w-[800px] border-slate-300 shadow-lg border-2 mt-10 rounded-lg focus:outline-none text-black px-4 py-2 fixed bottom-10 transform -translate-x-1/2" autofocus="autofocus" v-on:keyup.enter="onEnter"/>
        </div>
    </div>
</template>