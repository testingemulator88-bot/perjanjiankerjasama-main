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
                            <h5>Master Kriteria</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Home </a></li>
                                <li class="breadcrumb-item active">Master Kriteria</li>
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
                                    <div class="col-sm-3 float-left pb-2">
                                        <button type="button" class="btn btn-danger3 btn-sm text-white lebar2"
                                            @click="prosesdata('Tambah')" data-toggle="tooltip" data-placement="left"
                                            title="Tambah data..">
                                            <i class="fas fa-plus"></i> Tambah
                                        </button>
                                    </div>
                                    <div class="col-sm-12 float-left pb-2 px-3">
                                        Jumlah Data: {{ G_numFormat(jumlahdata) }}
                                        <span style="float: right;">
                                            Halaman ke:
                                            <select v-model="halaman" @change="onChangeHalaman($event)">
                                                <option v-for="index in jumlahhalaman" :key="index">
                                                    {{ index }}
                                                </option>
                                            </select>
                                            dari {{ jumlahhalaman }}
                                        </span>
                                    </div>
                                    <div class="col-sm-12 float-left pb-2 px-3">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-biru">
                                                    <i class="fas fa-search"></i>
                                                </span>
                                            </div>
                                            <input type="text" v-model="carikata" class="form-control form-control-sm"
                                                placeholder="Masukkan Kata Kunci Pencarian Nama Kriteria"
                                                @keyup="ambildata()">
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body p-0">
                                    <div class="table-responsive table-wrapper">
                                        <table class="table m-0" id="tabeldata">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">No</th>
                                                    <th style="width: 100px;">Nama Sub Komponen</th>
                                                    <th style="width: 100px;">Kode Kriteria</th>
                                                    <th style="width: 150px;">Nama Kriteria</th>
                                                    <th style="width: 150px;">Langkah Kerja</th>
                                                    <th style="width: 150px;">Daftar Evidence</th>
                                                    <th style="width: 150px;">Opsi</th>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td>{{ urutlist + 1 }}</td>
                                                        <td>
                                                            {{ datalist.nama_subkomponen }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.kode_kriteria }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.nama_kriteria }}
                                                        </td>
                                                        <td>
                                                            <span v-html="datalist.langkah_kerja"></span>
                                                        </td>
                                                        <td>
                                                            <span v-html="datalist.daftar_evidence"></span>
                                                        </td>
                                                        <td class="text-center">
                                                            <button type="button"
                                                                class="btn btn-primary3 btn-sm lebar2 text-white"
                                                                @click="prosesdata(datalist.id_kriteria)"
                                                                data-toggle="tooltip" data-placement="left"
                                                                title="Edit data..">
                                                                <i class="fas fa-edit"></i> Edit Data
                                                            </button>
                                                            <button type="button"
                                                                class="btn btn-info3 btn-sm lebar2 text-white"
                                                                @click="hapus(datalist.id_kriteria)"
                                                                data-toggle="tooltip" data-placement="left"
                                                                title="Hapus data.."><i class="fas fa-trash-alt">
                                                                </i> Hapus Data
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                            <tbody v-if="(datapesan == 'data kosong')">
                                                <tr>
                                                    <td colspan="7">Data masih kosong</td>
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
import Footer from "../../../componen/Footer.vue";
import NavBar from "../../../componen/NavBar.vue";
import Menu from "../../../componen/Menu.vue";

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
        onChangeHalaman(event) {
            this.pindahhalaman(event.target.value);
        },
        async pindahhalaman(halamannya) {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPI.get("masterlke-GetAllKriteria?random=" + random + "&halaman=" + halamannya + "&cari=" + this.carikata).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                        this.jumlahdata = Response.data.content.jumlahdata;
                        this.jumlahhalaman = Response.data.content.jumlahhalaman;
                        this.mulai = Response.data.content.mulai;

                        if (this.mulai == 0) {
                            this.halaman = 1;
                        }
                        else {
                            this.halaman = (this.mulai / 20) + 1;
                        }
                        this.halamanloading = false;
                    }
                    else {
                        this.jumlahdata = 0;
                        this.jumlahhalaman = 0;
                        this.datamaster = [];
                        this.halamanloading = false;
                    }

                }
            ).catch(error => {
                console.log(error);
                this.datadetail = [];
                this.jumlahdata = 0;
                this.jumlahhalaman = 0;
                this.mulai = 0;
                this.halaman = 1;
                this.halamanloading = false;
            });
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
            await mainAPI.get("masterlke-GetAllKriteria?random=" + random + "&halaman=" + this.halaman + "&cari=" + this.carikata).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                        this.jumlahdata = Response.data.content.jumlahdata;
                        this.jumlahhalaman = Response.data.content.jumlahhalaman;
                    }
                    else {
                        this.jumlahdata = 0;
                        this.jumlahhalaman = 0;
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
        prosesdata(kode) {
            var bytes = encodeURIComponent(CryptoJS.AES.encrypt(kode, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
            window.location.replace("/ProsesKriteriaPenilaian/" + bytes);
        },
        hapus(kode) {
            swal.fire({
                title: "Konfirmasi",
                text: "Yakin Hendak Hapus Data?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Hapus"
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = { kode: kode, deletedby: JSON.parse(localStorage.getItem("usistem")) }
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    mainAPI.post("masterlke-DeleteKriteria", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire('Informasi', 'Data telah dihapus..', 'success').then(function () {
                                    window.location.replace("/KriteriaPenilaian");
                                });
                            }
                        }
                    ).catch(
                        error => {
                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                        }
                    )

                }
            });
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