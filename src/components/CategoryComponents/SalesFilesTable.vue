<template>
    <div class="table-wrapper">
        <!--Table-->
        <mdb-tbl class="table table-hover mb-0">
            <!--Table head-->
            <mdb-tbl-head>
                <tr>
                    <th class="th-lg">Название файла</th>
                    <th class="th-sm">Разделитель столбцов</th>
                    <th class="th-sm" v-if="width >= 576">Сохранить название</th>
                    <th class="th-sm" v-if="width >= 576">Выбрать файл</th>
                    <th class="th-sm" v-if="width >= 576">Загрузить файл</th>
                    <th class="th-sm" v-if="width >= 576">Удалить файл</th>
                </tr>
            </mdb-tbl-head>
            <!--Table head-->

            <!--Table body-->
            <mdb-tbl-body>
                <tr v-for="file in files" :key="file.id">
                    <td>
                        <input type="text" class="form-control" placeholder="Подпись для файла"
                               v-model="file.filename">
                    </td>
                    <td>
                        <input type="text" class="form-control" placeholder="Разделитель столбцов"
                               v-model="file.separator">
                    </td>
                    <td v-if="width >= 576">
                        <mdb-btn
                            class="btn-sm m-0"
                            v-b-tooltip="'Сохранить название'"
                            color="default"
                            size="md"
                            @click="$emit('saveFile', file)"
                            :disabled="file.new">
                            <mdb-icon icon="save" />
                        </mdb-btn>
                    </td>
                    <td v-if="width >= 576">
                        <div class="file-field input-field">
                            <mdb-btn
                                class="btn-sm m-0"
                                v-b-tooltip="'Выбрать файл'"
                                color="primary"
                                size="md">
                                    <mdb-icon far icon="folder-open" />
                                    <input type="file"
                                           @change="$emit('selectFile', file)">
                            </mdb-btn>
                        </div>
                    </td>
                    <td v-if="width >= 576">
                        <mdb-btn
                                class="btn-sm m-0"
                                v-b-tooltip="'Загрузить файл'"
                                color="default"
                                size="md"
                                @click="$emit('saveFile', file)"
                                :disabled="file.loaded">
                            <mdb-icon icon="upload" />
                        </mdb-btn>
                    </td>
                    <td v-if="width >= 576">
                        <mdb-btn class="btn-sm m-0" color="danger" size="md" @click="$emit('delFile', file)"
                                 v-b-tooltip="'Удалить файл'">
                            <mdb-icon  icon="trash" />
                        </mdb-btn>
                    </td>
                </tr>
            </mdb-tbl-body>
            <!--Table body-->
        </mdb-tbl>
        <!--Table-->
    </div>
</template>

<script>
    import { mdbBtn, mdbIcon, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';

    export default {
        name: "SalesFilesTable",
        components: {
            mdbTbl,
            mdbTblHead,
            mdbTblBody,
            mdbBtn,
            mdbIcon
        },
        props: ['files'],
        computed: {
            width() {
                return this.$store.getters.getWidth;
            },
            height() {
                return this.$store.getters.getHeight;
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