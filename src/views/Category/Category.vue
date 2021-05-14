<template>
    <div class="mb-2">
        
        <div v-if="!loading">
            <div class="row justify-content-center">
                <div class="col-10">

                    <div class="row mb-2 mt-2" v-if="fileProgress > 0">
                        <div class="col-12 text-center">
                            <b-progress :max="100" v-model="fileProgress"
                                        class="text-center"
                                        show-progress animated>{{ fileCurrent }} {{ fileProgress }} %</b-progress>
                        </div>
                    </div>

                    <div class="row mt-2 justify-content-center" v-for="file in items" :key="file.id">

                        <div class="col-5">
                            <mdb-input label="Подпись для файла" v-model="file.filename"
                                @change="file.edit = true"></mdb-input>
                        </div>

                        <div class="col-3">
                            <mdb-input label="Разделитель столбцов" v-model="file.separator" />
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-12 mt-4">
                            <div class="row">

                                <div class="col-3" v-if="file.new">
                                    <div class="file-field input-field">
                                        <mdb-btn
                                            v-b-tooltip="'Выбрать файл'"
                                            color="primary" size="md" class="">
                                            <mdb-icon far icon="folder-open" />
                                            <input type="file" @change="selectFile(file)">
                                        </mdb-btn>
                                    </div>
                                </div>

                                <div class="col-3" v-if="file.edit || file.new || !file.loaded" >
                                    <mdb-btn
                                        v-b-tooltip="'Загрузить файл'"
                                        color="default" size="md" @click="saveFile(file)" >
                                    <mdb-icon icon="upload" v-if="!file.loaded && file.new" />
                                    <mdb-icon icon="save" v-if="file.edit && !file.new" />
                                    </mdb-btn>
                                </div>

                                <div class="col-3" >
                                    <mdb-btn
                                        v-b-tooltip="'Удалить файл'"
                                        color="danger" size="md" @click="delFile(file)">
                                    <mdb-icon  icon="trash" />
                                    </mdb-btn>
                                </div>

                            </div>
                        </div>
                    </div>

                    <hr />

                    <div class="row mb-2">
                        <div class="col-md-7 d-flex justify-content-end" v-if="page === pageCount || pageCount === 0">
                            <mdb-btn color="default" size="lg" @click="addFile">Добавить файл</mdb-btn>
                        </div>
                        <div class="col-5 mt-3 d-flex justify-content-end" v-if="pageCount > 1"
                            :class="{
                            'col-12' : page < pageCount,
                            'col-6' : page === pageCount
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
            </div>
        </div>

        <div v-else>
            <spinner />
        </div>
    </div>
</template>

<script>
import paginations from "../../utils/paginations";
import { mdbBtn, mdbInput, mdbIcon } from 'mdbvue'
import Spinner from '../../components/Spinner.vue';

export default {
    name: "uploadForm",
    mixins: [paginations],
    components: {
        mdbBtn,
        mdbInput,
        mdbIcon,
        Spinner
    },
    data() {
        return {
            fileProgress: 0,
            fileCurrent: ''
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
        }
    },
    async mounted() {
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
                // Создание нового объекта класса Файл Продаж на сервере API
                let formData = new FormData();
                formData.append('file', file.content);
                formData.append('filename', file.filename);
                formData.append('category_id', this.$store.getters.getCategory.id);
                formData.append('separator', file.separator);

                console.log(file);

                this.$store.dispatch('addSaleFile', { 'formData' : formData, 'file' : file })
                    .then(() => {
                        this.$message(this, this.$store.getters.getMessage);
                        file.new = false;
                        file.loaded = true;
                        file.edit = false;
                    })
                    .catch(() => { this.$error(this, this.$store.getters.getMessage) })
            } else if (file.edit) {
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
}
</script>

<style scoped>

/* File Input
========================================================================== */
.file-field {
  position: relative;
}

.file-field .file-path-wrapper {
  overflow: hidden;
  padding-left: 10px;
}

.file-field input.file-path {
  width: 100%;
}

.file-field span {
  cursor: pointer;
}

.file-field input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}

.file-field input[type=file]::-webkit-file-upload-button {
  display: none;
}
</style>
