<template>
    <div class="home">
        <div style="height: 100vh">
            <div class="" style="height: 100vh">
                <div class="container flex-center">

                    <div v-if="loading">
                        <spinner />
                    </div>

                    <div v-else>
                        <div class="white-text text-center">
                            <h2>
                                Система создания планов закупок для предприятий
                            </h2>
                            <h4>
                                Мы поможем создать план закупок, используя и анализируя информация о ваших прошлых продажах.
                            </h4>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from '../components/Spinner.vue'
    export default {
        components: { Spinner },
        name: 'Home',
        computed: {
            loading() {
                return this.$store.getters.getLoading;
            }
        },
        created() {
            this.$store.commit('setLoading', false);
        }
    }
</script>
