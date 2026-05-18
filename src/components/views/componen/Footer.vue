<template>
    <footer class="main-footer">
        <strong>Copyright {{ tahun }} .</strong>
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.0.0
        </div>
        <a href="https://s.id/layananSAKIP" target="_blank">
            <img src="../../../../src/assets/img/sakip.png" alt="Admin Logo" class="adi img-circle wow fadeInUp"
                data-toggle="tooltip" data-placement="left" title="Support Center" name="image_name"
                style="height: 48px;width: 48px;position: fixed;bottom: 10px;right: 60px;">
        </a>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            tahun: new Date().getFullYear(),
        }
    }
}
</script>

<style></style>