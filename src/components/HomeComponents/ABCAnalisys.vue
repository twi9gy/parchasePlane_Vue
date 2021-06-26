<template>
    <div class="container-fluid">

        <div class="row mt-3">
            <div class="col">
                <h4 class="text-justify">ABC-анализ позволяет классифицировать ресурсы фирмы по степени их важности.
                     В его основе лежит принцип Парето — 20 % всех товаров дают 80 % оборота.
                     Данный метод позволяет произвести ранжирование ресурсов в зависимости от их ценности для бизнеса. 
                     По результатам ABC-анализа выделяют 3 группы объектов:</h4>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <mdb-list-group>
                    <mdb-list-group-item class="text-justify">Группа А: 20% ассортимента, с 80% долей в выручке;</mdb-list-group-item>
                    <mdb-list-group-item class="text-justify">Группа В: 30% ассортимента, дающие 15% выручки;</mdb-list-group-item>
                    <mdb-list-group-item class="text-justify">Группа С: 50% ассортимента, приносящие 5% от общей выручки.</mdb-list-group-item>
                </mdb-list-group>
            </div>
        </div>
    </div>
</template>

<script>
  import { mdbListGroup, mdbListGroupItem } from 'mdbvue';
  export default {
    name: 'ABCAnalisys',
    components: { mdbListGroup, mdbListGroupItem }
  }
</script>