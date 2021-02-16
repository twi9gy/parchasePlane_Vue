<template>
    <div class="profile-information">
        <mdb-input placeholder="Email" class="mb-3 mt-0" v-model="getProfile.email">
            <span class="input-group-text md-addon" slot="prepend"> <mdb-icon icon="user" /></span>
        </mdb-input>

        <mdb-input placeholder="Пароль" class="mb-3 mt-0" v-model="getProfile.password">
            <span class="input-group-text md-addon" slot="prepend"> <mdb-icon icon="key" /></span>
        </mdb-input>

        <mdb-input placeholder="Телефон" class="mb-3 mt-0" v-model="getProfile.phone">
            <span class="input-group-text md-addon" slot="prepend"> <mdb-icon icon="phone" /></span>
        </mdb-input>

        <mdb-row class="d-flex align-items-center mb-4">
            <mdb-col md="12" class="d-flex justify-content-center">
                <div class="text-center">
                    <mdb-btn rounded type="submit" class="pl-5 pr-5">Изменить</mdb-btn>
                </div>
            </mdb-col>
        </mdb-row>
    </div>
</template>

<script>
    import {mapGetters} from'vuex'
    import { mdbRow, mdbCol, mdbInput, mdbBtn, mdbIcon } from 'mdbvue';

    export default {
        name: "ProfileInformation",
        computed: mapGetters(["getProfile"]),
        components: {
            mdbInput,
            mdbBtn,
            mdbIcon,
            mdbRow,
            mdbCol
        }
    }
</script>

<style scoped>
    .header-profile {
        padding: 1.5rem;
        margin: -2rem 1rem 1rem 1rem;
        text-align: center;
    }
</style>
