<template>
    <div class="container-fluid">

        <div v-if="!loading">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-md-12 col-sm-12"
                     :class="{ 'p-0': width < 576 }">
                    <mdb-jumbotron class="p-4 mb-0">

                        <div class="row">
                            <div class="col-12">
                                <h4 class="label">Выберите метод анализа временных рядов: </h4>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-12">
                                <b-form-select class="browser-default custom-select" v-model="method" :options="methods">
                                </b-form-select>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-12">
                                <h4 class="label">Выберите по каким объектам производить анализ:</h4>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-12">
                                <div class="container-fluid p-0">
<!--                                    <mdb-list-group horizontal>-->

                                        <div class="row list-group flex-row">
                                            <div class="col-lg-6 col-md-6 col-sm-12"
                                                :class="{ 'pr-0': width >= 576 }">
                                                <mdb-list-group-item class="w-100">
                                                    <div class="custom-control custom-radio ml-auto mr-auto">
                                                        <input type="radio" class="custom-control-input" id="radioFile"
                                                               name="forecast" value="file" v-model="objectAnalysis" checked>
                                                        <label class="custom-control-label" for="radioFile">По файлу</label>
                                                    </div>
                                                </mdb-list-group-item>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12"
                                                 :class="{ 'pl-0': width >= 576 }">
                                                <mdb-list-group-item class="w-100">
                                                    <div class="custom-control custom-radio ml-auto mr-auto">
                                                        <input type="radio" class="custom-control-input" id="radioCategory"
                                                               name="forecast" value="category" v-model="objectAnalysis">
                                                        <label class="custom-control-label" for="radioCategory">По категории</label>
                                                    </div>
                                                </mdb-list-group-item>
                                            </div>
                                        </div>

