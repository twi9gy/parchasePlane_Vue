<template>
    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <h4 class="text-justify">XYZ-анализ представляет инструмент, который позволяет разделить ассортимент на группы,
                    в зависимости от стабильности продаж и колебаний спроса на продукцию.
                    Целью анализа является прогнозирование стабильности тех или иных объектов исследования,
                    например, стабильности продаж отдельных видов товаров, колебания уровня спроса и др.
                    Этот вид анализа вместе с ABC-анализом позволяет оптимизировать складской запас или структуру ассортимента. 
                    Согласно XYZ-анализу объекты деляться на следующие 3 группы:</h4>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <mdb-list-group>
                    <mdb-list-group-item class="text-justify">Группа Х (отклонение от 0% до 10%). К этой группе относятся товары,
                        характеризующиеся стабильной величиной потребления и высокой степенью прогнозирования;</mdb-list-group-item>
                    <mdb-list-group-item class="text-justify">Группа Y (изменение от 10% до 25%). Эта группа товаров,
                        характеризуется сезонными колебаниями и средними возможностями прогнозирования;</mdb-list-group-item>
                    <mdb-list-group-item class="text-justify">Группа Z (отклонение выше 25%). Это товары с нерегулярным потреблением
                        и непредсказуемыми колебаниями, поэтому точно спрогнозировать их спрос невозможно.</mdb-list-group-item>
                </mdb-list-group>
            </div>
        </div>
    </div>
</template>

<script>
  import { mdbListGroup, mdbListGroupItem } from 'mdbvue';
  export default {
    name: 'XYZAnalisys',
    components: { mdbListGroup, mdbListGroupItem }
  }
</script>