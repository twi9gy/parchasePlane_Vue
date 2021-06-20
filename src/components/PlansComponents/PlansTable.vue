<template>
    <div class="table-wrapper">
        <!--Table-->
        <mdb-tbl class="table table-hover mb-0">
            <!--Table head-->
            <mdb-tbl-head>
                <tr>
                    <th class="th-lg">Название файла</th>
                    <th class="th-sm" v-if="width >= 576">Точка заказа</th>
                    <th class="th-sm" v-if="width >= 576">Резерв</th>
                    <th class="th-sm" v-if="width >= 576">Издержки</th>
                    <th class="th-sm" v-if="width >= 576">Создан</th>
                    <th class="th-sm">Удалить</th>
                </tr>
            </mdb-tbl-head>
            <!--Table head-->

            <!--Table body-->
            <mdb-tbl-body>
                <tr v-for="file in files" :key="file.id">
                    <td>
                        <router-link :to="{name: 'plansShow', params: { 'id' : file.id }}">
                            <mdb-btn class="w-100 btn-sm m-0" color="primary">{{ file.filename }}</mdb-btn>
                        </router-link>
                    </td>
                    <td v-if="width >= 576">{{ file.orderPoint }}</td>
                    <td v-if="width >= 576">{{ file.reserve }}</td>
                    <td v-if="width >= 576">{{ file.totalCost }} руб.</td>
                    <td v-if="width >= 576">{{ file.createdAt | date('datetime') }}</td>
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
</template>

<script>
    import { mdbBtn, mdbIcon, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';

    export default {
        name: "PlansTable",
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
            }
        }
    }
</script>

<style scoped>

</style>