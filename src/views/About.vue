<template>
    <div class="container">

        <div v-if="loading">
            <spinner />
        </div>

        <div v-else>
            <div class="row about mb-3">
                <div class="col-12 mt-5">
                    <mdb-card>
                        <div class="container-fluid p-5">
                            <div class="row">
                                <div class="col-12">
                                <h3>5 шагов для создания плана закупок.</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-sm-12 mb-3" v-for="step in steps" :key="step.header">
                                    <Step
                                    :header="step.header"
                                    :headerColor="step.headerColor"
                                    :text="step.text"
                                    :to="step.to"
                                    :link="step.link"
                                    :btn-color="step.btnColor"/>
                                </div>
                            </div>
                        </div>
                    </mdb-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mdbCard } from 'mdbvue';
import Step from "../components/AboutComponents/Step";
import Spinner from '../components/LayoutComponents/Spinner.vue';

export default {
    name: 'FeaturesPage',
    components: {
        Step,
        mdbCard,
        Spinner
    },
    created() {
        // Устанавливаем оглавление к странице
        this.$store.commit('setTitle', this.$route.meta.title);
        document.title = this.title;
    },
    data() {
        return {
            steps: [
                {
                    header: 'Шаг 1',
                    text: 'Зарегистрируйте аккаунт.',
                    to: { name: 'register' },
                    link: 'Регистрация',
                    headerColor: 'primary-color',
                    btnColor: 'primary'
                },
                {
                    header: 'Шаг 2',
                    text: 'Создайте категорию для файлов с информацией о продажах.',
                    to: { name: 'categories' },
                    link: 'Каталог',
                    headerColor: 'warning-color',
                    btnColor: 'warning'
                },
                {
                    header: 'Шаг 3',
                    text: 'Добавьте файлы продаж к категории.',
                    to: { name: 'categories' },
                    link: 'Каталог',
                    headerColor: 'secondary-color',
                    btnColor: 'secondary'
                },
                {
                    header: 'Шаг 4',
                    text: 'В разделе \'Отчеты о прогнозировании спроса\' создайте отчет на ' +
                        'основании файла продаж.',
                    to: { name: 'demandForecastCreate' },
                    link: 'Создание отчета',
                    headerColor: 'info-color',
                    btnColor: 'info'
                },
                {
                    header: 'Шаг 5',
                    text: 'Создайте план на основе отчета о прогнозировании спроса.',
                    to: { name: 'plans_create' },
                    link: 'Создание отчета',
                    headerColor: 'success-color',
                    btnColor: 'success'
                }
            ]
        }
    },
    computed: {
        loading() {
            return this.$store.getters.getLoading;
        },
        title() {
            return this.$store.getters.Page.title;
        }
    }
}
</script>

<style>
    .about {
        margin-top: 70px;
        min-height: 100vh;
    }
</style>
