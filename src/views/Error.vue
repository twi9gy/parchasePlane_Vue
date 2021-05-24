<template>
    <div class="container">
        <div class="mb-3">
            <section class="form-gradient">
                <mdb-row class="d-flex justify-content-center">
                    <mdb-col md="12" class="p-0">
                        <mdb-card class="mt-5">
                            <div class="header pt-3 pb-2 danger-color header-error rounded">
                                <mdb-row class="d-flex justify-content-center">
                                    <h3 class="white-text">Ошибка</h3>
                                </mdb-row>
                            </div>
                            <mdb-card-body >
                                <div class="container-fluid">
                                    <div class="content">
                                        Ошибка 404!!! Страница недоступна.
                                        <a href="#" @click.prevent="back">Вернуться назад</a>
                                    </div>
                                </div>
                            </mdb-card-body>
                        </mdb-card>
                    </mdb-col>
                </mdb-row>
            </section>
        </div>
    </div>
</template>

<script>
    import { mdbRow, mdbCol, mdbCard, mdbCardBody } from 'mdbvue';

    export default {
        name: "Error",
        components: {
            mdbRow,
            mdbCol,
            mdbCard,
            mdbCardBody,
        },
        methods: {
            back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .header-error {
        padding: 1.5rem;
        margin: -2rem 1rem 1rem 1rem;
        text-align: center;
    }
</style>
