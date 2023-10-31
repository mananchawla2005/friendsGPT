<script>
definePageMeta({
  middleware: [
    'hanko-logged-in'
]
})
</script>
<template>
    <div>
        <div class="p-10 text-center min-h-screen">
            <header-component />
            <h1 class="my-5 mb-20 text-4xl font-black text-slate-700">
                Chat History
            </h1>
            <chat-history />
            <div class="mt-20">
    
                <nuxt-link to="/chat" class="p-5 bg-blue-900 text-white rounded-3xl shadow-xl">Create New Chat</nuxt-link>
            </div>
        </div>
        <footer-component />
    </div>
</template>