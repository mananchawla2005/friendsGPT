<script setup lang="ts">
const hanko = useHanko()
const value = ref('');

watch(value, async (newValue, oldValue)=>{
    console.log(newValue)
    const router = useRouter()
    const chat_id = await $fetch("/api/db/create", {
        body: {
            name: "Untitled",
            agent_name: "joey"
        },
        method: "POST"
    })
    console.log(chat_id)
    router.push({
        path: '/chat/joey/'+chat_id,
        query: { chat: value.value },
    })
})


function logout() {
    hanko!.user.logout().then(()=>{
        navigateTo('/')
    })
}
</script>
<template>
    <div>
        <div class="text-center p-5">
            <header-component />
            <div class="mt-5 uppercase text-5xl font-roboto">
                Welcome back! 
            </div>
            <input type="text" name="chatbox" v-model="value" class=" w-[800px] border-slate-300 shadow-lg border-2 mt-10 rounded-lg focus:outline-none text-black px-4 py-2"/>
            <br>
            <button @click="logout" class="bg-blue-900 text-white px-5 py-2 text-xl font-bold rounded-xl mt-5">
                Log me out
            </button>
        </div>
        <footer-component class="footer" />
    </div>

</template>
<style scoped>
.footer {
    margin-top: 100vh;
}
</style>