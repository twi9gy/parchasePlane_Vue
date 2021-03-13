<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "Plans",
        created() {
            this.$store.commit('setHint', this.$route.meta.hint);
            this.$store.commit('setHeader', this.$route.meta.pageName);
        }
    }
</script>

<style scoped>

</style>
