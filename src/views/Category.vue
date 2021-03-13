<template>
    <div class="mb-2">
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

                    <div class="col-8">
                        <mdb-input label="Подпись для файла" v-model="file.filename"
                            @change="file.edit = true"></mdb-input>
                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-12 mt-4">
                        <div class="row">

                            <div class="col-3" v-if="file.new">
                                <div class="file-field input-field">
                                    <mdb-btn color="primary" size="md" class="">
                                        <mdb-icon far icon="folder-open" />
                                        <input type="file" @change="selectFile(file)">
                                    </mdb-btn>
                                </div>
                            </div>

                            <div class="col-3" v-if="file.edit || file.new || !file.loaded" >
                                <mdb-btn color="default" size="md" @click="saveFile(file)" >
                                  <mdb-icon icon="upload" v-if="!file.loaded && file.new" />
                                  <mdb-icon icon="save" v-if="file.edit && !file.new" />
                                </mdb-btn>
                            </div>

                            <div class="col-3" >
                                <mdb-btn color="danger" size="md" @click="delFile(file)"><mdb-icon  icon="trash" /></mdb-btn>
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
</template>

<script>
    import paginations from "../utils/paginations";
    import { mdbBtn, mdbInput, mdbIcon } from 'mdbvue'

    export default {
        name: "uploadForm",
        mixins: [paginations],
        components: {
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
            this.$store.commit('setHint', this.$route.meta.hint);
        },
        computed: {
            category() {
                return this.$store.getters.getCategory;
            },
            files() {
                return this.$store.getters.Files;
            }
        },
        async mounted() {
            if (this.$store.getters.getCategory) {
              // Получаем категорию
              await this.$store.dispatch('getCategoryById', { 'id' : this.$route.params.id })
                    .catch(() => {
                        this.$error(this, this.$store.getters.getMessage);
                    });
              this.$store.commit('setHeader', this.$route.meta.pageName + this.category.name);

              // Получаем файлы категории
              await this.$store.dispatch('getAllFiles')
                  .catch(() => {
                    this.$error(this, this.$store.getters.getMessage);
                  })
            }

            this.setupPagination(this.$store.getters.Files);
        },
        methods: {
            selectFile(file) {
                file.filename = event.target.files[0].name;
                file.content = event.target.files[0];
            },
            addFile() {
              this.$store.commit('createFile');

              this.setupPagination(this.$store.getters.Files);
            },
            async delFile(file) {
              console.log(file);
              if (file.new) {
                  this.$store.commit('deleteFile', file.id);
              } else {
                 await this.$store.dispatch('delFile', { 'file_id' : file.id })
                      .then(()=>{ this.$message(this, this.$store.getters.getMessage) })
                      .catch(() => { this.$error(this, this.$store.getters.getMessage) });
              }

              this.setupPagination(this.$store.getters.Files);
            },
            saveFile(file) {
                if (file.new) {
                    // Создание нового объекта класса Файл Продаж на сервере API
                    let formData = new FormData();
                    formData.append('file', file.content);
                    formData.append('filename', file.filename);
                    formData.append('category_id', this.$store.getters.getCategory.id);

                    this.$store.dispatch('addFile', { 'formData' : formData, 'file' : file })
                        .then(() => {
                          this.$message(this, this.$store.getters.getMessage);
                          console.log(file.id);
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
                    this.$store.dispatch('editFile', formData)
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

<style scoped></style>
