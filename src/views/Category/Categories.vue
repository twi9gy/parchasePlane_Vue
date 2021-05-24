<template>
    <div class="profile-catalog">

        <div v-if="!loading">

            <div class="row justify-content-end" style="margin-top: -4vh">
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <mdb-input type="text" placeholder="Поиск" aria-label="Search" v-model="searchValue"
                               @input="searchItems"/>
                </div>
            </div>

            <div class="row">

                <div id="categories" class="col-lg-4 col-md-6 col-sm-12 mt-2" v-for="category in items" :key="category.id">
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
                                        <mdb-btn color="success" size="sm" class="mt-4" @click="saveChanges(category)">
                                            <mdb-icon far icon="save" />
                                        </mdb-btn>
                                    </div>
                                </div>
                            </div>

                            <hr class="hr-light" v-if="!category.editMode"/>

                            <div class="row">
                                <div class="col d-flex">
                                    <mdb-btn color="danger" class="p-3" @click="removeCategory(category)">Удалить</mdb-btn>

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

                <div class="d-flex"
                     :class="{
                        'col-md-7 justify-content-left' : page <= pageCount,
                        'col-md-12 justify-content-center' : pageCount === 1
                        }"
                     v-if="page === pageCount || pageCount === 1 || pageCount === 0">
                        <mdb-btn rounded type="submit" size="lg" @click="addCategory">
                            Добавить категорию
                        </mdb-btn>
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
import { mdbBtn, mdbCard, mdbCardBody, mdbIcon, mdbInput } from 'mdbvue';
import Spinner from '../../components/LayoutComponents/Spinner.vue';

export default {
    name: "ProfileCatalog",
    mixins: [paginations],
    components: {
        mdbBtn,
        mdbCard,
        mdbCardBody,
        mdbIcon,
        mdbInput,
        Spinner
    },
    data() {
        return {
            searchValue: ''
        }
    },
    created() {
        // Устанавливаем подсказку к странице
        this.$store.commit('setHint', this.$route.meta.hint);
        // Устанавливаем заголовок к странице
        this.$store.commit('setHeader', this.$route.meta.pageName);

        this.$store.commit('setLoading', false);
    },
    computed: {
        loading() {
            return this.$store.getters.getLoading;
        }
    },
    async mounted() {
        if (this.items.length > this.pageSize) {
            this.setupPagination(this.$store.getters.allCategories);
        }

        if (this.items) {
            this.$store.commit('setLoading', true);
            
            await this.$store.dispatch('getAllCategories')
                .then(()=>{ this.$store.commit('setLoading', false) })
                .catch(() => {
                    this.$store.commit('setLoading', false);
                    this.$error(this, this.$store.getters.getMessage);
                });
        }
        
        this.setupPagination(this.$store.getters.allCategories);
    },
    methods: {
        searchItems() {
            this.setupPagination(
                this.$store.getters.allCategories.filter(el => el.name.includes(this.searchValue))
            );
        },
        addCategory() {
            this.$store.commit('createCategory');

            this.setupPagination(this.$store.getters.allCategories);
        },
        async removeCategory(category) {
            if (category.is_new) {
                this.$store.commit('deleteCategory', category.id);
            } else {
                await this.$store.dispatch('delCategory', { 'id' : category.id })
                    .then(()=>{ this.$message(this, this.$store.getters.getMessage) })
                    .catch(()=>{ this.$error(this, this.$store.getters.getMessage) });
            }

            this.setupPagination(this.$store.getters.allCategories);
        },
        saveChanges(category) {
            category.editMode = false;
            if (category.is_new) {
                // Если категория была создана, а не получена с сервера
                this.$store.dispatch('addCategory', {
                    'name' : category.name,
                    'category' : category
                })
                    .then(()=>{
                        this.$message(this, this.$store.getters.getMessage);
                        category.is_new = false;
                    })
                    .catch(() => {
                        this.$error(this, this.$store.getters.getMessage)
                    });
            } else {
                // Если пользователь редактирует имеющиеся категорию
                const formData = {
                    "name" : category.name,
                    "id" : category.id
                };
                this.$store.dispatch('editCategory', formData)
                    .then(()=>{
                        this.$message(this, this.$store.getters.getMessage)
                    })
                    .catch(() => {
                        this.$error(this, this.$store.getters.getMessage)
                    });
            }
        }
    }
}
</script>

<style scoped>
</style>
