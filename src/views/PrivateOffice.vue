<template>
    <div class="container-fluid mt-5 mb-5">
        <div class="row justify-content-center mb-2">
            <div class="col-12 card">
                <div class="row">
                    <b-input-group>
                        <b-col lg="4" class="pb-1">
                            <h4 class="switch-title">Информация</h4>
                            <mdb-btn class="w-100 p-1" color="primary" @click="InformationClick"></mdb-btn>
                        </b-col>
                        <b-col lg="4" class="pb-1">
                            <h4 class="switch-title">Каталог</h4>
                            <mdb-btn class="w-100 p-1" color="primary" @click="CatalogClick"></mdb-btn>
                        </b-col>
                        <b-col lg="4" class="pb-1">
                            <h4 class="switch-title">Отчеты</h4>
                            <mdb-btn class="w-100 p-1" color="primary" @click="ReportsClick"></mdb-btn>
                        </b-col>
                    </b-input-group>
                </div>
            </div>
        </div>
        <div class="row justify-content-center mb-2">
            <div class="col-12">
                <template>
                    <section class="form-gradient">
                        <mdb-row class="d-flex justify-content-center">
                            <mdb-col md="12" class="p-0">
                                <mdb-card class="mt-5">
                                    <div class="header pt-3 pb-2 info-color header-profile">
                                        <mdb-row class="d-flex justify-content-center">
                                            <h3 class="white-text">{{ currentTitle }}</h3>
                                        </mdb-row>
                                    </div>
                                    <mdb-card-body >
                                        <div class="container-fluid">
                                            <component :is="profileElement"></component>
                                        </div>
                                    </mdb-card-body>
                                </mdb-card>
                            </mdb-col>
                        </mdb-row>
                    </section>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import ProfileInformation from "../components/privateOffice/ProfileInformation";
    import ProfileCatalog from "../components/privateOffice/ProfileCatalog";
    import ProfileReports from "../components/privateOffice/ProfileReports";
    import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbIcon } from 'mdbvue';

    export default {
        name: "profileSwitch",
        components: {
            mdbBtn,
            ProfileInformation,
            ProfileCatalog,
            ProfileReports,
            mdbRow,
            mdbCol,
            mdbCard,
            mdbCardBody,
            mdbInput,
            mdbIcon
        },
        data() {
            return {
                currentTitle: 'Личный кабинет',
                profileElement: 'profile-information'
            }
        },
        props: ["profile"],
        methods: {
            InformationClick () {
                this.currentTitle = 'Личный кабинет';
                this.profileElement = 'profile-information'
            },
            CatalogClick () {
                this.currentTitle = 'Каталог';
                this.profileElement = 'profile-catalog'
            },
            ReportsClick () {
                this.currentTitle = 'Отчеты';
                this.profileElement = 'profile-reports'
            },
        }
    }
</script>

<style scoped>
    .switch {
        width: 27ch;
    }
    .switch-title {
        margin-bottom: -7.5px;
        margin-top: 5px;
    }
    .header-profile {
        padding: 1.5rem;
        margin: -2rem 1rem 1rem 1rem;
        text-align: center;
    }
</style>
