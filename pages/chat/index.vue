<script setup lang="ts">
const hanko = useHanko()
const value = ref('');
let isEntered = ref(false)
watch(value, async (newValue, oldValue)=>{
    if(!isEntered.value){
        isEntered.value = true
        const router = useRouter()
        const route = useRoute()
        const chat_id = await $fetch("/api/db/create", {
            body: {
                name: "Untitled",
                agent_name: "joey"
            },
            method: "POST"
        })
        let agentToPush = "";
        if(route.query.agent){
            agentToPush = route.query.agent.toString()
        }
        else {
            agentToPush = "joey"
        }
        // const agentToPush = route.query.agent ? route.query.agent!=(null || '') : 'joey'
        router.push({
            path: '/chat/'+ agentToPush + '/'+chat_id,
            query: { chat: value.value },
        })
    }
})


function logout() {
    hanko!.user.logout().then(()=>{
        navigateTo('/')
    })
}

definePageMeta({
  middleware: [
    'hanko-logged-in'
]
})
</script>
<template>
    <div>
        <div class="text-center p-5">
            <header-component />
            <div class="mt-5 uppercase text-5xl font-roboto">
                Welcome back! 
            </div>
            
            <input type="text" name="chatbox" v-model="value" class="w-[450px] lg:w-[800px] border-slate-300 shadow-lg border-2 mt-10 rounded-lg focus:outline-none text-black px-4 py-2"/>
            <br>
            <button @click="logout" class="absolute block translate-x-0 translate-y-[-300px] trans text-gray-500 px-5 py-2 text-sm font-bold rounded-xl mt-5">
                Log out
            </button>
            <div class="mt-10">
                <nuxt-link class=" text-xl bg-blue-900 px-5 py-2 rounded-xl ml-5 font-semibold text-white" to="/profile">View Profile</nuxt-link>
                <nuxt-link class="text-xl bg-blue-900 px-5 py-2 rounded-xl ml-5 font-semibold text-white" to="/history">View History</nuxt-link>
            </div>
            
        </div>
        <div class=" max-w-3xl mx-auto text-center mt-10 p-5">
            <h1 class="text-3xl mb-10">Select Your Character</h1>
            <charachter-selector class="max-w-xl mx-auto cursor-pointer"/>
        </div>
        <footer-component class="footer" />
    </div>

</template>
<style scoped>
.footer {
    margin-top: 100vh;
}
</style>