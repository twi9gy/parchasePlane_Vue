<template>
    <div>
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
                                           v-model="isDemandForecast">
                                    <label class="custom-control-label" for="demand_forecast">Прогнозирование спроса</label>
                                </div>
                            </mdb-list-group-item>
                            <mdb-list-group-item :action="false" class="w-50">
                                <div class="custom-control custom-checkbox custom-control-inline ml-auto mr-auto">
                                    <input type="checkbox" class="custom-control-input" id="purchase_plan"
                                    v-model="isPurchasePlan">
                                    <label class="custom-control-label" for="purchase_plan">План закупок</label>
                                </div>
                            </mdb-list-group-item>
                        </mdb-list-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2" v-if="isDemandForecast">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <h4>Выберите по каким объектам производить анализ:</h4>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-8">
                        <mdb-list-group horizontal>
                            <mdb-list-group-item :action="false" class="w-50">
                                <div class="custom-control custom-radio ml-auto mr-auto">
                                    <input type="radio" class="custom-control-input" id="ByCategory"
                                           name="groupOfDefaultRadios" value="category" v-model="typeObject">
                                    <label class="custom-control-label" for="ByCategory">По категории</label>
                                </div>
                            </mdb-list-group-item>
                            <mdb-list-group-item :action="false" class="w-50">
                                <div class="custom-control custom-radio ml-auto mr-auto">
                                    <input type="radio" class="custom-control-input" id="ByFile"
                                           name="groupOfDefaultRadios" value="file" v-model="typeObject" checked>
                                    <label class="custom-control-label" for="ByFile">По файлу</label>
                                </div>
                            </mdb-list-group-item>
                        </mdb-list-group>
                    </div>
                </div>
                <div class="row mt-2" v-if="typeObject === 'category'">
                    <!-- Выделить в отдельный компонент -->
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <h4>Выберите категорию:</h4>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-6">
                                <!-- Сделать не dropdawn, а input c select для подсказок -->
                                <mdb-input label="Введите название категории" list="categories" />
                                <input class="form-control" list="categories" placeholder="Учебное заведение"/>
                                <datalist id="categories">
                                    <option v-for="category in category_options" :key="category.text">
                                        {{ category.text }}
                                    </option>
                                </datalist>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2" v-if="typeObject === 'file'">
                    <!-- Выделить в отдельный компонент -->
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <h4>Выберите файл:</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="isPurchasePlan"></div>
    </div>
</template>

<script>
    import { mdbListGroup, mdbListGroupItem, mdbInput  } from 'mdbvue';

    export default {
        name: "ActionForm",
        components: {
            mdbListGroup,
            mdbListGroupItem,
            mdbInput
        },
        data() {
            return {
                isDemandForecast : false,
                isPurchasePlan : false,
                typeObject: 'file',
                category_options:[
                    { value: 'Среднее специальное', text: 'Среднее специальное' },
                    { value: 'Неоконченное высшее', text: 'Неоконченное высшее'},
                    { value: 'Высшее', text: 'Высшее'},
                    { value: 'Бакалавр', text: 'Бакалавр'},
                    { value: 'Магистр', text: 'Магистр'},
                    { value: 'Кандидат наук', text: 'Кандидат наук'},
                    { value: 'Доктор наук', text: 'Доктор наук'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>
