<script>
definePageMeta({
  middleware: [
    'hanko-logged-in'
]
})
</script>
<template>
    <div>
        <div class="min-h-screen mx-auto text-center p-5">
            <header-component />
            <hanko-profile class="mt-20 flex items-center text-center"></hanko-profile>
        </div>
        <footer-component />
    </div>
</template>
<style scoped>
hanko-profile {
    --background-color: rgb(241 245 249);
    --brand-color: #000000;
    --brand-color-shade-1: #6b6b6b;
    --link-color: #3e3e3e;
}
hanko-profile::part(container) {
margin-left: auto;
margin-right: auto;
}
</style>