<template>
    <div class="main-layout">
        <!-- CONTENT -->
        <main>
            <div class="container">
                <div class="row">
                    <article class="col-12">
                        <router-view />
                    </article>
                </div>
            </div>
        </main>
        <!-- ./CONTENT -->
    </div>
</template>

<script>

    export default {
        name: "MainLayout",
    }
</script>

<style>

</style>
