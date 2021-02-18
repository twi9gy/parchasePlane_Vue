<template>
    <mdb-tooltip trigger="hover" :options="{placement: 'left'}">
        <span slot="tip">{{ getHint }}</span>
        <mdb-btn class="btn-outline-white btn-rounded btn-sm px-2" slot="reference">
            <mdb-icon  :icon="icon" />
        </mdb-btn>
    </mdb-tooltip>
</template>

<script>
    import { mdbTooltip, mdbBtn, mdbIcon } from 'mdbvue';
    import { mapGetters } from 'vuex';

    export default {
        components: {
            mdbTooltip,
            mdbBtn,
            mdbIcon
        },
        props: ["icon"],
        computed: mapGetters(["getHint"])
    }
</script>

<style scoped>

</style>
