<template>
    <mdb-list-group-item :action="false" class="w-50">
        <div class="custom-control custom-checkbox custom-control-inline ml-auto mr-auto">
            <input type="checkbox" class="custom-control-input" :id="id" :value="id"
                   v-model="form.method">
            <label class="custom-control-label" :for="id">{{label}}</label>
        </div>
    </mdb-list-group-item>
</template>

<script>
    import { mdbListGroupItem } from 'mdbvue';

    export default {
        name: "ReportCheckBox",
        props: ["method", "label", "id"],
        components: {
            mdbListGroupItem
        },
        computed: {
            form: function () { return this.$store.getters.reportForm },
        }
    }
</script>

<style scoped>

</style>
