<template>
  <div class="container-fluid">

    <div class="row justify-content-center">
      <div class="col-10">
        <mdb-jumbotron class="p-4 mb-0">

          <div class="row">
            <div class="col-12">
              <h4>Выберите метод анализа временных рядов: </h4>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-12">
              <b-form-select class="browser-default custom-select" v-model="method" :options="methods">
              </b-form-select>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-12">
              <h4>Выберите по каким объектам производить анализ:</h4>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-12">
              <mdb-list-group horizontal>

                <mdb-list-group-item class="w-50">
                  <div class="custom-control custom-radio ml-auto mr-auto">
                    <input type="radio" class="custom-control-input" id="radioFile"
                           name="forecast" value="file" v-model="objectAnalysis" checked>
                    <label class="custom-control-label" for="radioFile">По файлу</label>
                  </div>
                </mdb-list-group-item>

                <mdb-list-group-item class="w-50">
                  <div class="custom-control custom-radio ml-auto mr-auto">
                    <input type="radio" class="custom-control-input" id="radioCategory"
                           name="forecast" value="category" v-model="objectAnalysis">
                    <label class="custom-control-label" for="radioCategory">По категории</label>
                  </div>
                </mdb-list-group-item>

              </mdb-list-group>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-12">

              <div class="row">
                <div class="col-12">
                  <h4>{{ selectName }} для прогнозирования спроса:</h4>
                </div>
              </div>

              <div class="row">
                <div class="col-12">

                  <div class="md-form mt-1" :class="{'is-invalid':
                            (this.$v.item.$dirty && !this.$v.item.required) }">
                    <input id="item_input" type="text" class="form-control" list="objects_select"
                           v-model.trim="item"
                           :class="{
                             'is-invalid': (this.$v.item.$dirty && !this.$v.item.required)
                           }"/>
                    <label ref="item_label" for="item_input" class="mr-5" :class="{ active: item !== '' }">
                      {{ selectLabel }}
                    </label>

                    <div class="invalid-feedback"
                         v-if="this.$v.item.$dirty && !this.$v.item.required">
                      Поле не должно быть пустым.
                    </div>
                  </div>

                  <datalist id="objects_select">
                    <option v-for="elem in selectItem" :key="elem.text">
                      {{ elem.name }}
                    </option>
                  </datalist>

                </div>
              </div>

            </div>
          </div>

          <div class="row mt-2">

            <div class="col-9">
              <div class="md-form m-1" :class="{'is-invalid': (this.$v.period.$dirty && !this.$v.period.minValue) }">
                <input id="period_input" type="number" class="form-control"
                       v-model.trim="period"
                       :class="{'is-invalid': (this.$v.period.$dirty && !this.$v.period.minValue) }"/>
                <label ref="period_label" for="period_input" class="mr-5" :class="{ active: period !== '' }">
                  Период прогнозирования
                </label>

                <div class="invalid-feedback"
                     v-if="this.$v.period.$dirty && !this.$v.period.minValue">
                  Период прогнозирования должно быть больше 0.
                </div>
              </div>
            </div>

            <div class="col-3 mt-1">
              <b-form-select v-model="interval" :options="interval_options"></b-form-select>
            </div>

          </div>

          <div class="row mt-2">

            <div class="col-9">
              <mdb-input label="Столбец в файле для анализа" v-model="column" />
            </div>

            <div class="col-3">
              <mdb-input label="Разделитель столбцов" v-model="delimiter" />
            </div>

          </div>

          <div class="row mt-2">
            <div class="col-12">
              <CheckBox :checked="false" :label="'Создать план закупок по спрогнозированному спросу'"
                        id="checkBoxPlan"/>
            </div>
          </div>

        </mdb-jumbotron>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-10">
        <div class="md-form" :class="{'is-invalid':
                            (this.$v.filename.$dirty && !this.$v.filename.required) ||
                            (this.$v.filename.$dirty && !this.$v.filename.minLength)}">
          <input id="name_input" type="text" class="form-control"
                 v-model.trim="filename"
                 :class="{'is-invalid':
                            (this.$v.filename.$dirty && !this.$v.filename.required) ||
                            (this.$v.filename.$dirty && !this.$v.filename.minLength)}"/>
          <label ref="name_label" for="name_input" class="mr-5" :class="{ active: filename !== '' }">Название отчета
          </label>

          <div class="invalid-feedback"
               v-if="this.$v.filename.$dirty && !this.$v.filename.required">
            Поле 'Название отчета' не должно быть пустым.
          </div>

          <div class="invalid-feedback"
               v-else-if="this.$v.filename.$dirty && !this.$v.filename.minLength">
            'Название отчета' должено быть
            {{ $v.filename.$params.minLength.min }}
            символом. Сейчас он {{ filename.length }}
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <mdb-btn color="primary" size="lg" @click="handlerSubmit">Создать отчет</mdb-btn>
      </div>
    </div>

  </div>
