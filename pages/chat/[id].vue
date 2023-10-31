<script setup>
onMounted(()=>{
    const router = useRouter()
    const route = useRoute()
    router.push({
        path: '/chat/',
        query: { agent: route.params.id},
    })
})
definePageMeta({
  middleware: [
    'hanko-logged-in'
]
})
</script>
<template>
    <div>
        Redirecting...
    </div>
</template>