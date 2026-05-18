<template>
    <div class="container-fluid bg-dark px-5 d-none d-lg-block">
        <div class="row gx-0 align-items-center" style="height: 45px;">
            <div class="col-lg-8 text-center text-lg-start mb-lg-0">
                <div class="d-flex flex-wrap">
                    <a href="#" class="text-light me-4">DISHUB KOTA SALATIGA</a>
                    <a href="#" class="text-light me-4"><i class="fas fa-phone-alt text-warning me-2"></i>(0298) 326766</a>
                    <a href="#" class="text-light me-0"><i
                            class="fas fa-envelope text-warning me-2"></i>dishub@salatiga.go.id</a>
                </div>
            </div>
            <div class="col-lg-4 text-center text-lg-end">
                <div class="d-flex align-items-center justify-content-end">
                    <a href="#" class="btn nav-fill me-6 text-white">#SPATIAL analytics</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Topbar End -->
    <div class="container-fluid position-relative p-0">
        <nav class="navbar navbar-expand-lg navbar-light bg-white px-4 px-lg-5 py-3 py-lg-0">
            <h1>
                <img src="../../../../../src/assets/img/gis2.png" height="80">
            </h1>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="fa fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav ms-auto py-0">
                    <a href="/"
                        :class="[((route.name == 'Beranda' || route.name == 'Beranda2') ? 'nav-item nav-link active' : 'nav-item nav-link')]">
                        BERANDA
                    </a>
                    <a :href="'/GIS/' + bytes"
                        :class="[((route.name == 'GIS') ? 'nav-item nav-link active' : 'nav-item nav-link')]">
                        GIS PERHUBUNGAN
                    </a>
                    <a href="/BankDokumen"
                        :class="[((route.name == 'BankDokumen') ? 'nav-item nav-link active' : 'nav-item nav-link')]">
                        DOKUMEN
                    </a>
                    <a href="/KontakKami"
                        :class="[((route.name == 'KontakKami') ? 'nav-item nav-link active' : 'nav-item nav-link')]">
                        KONTAK KAMI
                    </a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import swal from 'sweetalert2';
import CryptoJS from 'crypto-js';

export default {
    setup() {
        const route = useRoute()
        watch(() => route.name, () => {
        });

        return { route };
    },
    components: {
        swal
    },
    data() {
        return {
            tabaktif: encodeURIComponent(CryptoJS.AES.encrypt('', 'oriproMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
            tahun: new Date().getFullYear(),
            bahasa: localStorage.getItem("bahasasistem"),
            bytes: encodeURIComponent(CryptoJS.AES.encrypt('Kosong', 'oriproMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
        };
    },
    methods: {
        gantibahasa(bahasanya) {
            localStorage.setItem("bahasasistem", bahasanya);
            location.reload();
        },
    },
    mounted() {
        localStorage.removeItem('bahasasistem');
    },
}
</script>

<style></style>