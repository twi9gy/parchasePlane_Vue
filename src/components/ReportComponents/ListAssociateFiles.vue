<template>
    <mdb-list-group>
        <mdb-list-group-item :action="true">
            Файл продаж: {{ sales_file }}
        </mdb-list-group-item>

        <mdb-list-group-item :action="true" v-if="category">
            Категория: {{ category }}
        </mdb-list-group-item>

        <mdb-list-group-item :action="true" v-for="plan in plans" :key="plan.plan_id">
            <router-link :to="{name: 'plansShow', params: { 'id' : plan.plan_id }}">
                План закупок: {{ plan.plan_filename }}
            </router-link>
        </mdb-list-group-item>
    </mdb-list-group>
</template>

<script>
    import { mdbListGroup, mdbListGroupItem } from 'mdbvue';

    export default {
        name: "ListAssociateFiles",
        components: {
            mdbListGroup,
            mdbListGroupItem
        },
        props: ['sales_file', 'category', 'plans']
    }
</script>

<style scoped>

</style>