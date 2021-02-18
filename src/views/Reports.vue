<template>
    <div class="row justify-content-center">
        <div class="col-10">
            <div class="row mb-2 mt-2" v-if="fileProgress > 0">
                <div class="col-12 text-center">
                    <b-progress :max="100" v-model="fileProgress"
                                class="text-center"
                                show-progress animated>{{ fileCurrent }} {{ fileProgress }} %</b-progress>
                </div>
            </div>
            <div class="row mt-2 justify-content-center" v-for="(file, index) in allFiles" :key="file.id">
                <div class="col-lg-9 col-md-6 col-sm-12">
                    <mdb-input label="Подпись для файла" v-model="file.name"></mdb-input>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                    <div class="row">
                        <div class="col-4">
                            <mdb-btn color="danger" size="md" @click="delFile(index)"><mdb-icon  icon="trash" /></mdb-btn>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div class="row mb-2">
                <div class="col-md-7 d-flex justify-content-end">
                    <router-link :to="{name: 'reportCreate'}">
                        <mdb-btn color="default" size="lg" >Создать отчет</mdb-btn>
                    </router-link>
                </div>
                <div class="col-5 mt-3 d-flex justify-content-end">
                    <Pagination />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Pagination from "../components/Pagination";
    import { mapMutations } from 'vuex'
    import { mdbBtn, mdbInput, mdbIcon } from 'mdbvue'

    export default {
        name: "ReportsForm",
        components: {
            Pagination,
            mdbBtn,
            mdbInput,
            mdbIcon
        },
        data() {
            return {
                fileProgress: 0,
                fileCurrent: ''
            }
        },
        created() {
            this.setHeader(this.$route.meta.pageName);
            this.setHint(this.$route.meta.hint);
        },
        computed: mapGetters(["allFiles"]),
        methods: {
            ...mapMutations(["createFile", "deleteFile", "setHeader", "setHint"]),
            selectImg(file) {
                file.name = event.target.files[0].name;
                file.content = event.target.files[0];
            },
            addFile() {
                this.createFile();
            },
            delFile(index) {
                this.deleteFile(index);
            },
        },
    }
</script>

<style scoped>

</style>
