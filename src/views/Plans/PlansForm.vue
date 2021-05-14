<template>
    <div class="container-fluid">

        <div v-if="!loading">
            <!--Форма для создания плана закупок-->
            <div class="row justify-content-center">
                <div class="col-10">
                    <mdb-jumbotron class="p-4 mb-0">

                        <!--Заголово формы-->
                        <div class="row mb-2">
                            <div class="col-12">
                                <h4>Для формирования плана закупок заполните следущие данные: </h4>
                            </div>
                        </div>
                        <!--./Заголово формы-->

                        <!--Поле затраты на хранение продукции-->
                        <div class="row">
                            <div class="col-10">

                                <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.storage_costs.$dirty && !this.$v.storage_costs.required) ||
                (this.$v.storage_costs.$dirty && !this.$v.storage_costs.minValue)
              }">
                                    <input id="storage_costs_input" type="text" class="form-control"
                                           v-model.trim="storage_costs"
                                           :class="{
                             'is-invalid': (this.$v.storage_costs.$dirty && !this.$v.storage_costs.required) ||
                                (this.$v.storage_costs.$dirty && !this.$v.storage_costs.minValue)
                           }"/>
                                    <label ref="storage_costs_label" for="storage_costs_input" class="mr-5" :class="{ active: storage_costs !== '' }">
                                        Затраты на хранение единицы продукции
                                    </label>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.storage_costs.$dirty && !this.$v.storage_costs.required">
                                        Поле не должно быть пустым.
                                    </div>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.storage_costs.$dirty && !this.$v.storage_costs.minValue">
                                        Затраты на хранение единицы продукции должны быть положительным числом.
                                    </div>

                                </div>

                            </div>
                            <div class="col-2 mt-3">
                                <span class="span-measurement ml-auto mr-auto">₽</span>
                            </div>
                        </div>
                        <!--./Поле затраты на хранение продукции-->

                        <!--Поле Затраты на доставку продукции-->
                        <div class="row">
                            <div class="col-10">

                                <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.required) ||
                (this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.minValue)
              }">
                                    <input id="shipping_costs_input" type="text" class="form-control"
                                           v-model.trim="shipping_costs"
                                           :class="{
                             'is-invalid': (this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.required) ||
                                (this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.minValue)
                           }"/>
                                    <label ref="shipping_costs_label" for="shipping_costs_input" class="mr-5" :class="{ active: shipping_costs !== '' }">
                                        Затраты на доставку продукции
                                    </label>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.required">
                                        Поле не должно быть пустым.
                                    </div>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.minValue">
                                        Затраты на доставку продукции должны быть положительным числом.
                                    </div>

                                </div>

                            </div>
                            <div class="col-2 mt-3">
                                <span class="span-measurement ml-auto mr-auto">₽</span>
                            </div>
                        </div>
                        <!--./Поле Затраты на доставку продукции-->

                        <!--Поле Уровень обслуживания-->
                        <div class="row">
                            <div class="col-10">

                                <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.service_level.$dirty && !this.$v.service_level.required) ||
                (this.$v.service_level.$dirty && !this.$v.service_level.minValue)
              }">
                                    <input id="service_level_input" type="text" class="form-control"
                                           v-model.trim="service_level"
                                           :class="{
                             'is-invalid': (this.$v.service_level.$dirty && !this.$v.service_level.required) ||
                                (this.$v.service_level.$dirty && !this.$v.service_level.minValue)
                           }"/>
                                    <label ref="service_level_label" for="service_level_input" class="mr-5" :class="{ active: service_level !== '' }">
                                        Уровень обслуживания
                                    </label>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.service_level.$dirty && !this.$v.service_level.required">
                                        Поле не должно быть пустым.
                                    </div>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.service_level.$dirty && !this.$v.service_level.minValue">
                                        Уровень обслуживания должен быть положительным числом.
                                    </div>

                                </div>

                            </div>
                            <div class="col-2 mt-3">
                                <span class="span-measurement ml-auto mr-auto">%</span>
                            </div>
                        </div>
                        <!--./Поле Уровень обслуживания-->

                        <!--Поле Уровень обслуживания-->
                        <div class="row">
                            <div class="col-10">

                                <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.product_price.$dirty && !this.$v.product_price.required) ||
                (this.$v.product_price.$dirty && !this.$v.product_price.minValue)
              }">
                                    <input id="product_price_input" type="text" class="form-control"
                                           v-model.trim="product_price"
                                           :class="{
                             'is-invalid': (this.$v.product_price.$dirty && !this.$v.product_price.required) ||
                                (this.$v.product_price.$dirty && !this.$v.product_price.minValue)
                           }"/>
                                    <label ref="product_price_label" for="product_price_input" class="mr-5" :class="{ active: product_price !== '' }">
                                        Стоимость единицы продукции
                                    </label>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.product_price.$dirty && !this.$v.product_price.required">
                                        Поле не должно быть пустым.
                                    </div>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.product_price.$dirty && !this.$v.product_price.minValue">
                                        Стоимость единицы продукции должна быть положительным числом.
                                    </div>

                                </div>

                            </div>
                            <div class="col-2 mt-3">
                                <span class="span-measurement ml-auto mr-auto">₽</span>
                            </div>
                        </div>
                        <!--./Поле Уровень обслуживания-->

                        <!--Поле Время доставки продукции-->
                        <div class="row">
                            <div class="col-10">

                                <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.time_shipping.$dirty && !this.$v.time_shipping.required) ||
                (this.$v.time_shipping.$dirty && !this.$v.time_shipping.minValue)
              }">
                                    <input id="time_shipping_input" type="text" class="form-control"
                                           v-model.trim="time_shipping"
                                           :class="{
                             'is-invalid': (this.$v.time_shipping.$dirty && !this.$v.time_shipping.required) ||
                                (this.$v.time_shipping.$dirty && !this.$v.time_shipping.minValue)
                           }"/>
                                    <label ref="time_shipping_label" for="time_shipping_input" class="mr-5" :class="{ active: time_shipping !== '' }">
                                        Время доставки продукции
                                    </label>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.time_shipping.$dirty && !this.$v.time_shipping.required">
                                        Поле не должно быть пустым.
                                    </div>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.time_shipping.$dirty && !this.$v.time_shipping.minValue">
                                        Время доставки продукции должно быть положительным числом.
                                    </div>

                                </div>

                            </div>
                            <div class="col-2 mt-3">
                                <span class="span-measurement ml-auto mr-auto">Дней</span>
                            </div>
                        </div>
                        <!--./Поле Время доставки продукции-->

                        <!--Поле Возможная задержка поставок-->
                        <div class="row">
                            <div class="col-10">

                                <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.delayed_deliveries.$dirty && !this.$v.delayed_deliveries.minValue)
              }">
                                    <input id="delayed_deliveries_input" type="text" class="form-control"
                                           v-model.trim="delayed_deliveries"
                                           :class="{
                             'is-invalid': (this.$v.delayed_deliveries.$dirty && !this.$v.delayed_deliveries.minValue)
                           }"/>
                                    <label ref="delayed_deliveries_label" for="delayed_deliveries_input" class="mr-5" :class="{ active: delayed_deliveries !== '' }">
                                        Возможная задержка поставок
                                    </label>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.delayed_deliveries.$dirty && !this.$v.delayed_deliveries.minValue">
                                        Возможная задержка поставок должна быть положительным числом.
                                    </div>

                                </div>

                            </div>
                            <div class="col-2 mt-3">
                                <span class="span-measurement ml-auto mr-auto">Дней</span>
                            </div>
                        </div>
                        <!--./Поле Возможная задержка поставок-->

                        <!--Поле для выбора отчета о прогнозируемом спросе-->
                        <div class="row">
                            <div class="col-12">

                                <div class="row">
                                    <div class="col-12">
                                        <h4>Выберите отчет о прогнозировании спроса:</h4>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">

                                        <div class="md-form mt-1" :class="{'is-invalid':
                            (this.$v.forecastFile.$dirty && !this.$v.forecastFile.required) }">
                                            <input id="item_input" type="text" class="form-control" list="objects_select"
                                                   v-model.trim="forecastFile"
                                                   :class="{
                             'is-invalid': (this.$v.forecastFile.$dirty && !this.$v.forecastFile.required)
                           }"/>
                                            <label ref="item_label" for="item_input" class="mr-5" :class="{ active: forecastFile !== '' }">
                                                Название отчета о прогнозировании спроса
                                            </label>

                                            <div class="invalid-feedback"
                                                 v-if="this.$v.forecastFile.$dirty && !this.$v.forecastFile.required">
                                                Поле не должно быть пустым.
                                            </div>
                                        </div>

                                        <datalist id="objects_select">
                                            <option v-for="elem in forecastFiles" :key="elem.text">
                                                {{ elem.filename }}
                                            </option>
                                        </datalist>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <!--./Поле для выбора отчета о прогнозируемом спросе-->

                    </mdb-jumbotron>
                </div>
            </div>
            <!--./Форма для создания плана закупок-->

            <!--Поле для записи названия плана закупок-->
            <div class="row justify-content-center">
                <div class="col-10">
                    <div class="md-form" :class="{'is-invalid':
                            (this.$v.filename.$dirty && !this.$v.filename.required) ||
                            (this.$v.filename.$dirty && !this.$v.filename.minLength)}">
                        <input id="name_input" type="text" class="form-control"
                               v-model.trim="filename"
                               :class="{'is-invalid':
                            (this.$v.filename.$dirty && !this.$v.filename.required) ||
                            (this.$v.filename.$dirty && !this.$v.filename.minLength)}"/>
                        <label ref="name_label" for="name_input" class="mr-5" :class="{ active: filename !== '' }">
                            Название плана закупок
                        </label>

                        <div class="invalid-feedback"
                             v-if="this.$v.filename.$dirty && !this.$v.filename.required">
                            Поле 'Название плана закупок' не должно быть пустым.
                        </div>

                        <div class="invalid-feedback"
                             v-else-if="this.$v.filename.$dirty && !this.$v.filename.minLength">
                            Полу 'Название плана закупок' должено быть
                            {{ $v.filename.$params.minLength.min }}
                            символом. Сейчас он {{ filename.length }}
                        </div>
                    </div>
                </div>
            </div>
            <!--./Поле для записи названия плана закупок-->

            <!--Кнопка Submit-->
            <div class="row">
                <div class="col-12">
                    <mdb-btn color="primary" size="lg" @click="handlerSubmit">Создать отчет</mdb-btn>
                </div>
            </div>
            <!--./Кнопка Submit-->
        </div>

        <div v-else>
            <Spinner />
        </div>

    </div>
