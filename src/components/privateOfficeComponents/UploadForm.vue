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
                <div class="row mt-2 justify-content-center" v-for="(file, index) in allFiles" :key="file.id">
                    <div class="col-lg-9 col-md-6 col-sm-12">
                        <div class="row">
                            <div class="col-2">
                                <div class="mt-3 rounded h-50 z-depth-1-half p-2 primary-color"
                                     :style="{ color : activeColor }"
                                      @mouseenter="selectColor"  >
                                    <mdb-icon class="icon-file" far icon="file" />
                                </div>
                            </div>
                            <div class="col-10">
                                <mdb-input label="Подпись для файла" v-model="file.name"></mdb-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                        <div class="row">
                            <template v-if="file.is_new">
                                <div class="col-4">
                                    <div class="file-field input-field">
                                        <mdb-btn color="primary" size="md" >
                                            <mdb-icon far icon="folder-open" />
                                            <input type="file" @change="selectImg(file)">
                                        </mdb-btn>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <mdb-btn color="default" size="md" ><mdb-icon  icon="upload" /></mdb-btn>
                                </div>
                            </template>
                            <div class="col-4">
                                <mdb-btn color="danger" size="md" @click="delFile(index)"><mdb-icon  icon="trash" /></mdb-btn>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div class="row mb-2">
                    <div class="col-md-7 d-flex justify-content-end">
                        <mdb-btn color="default" size="lg" @click="addFile">Добавить файл</mdb-btn>
                    </div>
                    <div class="col-5 mt-3 d-flex justify-content-end">
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex'
    import { mdbBtn, mdbInput, mdbIcon } from 'mdbvue'
    import Pagination from "../Pagination";

    export default {
        name: "uploadForm",
        components: {
            Pagination,
            mdbBtn,
            mdbInput,
            mdbIcon
        },
        data() {
            return {
                fileProgress: 0,
                fileCurrent: '',
                colorArray: [
                    '#4285F4',
                    '#00C851',
                    '#ffbb33',
                    '#ff4444',
                    '#33b5e5',
                    '#aa66cc',
                    '#2BBBAD',
                ],
                activeColor: 'red'
            }
        },
        methods: {
            ...mapMutations(["createFile", "deleteFile"]),
            selectImg(file) {
                file.name = event.target.files[0].name;
                file.content = event.target.files[0];
                /*
                let formData = new FormData();
                formData.append('file', this.$refs.file.files[0]);
                this.axios({
                    method: 'POST',
                    url: 'http://api/upload',
                    data: formData,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(response => (this.resume.imgurl_resume = response.data.filename))
                    .catch(error => (console.log(error)));
                 */
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
            selectColor() {
                let rand = Math.floor(Math.random() * this.colorArray.length);
                this.activeColor = this.colorArray[rand];
            }
        },
        computed: mapGetters(["allFiles"])
    }
</script>

<style scoped>

</style>
