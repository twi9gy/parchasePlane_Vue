<template>
    <div class="container">

        <div v-if="loading">
            <spinner />
        </div>

        <div v-else>

            <div class="row mb-2">
                <div class="col">
                    <h4 class="text-center">
                        Спрос на продукцию в период {{ this.plan.start_date }} - {{ this.plan.end_date }}:
                    </h4>
                </div>
            </div>

            <div class="row">
                <div class="col-12">

                    <div class="row">
                        <div class="col-12">
                            <div class="container" ref="container_chart_1">
                                <chart
                                        :values="this.getValuesDataChart(plan.demand, 'Count')"
                                        :labels="this.getLabelsDataChart(plan.demand)"
                                        :backgroundColor="'rgba(255, 99, 132, 0.1)'"
                                        :borderColor="'rgba(255, 99, 132, 1)'"
                                        :title="'Прогнозируемый спрос на продукцию'"
                                        :width="chart1_w"
                                        :height="chart1_h"/>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <h5 class="text-center">
                                Таблица потребления продукции в период {{ this.plan.start_date }} - {{ this.plan.end_date }}:
                            </h5>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-6">
                            <ReportTable
                                    :records="plan.demand"
                                    :column="'Count'"/>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row mt-4 mb-2">
                <div class="col">
                    <h4 class="text-center">
                        Закупки на период {{ this.plan.start_date }} - {{ this.plan.end_date }}:
                    </h4>
                </div>
            </div>

            <div class="row">
                <div class="col-12">

                    <div class="row">
                        <div class="col-12">
                            <div class="container" ref="container_chart_2">
                                <plan-chart
                                        :countProduct="this.getValuesDataChart(plan.product_count, 'Count')"
                                        :labels="this.getLabelsDataChart(plan.product_count)"
                                        :backgroundColor="'rgba(151,187,205,0.2)'"
                                        :borderColor="'rgba(151,187,205,1)'"
                                        :title="'Точка заказа'"
                                        :width="chart2_w"
                                        :height="chart2_h"
                                        :pointOrder="this.getPointOrder(plan.product_count, plan.point_order)"
                                        :reserve="this.getReserve(plan.product_count, plan.reserve)"
                                        :orders="this.getOrders(plan.product_count, 'Count')"/>
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-center mt-4">
                        <div class="col-6">

                            <div class="row">
                                <div class="col">
                                    <h5 class="text-center">
                                        Таблица количества товара на период
                                        <br />{{ this.plan.start_date }} - {{ this.plan.end_date }}:
                                    </h5>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <ReportTable
                                            :records="plan.product_count"
                                            :column="'Count'"/>
                                </div>
                            </div>

                        </div>

                        <div class="col-6">

                            <div class="row">
                                <div class="col">
                                    <h5 class="text-center">
                                        Таблица заказов на период
                                        <br /> {{ this.plan.start_date }} - {{ this.plan.end_date }}:
                                    </h5>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <orders-table :records="this.orders_history"/>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div class="row mt-3">
                <div class="col">
                    <accordion-plan
                            :freq_delivery="plan.freq_delivery"
                            :size_order="plan.size_order"
                            :point_order="plan.point_order"
                            :reserve="plan.reserve"
                            :total_costs="plan.total_costs"/>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import Spinner from '../../components/Spinner.vue';
    import Chart from '../../components/Chart.vue';
    import ReportTable from "../../components/ReportTable";
    import AccordionPlan from '../../components/AccordionPlan.vue';
    import PlanChart from '../../components/PlanChart.vue';
    import _ from 'lodash';
    import OrdersTable from '../../components/OrdersTable.vue';

    export default {
        name: "PlanShow",
        components: {
            ReportTable,
            Spinner,
            Chart,
            AccordionPlan,
            PlanChart,
            OrdersTable
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
            plan: function() {
                return this.$store.getters.plan;
            },
            loading() {
                return this.$store.getters.getLoading;
            },
            orders_history() {
                let res = [];

                if (this.plan.product_count) {
                    for(let i=0; i < this.plan.product_count.length; i++) {

                        if (this.plan.orders_origin[i] !== undefined) {

                            if (this.plan.orders[i] !== undefined) {

                                res.push({
                                    'start_date': this.plan.orders_origin[i],
                                    'end_date': this.plan.orders[i].Date,
                                    'size': this.plan.size_order
                                });
                            } else {

                                res.push({
                                    'start_date': this.plan.orders_origin[i],
                                    'end_date': '-',
                                    'size': this.plan.size_order
                                });
                            }
                        }
                    }
                }

                return res;
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

            if (this.$store.getters.plan) {
                this.$store.commit('setLoading', true);

                // Получаем отчет о прогнозируемом спросе
                await this.$store.dispatch('getPurchasePlanByID', { 'id' : this.$route.params.id })
                    .then(() => { this.$store.commit('setLoading', false) })
                    .catch(() => {
                        // this.$router.push({ 'name': 'Error' });
                        this.$store.commit('setLoading', false);
                    });

                this.$store.commit('setHeader', this.$route.meta.pageName + ': ' + this.plan.filename);
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
            },
            getPointOrder: function(elements, point) {
                if (elements !== undefined) {
                    return _.map(_.range(elements.length), () => { return point });
                }
            },
            getReserve: function(elements, reserve) {
                if (elements !== undefined) {
                    return _.map(_.range(elements.length), () => { return reserve });
                }
            },
            getOrders: function(elements, column) {
                if (elements !== undefined) {
                    let res = [];
                    elements.forEach(element => {
                        if (this.plan.orders_origin.includes(element['Date'])) {
                            res.push(element[column]);
                        } else {
                            res.push(null);
                        }
                    });
                    return res;
                }
            }
        }
    }
</script>

<style scoped>

</style>