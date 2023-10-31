<script setup>
    const route = useRoute()
    const conversations = ref([])
    onMounted(async ()=>{
        const data = await $fetch("/api/db/conversations", {
            method: "POST",
            body: {
                chat_id: route.params.id
            }
        })
        conversations.value = data
    })
</script>
<template>
    <div class="w-full ">
        <template v-for="c in conversations">
            <p class="block h-9 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl shadow-2xl shadow-black my-5"><nuxt-link :to="'/chat/joey/'+c.id">{{c.name}}</nuxt-link></p>
        </template>
    </div>
</template>