<template>
    <div class="profile-information">
        <mdb-input placeholder="Email" class="mb-3 mt-0" v-model="User.email">
            <span class="input-group-text md-addon" slot="prepend"> <mdb-icon icon="user" /></span>
        </mdb-input>

        <mdb-input placeholder="Пароль" class="mb-3 mt-0" v-model="User.password">
            <span class="input-group-text md-addon" slot="prepend"> <mdb-icon icon="key" /></span>
        </mdb-input>

        <mdb-input placeholder="Телефон" class="mb-3 mt-0" v-model="User.phone">
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
    import { mdbRow, mdbCol, mdbInput, mdbBtn, mdbIcon } from 'mdbvue';

    export default {
        name: "ProfileInformation",
        computed: {
          User: function () {
              return this.$store.getters.getUser;
          }
        },
        components: {
            mdbInput,
            mdbBtn,
            mdbIcon,
            mdbRow,
            mdbCol
        },
        created() {
            this.$store.commit('setHint', this.$route.meta.hint);
            this.$store.commit('setHeader', this.$route.meta.pageName);
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
