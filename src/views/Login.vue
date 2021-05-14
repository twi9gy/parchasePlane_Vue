<template>
    <div style="height: 90vh">
        <div class="" style="height: 90vh">
            <div class="container flex-center">
                <div class="container">
                    <div class="row">
                        <div class="col">

                            <!-- Material form login -->
                            <form class="login" @submit.prevent="loginHandler">
                                <template>
                                    <section class="form-gradient">
                                        <div content="row" class="d-flex justify-content-center">
                                            <div class="col-md-7">
                                                <mdb-card>
                                                    <div class="header pt-3 aqua-gradient">
                                                        <div class="row d-flex justify-content-center">
                                                            <h3 class="white-text mb-3 pt-3 font-weight-bold">Вход</h3>
                                                        </div>
                                                    </div>
                                                    <mdb-card-body class="mx-4 mt-4">
                                                        <div v-if="!loading">
                                                            <div class="md-form" :class="{'is-invalid':
                                                              (this.$v.email.$dirty && !this.$v.email.required) ||
                                                              (this.$v.email.$dirty && !this.$v.email.email)}">
                                                                <input id="email_input" type="text" class=" form-control"
                                                                       v-model.trim="email"
                                                                       :class="{'is-invalid':
                                                                  (this.$v.email.$dirty && !this.$v.email.required) ||
                                                                  (this.$v.email.$dirty && !this.$v.email.email)}"/>
                                                                <label ref="email_label" for="email_input" class="mr-5"
                                                                       :class="{ active: email !== '' }">Email</label>

                                                                <div class="invalid-feedback"
                                                                     v-if="this.$v.email.$dirty && !this.$v.email.required">
                                                                    Поле Email не должно быть пустым.
                                                                </div>

                                                                <div class="invalid-feedback"
                                                                     v-else-if="this.$v.email.$dirty && !this.$v.email.email">
                                                                    Введите корректный Email.
                                                                </div>
                                                            </div>

                                                            <div class="md-form" :class="{'is-invalid':
                                                              (this.$v.password.$dirty && !this.$v.password.required) ||
                                                              (this.$v.password.$dirty && !this.$v.password.minLength)}">

                                                                <input id="password_input" type="password" class=" form-control"
                                                                       v-model.trim="password"
                                                                       :class="{'is-invalid':
                                                                     (this.$v.password.$dirty && !this.$v.password.required) ||
                                                                     (this.$v.password.$dirty && !this.$v.password.minLength)}"/>

                                                                <label ref="password_label" for="password_input"
                                                                       class="mr-5"
                                                                       :class="{ active: password !== '' }">Пароль</label>

                                                                <div class="invalid-feedback" v-if="
                                                                  (this.$v.password.$dirty && !this.$v.password.required)">
                                                                    Поле пароль не должно быть пустым.
                                                                </div>
                                                                <div class="invalid-feedback" v-if="
                                                                  (this.$v.password.$dirty && !this.$v.password.minLength)">
                                                                    Пароль должен быть
                                                                    {{ $v.password.$params.minLength.min }}
                                                                    символом. Сейчас он {{ password.length }}
                                                                </div>
                                                            </div>

                                                            <div class="row d-flex align-items-center mb-4">
                                                                <div class="col-md-5 d-flex align-items-start">
                                                                    <div class="text-center">
                                                                        <mdb-btn rounded type="submit">Вход</mdb-btn>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-7 d-flex justify-content-end">
                                                                    <p class="font-small grey-text mt-3">У вас нет аккаунта?
                                                                        <router-link :to="{name: 'register'}"
                                                                                     class="dark-grey-text ml-1 font-weight-bold"> Регистрация
                                                                        </router-link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div v-else>
                                                            <Spinner />
                                                        </div>
                                                    </mdb-card-body>

                                                </mdb-card>
                                            </div>
                                        </div>
                                    </section>
                                </template>
                            </form>
                            <!-- Material form login -->

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { email, required, minLength } from 'vuelidate/lib/validators'
    import { mdbCard, mdbCardBody, mdbBtn } from 'mdbvue';
    import Spinner from "../components/Spinner";

    export default {
        name: "Login",
        components: {
            mdbCard,
            mdbBtn,
            mdbCardBody,
            Spinner
        },
        data() {
            return {
                email : '',
                password: ''
            }
        },
        validations: {
            email: { email, required },
            password: { required, minLength: minLength(8) }
        },
        computed: {
            loading() {
                return this.$store.getters.getLoading;
            }
        },
        created() {
            this.$store.commit('setLoading', false);
        },
        methods: {
            loginHandler: function () {
                // Проверяем валидацию полей формы
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                // формируем входные данные для авторизации
                const formData = {
                    username: this.email,
                    password: this.password
                };

                this.$store.commit('setLoading', true);

                // Вызываем метод авторизации
                this.$store.dispatch('login', formData)
                    .then(() => {
                        this.$store.commit('setLoading', false);
                        this.$router.push({'name' : 'privateOffice'})
                    })
                    .catch(() => {
                        this.$store.commit('setLoading', false);
                        this.$error(this, this.$store.getters.getMessage);
                    });
            },
            onFocusOut() {
                if (this.email === '') {
                    this.$refs.email_label.classList.remove('active')
                }
                if (this.password === '') {
                    this.$refs.password_label.classList.remove('active')
                }
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
    .is-invalid input {
        border-bottom: 1px solid red!important;
    }
    .is-invalid input {
        border-color: #dc3545;
    }
</style>


