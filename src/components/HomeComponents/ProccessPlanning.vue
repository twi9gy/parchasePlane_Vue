<template>
    <div class="container-fluid p-0">

        <div class="row mt-5">
            <div class="col">
                <h3 class="text-center mb-5">Процесс создания плана закупок делиться на 3 этапа:</h3>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-4 col-md-6 mb-3">
                <card-method
                    :header="'1. Определение спроса в предыдущих периодах'"
                    :header-color="'light-blue'"
                    :text="'Анализируется информация о ваших прошлых продажах. Определяются такие ' +
                        'компоненты временного ряда, как шум, сезонность, тренд. На этом этапе ' +
                        'прогнозируется спрос на следующий период.'"/>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
                <card-method
                        :header="'2. Расчет резервного запаса на следующий период'"
                        :header-color="'light-blue darken-2'"
                        :text="'С помощью вероятностного подхода происодит расчет страхового запаса.'"/>
            </div>

            <div class="col-lg-4 col-md-12 mb-3">
                <card-method
                        :header="'3. Поиск оптимального объема продукции на следующий период'"
                        :header-color="'light-blue darken-4'"
                        :text="'Собранные данные обрабатываются с помощью модели Уилсона. Результатом ' +
                            'становиться готовый план закупок на продукцию.'"/>
            </div>
        </div>

    </div>
</template>

<script>
    import CardMethod from './CardMethod';

    export default {
        name: 'ProccessPlanning',
        components: { CardMethod },
    }
</script>
