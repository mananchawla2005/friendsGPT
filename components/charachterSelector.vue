<script setup>
    const agents = ref([])
    onMounted(async ()=>{
        const data = await $fetch("/api/db/agents", {
            method: "GET",
        })
        agents.value = data
    })
    function submit(agent_name) {
        const router = useRouter()
        const route = useRoute()
        router.replace({
            query: {
                agent: agent_name
            }
        })
        console.log(agent_name)
    }
</script>
<template>
    <div class="w-full ">
        <template v-for="a in agents">
            <button @click="submit(a.agent_name)" class="my-5 block p-5 bg-blue-950 uppercase text-xl font-black rounded-xl shadow-2xl text-white w-full">{{ a.agent_name }}</button>
        </template>
    </div>
</template>