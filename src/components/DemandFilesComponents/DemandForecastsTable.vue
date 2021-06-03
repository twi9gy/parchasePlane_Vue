<template>
    <div class="">
        <div class="table-wrapper">
            <!--Table-->
            <mdb-tbl class="table table-hover mb-0">
                <!--Table head-->
                <mdb-tbl-head>
                    <tr>
                        <th class="th-lg">Название файла</th>
                        <th class="th-sm" v-if="width >= 576">RMSE</th>
                        <th class="th-sm" v-if="width >= 576">Точность</th>
                        <th class="th-sm" v-if="width >= 786">Период прогнозирования</th>
                        <th class="th-sm" v-if="width >= 576">Создан</th>
                        <th class="th-sm">Удалить</th>
                    </tr>
                </mdb-tbl-head>
                <!--Table head-->

                <!--Table body-->
                <mdb-tbl-body>
                    <tr v-for="file in files" :key="file.id">
                        <td>
                            <router-link :to="{name: 'demandForecastShow', params: { 'id' : file.id }}">
                                <mdb-btn class="w-100 btn-sm m-0" color="primary">{{ file.filename }}</mdb-btn>
                            </router-link>
                        </td>
                        <td v-if="width >= 576">{{ file.rmse }}</td>
                        <td v-if="width >= 576">{{ file.accuracy }}</td>
                        <td v-if="width >= 576">{{ file.forecast_period }} {{ periodForecast(file) }}</td>
                        <td v-if="width >= 576">{{ new Date(file.createdAt) | date('datetime') }}</td>
                        <td>
                            <mdb-btn class="btn-sm m-0" color="danger" size="md" @click="$emit('delFile', file)"
                             v-b-tooltip="'Удалить файл'">
                                <mdb-icon  icon="trash" />
                            </mdb-btn>
                        </td>
                    </tr>
                </mdb-tbl-body>
                <!--Table body-->
            </mdb-tbl>
            <!--Table-->
        </div>
    </div>
</template>

<script>
    import { mdbBtn, mdbIcon, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';

    export default {
        name: "DemandForecastsTable",
        components: {
            mdbTbl,
            mdbTblHead,
            mdbTblBody,
            mdbBtn,
            mdbIcon
        },
        props: ['files'],
        computed: {
            width() {
                return this.$store.getters.getWidth;
            },
        },
        methods: {
            periodForecast: function (file) {
                if (file.forecast_period === 1) {
                    return file.interval === '1M' ? 'месяц' : file.interval === '7D' ? 'неделя' : 'день'
                }
                if (file.forecast_period > 1 && file.forecast_period < 5) {
                    return file.interval === '1M' ? 'месяца' : file.interval === '7D' ? 'недели' : 'дня'
                }
                if (file.forecast_period >= 5) {
                    return file.interval === '1M' ? 'месяцев' : file.interval === '7D' ? 'недель' : 'дней'
                }
            }
        }
    }
</script>

<style scoped>

</style>