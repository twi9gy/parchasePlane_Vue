<template>
    <div class="mb-2">
        
        <div v-if="!loading">

            <div class="row justify-content-end" style="margin-top: -4vh">
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <mdb-input type="text" placeholder="Поиск" aria-label="Search" v-model="searchValue"
                               @input="searchItems"/>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <sales-files-table
                        :files="items"
                        @selectFile="selectFile"
                        @saveFile="saveFile"
                        @delFile="delFile"
                    />
                </div>
            </div>

            <hr />

            <div class="row mb-2">

                <div class="d-flex"
                     :class="{
                        'col-md-7 justify-content-left' : page <= pageCount,
                        'col-md-12 justify-content-center' : pageCount === 1
                        }"
                     v-if="(page === pageCount || pageCount === 1 || pageCount === 0) && width >= 576">
                    <mdb-btn color="default" size="lg" @click="addFile">Добавить файл</mdb-btn>
                </div>

                <div class="col mt-2 d-flex justify-content-end" v-if="pageCount > 1"
                     :class="{ 'col-md-5' : page === pageCount }">
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
import SalesFilesTable from "../../components/CategoryComponents/SalesFilesTable";

export default {
    name: "uploadForm",
    mixins: [paginations],
    components: {
        SalesFilesTable,
        mdbBtn,
        mdbInput,
        // mdbIcon,
        Spinner
    },
    data() {
        return {
            fileProgress: 0,
            fileCurrent: '',
            searchValue: ''
        }
    },
    created() {
        this.$store.commit('setHint', this.$route.meta.hint);
        this.$store.commit('setLoading', false);
    },
    computed: {
        category() {
            return this.$store.getters.getCategory;
        },
        files() {
            return this.$store.getters.saleFiles;
        },
        loading() {
            return this.$store.getters.getLoading;
        },
        width() {
            return this.$store.getters.getWidth;
        }
    },
    async mounted() {
        if (this.items.length > this.pageSize) {
            this.setupPagination(this.$store.getters.saleFiles);
        }

        if (this.$store.getters.getCategory) {
            this.$store.commit('setLoading', true);

            // Получаем категорию
            await this.$store.dispatch('getCategoryById', { 'id' : this.$route.params.id })
                .then(() => { this.$store.commit('setLoading', false) })
                .catch(() => {
                    this.$router.push({ 'name': 'Error' });
                    this.$store.commit('setLoading', false);
                });
            this.$store.commit('setHeader', this.$route.meta.pageName + this.category.name);

            // Получаем файлы категории
            await this.$store.dispatch('getSaleFilesByCategoryId')
                .catch(() => {
                    this.$error(this, this.$store.getters.getMessage);
                })
        }

        this.setupPagination(this.$store.getters.saleFiles);
    },
    methods: {
        searchItems() {
            this.setupPagination(
                this.$store.getters.saleFiles.filter(el => el.filename.includes(this.searchValue))
            );
        },
        selectFile(file) {
            file.filename = event.target.files[0].name;
            file.content = event.target.files[0];
        },
        addFile() {
            this.$store.commit('createSaleFile');

            this.setupPagination(this.$store.getters.saleFiles);
        },
        async delFile(file) {
            if (file.new) {
                this.$store.commit('deleteSaleFile', file.id);
            } else {
                await this.$store.dispatch('delSaleFile', { 'file_id' : file.id })
                    .then(()=>{ this.$message(this, this.$store.getters.getMessage) })
                    .catch(() => { this.$error(this, this.$store.getters.getMessage) });
            }
            this.setupPagination(this.$store.getters.saleFiles);
        },
        saveFile(file) {
            if (file.new) {

                console.log(file);

                // Создание нового объекта класса Файл Продаж на сервере API
                let formData = new FormData();
                formData.append('file', file.content);
                formData.append('filename', file.filename);
                formData.append('category_id', this.$store.getters.getCategory.id);
                formData.append('separator', file.separator);

                this.$store.dispatch('addSaleFile', { 'formData' : formData, 'file' : file })
                    .then(() => {
                        this.$message(this, this.$store.getters.getMessage);
                        file.new = false;
                        file.loaded = true;
                        file.edit = false;
                    })
                    .catch(() => { this.$error(this, this.$store.getters.getMessage) })
            }

            // Если пользователь редактирует имеющиеся категорию
            const formData = {
                "filename" : file.filename,
                "file_id" : file.id
            };
            this.$store.dispatch('editSaleFile', formData)
                .then(()=>{
                    this.$message(this, this.$store.getters.getMessage);
                    file.edit = false;
                })
                .catch(() => { this.$error(this, this.$store.getters.getMessage) });
        }
    }
}
</script>

<style scoped>
</style>
