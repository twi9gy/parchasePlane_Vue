<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <h4>{{ name }}</h4>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12">
                <input class="form-control" list="objects_select" :placeholder="label" />
                <datalist id="objects_select">
                    <option v-for="elem in listItem" :key="elem.text">
                        {{ elem.name }}
                    </option>
                </datalist>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectTypeObject",
        props: ["name", "listItem", "label"]
    }
</script>

<style scoped>

</style>
