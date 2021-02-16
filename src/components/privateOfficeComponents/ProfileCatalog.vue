<template>
    <div class="profile-catalog">
        <div class="row">
            <div class="col-lg-4 col-md-8 col-sm-12 mt-2" v-for="(category, index) in allCategories" :key="category.id">
                <mdb-card>
                    <mdb-view gradient="aqua">
                        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                    </mdb-view>
                    <mdb-card-body color="elegant" class="white-text">

                        <h2>{{ category.name }}</h2>

                        <hr class="hr-light"/>
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
    import { mdbBtn, mdbCard, mdbView, mdbCardBody, mdbMask, mdbIcon } from 'mdbvue';
    import Pagination from "../Pagination";

    export default {
        name: "ProfileCatalog",
        computed: mapGetters(["allCategories"]),
        components: {
            Pagination,
            mdbBtn,
            mdbCard,
            mdbView,
            mdbCardBody,
            mdbMask,
            mdbIcon
        },
        methods: {
            ...mapMutations([
                "createCategory",
                "deleteCategory"
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
