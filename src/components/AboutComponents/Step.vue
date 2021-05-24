<template>
    <mdb-card class="h-100">
        <mdb-card-header :color="headerColor" tag="h4">{{ header }}</mdb-card-header>
        <mdb-card-body>

            <div class="row h-50">
                <div class="col-12">
                    <mdb-card-text class="text-justify">{{ text }}</mdb-card-text>
                </div>
            </div>

            <div class="row align-items-end h-50">
                <div class="col-12">
                    <router-link :to="to">
                        <mdb-btn :color="btnColor">{{ link }}</mdb-btn>
                    </router-link>
                </div>
            </div>

        </mdb-card-body>
    </mdb-card>
</template>
<script>
    import { mdbCard, mdbCardBody, mdbCardText, mdbBtn, mdbCardHeader } from 'mdbvue';
    export default {
        name: 'Step',
        components: {
            mdbCard,
            mdbCardBody,
            mdbCardHeader,
            mdbCardText,
            mdbBtn
        },
        props: ["header", "text", "to", "link", "headerColor", "btnColor"]
    }
</script>

<style scoped>

</style>
