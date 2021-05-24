<template>
    <div class="private-layout">
        <!-- CONTENT -->
        <main>
            <div class="container">
                <div class="row">
                    <div class="col-12 mb-3">
                        <div class="container">

                            <section class="form-gradient">
                                <div class="row mt-5">
                                    <div class="col-md-12 p-0">

                                        <mdb-card class="mt-5">
                                            <div class="header pt-3 pb-2 blue-gradient z-depth-1-half rounded header-report">
                                                <div class="row d-flex justify-content-center">

                                                    <div class="col-lg-2 col-md-3 col-sm-12 d-flex"
                                                        :class="{
                                                            'justify-content-start': width >= 576,
                                                            'justify-content-center mb-2' : width < 576
                                                        }">

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

                                                    <div class="col-lg-8 col-md-7 col-sm-12">
                                                        <h3 class="white-text text-center">{{ page.header }}</h3>
                                                    </div>

                                                    <div class="col-lg-2 col-md-2 col-sm-12 d-flex"
                                                         :class="{
                                                            'justify-content-end': width >= 576,
                                                            'justify-content-center' : width < 576
                                                        }">

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

                                            <mdb-card-body
                                                :class="{ 'p-0': width < 1200 }">
                                                <div class="container-fluid">
                                                    <router-view />
                                                </div>
                                            </mdb-card-body>

                                        </mdb-card>

                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- ./CONTENT -->
    </div>
</template>

<script>
    import { mdbCard, mdbCardBody, mdbIcon, mdbBtn } from 'mdbvue';
    import Tooltip from "../components/LayoutComponents/Tooltip";

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
            },
            width() {
                return this.$store.getters.getWidth;
            },
            height() {
                return this.$store.getters.getHeight;
            }
        }
    }
</script>

<style scoped>
    .header-report {
        padding: 1.5rem;
        margin: -2rem 1rem 1rem 1rem;
        text-align: center;
    }
</style>
