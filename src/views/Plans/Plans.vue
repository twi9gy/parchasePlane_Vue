<template>
    <div class="">

        <div v-if="!loading">
            <div class="row mt-2 justify-content-center" v-for="file in items" :key="file.id">

                <div class="col-lg-9 col-md-6 col-sm-12">
                    <router-link :to="{name: 'plansShow', params: { 'id' : file.id }}">
                        <mdb-btn
                                class="btn-primary btn-rounded">
                            {{ file.filename }}
                        </mdb-btn>
                    </router-link>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                    <div class="row">
                        <div class="col-4">
                            <mdb-btn color="danger" size="md" @click="delFile(file)"><mdb-icon  icon="trash" /></mdb-btn>
                        </div>
                    </div>
                </div>

            </div>

            <hr />

            <div class="row mb-2">

                <div class="col-md-7 d-flex justify-content-end">
                    <router-link :to="{name: 'plans_create'}">
                        <mdb-btn color="default" size="lg" >Создать план закупок</mdb-btn>
                    </router-link>
                </div>

                <div class="col-5 mt-2 d-flex justify-content-end" v-if="pageCount > 1">
                    <Paginate
                            v-model="page"
                            :page-count="pageCount"
                            :click-handler="pageChangeHandler"
                            :prev-text="'«'"
                            :next-text="'»'"
                            :container-class="'pagination pg-blue mb-0 mt-2'"
                            :page-class="'page-item'"
                            :pageLinkClass="'page-link waves-effect waves-effect'"
                            :prevClass="'page-item'"
                            :prevLinkClass="'page-link waves-effect waves-effect'"
                            :nextClass="'page-item'"
                            :nextLinkClass="'page-link waves-effect waves-effect'"
                    />
                </div>

            </div>
        </div>

        <div v-else>
            <spinner />
        </div>

    </div>
</template>

<script>
    import paginations from "../../utils/paginations";
    import { mdbBtn, mdbIcon } from 'mdbvue'

    import Spinner from '../../components/Spinner.vue';

    export default {
        name: "Plans",
        mixins: [paginations],
        components: {
            mdbBtn,
            mdbIcon,
            Spinner
        },
        created() {
            this.$store.commit('setHint', this.$route.meta.hint);
            this.$store.commit('setHeader', this.$route.meta.pageName);

            this.$store.commit('setLoading', false);
        },
        computed: {
            loading() {
                return this.$store.getters.getLoading;
            }
        },
        async mounted() {
            if (this.items) {
                this.$store.commit('setLoading', true);

                await this.$store.dispatch('getPurchasePlans')
                    .then(() => { this.$store.commit('setLoading', false) })
                    .catch(() => {
                        this.$store.commit('setLoading', false);
                        this.$error(this, this.$store.getters.getMessage)
                    });
            }
            this.setupPagination(this.$store.getters.plans);
        },
        methods: {
            async delFile(file) {
                await this.$store.dispatch('delPurchasePlan', { 'file_id' : file.id })
                    .then(()=>{ this.$message(this, this.$store.getters.getMessage) })
                    .catch(() => { this.$error(this, this.$store.getters.getMessage) });

                this.setupPagination(this.$store.getters.plans);
            },
        }
    }
</script>

<style scoped>

</style>
