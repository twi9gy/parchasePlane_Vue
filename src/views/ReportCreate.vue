<template>
    <div class="container-fluid">

        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                        <h4>Выберите метод для анализа данных о продажах: </h4>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-8">

                        <mdb-list-group horizontal>

                            <mdb-list-group-item :action="false" class="w-50">
                                <div class="custom-control custom-checkbox custom-control-inline ml-auto mr-auto">
                                    <input type="checkbox" class="custom-control-input" id="demand_forecast"
                                           value="demandForecast" v-model="getReportForm.demandForecast">
                                    <label class="custom-control-label" for="demand_forecast">Прогнозирование спроса</label>
                                </div>
                            </mdb-list-group-item>

                            <mdb-list-group-item :action="false" class="w-50">
                                <div class="custom-control custom-checkbox custom-control-inline ml-auto mr-auto">
                                    <input type="checkbox" class="custom-control-input" id="purchase_plan"
                                           value="purchasePlan" v-model="getReportForm.purchasePlan">
                                    <label class="custom-control-label" for="purchase_plan">План закупок</label>
                                </div>
                            </mdb-list-group-item>

                        </mdb-list-group>

                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3" v-if="getReportForm.demandForecast || getReportForm.purchasePlan">
            <div class="col-12">
                <div class="row justify-content-center">
                    <div class="col-8">
                        <CollectionReportInfo
                                :title="'Выберите по каким объектам производить анализ:'"
                                :radioReports="getReportForm.radioReport"/>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-8">
                        <mdb-input label="Название отчета" v-model="getReportForm.fileName" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <mdb-btn color="primary" size="lg">Создать отчет</mdb-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mdbListGroup, mdbBtn, mdbInput, mdbListGroupItem } from 'mdbvue';
    import CollectionReportInfo from "../components/ReportComponents/CollectionReportInfo";

    export default {
        name: "ActionForm",
        components: {
            CollectionReportInfo,
            mdbListGroup,
            mdbBtn,
            mdbInput,
            mdbListGroupItem
        },
        created() {
            this.$store.commit('setHint', this.$route.meta.hint);
            this.$store.commit('setHeader', this.$route.meta.pageName);
        },
        computed: {
          getReportForm: function () {
              return this.$store.getters.getReportForm;
          }
        }
    }
</script>

<style scoped>

</style>
