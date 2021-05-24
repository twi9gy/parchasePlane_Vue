<template>
    <div class="container">

        <div v-if="!loading">

            <div class="row mb-2" v-if="width >= 576">
                <div class="col">
                    <h4 class="text-center">
                        Спрос на продукцию в период {{ this.demandForecast.start_period_analysis }} - {{ this.demandForecast.end_period_analysis }}:
                    </h4>
                </div>
            </div>

            <div class="row">
                <div class="col-12">

                    <div class="row" v-if="width >= 576">
                        <div class="col-12">
                            <div class="container" ref="container_chart_1">
                                <chart
                                        :values="this.getValuesDataChart(demandForecast.origin_data, demandForecast.column)"
                                        :labels="this.getLabelsDataChart(demandForecast.origin_data)"
                                        :backgroundColor="'rgba(255, 99, 132, 0.1)'"
                                        :borderColor="'rgba(255, 99, 132, 1)'"
                                        :title="'Исходные данные о продажах'"
                                        :width="chart1_w"
                                        :height="chart1_h"/>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col">
                            <h5 class="text-center">
                                Таблица потребления продукции в период {{ this.demandForecast.start_period_analysis }} - {{ this.demandForecast.end_period_analysis }}:
                            </h5>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-12">
                            <ReportTable
                                    :records="demandForecast.origin_data"
                                    :column="this.demandForecast.column"/>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row mt-4 mb-2" v-if="width >= 576">
                <div class="col">
                    <h4 class="text-center">
                        Прогнозируемый спрос на период {{ this.demandForecast.start_period_forecast }} - {{ this.demandForecast.end_period_forecast }}:
                    </h4>
                </div>
            </div>

            <div class="row">
                <div class="col-12">

                    <div class="row" v-if="width >= 576">
                        <div class="col-12">
                            <div class="container" ref="container_chart_2">
                                <chart
                                        :values="this.getValuesDataChart(demandForecast.prediction, demandForecast.column)"
                                        :labels="this.getLabelsDataChart(demandForecast.prediction)"
                                        :backgroundColor="'rgba(151,187,205,0.2)'"
                                        :borderColor="'rgba(151,187,205,1)'"
                                        :title="'Прогнозируемые продажи продукции'"
                                        :width="chart2_w"
                                        :height="chart2_h"/>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-4 mb-2">
                        <div class="col">
                            <h4 class="text-center">
                                Таблица прогнозируемого спрос на период {{ this.demandForecast.start_period_forecast }} - {{ this.demandForecast.end_period_forecast }}:
                            </h4>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-12">
                            <ReportTable
                                    :records="demandForecast.prediction"
                                    :column="demandForecast.column"/>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row mt-3">
                <div class="col">

                    <div class="row">
                        <div class="col">
                            <h5 class="text-center">
                                Параметры полученного отчета о прогнозировании спроса:
                            </h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <accordion
                                    :rmse="demandForecast.accuracy"
                                    :method="demandForecast.method"
                                    :accuracy="demandForecast.percentage_accuracy"
                                    :class="'text-justify'"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4 mb-3">
                <div class="col">

                    <div class="row">
                        <div class="col">
                            <h5 class="text-center">
                                Файлы связанные с отчетом о прогнозировании спроса:
                            </h5>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-6">
                            <list-associate-files
                                :sales_file="demandForecast.sales_file"
                                :category="demandForecast.category"
                                :plans="demandForecast.purchase_plans"/>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div v-else>
            <spinner />
        </div>
    </div>
</template>

<script>
    import Accordion from '../../components/ReportComponents/AccordionDemand.vue';
    import Chart from '../../components/ReportComponents/Chart.vue';
    import ReportTable from "../../components/ReportComponents/ReportTable";
    import Spinner from '../../components/LayoutComponents/Spinner.vue';
    import ListAssociateFiles from "../../components/ReportComponents/ListAssociateFiles";

    export default {
        name: "DemandForecastShow",
        components: {
            ListAssociateFiles,
            ReportTable,
            Spinner,
            Chart,
            Accordion
        },
        data() {
            return {
                chart1_w: 400,
                chart2_w: 400,
                chart1_h: 400,
                chart2_h: 400
            }
        },
        created() {
            this.$store.commit('setHint', this.$route.meta.hint);

            this.$store.commit('setLoading', false);
        },
        computed: {
            demandForecast() {
                return this.$store.getters.demandForecast;
            },
            loading() {
                return this.$store.getters.getLoading;
            },
            width() {
                return this.$store.getters.getWidth;
            }
        },
        async mounted() {
            this.$watch(
                () => {
                    if (this.$refs.container_chart_1) {
                        this.chart1_w = this.$refs.container_chart_1.clientWidth;
                        this.chart1_h = this.$refs.container_chart_1.clientHeight;
                    }

                    if (this.$refs.container_chart_2) {
                        this.chart2_w = this.$refs.container_chart_2.clientWidth;
                        this.chart2_h = this.$refs.container_chart_2.clientHeight;
                    }
                }
            );

            if (this.$store.getters.demandForecast) {
                this.$store.commit('setLoading', true);

                // Получаем отчет о прогнозируемом спросе
                await this.$store.dispatch('getDemandForecastByID', { 'id' : this.$route.params.id })
                    .then(() => { this.$store.commit('setLoading', false) })
                    .catch(() => {
                        this.$router.push({ 'name': 'Error' });
                        this.$store.commit('setLoading', false);
                    });

                this.$store.commit('setHeader', this.$route.meta.pageName + ': ' + this.demandForecast.filename);
            }
        },
        methods: {
            getValuesDataChart: function(elements, column) {
                if (elements !== undefined) {
                    let result = elements.map((item) => {
                        return Math.round(item[column])
                    });

                    return result;
                }
            },
            getLabelsDataChart: function(elements) {
                if (elements !== undefined) {
                    let result = elements.map((item) => {
                        return item['Date']
                    });

                    return result;
                }
            }
        }
    }
</script>

<style scoped>

</style>