<template>
    <mdb-tooltip trigger="hover" :options="{placement: 'left'}">
        <span slot="tip">{{ hint }}</span>
        <mdb-btn class="btn-outline-white btn-rounded btn-sm px-2" slot="reference">
            <mdb-icon  :icon="icon" />
        </mdb-btn>
    </mdb-tooltip>
</template>

<script>
    import { mdbTooltip, mdbBtn, mdbIcon } from 'mdbvue';

    export default {
        components: {
            mdbTooltip,
            mdbBtn,
            mdbIcon
        },
        props: ["icon"],
        computed: {
          hint: function (){
            return  this.$store.getters.Page.hint;
          }
        }
    }
</script>

<style scoped>

</style>
