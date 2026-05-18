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
                            <h5>Pengaturan PK</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Pengaturan PK</li>
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

                                </div>
                                <div class="card-body p-0">
                                    <div class="table-responsive table-wrapper" style="font-size: smaller;">
                                        <table class="table m-0" id="tabeldata">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;" rowspan="2">No</th>
                                                    <th style="width: 100px;" rowspan="2">Jenis PK</th>
                                                    <th style="width: 400px;" colspan="6">Pengaturan</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 100px;">Default Monitoring</th>
                                                    <th style="width: 100px;">Tampil Menu</th>
                                                    <th style="width: 100px;">Input Manual Target</th>
                                                    <th style="width: 100px;">Input Shortcut Target</th>
                                                    <th style="width: 100px;">Upload ttd PK</th>
                                                    <th style="width: 100px;">Tahun PK</th>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td class="text-center">
                                                            {{ (urutlist + 1) }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.nama }}
                                                        </td>
                                                        <td class="text-center">
                                                            <div class="form-group">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="radio"
                                                                        name="radio_aktive"
                                                                        :id="'radio_aktive' + '|' + datalist.id"
                                                                        @click="rubahpilihan('radio_aktive' + '|' + datalist.id)"
                                                                        :checked="datalist.is_active == 1">
                                                                    <label for="radio_aktive"
                                                                        class="form-check-label">Aktif</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="text-center">
                                                            <input type="checkbox" :checked="datalist.showmenu == 1"
                                                                :id="'showmenu' + '|' + datalist.id"
                                                                @click="rubahpilihan('showmenu' + '|' + datalist.id)">
                                                        </td>
                                                        <td class="text-center">
                                                            <input type="checkbox" :checked="datalist.manualinput == 1"
                                                                :id="'manualinput' + '|' + datalist.id"
                                                                @click="rubahpilihan('manualinput' + '|' + datalist.id)">
                                                        </td>
                                                        <td class="text-center">
                                                            <input type="checkbox"
                                                                :checked="datalist.shortcutinput == 1"
                                                                :id="'shortcutinput' + '|' + datalist.id"
                                                                @click="rubahpilihan('shortcutinput' + '|' + datalist.id)">
                                                        </td>
                                                        <td class="text-center">
                                                            <input type="checkbox" :checked="datalist.ttd == 1"
                                                                :id="'ttd' + '|' + datalist.id"
                                                                @click="rubahpilihan('ttd' + '|' + datalist.id)">
                                                        </td>
                                                        <td class="text-center">
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'tahun' + '|' + datalist.id"
                                                                :value="datalist.tahun"
                                                                @change="rubahpilihantahun('tahun' + '|' + datalist.id)">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                            <tbody v-if="(datapesan == 'data kosong')">
                                                <tr>
                                                    <td colspan="6">Data masih kosong</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer p-3">

                                </div>
                            </div>
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
import Footer from "../../componen/Footer.vue";
import NavBar from "../../componen/NavBar.vue";
import Menu from "../../componen/Menu.vue";

import VueApexCharts from "vue3-apexcharts";
window.Apex.chart = { fontFamily: "Poppins-SemiBold, Arial, sans-serif" };
export default {
    components: {
        Footer, NavBar, Menu, vSelect, swal
    },
    data() {
        return {
            halamanloading: true,
            iduser: JSON.parse(localStorage.getItem("usistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            datapesan: '',
            datamaster: [],
            carikata: '',
            jumlahdata: 0,
            jumlahhalaman: 0,
            mulai: 0,
            halaman: 1,
            tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
        }
    },
    computed: {
        filteredKataData() {
            const filteredWorkers = this.carikata === ""
                ? this.datamaster
                : this.datamaster.filter(wo => Object.values(wo).join("").toLowerCase().indexOf(this.carikata.toLowerCase()) !== -1);
            return filteredWorkers;
        },
        JumlahfilteredKataData() {
            var jumlah = 0;
            try {
                if (this.filteredKataData === undefined) {
                    jumlah = 0;
                } else {
                    jumlah = this.filteredKataData.length;
                }
            }
            catch {
                jumlah = 0;
            }
            return jumlah;
        },
    },
    methods: {
        getOtentifikasi() {
            var time = Date.parse(localStorage.getItem("tsistem"));
            var timeakhir = time + (3 * 60 * 60 * 1000);
            var timesekarang = Date.parse(new Date());
            if (timesekarang > timeakhir) {
                this.ClearlocalStorage();
            }
        },
        async ambildata() {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPI.get("parastapainnovationatur-PK?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                    }
                    else {
                        this.datamaster = [];
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                this.ClearlocalStorage();
                this.halamanloading = false;
            });
        },
        rubahpilihantahun(kode) {
            var dokumen = kode.split('|');
            var kolom = dokumen[0];
            var id = dokumen[1];
            var isi = document.getElementById(kode).value;
            var fd = new FormData();
            fd.append("kolom", kolom);
            fd.append("isi", isi);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", id);
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationatur-Update", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: 'Pengaturan PK telah disimpan',
                        });
                        return false;
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
        rubahpilihan(kode) {
            //alert(kode);
            var dokumen = kode.split('|');
            //alert(document.getElementById(kode).checked);
            var kolom = dokumen[0];
            var id = dokumen[1];
            var cekterpilih = document.getElementById(kode).checked;
            var isi = '';
            if (cekterpilih == true) {
                isi = '1';
            }
            else {
                isi = '0';
            }

            var fd = new FormData();
            fd.append("kolom", kolom);
            fd.append("isi", isi);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", id);
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationatur-Update", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: 'Pengaturan PK telah disimpan',
                        });
                        return false;
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
        this.ambildata();
    }
}
</script>
<style></style>