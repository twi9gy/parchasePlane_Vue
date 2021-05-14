<template>
    <mdb-datatable
            :data="data"
            striped
            bordered
    />
</template>

<script>
    import { mdbDatatable } from 'mdbvue';
    export default {
        name: 'OrdersTable',
        components: {
            mdbDatatable
        },
        props: ['records'],
        data() {
            return {
                data: {
                    columns: [
                        {
                            label: 'Дата заказа',
                            field: 'start_date',
                            sort: 'asc'
                        },
                        {
                            label: 'Дата прибытия заказа',
                            field: 'end_date',
                            sort: 'asc'
                        },
                        {
                            label: 'Размер заказа',
                            field: 'size',
                            sort: 'asc'
                        },
                    ],
                    rows: this.records
                }
            }
        }
    }
</script>

<style scoped>

</style>