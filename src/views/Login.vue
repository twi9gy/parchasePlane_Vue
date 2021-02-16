<template>
    <div style="height: 90vh">
        <div class="" style="height: 90vh">
            <div class="container flex-center">
                <mdb-container>
                    <mdb-row>
                        <mdb-col>
                            <!-- Material form login -->
                            <form class="login" @submit.prevent="login">
                                <template>
                                    <section class="form-gradient">
                                        <mdb-row class="d-flex justify-content-center">
                                            <mdb-col md="6">
                                                <mdb-card>
                                                    <div class="header pt-3 aqua-gradient">
                                                        <mdb-row class="d-flex justify-content-center">
                                                            <h3 class="white-text mb-3 pt-3 font-weight-bold">Вход</h3>
                                                        </mdb-row>
                                                    </div>
                                                    <mdb-card-body class="mx-4 mt-4">

                                                        <mdb-input label="Email" type="text" v-model="getProfile.email"/>
                                                        <mdb-input label="Пароль" type="password" v-model="getProfile.password"
                                                                   required containerClass="mb-0"/>

                                                        <mdb-row class="d-flex align-items-center mb-4">
                                                            <mdb-col md="5" class="d-flex align-items-start">
                                                                <div class="text-center">
                                                                    <mdb-btn rounded type="submit" >Вход</mdb-btn>
                                                                </div>
                                                            </mdb-col>
                                                            <mdb-col md="7" class="d-flex justify-content-end">
                                                                <p class="font-small grey-text mt-3">У вас нет аккаунта?
                                                                    <router-link :to="{name: 'register'}"
                                                                                 class="dark-grey-text ml-1 font-weight-bold"> Регистрация
                                                                    </router-link>
                                                                </p>
                                                            </mdb-col>
                                                        </mdb-row>
                                                    </mdb-card-body>
                                                </mdb-card>
                                            </mdb-col>
                                        </mdb-row>
                                    </section>
                                </template>
                            </form>
                            <!-- Material form login -->
                        </mdb-col>
                    </mdb-row>
                </mdb-container>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbContainer } from 'mdbvue';

    export default {
        name: "Login",
        components: {
            mdbRow,
            mdbCol,
            mdbCard,
            mdbInput,
            mdbBtn,
            mdbContainer,
            mdbCardBody
        },
        computed: mapGetters(["getProfile"]),
        methods: {
            login: function () {
                let email = this.email;
                let password = this.password;
                this.$store.dispatch('login', { email, password })
                    .then(() => this.$router.push('/privateOfficeComponents'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>
    .form-dark .font-small {
        font-size: 0.8rem; }

    .form-dark [type="radio"] + label,
    .form-dark [type="checkbox"] + label {
        font-size: 0.8rem; }

    .form-dark [type="checkbox"] + label:before {
        top: 2px;
        width: 15px;
        height: 15px; }

    .form-dark .md-form label {
        color: #fff; }

    .form-dark input[type=text]:focus:not([readonly]) {
        border-bottom: 1px solid #00C851;
        -webkit-box-shadow: 0 1px 0 0 #00C851;
        box-shadow: 0 1px 0 0 #00C851; }

    .form-dark input[type=text]:focus:not([readonly]) + label {
        color: #fff; }

    .form-dark input[type=password]:focus:not([readonly]) {
        border-bottom: 1px solid #00C851;
        -webkit-box-shadow: 0 1px 0 0 #00C851;
        box-shadow: 0 1px 0 0 #00C851; }

    .form-dark input[type=password]:focus:not([readonly]) + label {
        color: #fff; }

    .form-dark input[type="checkbox"] + label:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 17px;
        height: 17px;
        z-index: 0;
        border: 1.5px solid #fff;
        border-radius: 1px;
        margin-top: 2px;
        -webkit-transition: 0.2s;
        transition: 0.2s; }

    .form-dark input[type="checkbox"]:checked + label:before {
        top: -4px;
        left: -3px;
        width: 12px;
        height: 22px;
        border-style: solid;
        border-width: 2px;
        border-color: transparent #00c851 #00c851 transparent;
        -webkit-transform: rotate(40deg);
        -ms-transform: rotate(40deg);
        transform: rotate(40deg);
        -webkit-backface-visibility: hidden;
        -webkit-transform-origin: 100% 100%;
        -ms-transform-origin: 100% 100%;
        transform-origin: 100% 100%; }
</style>


