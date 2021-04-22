<template>
    <div class="row justify-content-center">
        <div class="col-10">

            <div class="row mt-2 justify-content-center" v-for="file in items" :key="file.id">

                <div class="col-lg-9 col-md-6 col-sm-12">
                    <mdb-input label="Подпись для файла" v-model="file.filename"></mdb-input>
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
                    <router-link :to="{name: 'demandForecastCreate'}">
                      <mdb-btn color="default" size="lg" >Создать отчет о прогнозировании спроса</mdb-btn>
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
    </div>
</template>

<script>
    import paginations from "../utils/paginations";
    import { mdbBtn, mdbInput, mdbIcon } from 'mdbvue'

    export default {
        name: "DemandForecast",
        mixins: [paginations],
        components: {
            mdbBtn,
            mdbInput,
            mdbIcon
        },
        created() {
          this.$store.commit('setHint', this.$route.meta.hint);
          this.$store.commit('setHeader', this.$route.meta.pageName);
        },
        async mounted() {
          if (this.$store.getters.demandForecastFiles) {
            await this.$store.dispatch('getAllDemandForecastFiles')
                .catch(() => this.$error(this, this.$store.getters.getMessage));
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
        },
    }
</script>

<style scoped>

</style>
