<template>
    <div class="private-layout">
        <!-- CONTENT -->
        <main>
            <div class="container">
                <div class="row">
                    <article class="col-12 mb-3">
                        <section class="form-gradient">
                            <div class="row mt-5">
                                <div class="col-md-12 p-0">
                                    <mdb-card class="mt-5">
                                        <div class="header pt-3 pb-2 blue-gradient z-depth-1-half rounded header-report">
                                            <div class="row d-flex justify-content-center">

                                                <div class="col-2 d-flex justify-content-start">

                                                    <router-link :to="{name: 'privateOffice'}">
                                                        <mdb-btn
                                                            v-b-tooltip="'Личный кабинет'"
                                                            class="btn-outline-white btn-rounded btn-sm px-2">
                                                            <mdb-icon  icon="user-astronaut" />
                                                        </mdb-btn>
                                                    </router-link>

                                                    <router-link :to="{name: 'categories'}">
                                                        <mdb-btn
                                                            v-b-tooltip="'Категории'"
                                                            class="btn-outline-white btn-rounded btn-sm px-2">
                                                            <mdb-icon  icon="boxes" />
                                                        </mdb-btn>
                                                    </router-link>

                                                    <router-link :to="{name: 'demandForecast'}">
                                                        <mdb-btn
                                                            v-b-tooltip="'Отчеты о прогнозировании спроса'"
                                                            class="btn-outline-white btn-rounded btn-sm px-2">
                                                            <mdb-icon  icon="file-invoice-dollar" />
                                                        </mdb-btn>
                                                    </router-link>

                                                    <router-link :to="{name: 'plans'}">
                                                        <mdb-btn
                                                            v-b-tooltip="'Планы закупок'"
                                                            class="btn-outline-white btn-rounded btn-sm px-2">
                                                            <mdb-icon  icon="poll-h" />
                                                        </mdb-btn>
                                                    </router-link>

                                                </div>

                                                <div class="col-8">
                                                    <h3 class="white-text">{{ page.header }}</h3>
                                                </div>

                                                <div class="col-2 d-flex justify-content-end">

                                                    <router-link :to="{name: 'home'}">
                                                        <mdb-btn
                                                            v-b-tooltip="'Главная'"
                                                            class="btn-outline-white btn-rounded btn-sm px-2">
                                                            <mdb-icon  icon="home" />
                                                        </mdb-btn>
                                                    </router-link>

                                                    <Tooltip :icon="'info-circle'"/>
                                                </div>

                                            </div>
                                        </div>
                                        <mdb-card-body >
                                            <div class="container-fluid">
                                                <router-view />
                                            </div>
                                        </mdb-card-body>
                                    </mdb-card>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </main>
        <!-- ./CONTENT -->
    </div>
</template>

<script>
    import { mdbCard, mdbCardBody, mdbIcon, mdbBtn } from 'mdbvue';
    import Tooltip from "../components/Tooltip";

    export default {
        name: "ReportLayout",
        components: {
            Tooltip,
            mdbCard,
            mdbCardBody,
            mdbIcon,
            mdbBtn,
        },
        props: ["name"],
        computed: {
            page() {
                return this.$store.getters.Page;
            },
            message() {
                return this.$store.getters.getMessage;
            }
        },
    }
</script>

<style scoped>
    .header-report {
        padding: 1.5rem;
        margin: -2rem 1rem 1rem 1rem;
        text-align: center;
    }
</style>
