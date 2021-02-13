<template>
    <mdb-pagination color="blue">
        <mdb-page-nav prev></mdb-page-nav>
        <mdb-page-item active>1</mdb-page-item>
        <mdb-page-item>2</mdb-page-item>
        <mdb-page-item>3</mdb-page-item>
        <mdb-page-item>4</mdb-page-item>
        <mdb-page-item>5</mdb-page-item>
        <mdb-page-nav next></mdb-page-nav>
    </mdb-pagination>
</template>

<script>
    import { mdbPagination, mdbPageItem, mdbPageNav } from 'mdbvue';

    export default {
        name: "Pagination",
        components: {
            mdbPagination,
            mdbPageItem,
            mdbPageNav
        }
    }
</script>

<style scoped>

</style>
