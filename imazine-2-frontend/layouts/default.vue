<template>
    <div id="toggle_div"></div>
    <Navbar/>
    <div class="container-lg py-4">
        <slot/>
    </div>
</template>

<script setup>
</script>

<style scoped>
.body {
    background-color: #F2F2F2;
}

#toggle_div {
    background-color: rgba(0, 0, 0, .3);
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 999;
}
</style>