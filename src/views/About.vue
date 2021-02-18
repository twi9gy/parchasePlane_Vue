<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col-12">
                <mdb-card class="p-3 pt-4">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                              <h3>5 шагов для создания плана закупок.</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 mt-3" v-for="step in steps" :key="step.header">
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
</template>

<script>
    import { mdbCard } from 'mdbvue';
    import Step from "../components/Step";
    export default {
        name: 'FeaturesPage',
        components: {
          Step,
            mdbCard
        },
        data() {
            return {
                steps: [
                    {
                        header: 'Шаг 1',
                        text: 'Зарегистрируйте аккаунт.',
                        to: '/register',
                        link: 'Регистрация',
                        headerColor: 'primary-color',
                        btnColor: 'primary'
                    },
                    {
                        header: 'Шаг 2',
                        text: 'Создайте категорию для файлов с информацией о продажах.',
                        to: '/categories',
                        link: 'Каталог',
                        headerColor: 'warning-color',
                        btnColor: 'warning'
                    },
                    {
                        header: 'Шаг 3',
                        text: 'Добавте файлы к категории.',
                        to: '/categories',
                        link: 'Каталог',
                        headerColor: 'secondary-color',
                        btnColor: 'secondary'
                    },
                    {
                        header: 'Шаг 4',
                        text: 'В разделе \'Отчеты\' создайте отчет.',
                        to: '/report/create',
                        link: 'Создание отчета',
                        headerColor: 'info-color',
                        btnColor: 'info'
                    },
                    {
                        header: 'Шаг 5',
                        text: 'В новой странице откроется отчет о спросе и плане заказов.',
                        to: '/',
                        link: 'Создание отчета',
                        headerColor: 'success-color',
                        btnColor: 'success'
                    }
                ]
            }
        }
    }
</script>
