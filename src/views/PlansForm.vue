<template>
  <div class="container-fluid">

    <!--Форма для создания плана закупок-->
    <div class="row justify-content-center">
      <div class="col-10">
        <mdb-jumbotron class="p-4 mb-0">

          <!--Заголово формы-->
          <div class="row mb-2">
            <div class="col-12">
              <h4>Для формирования плана закупок заполните следущие данные: </h4>
            </div>
          </div>
          <!--./Заголово формы-->

          <!--Поле затраты на хранение продукции-->
          <div class="row">
            <div class="col-10">

              <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.storage_costs.$dirty && !this.$v.storage_costs.required) ||
                (this.$v.storage_costs.$dirty && !this.$v.storage_costs.minValue)
              }">
                <input id="storage_costs_input" type="text" class="form-control"
                       v-model.trim="storage_costs"
                       :class="{
                             'is-invalid': (this.$v.storage_costs.$dirty && !this.$v.storage_costs.required) ||
                                (this.$v.storage_costs.$dirty && !this.$v.storage_costs.minValue)
                           }"/>
                <label ref="storage_costs_label" for="storage_costs_input" class="mr-5" :class="{ active: storage_costs !== '' }">
                  Затраты на хранение продукции
                </label>

                <div class="invalid-feedback"
                     v-if="this.$v.storage_costs.$dirty && !this.$v.storage_costs.required">
                  Поле не должно быть пустым.
                </div>

                <div class="invalid-feedback"
                     v-if="this.$v.storage_costs.$dirty && !this.$v.storage_costs.minValue">
                  Затраты на хранение продукции должны быть положительным числом.
                </div>

              </div>

            </div>
            <div class="col-2 mt-3">
              <span class="span-measurement ml-auto mr-auto">₽</span>
            </div>
          </div>
          <!--./Поле затраты на хранение продукции-->

          <!--Поле Затраты на доставку продукции-->
          <div class="row">
            <div class="col-10">

              <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.required) ||
                (this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.minValue)
              }">
                <input id="shipping_costs_input" type="text" class="form-control"
                       v-model.trim="shipping_costs"
                       :class="{
                             'is-invalid': (this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.required) ||
                                (this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.minValue)
                           }"/>
                <label ref="shipping_costs_label" for="shipping_costs_input" class="mr-5" :class="{ active: shipping_costs !== '' }">
                  Затраты на доставку продукции
                </label>

                <div class="invalid-feedback"
                     v-if="this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.required">
                  Поле не должно быть пустым.
                </div>

                <div class="invalid-feedback"
                     v-if="this.$v.shipping_costs.$dirty && !this.$v.shipping_costs.minValue">
                  Затраты на доставку продукции должны быть положительным числом.
                </div>

              </div>

            </div>
            <div class="col-2 mt-3">
              <span class="span-measurement ml-auto mr-auto">₽</span>
            </div>
          </div>
          <!--./Поле Затраты на доставку продукции-->

          <!--Поле Дефицит товара-->
          <div class="row">
            <div class="col-10">

              <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.deficit_costs.$dirty && !this.$v.deficit_costs.required) ||
                (this.$v.deficit_costs.$dirty && !this.$v.deficit_costs.minValue)
              }">
                <input id="deficit_costs_input" type="text" class="form-control"
                       v-model.trim="deficit_costs"
                       :class="{
                             'is-invalid': (this.$v.deficit_costs.$dirty && !this.$v.deficit_costs.required) ||
                                (this.$v.deficit_costs.$dirty && !this.$v.deficit_costs.minValue)
                           }"/>
                <label ref="storage_costs_label" for="storage_costs_input" class="mr-5" :class="{ active: deficit_costs !== '' }">
                  Дефицит товара
                </label>

                <div class="invalid-feedback"
                     v-if="this.$v.deficit_costs.$dirty && !this.$v.deficit_costs.required">
                  Поле не должно быть пустым.
                </div>

                <div class="invalid-feedback"
                     v-if="this.$v.deficit_costs.$dirty && !this.$v.deficit_costs.minValue">
                  Дефицит товара должн быть положительным числом.
                </div>

              </div>

            </div>
            <div class="col-2 mt-3">
              <span class="span-measurement ml-auto mr-auto">%</span>
            </div>
          </div>
          <!--./Поле Дефицит товара-->

          <!--Поле Время доставки продукции-->
          <div class="row">
            <div class="col-10">

              <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.time_shipping.$dirty && !this.$v.time_shipping.required) ||
                (this.$v.time_shipping.$dirty && !this.$v.time_shipping.minValue)
              }">
                <input id="time_shipping_input" type="text" class="form-control"
                       v-model.trim="time_shipping"
                       :class="{
                             'is-invalid': (this.$v.time_shipping.$dirty && !this.$v.time_shipping.required) ||
                                (this.$v.time_shipping.$dirty && !this.$v.time_shipping.minValue)
                           }"/>
                <label ref="time_shipping_label" for="time_shipping_input" class="mr-5" :class="{ active: time_shipping !== '' }">
                  Время доставки продукции
                </label>

                <div class="invalid-feedback"
                     v-if="this.$v.time_shipping.$dirty && !this.$v.time_shipping.required">
                  Поле не должно быть пустым.
                </div>

                <div class="invalid-feedback"
                     v-if="this.$v.time_shipping.$dirty && !this.$v.time_shipping.minValue">
                  Время доставки продукции должно быть положительным числом.
                </div>

              </div>

            </div>
            <div class="col-2 mt-3">
              <span class="span-measurement ml-auto mr-auto">Дней</span>
            </div>
          </div>
          <!--./Поле Время доставки продукции-->

          <!--Поле Резервный запас-->
          <div class="row">
            <div class="col-10">

              <div class="md-form mt-1" :class="{'is-invalid':
                (this.$v.insurance_reserve.$dirty && !this.$v.insurance_reserve.required) ||
                (this.$v.insurance_reserve.$dirty && !this.$v.insurance_reserve.minValue)
              }">
                <input id="insurance_reserve_input" type="text" class="form-control"
                       v-model.trim="insurance_reserve"
                       :class="{
                             'is-invalid': (this.$v.insurance_reserve.$dirty && !this.$v.insurance_reserve.required) ||
                                (this.$v.insurance_reserve.$dirty && !this.$v.insurance_reserve.minValue)
                           }"/>
                <label ref="insurance_reserve_label" for="insurance_reserve_input" class="mr-5" :class="{ active: insurance_reserve !== '' }">
                  Резервный запас
                </label>

                <div class="invalid-feedback"
                     v-if="this.$v.insurance_reserve.$dirty && !this.$v.insurance_reserve.required">
                  Поле не должно быть пустым.
                </div>

                <div class="invalid-feedback"
                     v-if="this.$v.insurance_reserve.$dirty && !this.$v.insurance_reserve.minValue">
                  Резервный запас должн быть положительным числом.
                </div>

              </div>

            </div>
            <div class="col-2 mt-3">
              <span class="span-measurement ml-auto mr-auto">%</span>
            </div>
          </div>
          <!--./Поле Резервный запас-->

          <!--Поле для выбора отчета о прогнозируемом спросе-->
          <div class="row">
            <div class="col-12">

              <div class="row">
                <div class="col-12">
                  <h4>Выберите отчет о прогнозировании спроса:</h4>
                </div>
              </div>

              <div class="row">
                <div class="col-12">

                  <div class="md-form mt-1" :class="{'is-invalid':
                            (this.$v.forecastFile.$dirty && !this.$v.forecastFile.required) }">
                    <input id="item_input" type="text" class="form-control" list="objects_select"
                           v-model.trim="forecastFile"
                           :class="{
                             'is-invalid': (this.$v.forecastFile.$dirty && !this.$v.forecastFile.required)
                           }"/>
                    <label ref="item_label" for="item_input" class="mr-5" :class="{ active: forecastFile !== '' }">
                      Название отчета о прогнозировании спроса
                    </label>

                    <div class="invalid-feedback"
                         v-if="this.$v.forecastFile.$dirty && !this.$v.forecastFile.required">
                      Поле не должно быть пустым.
                    </div>
                  </div>

                  <datalist id="objects_select">
                    <option v-for="elem in forecastFiles" :key="elem.text">
                      {{ elem.filename }}
                    </option>
                  </datalist>

                </div>
              </div>

            </div>
          </div>
          <!--./Поле для выбора отчета о прогнозируемом спросе-->

        </mdb-jumbotron>
      </div>
    </div>
    <!--./Форма для создания плана закупок-->

    <!--Поле для записи названия плана закупок-->
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
          <label ref="name_label" for="name_input" class="mr-5" :class="{ active: filename !== '' }">
            Название плана закупок
          </label>

          <div class="invalid-feedback"
               v-if="this.$v.filename.$dirty && !this.$v.filename.required">
            Поле 'Название плана закупок' не должно быть пустым.
          </div>

          <div class="invalid-feedback"
               v-else-if="this.$v.filename.$dirty && !this.$v.filename.minLength">
            Полу 'Название плана закупок' должено быть
            {{ $v.filename.$params.minLength.min }}
            символом. Сейчас он {{ filename.length }}
          </div>
        </div>
      </div>
    </div>
    <!--./Поле для записи названия плана закупок-->

    <!--Кнопка Submit-->
    <div class="row">
      <div class="col-12">
        <mdb-btn color="primary" size="lg" @click="handlerSubmit">Создать отчет</mdb-btn>
      </div>
    </div>
    <!--./Кнопка Submit-->

  </div>
