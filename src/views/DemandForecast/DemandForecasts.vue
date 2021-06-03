<template>
    <div>
        
        <div v-if="!loading">

            <div class="row justify-content-end" style="margin-top: -4vh">
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <mdb-input type="text" placeholder="Поиск" aria-label="Search" v-model="searchValue"
                               @input="searchItems"/>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <demand-forecasts-table
                    :files="items"
                    v-on:delFile="delFile"/>
                </div>
            </div>

            <hr />

            <div class="row mb-2">

                <div class="d-flex"
                    :class="{
                        'col-md-7 justify-content-left' : page <= pageCount,
                        'col-md-12 justify-content-center' : pageCount === 1
                    }"
                    v-if="page === pageCount || pageCount === 1 || pageCount === 0">
                        <router-link :to="{name: 'demandForecastCreate'}">
                            <mdb-btn color="default" size="md">
                                Создать отчет о прогнозировании спроса
                            </mdb-btn>
                        </router-link>
                </div>

                <div class="mt-2 d-flex justify-content-end" v-if="pageCount > 1"
                     :class="{
                        'col-md-5' : page === pageCount,
                        'col-md-12' : pageCount > 1 && page !== pageCount
                    }">
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
import { mdbBtn, mdbInput } from 'mdbvue'

import Spinner from '../../components/LayoutComponents/Spinner.vue';
import DemandForecastsTable from "../../components/DemandFilesComponents/DemandForecastsTable";

export default {
    name: "DemandForecast",
    mixins: [paginations],
    components: {
        mdbInput,
        DemandForecastsTable,
        mdbBtn,
        Spinner
    },
    data() {
        return {
            searchValue: ''
        }
    },
    created() {
        this.$store.commit('setHint', this.$route.meta.hint);
        this.$store.commit('setHeader', this.$route.meta.pageName);

        // Устанавливаем оглавление к странице
        this.$store.commit('setTitle', this.$route.meta.title);
        document.title = this.title;

        this.$store.commit('setLoading', false);
    },
    computed: {
        loading() {
          return this.$store.getters.getLoading;
        },
        width() {
            return this.$store.getters.getWidth;
        },
        title() {
            return this.$store.getters.Page.title;
        }
    },
    async mounted() {
        if (this.items.length > this.pageSize) {
            this.setupPagination(this.$store.getters.demandForecastFiles);
        }

        if (this.items) {
        this.$store.commit('setLoading', true);

        await this.$store.dispatch('getAllDemandForecastFiles')
            .then(() => { this.$store.commit('setLoading', false) })
            .catch(() => {
                this.$error(this, this.$store.getters.getMessage);
                this.$store.commit('setLoading', false);
            });
        }
        this.setupPagination(this.$store.getters.demandForecastFiles);
    },
    methods: {
        async delFile(file) {
            await this.$store.dispatch('delDemandForecastFile', { 'file_id' : file.id })
                .then(()=>{ this.$message(this, this.$store.getters.getMessage) })
                .catch(() => { this.$error(this, this.$store.getters.getMessage) });

            this.setupPagination(this.$store.getters.demandForecastFiles);
        },
        searchItems() {
            this.setupPagination(
                this.$store.getters.demandForecastFiles.filter(el => el.filename.includes(this.searchValue))
            );
        }
    },
}
</script>

<style scoped>

</style>
