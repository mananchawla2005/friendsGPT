<script setup>
const route = useRoute()
const value = ref(route.query.chat)
const chatText = ref(null);
const pageName = ref('Untitled')

import contenteditable from 'vue-contenteditable';

function pageNameChecker(){
    if(pageName.value==""){
        pageName.value = "Untitled"
    }
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
    }
})

</script>
<template>
    <div>
        <div class="text-center p-5 min-h-[100vh]">
            <div class="fixed w-full border-b-2 border-slate-200 right-0 py-5 min-h-[40px] bg-slate-100 top-0">
                <nuxt-link to="/chat" class="left-4 absolute">Go Back</nuxt-link>
                <contenteditable class="inline focus:outline-none" tag="div" :contenteditable="true" v-model="pageName" :no-nl="true" :no-html="true" @returned="pageNameChecker" @focusout="pageNameChecker"/>
            </div>
            <div class="p-10 w-[450px] lg:w-[800px] mx-auto mb-20">
                <div class="bg-blue-900 text-white px-3 py-5 max-w-[800px] rounded-lg mt-5 text-left">
                    <p>
                        <span class=" bg-slate-100 text-black p-1 rounded-lg mr-2">You </span> this is a message by the user this is a message by the user this is a message by the user this is a message by the user this is a message by the user this is a message by the user
                    </p>
                </div>
                <div class="bg-slate-800 text-white px-3 py-5 max-w-[800px] rounded-lg mt-5 text-left">
                    <p>
                        <span class=" bg-slate-100 text-black p-1 rounded-lg mr-2">Joey </span> how ya doin?
                    </p>
                </div>            
            </div>
            <input type="text" ref="chatText" name="chatbox" v-model="value" class=" w-[450px] lg:w-[800px] border-slate-300 shadow-lg border-2 mt-10 rounded-lg focus:outline-none text-black px-4 py-2 fixed bottom-10 transform -translate-x-1/2" autofocus="autofocus"/>
        </div>
    </div>
</template>