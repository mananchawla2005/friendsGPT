<script setup>
function afterLogin() {
    navigateTo("/chat")
}
definePageMeta({
  pageTransition: false,
})
</script>
<template>
    <div>
        <div class="text-center p-5">
            <header-component />
            <div class="mt-10 uppercase text-6xl leading-[80px] font-roboto">
                Talk to your favourite charachter <br> from the most popular sitcom 
            </div>
            <div class="text-center my-5 mt-20">
                <div class="container mx-auto">
                    <hanko-auth />
                    <hanko-events @onAuthFlowCompleted="afterLogin()" />
                </div>
                
            </div>
            <div class="mt-10 text-center">
                <img src="/images/friendsheader.png" class="block mx-auto"/>
            </div>
        </div>
        <footer-component />
    </div>
</template>
<style scoped>
/* hanko-auth::part(form-item) {
min-width: 100%;
} */
hanko-auth::part(container) {
margin-left: auto;
margin-right: auto;
}
hanko-auth {
    --background-color: rgb(241 245 249);
}
</style>