</template>

<script>
    import { mdbJumbotron, mdbBtn } from 'mdbvue';
    import {minLength, minValue, required} from "vuelidate/lib/validators";
    import Spinner from "../../components/Spinner";

    export default {
        name: "PlansForm",
        components: {
            Spinner,
            mdbJumbotron,
            mdbBtn
        },
        data() {
            return {
                forecastFile: '',
                filename: '',
                storage_costs: 0,
                shipping_costs: 0,
                service_level: 0,
                product_price: 0,
                time_shipping: 0,
                delayed_deliveries: 0
            }
        },
        validations: {
            filename: { required, minLength: minLength(3) },
            forecastFile: { required },
            storage_costs: { required, minValue: minValue(1) },
            shipping_costs: { required, minValue: minValue(1) },
            service_level: { required, minValue: minValue(1) },
            product_price: { required, minValue: minValue(1) },
            time_shipping: { required, minValue: minValue(1) },
            delayed_deliveries: { minValue: minValue(1) },
        },
        created() {
            this.$store.commit('setHint', this.$route.meta.hint);
            this.$store.commit('setHeader', this.$route.meta.pageName);

            this.$store.commit('setLoading', false);
        },
        async mounted() {
            if (this.$store.getters.demandForecastFiles) {
                await this.$store.dispatch('getAllDemandForecastFiles')
                    .catch(() => this.$error(this, this.$store.getters.getMessage));
            }
        },
        computed: {
            forecastFiles: function () {
                return this.$store.getters.demandForecastFiles
            },
            loading() {
                return this.$store.getters.getLoading;
            }
        },
        methods: {
            handlerSubmit() {
                // Валидация формы
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                this.$store.commit('setLoading', true);

                this.$store.dispatch('addPurchasePlan', {
                    'filename': this.filename,
                    'storage_cost': this.storage_costs,
                    'forecast_file': this.forecastFile,
                    'shipping_costs': this.shipping_costs,
                    'service_level': this.service_level,
                    'time_shipping': this.time_shipping,
                    'product_price': this.product_price,
                    'delayed_deliveries': this.delayed_deliveries
                })
                    .then(() => {
                        this.$message(this, this.$store.getters.getMessage);
                        this.$store.commit('setLoading', false);
                        this.$router.push({'name' : 'plans'});
                    })
                    .catch(() => {
                        this.$error(this, this.$store.getters.getMessage);
                        this.$store.commit('setLoading', false);
                    })
            },
        }
    }
</script>

<style scoped>
    .span-measurement{
        font-size: 20px;
    }
    .is-invalid input {
        border-bottom: 1px solid red!important;
    }
    .is-invalid input {
        border-color: #dc3545;
    }
</style>