<template>
    <div id="app">

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

        <!--CONTENT-->
        <component :is="layout"></component>
        <!--/CONTENT-->

        <!-- FOOTER -->
        <Footer />
        <!-- ./FOOTER -->

    </div>
</template>

<script>
    import MainLayout from "./layout/MainLayout";
    import PrivateLayout from "./layout/PrivateLayout";
    import NavBar from "./components/NavBar";
    import Footer from "./components/Footer";
    import { mdbView, mdbMask } from 'mdbvue';

    export default {
        computed : {
            layout() {
                return (this.$route.meta.layout || 'main') + '-layout';
            }
        },
        components: {
            MainLayout,
            PrivateLayout,
            NavBar,
            Footer,
            mdbView,
            mdbMask
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
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
        background: -o-linear-gradient(45deg, rgba(42, 27, 161, 0.7), rgba(29, 210, 177, 0.7) 100%);
        background: linear-gradient(45deg, rgba(42, 27, 161, 0.7), rgba(29, 210, 177, 0.7) 100%);
    }
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
    h6 {
        line-height: 1.7;
    }
    .alert_wrapper{
        margin-top: 15vh;
    }
    main {
        margin-top: 70px;
        min-height: 100vh;
    }
</style>
