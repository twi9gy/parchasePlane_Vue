<template>
    <div style="height: 90vh">
        <div class="" style="height: 90vh">
            <div class="container flex-center">
                <mdb-container>
                    <mdb-row>
                        <mdb-col>
                            <!-- Material form login -->
                            <form class="login" @submit.prevent="loginHandler">
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

                                                        <div class="md-form" :class="{'is-invalid':
                                                            (this.$v.email.$dirty && !this.$v.email.required) ||
                                                            (this.$v.email.$dirty && !this.$v.email.email)}">
                                                            <input id="email_input" type="text" class=" form-control"
                                                                @input="$refs.email_label.classList.add('active')"
                                                                @focusout="onFocusOut"
                                                                v-model.trim="email"
                                                                :class="{'is-invalid':
                                                                (this.$v.email.$dirty && !this.$v.email.required) ||
                                                                (this.$v.email.$dirty && !this.$v.email.email)}"/>
                                                            <label ref="email_label" for="email_input" class="mr-5">Email</label>

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
                                                            (this.$v.email.$dirty && !this.$v.email.email)}">

                                                            <input id="password_input" type="password" class=" form-control"
                                                                   @input="$refs.password_label.classList.add('active')"
                                                                   @focusout="onFocusOut"
                                                                   v-model.trim="password"
                                                                   :class="{'is-invalid':
                                                                   (this.$v.password.$dirty && !this.$v.password.required) ||
                                                                   (this.$v.email.$dirty && !this.$v.password.minLength)}"/>

                                                            <label ref="password_label" for="password_input"
                                                                   class="mr-5">Пароль</label>

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

                                                        <mdb-row class="d-flex align-items-center mb-4">
                                                            <mdb-col md="5" class="d-flex align-items-start">
                                                                <div class="text-center">
                                                                    <mdb-btn rounded type="submit">Вход</mdb-btn>
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
    import { email, required, minLength } from 'vuelidate/lib/validators'
    import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbBtn, mdbContainer } from 'mdbvue';

    export default {
        name: "Login",
        components: {
            mdbRow,
            mdbCol,
            mdbCard,
            mdbBtn,
            mdbContainer,
            mdbCardBody
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
                // Вызываем метод авторизации
                this.$store.dispatch('login', formData)
                    .then(() => {
                          this.$router.push('/privateOffice')
                              .then(this.$message(this, this.$store.getters.getMessage))
                        })
                    .catch(() => {
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


