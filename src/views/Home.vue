<template>
    <div class="container-fluid p-0" >
        <div class="row" v-if="loading">
            <div class="col">
                <spinner />
            </div>
        </div>

        <div class="row" v-else>
            <div class="col p-0">
                <div class="container-fluid">

                    <div class="row height-max">
                        <div class="col mt-auto mb-auto">
                            <div class="white-text text-center">
                                <h2>Система создания планов закупок для торговых предприятий</h2>
                                <h4>Мы поможем создать план закупок, используя и анализируя информацию о ваших прошлых продажах.</h4>
                            </div>
                        </div>
                    </div>

                    <!-- Информация о процессе создания плана закупок -->
                    <div class="row background-white">
                        <div class="col">
                            <ProccessPlanning />
                        </div>
                    </div>
                    <!-- ./Информация о процессе создания плана закупок -->

                    <!-- Информация о методах прогнозирования -->
                    <div class="row background-white">
                        <div class="col">
                            <MethodsList />
                        </div>
                    </div>
                    <!-- ./Информация о методах прогнозирования -->

                    <!-- Информация о ABC и XYZ анализах -->
                    <div class="row background-white">
                        <div class="col">
                            <GroupProduct />
                        </div>
                    </div>
                    <!-- ./Информация о ABC и XYZ анализах --> 
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from '../components/LayoutComponents/Spinner.vue';
    import ProccessPlanning from '../components/HomeComponents/ProccessPlanning';
    import MethodsList from '../components/HomeComponents/MethodsList'; 
    import GroupProduct from '../components/HomeComponents/GroupProduct'; 

    export default {
        components: {Spinner, GroupProduct, MethodsList, ProccessPlanning},
        name: 'Home',
        created() {
            this.$store.commit('setLoading', false);

            // Устанавливаем оглавление к странице
            this.$store.commit('setTitle', this.$route.meta.title);
            document.title = this.title;
        },
        computed: {
            loading() {
                return this.$store.getters.getLoading;
            },
            title() {
                return this.$store.getters.Page.title;
            }
        },
    }
</script>

<style>
    .height-max{
        height: 100vh;
    }
    .background-white {
        background-color: white;
    }
</style>
