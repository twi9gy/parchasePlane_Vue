<template>
    <!-- Добавить not_found при неправильном id https://github.com/twi9gy/Resume/blob/main/src/components/Main_Form.vue -->
    <div class="mb-3">
        <section class="form-gradient">
            <mdb-row class="d-flex justify-content-center">
                <mdb-col md="12" class="p-0">
                    <mdb-card class="mt-5">
                        <div class="header pt-3 pb-2 info-color header-category">
                            <mdb-row class="d-flex justify-content-center">
                                <h3 class="white-text">Категория: {{ this.category.name }}</h3>
                            </mdb-row>
                        </div>
                        <mdb-card-body >
                            <div class="container-fluid">
                                <UploadForm />
                            </div>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
            </mdb-row>
        </section>
    </div>
</template>

<script>
    import { mdbRow, mdbCol, mdbCard, mdbCardBody } from 'mdbvue';
    import { mapGetters } from 'vuex';
    import UploadForm from "../components/privateOffice/UploadForm";

    export default {
        name: "Category",
        components: {
            UploadForm,
            mdbRow,
            mdbCol,
            mdbCard,
            mdbCardBody,
        },
        created() {
            if (typeof this.$route.params.id !== "undefined") {
                this.is_edit = true;
            }
        },
        computed: {
            ...mapGetters(["getCategoryById"]),
            category() {
                return  this.getCategoryById(this.$route.params.id);
            },
        },
    }
</script>

<style scoped>
    .header-category {
        padding: 1.5rem;
        margin: -2rem 1rem 1rem 1rem;
        text-align: center;
    }
</style>
