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
        name: 'ReportTable',
        components: {
            mdbDatatable
        },
        props: ['records', 'column'],
        data() {
            return {
                data: {
                    columns: [
                        {
                            label: 'Дата',
                            field: 'Date',
                            sort: 'asc'
                        },
                        {
                            label: this.column,
                            field: this.column,
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