<template>
    <mdb-jumbotron class="p-4 mb-0">
        <div class="row" v-if="form.demandForecast">
            <div class="col-12">
                <h4>Выберите метод анализа временных рядов: </h4>
            </div>
        </div>
        <div class="row" v-if="form.demandForecast">
            <div class="col-12">
                <b-form-select class="browser-default custom-select" v-model="form.method" :options="methods">
                </b-form-select>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12">
                <h4>{{ title }}</h4>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12">
                <mdb-list-group horizontal>
                    <ReportRadioBtn v-for="radio in radioReports" :key="radio.id"
                                    :label="radio.title"
                                    :group="'AnalysisGroup'"
                                    :value="radio.value"
                                    :id="radio.id" />
                </mdb-list-group>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12 pl-0 pr-0" v-if="form.demandForecast">
                <SelectItem :name="selectName + ' для прогнозирования спроса:'"
                            :label="selectLabel"
                            :list-item="selectItem" />
            </div>
            <div class="col-12 mt-2 pl-0 pr-0" v-if="form.purchasePlan">
                <SelectItem :name="selectName + ' для создания плана закупок:'"
                            :label="selectLabel"
                            :list-item="selectItem" />
            </div>
        </div>
    </mdb-jumbotron>
</template>

<script>
    import ReportRadioBtn from "./ReportRadioBtn";
    import SelectItem from "./SelectItem";
    import { mdbJumbotron, mdbListGroup } from 'mdbvue';

    import { mapMutations } from 'vuex';

    export default {
        name: "CollectionReportInfo",
        props: [
            "header",
            "title",
            "radioReports",
            "group"
        ],
        components: {
            ReportRadioBtn,
            mdbJumbotron,
            mdbListGroup,
            SelectItem
        },
        data() {
            return{
                methods: [
                    { value: 'Метод Хольта - Винтерса', text: 'Метод Хольта - Винтерса' },
                    { value: 'Модель SARIMA', text: 'Модель SARIMA' },
                    { value: 'Библиотеокой Prophet', text: 'Библиотеокой Prophet' },
                ]
            }
        },
        computed: {
            form: function () { return  this.$store.getters.reportForm },
            selectItem: function () {
                let listItem = [];
                if (this.form.objectAnalysis === 'category') {
                    this.categories.forEach(function(item) {
                        listItem.push({ name:item.name });
                    });
                } else {
                    this.files.forEach(function(item) {
                        listItem.push({ name:item.filename });
                    });
                }
                return listItem;
            },
            selectName: function () { return this.$store.getters.nameSelect },
            selectLabel: function () { return this.$store.getters.labelSelect },
            categories: function () { return this.$store.getters.allCategories },
            files: function () { return this.$store.getters.saleFiles }
        },
        methods: {
            ...mapMutations(["changeObject"])
        },
        async mounted() {
            if (this.$store.getters.allCategories.length === 0) {
                await this.$store.dispatch('getAllCategories')
                    .catch(() => this.$error(this, this.$store.getters.getMessage));
            }
            if (this.$store.getters.saleFiles) {
                await this.$store.dispatch('getAllSaleFiles')
                    .catch(() => this.$error(this, this.$store.getters.getMessage));
            }
        }
    }
</script>

<style scoped>

</style>
