<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
  import MainLayout from "./layout/MainLayout";
  import ReportLayout from "./layout/ReportLayout";

  export default {
    computed : {
      layout: function () {
        return (this.$route.meta.layout || 'main') + '-layout';
      },
      isLoggedIn : function() { return this.$store.getters.isLoggedIn}
    },
    components: {
      MainLayout,
      ReportLayout
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
                .then(() => {
                  this.$router.push('/login')
                })
      },
      created: function () {
        this.$http.interceptors.response.use(undefined, function (err) {
          return new Promise(function () {
            if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
              this.$store.dispatch("logout")
            }
            throw err;
          });
        });
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
