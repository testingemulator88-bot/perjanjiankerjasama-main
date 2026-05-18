<template>
    <div class="wrapper">
        <NavBar />
        <Menu />
        <!-- Spinner Start -->
        <div id="spinner" v-if="halamanloading"
            class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            style="opacity: 0.5;">
            <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->
        <div class="content-wrapper py-3">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6 wow fadeInDown">
                            <h5>Pengaturan</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Home </a></li>
                                <li class="breadcrumb-item"><a href="/PilihanJawaban">Pilihan Jawaban</a></li>
                                <li class="breadcrumb-item active">Form Input Pilihan Jawaban</li>
                            </ol>
                        </div>
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="card cardputih">
                                <div class="card-header border-transparent">
                                    <h3 class="card-title">Form Input Pilihan Jawaban</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>
                                                Pilihan Jawaban
                                                <small class="text-info"> (*wajib diisi)</small>
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="pilihan_jawaban" name="pilihan_jawaban"
                                                    placeholder="Pilihan Jawaban" v-model="pilihan_jawaban">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Nilai
                                                <small class="text-info"> (*wajib diisi)</small>
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="number" class="form-control form-control-sm" id="nilai"
                                                    name="nilai" placeholder="Nilai" v-model="nilai">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Penjelasan Jawaban
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="penjelasan_jawaban" name="penjelasan_jawaban"
                                                    placeholder="Penjelasan Jawaban" v-model="penjelasan_jawaban">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Kategori Jawaban
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="kategori_jawaban" name="kategori_jawaban"
                                                    placeholder="Kategori Jawaban" v-model="kategori_jawaban">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            &nbsp;
                                        </div>
                                        <div class="col-sm-12">
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer p-3">
                                    <button type="button" class="btn btn-sm btn-success3 float-left text-white lebar2"
                                        @click="simpan()" v-if="(secretencData == 'Tambah')" data-toggle="tooltip"
                                        data-placement="left" title="Simpan data..">
                                        <i class="fas fa-plus-square"></i> Simpan
                                    </button>
                                    <button type="button" class="btn btn-sm btn-success3 float-left text-white lebar2"
                                        v-if="(secretencData != 'Tambah')" @click="update()" data-toggle="tooltip"
                                        data-placement="left" title="Update data..">
                                        <i class="fa fa-check-circle"></i> Update
                                    </button>
                                    <button type="button" class="btn btn-sm btn-danger3 float-left text-white lebar2"
                                        @click="batalproses()" data-toggle="tooltip" data-placement="left"
                                        title="Batalkan proses..">
                                        <i class="fas fa-window-close"></i> Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 wow fadeInDown">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import vSelect from 'vue-select';
import swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import Footer from "../../../componen/Footer.vue";
import NavBar from "../../../componen/NavBar.vue";
import Menu from "../../../componen/Menu.vue";

import VueApexCharts from "vue3-apexcharts";
window.Apex.chart = { fontFamily: "Poppins-SemiBold, Arial, sans-serif" };
export default {
    setup() {
        const route = useRoute()
        watch(() => route.name, () => {
        });

        return { route };
    },
    components: {
        Footer, NavBar, Menu, vSelect, swal
    },
    data() {
        return {
            halamanloading: true,
            iduser: JSON.parse(localStorage.getItem("usistem")),
            dleveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            secretencData: decodeURIComponent(CryptoJS.AES.decrypt(this.route.params.id, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString(CryptoJS.enc.Utf8)),
            pilihan_jawaban: '',
            nilai: '',
            penjelasan_jawaban: '',
            kategori_jawaban: '',

            validasi: false,
            tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
        }
    },
    methods: {
        getOtentifikasi() {
            var time = Date.parse(localStorage.getItem("tsistem"));
            var timeakhir = time + (3 * 60 * 60 * 1000);
            var timesekarang = Date.parse(new Date());
            if (timesekarang > timeakhir) {
                this.ClearlocalStorage();
            }
            this.halamanloading = false;
        },
        batalproses() {
            window.location.replace("/PilihanJawaban");
        },
        async AmbilDataSingel() {
            this.halamanloading = true;

            var mainAPIDataSingel = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            var random = Math.random();

            await mainAPIDataSingel.get("masterlke-EditPilihanJawaban?id=" + this.secretencData + "&random=" + random).then(
                Response => {
                    this.pilihan_jawaban = Response.data.content.data[0].pilihan_jawaban;
                    this.nilai = Response.data.content.data[0].nilai;
                    this.penjelasan_jawaban = Response.data.content.data[0].penjelasan_jawaban;
                    this.kategori_jawaban = Response.data.content.data[0].kategori_jawaban;

                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        validasidata() {
            if (document.getElementById('pilihan_jawaban').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('pilihan_jawaban').focus();
                return false;
            }
            if (document.getElementById('nilai').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('nilai').focus();
                return false;
            }

            this.validasi = true;
            return;
        },
        simpan() {
            this.validasidata();
            if (this.validasi == false) {
                return false;
            }
            var fd = new FormData();

            fd.append("pilihan_jawaban", this.pilihan_jawaban);
            fd.append("nilai", this.nilai);
            fd.append("penjelasan_jawaban", this.penjelasan_jawaban);
            fd.append("kategori_jawaban", this.kategori_jawaban);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("masterlke-AddPilihanJawaban", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                            window.location.replace("/PilihanJawaban");
                        });
                    }
                }
            ).catch(function (error) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: error
                });
            }
            )
        },
        update() {
            this.validasidata();

            if (this.validasi == false) {
                return false;
            }

            //alert(this.usernamedatatmp);
            //alert(this.usernamedata);
            var fd = new FormData();
            fd.append("pilihan_jawaban", this.pilihan_jawaban);
            fd.append("nilai", this.nilai);
            fd.append("penjelasan_jawaban", this.penjelasan_jawaban);
            fd.append("kategori_jawaban", this.kategori_jawaban);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", this.secretencData);

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("masterlke-UpdatePilihanJawaban", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah terupdate..', 'success').then(function () {
                            window.location.replace("/PilihanJawaban");
                        });
                    }
                }
            ).catch(function (error) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: error
                });
            }
            )
            return false;
        },
    },
    mounted() {
        this.getOtentifikasi();
        if (this.secretencData != 'Tambah') {
            this.AmbilDataSingel();
        }
    }
}
</script>
<style></style>