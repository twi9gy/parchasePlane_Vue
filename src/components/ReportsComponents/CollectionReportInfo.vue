<template>
    <mdb-jumbotron class="p-4 mb-0">
        <div class="row">
            <div class="col-12">
                <h4>{{ title }}</h4>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12">
                <mdb-list-group horizontal>
                    <ReportRadioBtn v-for="radio in radioReports" :key="radio.id"
                                    :label="radio.title"
                                    :group="'AnalysisGroup'"
                                    :value="radio.value"
                                    :id="radio.id" />
                </mdb-list-group>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12" v-if="getReportForm.demandForecast">
                <SelectItem :name="getSelectItem.forecast.nameSelect + ' для прогнозирования спроса:'"
                            :label="getSelectItem.forecast.label"
                            :list-item="getSelectItem.forecast.listItem" />
            </div>
            <div class="col-12 mt-2" v-if="getReportForm.purchasePlan">
                <SelectItem :name="getSelectItem.plan.nameSelect + ' для создания плана закупок:'"
                            :label="getSelectItem.plan.label"
                            :list-item="getSelectItem.plan.listItem" />
            </div>
        </div>
    </mdb-jumbotron>
</template>

<script>
    import ReportRadioBtn from "./ReportRadioBtn";
    import SelectItem from "./SelectItem";
    import { mdbJumbotron, mdbListGroup } from 'mdbvue';

    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: "CollectionReportInfo",
        props: [
            "header",
            "title",
            "radioReports",
            "group"
        ],
        components: {
            ReportRadioBtn,
            mdbJumbotron,
            mdbListGroup,
            SelectItem
        },
        computed: mapGetters(["getReportForm", "getSelectItem"]),
        methods: {
            ...mapMutations(["changeObject"])
        }
    }
</script>

<style scoped>

</style>
