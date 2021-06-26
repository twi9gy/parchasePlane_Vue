<template>
    <div class="main-layout">
        <!-- CONTENT -->
        <main>
            <div class="container-fluid">
                <div class="row">
                    <div class="col p-0">
                        <router-view />
                    </div>
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
