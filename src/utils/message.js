export default {
    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {

        Vue.prototype.$message = function (vm, text) {
            vm.$bvToast.toast(text, {
                title: 'Успешная операция',
                variant: 'success',
                solid: true
            });
        }

        Vue.prototype.$error = function (vm, text) {
            vm.$bvToast.toast(text, {
                title: 'Ошибка',
                variant: 'danger',
                solid: true
            });
        }
    }
}