</template>

<script>
import { mdbListGroup, mdbBtn, mdbListGroupItem, mdbJumbotron, mdbInput } from 'mdbvue';
import { minLength, required, minValue } from "vuelidate/lib/validators";
import CheckBox from "../components/ReportComponents/CheckBox";


export default {
  name: "DemandForecastCreate",
  data() {
    return {
      filename: "",
      objectAnalysis: 'file',
      method: 'Метод Хольта - Винтерса',
      item: '',
      interval: 'D',
      column: '',
      delimiter: ',',
      period: 30,
      methods: [
        { value: 'Метод Хольта - Винтерса', text: 'Метод Хольта - Винтерса' },
        { value: 'Модель SARIMA', text: 'Модель SARIMA' },
        { value: 'Библиотеокой Prophet', text: 'Библиотеокой Prophet' },
      ],
      interval_options:[
        { value: 'D', text: 'Дней' },
        { value: '7D', text: 'Недель'},
        { value: 'M', text: 'Месяцев'},
      ]
    }
  },
  validations: {
    filename: { required, minLength: minLength(3) },
    item: { required },
    period: {
      minValue: minValue(1)
    },
  },
  components: {
    mdbBtn,
    mdbListGroupItem,
    mdbListGroup,
    mdbJumbotron,
    CheckBox,
    mdbInput
  },
  created() {
    this.$store.commit('setHint', this.$route.meta.hint);
    this.$store.commit('setHeader', this.$route.meta.pageName);
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
  },
  computed: {
    categories: function () { return this.$store.getters.allCategories },
    files: function () { return this.$store.getters.saleFiles },
    selectName: function () {
      if (this.objectAnalysis === 'file')
        return 'Файл';
      else
        return 'Категория';
    },
    selectLabel: function () {
      if (this.objectAnalysis === 'file')
        return 'Выберите файл';
      else
        return 'Выберите категорию';
    },
    selectItem: function () {
      let listItem = [];
      if (this.objectAnalysis === 'category') {
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
  },
  methods: {
    handlerSubmit() {
      // Валидация формы
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      // Получаем checkBox по id
      let planCreate = document.getElementById('checkBoxPlan').childNodes[0].childNodes[0];

      // Проверяем, активен ли он
      if (planCreate.checked === true) {
        this.$store.commit('setMessage', 'Создаем план закупок');
        this.$message(this, this.$store.getters.getMessage);
      } else{
        this.$store.commit('setMessage', 'Не создаем план закупок');
        this.$error(this, this.$store.getters.getMessage);
      }

      if (this.objectAnalysis === 'category') {
        // Отправляем запрос к API для создания отчета
        this.$store.dispatch('addDemandForecastFile', {
          'filename': this.filename,
          'method': this.method,
          'objectAnalysis': this.objectAnalysis,
          'category': this.item,
          'interval': this.interval,
          'column': this.column,
          'delimiter': this.delimiter,
          'period': this.period,
        })
            .then(() => { this.$message(this, this.$store.getters.getMessage) })
            .catch(() => { this.$error(this, this.$store.getters.getMessage) })
      } else {
        // Отправляем запрос к API для создания отчета
        this.$store.dispatch('addDemandForecastFile', {
          'filename': this.filename,
          'method': this.method,
          'objectAnalysis': this.objectAnalysis,
          'file': this.item,
          'interval': this.interval,
          'column': this.column,
          'delimiter': this.delimiter,
          'period': this.period,
        })
            .then(() => {
              this.$message(this, this.$store.getters.getMessage);
              this.$router.push('/demand_forecast');
            })
            .catch(() => { this.$error(this, this.$store.getters.getMessage) })
      }
    },
  }
}
</script>

<style scoped>
.is-invalid input {
  border-bottom: 1px solid red!important;
}
.is-invalid input {
  border-color: #dc3545;
}
</style>