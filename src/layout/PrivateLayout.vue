<template>
    <div class="private-layout">
        <!-- HEADER -->
        <div class="top">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-xl-12 order-md-1 order-xl-0">
                        <!-- NavBar-->
                        <NavBar  />
                        <!-- /.NavBar-->
                    </div>
                </div>
            </div>
        </div>
        <!-- ./HEADER -->

        <!--BACKGROUND-->
        <div class="fixed-top" style="z-index: -10">
            <mdb-view>
                <mdb-mask class="gradient"></mdb-mask>
            </mdb-view>
        </div>
        <!--/.BACKGROUND-->

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
                                                <div class="col-4 d-flex justify-content-start">

                                                    <router-link :to="{name: 'privateOffice'}">
                                                        <mdb-btn class="btn-outline-white btn-rounded btn-sm px-2">
                                                            <mdb-icon  icon="user-astronaut" />
                                                        </mdb-btn>
                                                    </router-link>

                                                    <router-link :to="{name: 'categories'}">
                                                        <mdb-btn class="btn-outline-white btn-rounded btn-sm px-2">
                                                            <mdb-icon  icon="boxes" />
                                                        </mdb-btn>
                                                    </router-link>

                                                    <router-link :to="{name: 'reports'}">
                                                        <mdb-btn class="btn-outline-white btn-rounded btn-sm px-2">
                                                            <mdb-icon  icon="file-invoice-dollar" />
                                                        </mdb-btn>
                                                    </router-link>

                                                </div>
                                                <div class="col-4">
                                                    <h3 class="white-text">{{ this.getPage }}</h3>
                                                </div>
                                                <div class="col-4 d-flex justify-content-end">

                                                    <router-link :to="{name: 'home'}">
                                                        <mdb-btn class="btn-outline-white btn-rounded btn-sm px-2">
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

        <!-- FOOTER -->
        <Footer />
        <!-- ./FOOTER -->
    </div>
</template>

<script>
    import { mdbCard, mdbCardBody, mdbIcon, mdbBtn, mdbView, mdbMask } from 'mdbvue';
    import NavBar from "../components/NavBar";
    import Footer from "../components/Footer";
    import {mapGetters} from "vuex";
    import Tooltip from "../components/Tooltip";

    export default {
        name: "ReportLayout",
        components: {
            Tooltip,
            mdbCard,
            mdbCardBody,
            mdbIcon,
            mdbBtn,
            NavBar,
            Footer,
            mdbView,
            mdbMask
        },
        props: ["name"],
        computed: mapGetters(["getPage"])
    }
</script>

<style scoped>
    .navbar {
        transition: 1s;
    }
    .navbar .md-form {
        margin: 0;
    }
    .top-nav-collapse {
        background-color: #424f95 !important;
    }
    @media (max-width: 990px){
        .navbar {
            background-color: #424f95 !important;
        }
    }
    .view {
        background-image: url('https://mdbootstrap.com/img/Photos/Others/architecture.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: 100vh;
    }
    .gradient {
        background: -moz-linear-gradient(45deg, rgba(42, 27, 161, 0.7), rgba(29, 210, 177, 0.7) 100%);
        background: -webkit-linear-gradient(45deg, rgba(42, 27, 161, 0.7), rgba(29, 210, 177, 0.7) 100%);
        background: -webkit-gradient(linear, 45deg, from(rgba(42, 27, 161, 0.7)), to(rgba(29, 210, 177, 0.7)));
        background: -o-linear-gradient(45deg, rgba(42, 27, 161, 0.7), rgba(29, 210, 177, 0.7) 100%);
        background: linear-gradient(45deg, rgba(42, 27, 161, 0.7), rgba(29, 210, 177, 0.7) 100%);
    }
    h6 {
        line-height: 1.7;
    }
    main {
        margin-top: 70px;
        min-height: 100vh;
    }
    .header-report {
        padding: 1.5rem;
        margin: -2rem 1rem 1rem 1rem;
        text-align: center;
    }
</style>
