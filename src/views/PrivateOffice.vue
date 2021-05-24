<template>
    <div class="profile-information">

      <div v-if="loading">
        <spinner />
      </div>

      <div v-else>
        <mdb-input placeholder="Email" class="mb-3 mt-0" v-model="User.email">
            <span
                v-b-tooltip="'Email'"
                class="input-group-text md-addon"
                slot="prepend"> <mdb-icon icon="user" /></span>
        </mdb-input>

        <mdb-input
            placeholder="Название компании"
            class="mb-3 mt-0"
            v-model="User.company_name">
            <span
                v-b-tooltip="'Название компании'"
                class="input-group-text md-addon"
                slot="prepend"> <mdb-icon icon="building" /></span>
        </mdb-input>

        <div class="md-form" v-if="visible" :class="{'is-invalid':
            (this.$v.new_password.$dirty && !this.$v.new_password.required) ||
            (this.$v.new_password.$dirty && !this.$v.new_password.minLength)}">
            <input id="password_input" type="password" class=" form-control"
                    v-model.trim="new_password"
                    :class="{'is-invalid':
                      (this.$v.new_password.$dirty && !this.$v.new_password.required) ||
                      (this.$v.new_password.$dirty && !this.$v.new_password.minLength)}"/>

            <label ref="password_label" for="password_input" class="mr-5" :class="{ active: new_password !== '' }">
              Пароль
            </label>

          <div class="invalid-feedback" v-if="(this.$v.new_password.$dirty && !this.$v.new_password.required)">
            Поле пароль не должно быть пустым.
          </div>

          <div class="invalid-feedback" v-if="(this.$v.new_password.$dirty && !this.$v.new_password.minLength)">
            Пароль должен быть {{ $v.new_password.$params.minLength.min }} символом. Сейчас он {{ new_password.length }}
          </div>

        </div>

        <mdb-row class="d-flex align-items-center mb-4">
            <mdb-col md="12" class="d-flex justify-content-center">
                <div class="text-center">
                    <mdb-btn rounded type="submit" class="pl-5 pr-5" @click="changePassword">Изменить пароль</mdb-btn>
                </div>
            </mdb-col>
        </mdb-row>
      </div>

    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mdbRow, mdbCol, mdbInput, mdbBtn, mdbIcon } from 'mdbvue';
import Spinner from '../components/LayoutComponents/Spinner.vue';

export default {
    name: "ProfileInformation",
    computed: {
      User: function () {
          return this.$store.getters.getUser;
      },
      loading() {
        return this.$store.getters.getLoading;
      }
    },
    data() {
      return {
        new_password: '',
        visible: false
      }
    },
    validations: {
      new_password: { required, minLength: minLength(8) }
    },
    components: {
        mdbInput,
        mdbBtn,
        mdbIcon,
        mdbRow,
        mdbCol,
        Spinner
    },
    created() {
        this.$store.commit('setHint', this.$route.meta.hint);
        this.$store.commit('setHeader', this.$route.meta.pageName);
    },
    methods: {
      changePassword: function () {
        this.visible = !this.visible
        // Проверяем валидацию полей формы
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        // Вызываем метод изменения пароля
        this.$store.dispatch('changePassword', {'new_password': this.new_password })
            .then(() => {
              this.$router.push({'name' : 'privateOffice'})
                  .then(this.$message(this, this.$store.getters.getMessage))
            })
            .catch(() => {
              this.$error(this, this.$store.getters.getMessage);
            });
      }
    }
}
</script>

<style scoped>
</style>
