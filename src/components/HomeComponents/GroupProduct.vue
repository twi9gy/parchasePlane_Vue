<template>
    <div class="container-fluid p-0">

        <div class="row" v-if="width >= 576">
            <div class="col p-0">
                <LinePng />
            </div>
        </div>

        <hr v-else/>

        <div class="row">
            <div class="col p-0">
                <div class="container p-0">
                    <div class="row">
                        <div class="col">
                            <ABCAnalisys />
                        </div>
                    </div>
                </div>  
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col p-0">
                <div class="container p-0">
                    <div class="row">
                        <div class="col">
                            <XYZAnalisys />
                        </div>
                    </div>
                </div>  
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col">
                <h3 class="text-center mb-3">Группы товаров согласно комбиннированию методов ABC и XYZ:</h3>
            </div>
        </div>                       

        <div class="row mb-3">
            <div class="col-12">
                
                <div class="container">

                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'AX'"
                                    :header-color="'success-color'"
                                    :text="'Высокая потребительская стоимость и степень надежности прогноза вследствие' + 
                                    ' стабильности потребления.'"/>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'AY'"
                                    :header-color="'info-color'"
                                    :text="'Высокая потребительская стоимость, средняя степень надежности прогноза' +
                                    ' вследствие нестабильности потребления.'"/>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'AZ'"
                                    :header-color="'danger-color'"
                                    :text="'Высокая потребительская стоимость, низкая степень надежности прогноза ' + 
                                    'вследствие стохастического потребления.'"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'BX'"
                                    :header-color="'success-color'"
                                    :text="'Средняя потребительская стоимость, высокая степень надежности прогноза вследствие' + 
                                    ' стабильности потребления.'"/>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'BY'"
                                    :header-color="'info-color'"
                                    :text="'Средняя потребительская стоимость и степень надежности прогноза ' + 
                                    'вследствие нестабильности потребления.'"/>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'BZ'"
                                    :header-color="'danger-color'"
                                    :text="'Средняя потребительская стоимость, низкая степень надежности прогноза ' + 
                                    'вследствие стохастического потребления.'"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'CX'"
                                    :header-color="'success-color'"
                                    :text="'Низкая потребительская стоимость, высокая степень надежности прогноза вследствие' + 
                                    ' стабильности потребления.'"/>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'CY'"
                                    :header-color="'info-color'"
                                    :text="'Низкая потребительская стоимость, средняя степень надежности прогноза ' + 
                                    'вследствие нестабильности потребления.'"/>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <card-method
                                    :header="'CZ'"
                                    :header-color="'danger-color'"
                                    :text="'Низкая потребительская стоимость и степень надежности прогноза ' + 
                                    'вследствие стохастического потребления.'"/>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col">
                            <h5 class="text-justify">Рекомендация: для надежного прогнозирования спроса в системе лучше использовать товары группы X или Y.
                                 Они отмечены зеленым и голубым цветом соответственно.</h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import CardMethod from './CardMethod';
    import ABCAnalisys from './ABCAnalisys';  
    import XYZAnalisys from './XYZAnalisys'; 
    import LinePng from './LinePng'; 

    export default {
        name: 'GroupProduct',
        components: { CardMethod, ABCAnalisys, XYZAnalisys, LinePng },
        computed: {
            width() {
                return this.$store.getters.getWidth;
            }
        }
    }
</script>