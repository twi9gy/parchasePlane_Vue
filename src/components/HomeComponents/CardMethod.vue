<template>
    <mdb-card class="h-100">
        <mdb-card-header :color="headerColor" tag="h4">{{ header }}</mdb-card-header>

        <mdb-card-body>
            <div class="row h-50">
                <div class="col-12">
                    <mdb-card-text class="text-justify">{{ text }}</mdb-card-text>
                </div>
            </div>
        </mdb-card-body>
    </mdb-card>
</template>

<script>
    import { mdbCard, mdbCardBody, mdbCardText, mdbCardHeader } from 'mdbvue';

    export default {
        name: "CardMethod",
        components: {
            mdbCard,
            mdbCardBody,
            mdbCardText,
            mdbCardHeader
        },
        props: ["header", "text", "headerColor"]
    }
</script>

<style scoped>

</style>