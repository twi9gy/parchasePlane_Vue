<template>
    <div class="profile-catalog">
        <div class="row">
            <div class="col-lg-4 col-md-8 col-sm-12 mt-2" v-for="(category, index) in allCategories" :key="category.id">
                <mdb-card>
                    <mdb-card-body color="elegant">

                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-8">
                                    <h3 class="text-white">{{ category.name }}</h3>
                                </div>
                                <div class="col-4" v-if="!category.editMode">
                                    <mdb-btn color="primary" size="sm" @click="category.editMode = true">
                                        <mdb-icon far icon="edit" />
                                    </mdb-btn>
                                </div>
                                <div class="col-4" v-if="category.editMode">
                                    <mdb-btn color="danger" size="sm" @click="category.editMode = false">
                                        <mdb-icon  icon="times" />
                                    </mdb-btn>
                                </div>
                            </div>

                            <div class="row" v-if="category.editMode">
                                <div class="col-8 pl-1">
                                    <mdb-input label="Название категории"
                                               v-if="category.editMode"
                                               v-model="category.name" />
                                </div>
                                <div class="col-4 mt-2">
                                    <mdb-btn color="success" size="sm" class="mt-4" @click="category.editMode = false">
                                        <mdb-icon far icon="save" />
                                    </mdb-btn>
                                </div>
                            </div>
                        </div>

                        <hr class="hr-light" v-if="!category.editMode"/>

                        <div class="row">
                            <div class="col d-flex">
                                <mdb-btn color="danger"
                                         @click="delCategory(index)">Удалить</mdb-btn>
                                <router-link :to="{name: 'category', params: {id: category.id}}"
                                             class="white-text mt-3 w-50 text-right">
                                    <h5>Открыть <mdb-icon icon="angle-double-right" class="pl-1" /></h5>
                                </router-link>
                            </div>
                        </div>

                    </mdb-card-body>
                </mdb-card>
            </div>
        </div>

        <hr />

        <div class="row mb-2">
            <div class="col-lg-6">
                <mdb-btn rounded type="submit" class="pl-5 pr-5" @click="addCategory">Добавить категорию</mdb-btn>
            </div>
            <div class="col-lg-6 mt-3 mb-3 d-flex justify-content-center">
                <Pagination />
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import { mdbBtn, mdbCard, mdbCardBody, mdbIcon, mdbInput } from 'mdbvue';
    import Pagination from "../components/Pagination";

    export default {
        name: "ProfileCatalog",
        computed: mapGetters(["allCategories"]),
        components: {
            Pagination,
            mdbBtn,
            mdbCard,
            mdbCardBody,
            mdbIcon,
            mdbInput
        },
        created() {
            this.setHeader(this.$route.meta.pageName);
            this.setHint(this.$route.meta.hint);
        },
        methods: {
            ...mapMutations([
                "createCategory",
                "deleteCategory",
                "setHeader",
                "setHint"
            ]),
            addCategory() {
                this.createCategory();
            },
            delCategory(index) {
                this.deleteCategory(index);
            }
        }
    }
</script>

<style scoped>
    .view {
        height: 20vh;
    }
</style>
