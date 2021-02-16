<template>
  <div style="height: 90vh">
    <div class="" style="height: 90vh">
      <div class="container flex-center">
        <mdb-container class="mb-2">
          <mdb-row>
            <mdb-col>
              <mdb-card>
                <mdb-card-boby>
                  <mdb-card-text>
                    <mdb-card-title class="h1-responsive font-weight-bold text-center my-5">5 шагов для создания плана закупок</mdb-card-title>
                    <mdb-container>
                      <mdb-row>
                        <mdb-col md="4" class="md-0 mb-5">
                          <mdb-row>
                            <mdb-col lg="2" md="3" size="2">
                              <mdb-icon icon="bullhorn" size="2x" class="blue-text"/>
                            </mdb-col>
                            <mdb-col lg="10" md="9" size="10">
                              <h4 class="font-weight-bold">Шаг 1</h4>
                              <p class="grey-text">Регистрация аккаунта в системе.</p>
                              <router-link  :to="{ name: 'register' }" class="text-white">
                                <mdb-btn color="primary" size="sm">Регистрация</mdb-btn>
                              </router-link>
                            </mdb-col>
                          </mdb-row>
                        </mdb-col>
                        <mdb-col md="4" class="md-0 mb-5">
                          <mdb-row>
                            <mdb-col lg="2" md="3" size="2">
                              <mdb-icon icon="cogs" size="2x" class="pink-text"/>
                            </mdb-col>
                            <mdb-col lg="10" md="9" size="10">
                              <h4 class="font-weight-bold">Шаг 2</h4>
                              <p class="grey-text">Создать категории для файлов с информацией о продажах в блоке 'Каталог'.</p>
                              <router-link  :to="{ name: 'privateOffice' }" class="text-white">
                                <mdb-btn color="pink" size="sm">
                                  Личный кабинет
                                </mdb-btn>
                              </router-link>
                            </mdb-col>
                          </mdb-row>
                        </mdb-col>
                        <mdb-col md="4" class="md-0 mb-5">
                          <mdb-row>
                            <mdb-col lg="2" md="3" size="2">
                              <mdb-icon icon="tachometer-alt" size="2x" class="purple-text"/>
                            </mdb-col>
                            <mdb-col lg="10" md="9" size="10">
                              <h4 class="font-weight-bold">Шаг 3</h4>
                              <p class="grey-text">Добавить файлы с информацией о продажах в блоке 'Каталог'.</p>
                              <router-link  :to="{ name: 'privateOffice' }" class="text-white">
                                <mdb-btn color="purple" size="sm">
                                  Личный кабинет
                                </mdb-btn>
                              </router-link>
                            </mdb-col>
                          </mdb-row>
                        </mdb-col>
                      </mdb-row>
                      <mdb-row>
                        <mdb-col md="4" class="md-0 mb-5">
                          <mdb-row>
                            <mdb-col lg="2" md="3" size="2">
                              <mdb-icon icon="bullhorn" size="2x" class="blue-text"/>
                            </mdb-col>
                            <mdb-col lg="10" md="9" size="10">
                              <h4 class="font-weight-bold">Шаг 4</h4>
                              <p class="grey-text"> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                              <mdb-btn color="primary" size="sm">Learn more</mdb-btn>
                            </mdb-col>
                          </mdb-row>
                        </mdb-col>
                        <mdb-col md="4" class="md-0 mb-5">
                          <mdb-row>
                            <mdb-col lg="2" md="3" size="2">
                              <mdb-icon icon="bullhorn" size="2x" class="blue-text"/>
                            </mdb-col>
                            <mdb-col lg="10" md="9" size="10">
                              <h4 class="font-weight-bold">Шаг 5</h4>
                              <p class="grey-text"> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                              <mdb-btn color="primary" size="sm">Learn more</mdb-btn>
                            </mdb-col>
                          </mdb-row>
                        </mdb-col>
                      </mdb-row>
                    </mdb-container>
                  </mdb-card-text>
                </mdb-card-boby>
              </mdb-card>
            </mdb-col>
          </mdb-row>
        </mdb-container>
      </div>
    </div>
  </div>
</template>

<script>
  import { mdbCard, mdbCardText, mdbCardTitle, mdbContainer, mdbRow, mdbCol, mdbIcon, mdbBtn } from 'mdbvue';
  export default {
    name: 'FeaturesPage',
    components: {
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbIcon,
      mdbBtn,
      mdbCard,
      mdbCardText,
      mdbCardTitle
    }
  }
</script>
