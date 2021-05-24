<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col">
                <p class="text-center">Данные обрабатываются...</p>
            </div>
        </div>

        <div class="row mt-2">
            <div class="col">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Spinner"
    }
</script>

<style scoped>

</style>