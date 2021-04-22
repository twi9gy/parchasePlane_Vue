<template>
    <mdb-list-group-item class="w-50">
        <div class="custom-control custom-radio ml-auto mr-auto">
            <input type="radio" class="custom-control-input" :id="id"
                   :name="group" :value="value" v-model="form.objectAnalysis" checked>
            <label class="custom-control-label" :for="id">{{label}}</label>
        </div>
    </mdb-list-group-item>
</template>

<script>
    import { mdbListGroupItem } from 'mdbvue';

    export default {
        name: "ReportRadioBtn",
        props: ["id", "label", "group", "value"],
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
