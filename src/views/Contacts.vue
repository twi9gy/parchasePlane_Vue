<template>
    <div class="container-fluid">

        <div v-if="loading">
            <spinner />
        </div>

        <div v-else>
            <section class="contact-section my-5">
                <mdb-card class="p-3">
                    <div class="row">
                        <div class="col-8">

                            <h3 class="mt-4">
                                <mdb-icon icon="envelope" class="pr-2"/>Пишите нам:
                            </h3>

                            <div class="row">
                                <div class="col-6">
                                    <div class="md-form mb-0">
                                        <mdb-input type="text" id="form-contact-name" label="Ваше имя"/>
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="md-form mb-0">
                                        <mdb-input type="text" id="form-contact-email" label="Ваш email"/>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="md-form mb-0">
                                        <mdb-input type="text" id="form-contact-phone" label="Ваш телефон"/>
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="md-form mb-0">
                                        <mdb-input type="text" id="form-contact-company" label="Ваша компания"/>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <div class="md-form mb-0">
                                        <mdb-textarea id="form-contact-message" label="Ваше сообщение"/>
                                        <mdb-btn class="rounded p-2 pr-4 pl-4" style="font-size: 30px" outline="primary" size="lg">
                                            <mdb-icon far icon="paper-plane"/>
                                        </mdb-btn>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-4 text-center">

                            <h3 class="my-4 pb-2">Контактная информация</h3>

                            <ul class="text-center list-unstyled">
                                <li>
                                    <p><mdb-icon icon="map-marker" class="pr-2"/>New York, 94126 USA</p>
                                </li>
                                <li>
                                    <p><mdb-icon icon="phone" class="pr-2"/>+ 01 234 567 89</p>
                                </li>
                                <li>
                                    <p><mdb-icon icon="envelope" class="pr-2"/>twi9gy@gmail.com</p>
                                </li>
                            </ul>

                            <hr class="hr-light my-4"/>

                            <ul class="list-inline text-center list-unstyled">
                                <li class="list-inline-item">
                                    <a class="p-2 fa-lg w-ic">
                                        <mdb-icon fab icon="twitter"/>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="p-2 fa-lg w-ic">
                                        <mdb-icon fab icon="linkedin"/>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="p-2 fa-lg w-ic">
                                        <mdb-icon fab icon="instagram"/>
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </mdb-card>
            </section>
        </div>

    </div>
</template>

<script>
import { mdbBtn, mdbIcon, mdbInput, mdbTextarea, mdbCard } from 'mdbvue';

import Spinner from '../components/Spinner.vue';

export default {
    name: 'Contacts',
    components: {
        mdbBtn,
        mdbIcon,
        mdbInput,
        mdbTextarea,
        mdbCard,
        Spinner
    },
    computed: {
        loading() {
            return this.$store.getters.getLoading;
        }
    },
}
</script>
<style scoped>

</style>