</template>

<script>
import { mdbJumbotron, mdbBtn } from 'mdbvue';
import {minLength, minValue, required} from "vuelidate/lib/validators";


export default {
  name: "PlansForm",
  components: {
    mdbJumbotron,
    mdbBtn
  },
  data() {
    return {
      storage_costs: 0,
      forecastFile: '',
      filename: '',
      shipping_costs: 0,
      deficit_costs: 0,
      time_shipping: 0,
      insurance_reserve: 0
    }
  },
  validations: {
    filename: { required, minLength: minLength(3) },
    forecastFile: { required },
    storage_costs: { required, minValue: minValue(1) },
    shipping_costs: { required, minValue: minValue(1) },
    deficit_costs: { required, minValue: minValue(1) },
    time_shipping: { required, minValue: minValue(1) },
    insurance_reserve: { required, minValue: minValue(1) },
  },
  created() {
    this.$store.commit('setHint', this.$route.meta.hint);
    this.$store.commit('setHeader', this.$route.meta.pageName);
  },
  async mounted() {
    if (this.$store.getters.demandForecastFiles) {
      await this.$store.dispatch('getAllDemandForecastFiles')
          .catch(() => this.$error(this, this.$store.getters.getMessage));
    }
  },
  computed: {
    forecastFiles: function () {
      return this.$store.getters.demandForecastFiles
    }
  },
  methods: {
    handlerSubmit() {
      // Валидация формы
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.$store.dispatch('addPurchasePlan', {
        'filename': this.filename,
        'storage_costs': this.storage_costs,
        'forecastFile': this.forecastFile,
        'shipping_costs': this.shipping_costs,
        'deficit_costs': this.deficit_costs,
        'time_shipping': this.time_shipping,
        'insurance_reserve': this.insurance_reserve
      })
          .then(() => { this.$message(this, this.$store.getters.getMessage) })
          .catch(() => { this.$error(this, this.$store.getters.getMessage) })
    },
  }
}
</script>

<style scoped>
.span-measurement{
  font-size: 20px;
}
.is-invalid input {
  border-bottom: 1px solid red!important;
}
.is-invalid input {
  border-color: #dc3545;
}
</style>