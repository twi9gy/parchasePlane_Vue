<template>
    <div>
        <mdb-navbar :color="'primary'" position="top" dark href="#" transparent scrolling>
            <mdb-navbar-brand to="/">Планы закупок</mdb-navbar-brand>

            <mdb-navbar-toggler>

                <mdb-navbar-nav>
                    <mdb-nav-item active :to="{name: 'home'}">Главная</mdb-nav-item>
                    <mdb-nav-item :to="{name: 'about'}">О проекте</mdb-nav-item>
                    <mdb-nav-item :to="{name: 'contacts'}">Контакты</mdb-nav-item>

                    <mdb-dropdown tag="li" class="nav-item">
                        <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>Личный кабинет</mdb-dropdown-toggle>
                        <mdb-dropdown-menu>
                            <mdb-dropdown-item :to="{name: 'privateOffice'}">Информация</mdb-dropdown-item>
                            <mdb-dropdown-item :to="{name: 'categories'}">Каталог</mdb-dropdown-item>
                            <mdb-dropdown-item :to="{name: 'reports'}">Отчеты</mdb-dropdown-item>
                        </mdb-dropdown-menu>
                    </mdb-dropdown>

                </mdb-navbar-nav>

                <mdb-navbar-nav right>
                    <mdb-nav-item :to="{name: 'login'}">Вход</mdb-nav-item>
                    <mdb-nav-item :to="{name: 'register'}">Регистрация</mdb-nav-item>
                    <span v-if="isLoggedIn"> | <mdb-nav-item :to="{name: 'logout'}">Выход</mdb-nav-item></span>
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
        }
    }
</script>
