<template>
    <div>
        <mdb-navbar :color="'primary'" position="top" dark transparent scrolling>
            <mdb-navbar-brand :to="{name: 'home'}">Планы закупок</mdb-navbar-brand>

            <mdb-navbar-toggler>
                <mdb-navbar-nav>
                    <mdb-nav-item active :to="{name: 'home'}">Главная</mdb-nav-item>
                    <mdb-nav-item :to="{name: 'about'}">О проекте</mdb-nav-item>
<!--                    <mdb-nav-item :to="{name: 'contacts'}">Контакты</mdb-nav-item>-->

                    <mdb-dropdown tag="li" class="nav-item" v-if="Object.keys(this.getUser).length">
                        <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>Личный кабинет</mdb-dropdown-toggle>
                        <mdb-dropdown-menu>
                            <mdb-dropdown-item :to="{name: 'privateOffice'}">Информация</mdb-dropdown-item>
                            <mdb-dropdown-item :to="{name: 'categories'}">Каталог</mdb-dropdown-item>
                            <mdb-dropdown-item :to="{name: 'demandForecast'}">Отчеты о прогнозировании сапроса</mdb-dropdown-item>
                            <mdb-dropdown-item :to="{name: 'plans'}">Планы закупок</mdb-dropdown-item>
                        </mdb-dropdown-menu>
                    </mdb-dropdown>
                </mdb-navbar-nav>

                <mdb-navbar-nav right v-if="!Object.keys(this.getUser).length">
                    <mdb-nav-item :to="{name: 'login'}">Вход</mdb-nav-item>
                    <mdb-nav-item :to="{name: 'register'}">Регистрация</mdb-nav-item>
                </mdb-navbar-nav>

                <mdb-navbar-nav right v-else>
                  <mdb-nav-item>Привет, {{ this.getUser.email }}</mdb-nav-item>
                  <mdb-nav-item @click="logout">Выход</mdb-nav-item>
                  <mdb-nav-item :to="{name: 'privateOffice'}">Личный кабинет</mdb-nav-item>
                </mdb-navbar-nav>

            </mdb-navbar-toggler>

        </mdb-navbar>
    </div>
</template>

<script>
    import { mdbNavbar,
            mdbNavbarBrand,
            mdbNavbarToggler,
            mdbNavbarNav,
            mdbNavItem,
            mdbDropdownMenu,
            mdbDropdownItem,
            mdbDropdown,
            mdbDropdownToggle} from 'mdbvue';

    import { mapGetters } from 'vuex';

    export default {
        name: 'NavbarPage',
        components: {
            mdbNavbar,
            mdbNavbarBrand,
            mdbNavbarToggler,
            mdbNavbarNav,
            mdbNavItem,
            mdbDropdownMenu,
            mdbDropdownItem,
            mdbDropdown,
            mdbDropdownToggle
        },
        computed: mapGetters(["getUser"]),
        methods: {
          async logout() {
              await this.$store.dispatch('logout').then(() => {
                  this.$router.push('/');
                  this.$message(this, 'Вы вышли из системы');
              } );
          },
        }
    }
</script>
