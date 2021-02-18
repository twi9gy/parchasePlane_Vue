<template>
    <div class="main-layout">
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
                    <article class="col-12">
                        <router-view />
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
    import NavBar from "../components/NavBar";
    import Footer from "../components/Footer";
    import { mdbView, mdbMask } from 'mdbvue';

    export default {
        name: "MainLayout",
        components: {
            NavBar,
            Footer,
            mdbView,
            mdbMask
        }
    }
</script>

<style>
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
</style>
