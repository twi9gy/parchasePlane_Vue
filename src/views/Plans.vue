<template>
    <div>

    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: "Plans",
        created() {
            this.setHeader(this.$route.meta.pageName);
            this.setHint(this.$route.meta.hint);
        },
        computed: mapGetters([""]),
        methods: {
            ...mapMutations(["setHeader", "setHint"])
        }
    }
</script>

<style scoped>

</style>