<!--                                    </mdb-list-group>-->
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-12">

                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="label">{{ selectName }} для прогнозирования спроса:</h4>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">

                                        <div class="md-form mt-1" :class="{'is-invalid':
                            (this.$v.item.$dirty && !this.$v.item.required) }">
                                            <input id="item_input" type="text" class="form-control" list="objects_select"
                                                   v-model.trim="item"
                                                   :class="{
                             'is-invalid': (this.$v.item.$dirty && !this.$v.item.required)
                           }"/>
                                            <label ref="item_label" for="item_input" class="mr-5" :class="{ active: item !== '' }">
                                                {{ selectLabel }}
                                            </label>

                                            <div class="invalid-feedback"
                                                 v-if="this.$v.item.$dirty && !this.$v.item.required">
                                                Поле не должно быть пустым.
                                            </div>
                                        </div>

                                        <datalist id="objects_select">
                                            <option v-for="elem in selectItem" :key="elem.text">
                                                {{ elem.name }}
                                            </option>
                                        </datalist>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="row mt-2">

                            <div class="col-lg-5 col-md-6 mt-3" v-if="width >= 576">
                                <h5 class="text-left label">Период прогнозирования:</h5>
                            </div>

                            <div class="col-lg-4 col-md-3 col-sm-6">
                                <div class="md-form m-1" :class="{'is-invalid': (this.$v.period.$dirty && !this.$v.period.minValue) }">
                                    <input id="period_input" type="number" class="form-control"
                                           v-model.trim="period"
                                           :class="{'is-invalid': (this.$v.period.$dirty && !this.$v.period.minValue) }"/>
                                    <label ref="period_label" for="period_input" class="mr-5" :class="{ active: period !== '' }">
                                        Период прогнозирования
                                    </label>

                                    <div class="invalid-feedback"
                                         v-if="this.$v.period.$dirty && !this.$v.period.minValue">
                                        Период прогнозирования должно быть больше 0.
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-3 col-sm-6 mt-1">
                                <b-form-select v-model="interval" :options="interval_options"></b-form-select>
                            </div>

                        </div>

                        <div class="row mt-2">

                            <div class="col-lg-5 col-md-6 mt-4">
                                <h5 class="text-left label">Столбец файла для анализа:</h5>
                            </div>

                            <div class="col-lg-4 col-md-6">
                                <mdb-input label="Название столбца" v-model="column" />
                            </div>

                        </div>

                        <div class="row mt-2 justify-content-start" v-if="method === 2">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-lg-5 col-md-6 mt-3">
                                        <h5 class="text-left label">Периодичность данных: </h5>
                                    </div>

                                    <div class="col-lg-4 col-md-6 mt-2">
                                        <b-form-select v-model="seasonal" :options="seasonal_options"></b-form-select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </mdb-jumbotron>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-10 col-md-12">
                    <div class="md-form" :class="{'is-invalid':
                            (this.$v.filename.$dirty && !this.$v.filename.required) ||
                            (this.$v.filename.$dirty && !this.$v.filename.minLength)}">
                        <input id="name_input" type="text" class="form-control"
                               v-model.trim="filename"
                               :class="{'is-invalid':
                            (this.$v.filename.$dirty && !this.$v.filename.required) ||
                            (this.$v.filename.$dirty && !this.$v.filename.minLength)}"/>
                        <label ref="name_label" for="name_input" class="mr-5" :class="{ active: filename !== '' }">Название отчета
                        </label>

                        <div class="invalid-feedback"
                             v-if="this.$v.filename.$dirty && !this.$v.filename.required">
                            Поле 'Название отчета' не должно быть пустым.
                        </div>

                        <div class="invalid-feedback"
                             v-else-if="this.$v.filename.$dirty && !this.$v.filename.minLength">
                            'Название отчета' должено быть
                            {{ $v.filename.$params.minLength.min }}
                            символом. Сейчас он {{ filename.length }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <mdb-btn color="primary" size="lg" @click="handlerSubmit">Создать отчет</mdb-btn>
                </div>
            </div>
        </div>

        <div v-else>
            <Spinner />
        </div>

    </div>
</template>

<script>
    import { mdbBtn, mdbJumbotron, mdbInput, mdbListGroupItem } from 'mdbvue';
    import { minLength, required, minValue } from "vuelidate/lib/validators";
    import Spinner from "../../components/LayoutComponents/Spinner";

    export default {
        name: "DemandForecastCreate",
        data() {
            return {
                filename: "",
                objectAnalysis: 'file',
                method: 1,
                item: '',
                interval: '1D',
                column: '',
                period: 30,
                seasonal: 12,
                methods: [
                    { value: 1, text: 'Метод Хольта - Винтерса' },
                    { value: 2, text: 'Модель SARIMA' },
                ],
                interval_options:[
                    { value: '1D', text: 'Дней' },
                    { value: '7D', text: 'Недель'},
                    { value: '1M', text: 'Месяцев'},
                ],
                seasonal_options: [
                    { value: 12, text: 'Год' },
                    { value: 4, text: 'Квартал' },
                    { value: 1, text: 'Месяц' },
                ],
            }
        },
        validations: {
            filename: { required, minLength: minLength(3) },
            item: { required },
            period: {
                minValue: minValue(1)
            },
        },
        components: {
            Spinner,
            mdbBtn,
            mdbJumbotron,
            mdbInput,
            mdbListGroupItem
        },
        created() {
            this.$store.commit('setHint', this.$route.meta.hint);
            this.$store.commit('setHeader', this.$route.meta.pageName);

            this.$store.commit('setLoading', false);
        },
        async mounted() {
            if (this.$store.getters.allCategories.length === 0) {
                await this.$store.dispatch('getAllCategories')
                    .catch(() => this.$error(this, this.$store.getters.getMessage));
            }
            if (this.$store.getters.saleFiles) {
                await this.$store.dispatch('getAllSaleFiles')
                    .catch(() => this.$error(this, this.$store.getters.getMessage));
            }
        },
        computed: {
            categories: function () { return this.$store.getters.allCategories },
            files: function () { return this.$store.getters.saleFiles },
            selectName: function () {
                if (this.objectAnalysis === 'file')
                    return 'Файл';
                else
                    return 'Категория';
            },
            selectLabel: function () {
                if (this.objectAnalysis === 'file')
                    return 'Выберите файл';
                else
                    return 'Выберите категорию';
            },
            selectItem: function () {
                let listItem = [];
                if (this.objectAnalysis === 'category') {
                    this.categories.forEach(function(item) {
                        listItem.push({ name:item.name });
                    });
                } else {
                    this.files.forEach(function(item) {
                        listItem.push({ name:item.filename });
                    });
                }
                return listItem;
            },
            loading() {
                return this.$store.getters.getLoading;
            },
            width() {
                return this.$store.getters.getWidth;
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

                if (this.objectAnalysis === 'category') {
                    // Отправляем запрос к API для создания отчета
                    this.$store.dispatch('addDemandForecastFile', {
                        'filename': this.filename,
                        'method': this.method,
                        'object_analysis': this.objectAnalysis,
                        'category': this.item,
                        'file': null,
                        'freq': this.interval,
                        'column': this.column,
                        'period': this.period,
                        'seasonal': this.seasonal
                    })
                        .then(() => {
                            this.$message(this, this.$store.getters.getMessage);
                            this.$store.commit('setLoading', false);
                            this.$router.push({'name' : 'demandForecast'});
                        })
                        .catch(() => {
                            this.$error(this, this.$store.getters.getMessage);
                            this.$store.commit('setLoading', false);
                        })
                } else {
                    // Отправляем запрос к API для создания отчета
                    this.$store.dispatch('addDemandForecastFile', {
                        'filename': this.filename,
                        'method': this.method,
                        'object_analysis': this.objectAnalysis,
                        'category': null,
                        'file': this.item,
                        'freq': this.interval,
                        'column': this.column,
                        'period': this.period,
                        'seasonal': this.seasonal
                    })
                        .then(() => {
                            this.$message(this, this.$store.getters.getMessage);
                            this.$store.commit('setLoading', false);
                            this.$router.push({'name' : 'demandForecast'});
                        })
                        .catch(() => {
                            this.$error(this, this.$store.getters.getMessage);
                            this.$store.commit('setLoading', false);
                        })
                }
            },
        }
    }
</script>

<style scoped>
    .is-invalid input {
        border-bottom: 1px solid red!important;
    }
    .is-invalid input {
        border-color: #dc3545;
    }
    @media (max-width: 768px) {
        .label {
            font-size: calc(0.5rem + 1.5vw);
        }
    }
</style>