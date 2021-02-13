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
                <div class="row mt-2 justify-content-center" v-for="(file) in allFiles" :key="file.id">
                    <div class="col-6">
                        <div class="form-group">
                            <b-form-input placeholder="Подпись для файла"
                                          v-model="file.name"></b-form-input>
                        </div>
                    </div>
                    <div class="col-6 mb-3">
                        <template v-if="file.is_new"><!-- v-if="file.is_new" -->
                            <div class="input-group">
                                <b-form-file
                                        placeholder="Нет выбранного файла"
                                        drop-placeholder="Drop file here..."
                                        @change="fileInputChange(file)"
                                ></b-form-file>
                                <div class="input-group-append" id="button-addon4">
                                    <button class="btn btn-outline-secondary" type="button">Загрузить</button>
                                    <button class="btn btn-outline-secondary" type="button">Удалить</button>
                                </div>
                            </div>
                        </template>

                        <b-input-group-append>
                            <!--<mdb-btn color="danger" @click="delFile(index)" size="md">Удалить</mdb-btn>-->
                        </b-input-group-append>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-md-12">
                        <!--<mdb-btn class="pl-5 pr-5" color="primary" @click="addFile">Добавить файл</mdb-btn>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex'

    export default {
        name: "uploadForm",
        components: {
        },
        data() {
            return {
                fileProgress: 0,
                fileCurrent: ''
            }
        },
        methods: {
            ...mapMutations(["createFile", "deleteFile"]),
            fileInputChange(file) {
                file.name = event.target.files[0].name;
                file.content = event.target.files[0];
            },
            async uploadFile(file) {
                let form= new FormData();
                form.append('name', file.name);
                form.append('file', file.content);
            },
            addFile() {
                this.createFile();
            },
            delFile(index) {
                this.deleteFile(index);
            },
        },
        computed: mapGetters(["allFiles"])
    }
</script>

<style scoped>
    .custom-file-input:lang(en)~.custom-file-label::after {
        content: "Browse";
    }
</style>
