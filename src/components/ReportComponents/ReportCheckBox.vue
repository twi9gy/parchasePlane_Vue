<template>
    <mdb-list-group-item :action="false" class="w-50">
        <div class="custom-control custom-checkbox custom-control-inline ml-auto mr-auto">
            <input type="checkbox" class="custom-control-input" :id="id" :value="id"
                   v-model="getReportForm.method">
            <label class="custom-control-label" :for="id">{{label}}</label>
        </div>
    </mdb-list-group-item>
</template>

<script>
    import { mdbListGroupItem } from 'mdbvue';
    import { mapGetters } from 'vuex';

    export default {
        name: "ReportCheckBox",
        props: ["method", "label", "id"],
        components: {
            mdbListGroupItem
        },
        computed: mapGetters(["getReportForm"])
    }
</script>

<style scoped>

</style>
