<template>
    <!-- Copyright Start -->
    <div class="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
        <div class="container py-5">
            <div class="row g-5">
                <div class="col-md-6 col-lg-6 col-xl-3">
                    <div class="footer-item d-flex flex-column">
                        <h4 class="text-white mb-4 pmisputih">GIS Fasilitas Jalan</h4>
                        <p>Project Management Information System Spatial of Road Safety Facilities</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2">
                    <div class="footer-item d-flex flex-column">
                        <h4 class="mb-4 text-white pmisputih">
                            Jumlah Pengunjung
                        </h4>
                        <a href="#" class="text-white"><i class="fas fa-angle-right me-2"></i>
                            Hari ini: {{ G_numFormat(harini) }}
                        </a>
                        <a href="#" class="text-white"><i class="fas fa-angle-right me-2"></i>
                            Bulan ini: {{ G_numFormat(bulanini) }}
                        </a>
                        <a href="#" class="text-white"><i class="fas fa-angle-right me-2"></i>
                            Tahun ini: {{ G_numFormat(tahunini) }}
                        </a>
                        <a href="#" class="text-white"><i class="fas fa-angle-right me-2"></i>
                            Total: {{ G_numFormat(totalpengunjung) }}
                        </a>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-3">
                    <div class="footer-item d-flex flex-column">
                        <h4 class="mb-4 text-white pmisputih">
                            Tautan
                        </h4>
                        <a href="https://dephub.go.id/" target="_blank" class="text-white"><i
                            class="fas fa-angle-right me-2"></i> Kementerian Perhubungan</a>
                        <a href="https://salatiga.go.id/" target="_blank" class="text-white"><i
                                class="fas fa-angle-right me-2"></i> Website Kota Salatiga</a>
                        <a href="https://dishub.salatiga.go.id/" target="_blank" class="text-white"><i
                                class="fas fa-angle-right me-2"></i> Website Dishub Kota Salatiga</a>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-4">
                    <div class="footer-item d-flex flex-column">
                        <h4 class="mb-4 text-white pmisputih">
                            Info Kontak
                        </h4>
                        <a href="#" class="text-white"><i class="fas fa-house-user me-2"></i> Dinas Perhubungan Kota Salatiga</a>
                        <a href="#" class="text-white"><i class="fa fa-map-marker-alt me-2"></i> Jl. Magersari No 166 Tegalrejo, Argomulyo, Salatiga, Jawa Tengah 50724</a>
                        <a href="#" style="font-size: 15px;" class="text-white"><i class="fas fa-envelope me-2"></i>
                            dishub@salatiga.go.id</a>
                        <a href="#" class="text-white"><i class="fas fa-phone me-2"></i> (0298) 326766</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid copyright py-4">
        <div class="container">
            <div class="row g-6 align-items-center">
                <div class="col-md-12 text-center text-md-start mb-md-0">
                    <span class="text-white">
                        <a href="#" class="text-info">
                            <i class="fas fa-copyright text-light me-2"></i> WEB GIS FASILITAS KESELAMATAN JALAN
                        </a>
                        {{ tahun }} All right reserved.
                    </span>
                </div>
                <div class="col-md-12 text-center text-md-start mb-md-0 text-white">
                    Designed By <a href="https://dishub.salatiga.go.id/" target="_blank"><span class="text-info">DISHUB SALATIGA</span> </a>
                </div>
            </div>
        </div>
    </div>
    <!-- Copyright End -->
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert2';

export default {
    components: {
        swal
    },
    data() {
        return {
            tahun: new Date().getFullYear(),
            bahasa: localStorage.getItem("bahasasistem"),
            datapesan: '',
            harini: 0,
            bulanini: 0,
            tahunini: 0,
            totalpengunjung: 0,
            ipnya: '',
        };
    },
    methods: {
        async ambildata() {
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API,
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2",
                },
            });
            var random = Math.random();

            await mainAPI.get("parastapainnovationip-Key?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.ipnya = Response.data.randkey;
                    }
                    else {
                        this.ipnya = '';
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                this.datapesan = [];
                console.log(error);
            });

            const mainAPINew = axios.create({
                baseURL: process.env.VUE_APP_URL_API,
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2" + this.ipnya,
                },
            });

            await mainAPINew.get("parastapainnovationVisitor-GetVisitor?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.harini = Response.data.hariini;
                        this.bulanini = Response.data.bulanini;
                        this.tahunini = Response.data.tahunini;
                        this.totalpengunjung = Response.data.total;
                    }
                    else {
                        swal.fire({
                            title: "Informasi",
                            text: "Peringatan interupsi data!",
                            icon: "error"
                        }).then(function () {

                        });
                        $('.swal2-container').css("z-index", '999999');
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                this.datapesan = [];
                console.log(error);
                swal.fire({
                    title: "Informasi",
                    text: "Peringatan interupsi data!",
                    icon: "error"
                }).then(function () {

                });
                $('.swal2-container').css("z-index", '999999');
            });
        },
    },
    mounted() {
        this.ambildata();
    },
}
</script>

<style></style>