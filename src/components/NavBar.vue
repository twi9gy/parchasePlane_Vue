<template>
    <div>
        <mdb-navbar :color="'primary'" position="top" dark href="#" transparent scrolling>
            <mdb-navbar-brand to="/">Планы закупок</mdb-navbar-brand>
            <mdb-navbar-toggler>
                <mdb-navbar-nav>
                    <mdb-nav-item active :to="{name: 'home'}">Главная</mdb-nav-item>
                    <mdb-nav-item :to="{name: 'about'}">О проекте</mdb-nav-item>
                    <mdb-nav-item :to="{name: 'privateOffice'}">Личный кабинет</mdb-nav-item>
                </mdb-navbar-nav>
                <mdb-navbar-nav right>
                    <mdb-nav-item :to="{name: 'login'}">Вход</mdb-nav-item>
                    <mdb-nav-item :to="{name: 'register'}">Регистрация</mdb-nav-item>
                    <span v-if="isLoggedIn"> | <a @click="logout">Выход</a></span>
                </mdb-navbar-nav>
            </mdb-navbar-toggler>
        </mdb-navbar>
    </div>
</template>

<script>
    import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
    export default {
        name: 'NavbarPage',
        components: {
            mdbNavbar,
            mdbNavbarBrand,
            mdbNavbarToggler,
            mdbNavbarNav,
            mdbNavItem
        }
    }
</script>
