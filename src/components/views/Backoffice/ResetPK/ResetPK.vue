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
                            <h5>Reset PK</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Reset PK</li>
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
                                <div class="card-body p-3">
                                    <div class="col-sm-12 wow fadeInDown">
                                        <label>Jenis PK</label>
                                        <v-select :options="jenispk" :reduce="(label) => label.code" label="label"
                                            v-model="defaultSelectedjenispk" @update:modelValue="onjenispkChange"
                                            style="padding-bottom: 10px;">
                                        </v-select>
                                    </div>
                                    <div class="col-sm-12 wow fadeInDown"
                                        v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)"
                                        style="display: none;">
                                        <label>Unit Organisasi</label>
                                        <v-select :options="kdunor" :reduce="(label) => label.code" label="label"
                                            v-model="defaultSelectedkdunor" @update:modelValue="onkdunorChange"
                                            style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                    </div>
                                    <div class="col-sm-12 wow fadeInDown"
                                        v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)">
                                        <label>Pusat / Balai</label>
                                        <v-select :options="kategorisatker" :reduce="(label) => label.code"
                                            label="label" v-model="defaultSelectedkategorisatker"
                                            @update:modelValue="onkategorisatkerChange"
                                            style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                    </div>
                                    <div class="col-sm-12 wow fadeInDown"
                                        v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)">
                                        <label>Satker</label>
                                        <v-select :options="satker" :reduce="(label) => label.code" label="label"
                                            v-model="defaultSelectedsatker" @update:modelValue="onsatkerChange"
                                            style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                    </div>
                                    <div class="col-sm-12 wow fadeInDown text-center">
                                        <button type="button" class="btn btn-success btn-sm text-white lebar2"
                                            @click="ambildata()" data-toggle="tooltip" data-placement="left"
                                            title="Tambah data..">
                                            <i class="fas fa-search"></i> Cari
                                        </button>
                                    </div>
                                    <div class="col-sm-12 wow fadeInDown">
                                        &nbsp;
                                    </div>
                                    <div class="table-responsive table-wrapper" style="font-size: smaller;">
                                        <table class="table m-0" id="tabeldata">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">No</th>
                                                    <th style="width: 50px;">Jenis</th>
                                                    <th style="width: 50px;">Tahun</th>
                                                    <th style="width: 100px;">Kode Satker</th>
                                                    <th style="width: 150px;">Dari</th>
                                                    <th style="width: 150px;">Kepada</th>
                                                    <th style="width: 50px;">Verifikasi Ke-</th>
                                                    <th style="width: 150px;">Status Ajuan</th>
                                                    <th style="width: 150px;">Status Verifikasi</th>
                                                    <th style="width: 100px;">Tanggal</th>
                                                    <th style="width: 50px;">Opsi</th>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in filteredKataData" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td>{{ (urutlist + 1) }}</td>
                                                        <td class="text-center">
                                                            <span v-if="datalist.jenis_pk == 1">PK Awal</span>
                                                            <span v-if="datalist.jenis_pk == 2">PK Revisi</span>
                                                            <span v-if="datalist.jenis_pk == 3">PK Akhir</span>
                                                        </td>
                                                        <td class="text-center">
                                                            {{ datalist.tahun }}
                                                        </td>
                                                        <td class="text-center">
                                                            {{ datalist.kode_pelaksana }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.pengirim }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.penerima }}
                                                        </td>
                                                        <td class="text-center">
                                                            {{ datalist.verifikasi_ke }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.status_ajuan }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.status_verifikasi }}
                                                        </td>
                                                        <td>
                                                            {{ G_formatDate(datalist.createddate) }}
                                                        </td>
                                                        <td class="text-center">
                                                            <input type="checkbox" :checked="datalist.deleted == 0"
                                                                :id="'aktif' + datalist.id" @click="hapus(datalist.id)">
                                                            &nbsp;Aktif
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                            <tbody v-if="(datapesan == 'data kosong')">
                                                <tr>
                                                    <td colspan="11">Data masih kosong</td>
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
            levpiusistem: JSON.parse(localStorage.getItem("levpiusistem")),
            levpiubalaisistem: JSON.parse(localStorage.getItem("levpiubalaisistem")),
            kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
            ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
            verifsistem: JSON.parse(localStorage.getItem("verifsistem")),
            verif2sistem: JSON.parse(localStorage.getItem("verifsistem2")),
            evaluasisistem: JSON.parse(localStorage.getItem("evaluasisistem")),
            jenis_piusistem: JSON.parse(localStorage.getItem("jenis_piusistem")),
            datapesan: '',
            datamaster: [],
            carikata: '',
            jumlahdata: 0,
            jumlahhalaman: 0,
            mulai: 0,
            halaman: 1,
            listtahun: [],
            datatahun: [],
            defaultSelectedtahun: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtahun: new Date().getFullYear(),
            tahun: new Date().getFullYear(),

            datajenispk: [],
            jenispk: [],
            defaultSelectedjenispk: {},
            selectedjenispk: '',

            kdunor: [],
            datakdunor: [],
            defaultSelectedkdunor: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkdunor: '',

            kategorisatker: [],
            datakategorisatker: [],
            defaultSelectedkategorisatker: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkategorisatker: '',
            satker: [],
            datasatker: [],
            defaultSelectedsatker: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            },
            selectedsatker: '',
            selectedlabelsatker: '',
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
        onkdunorChange(a) {
            try {
                this.selectedkdunor = this.kdunor[a].tag;
            }
            catch (err) {
                return;
            }

            this.defaultSelectedkategorisatker = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedkategorisatker = '';
            this.AmbilDatakategorisatker();
            this.defaultSelectedsatker = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            };
            this.selectedsatker = '';
            this.AmbilDatasatker();

        },
        onkategorisatkerChange(a) {
            try {
                this.selectedkategorisatker = this.kategorisatker[a].tag;
            }
            catch (err) {
                return;
            }
            this.defaultSelectedsatker = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            };
            this.selectedsatker = '';
            this.AmbilDatasatker();
        },
        onsatkerChange(a) {
            try {
                this.selectedsatker = this.satker[a].tag;
                this.selectedlabelsatker = this.satker[a].label;
                this.ambildata();
            }
            catch (err) {
                return;
            }
        },
        onjenispkChange(a) {
            try {
                this.selectedjenispk = this.jenispk[a].tag;
            }
            catch (err) {
                return;
            }
        },
        async AmbilDatakategorisatker() {
            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI2.get("parastapainnovationreff-GetKategoriSatker?random=" + random + "&kdunor=" + this.selectedkdunor).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakategorisatker = [];
                        this.kategorisatker = [];
                        this.datakategorisatker = Response.data.content.data;
                        this.datakategorisatker.forEach((item) => {
                            this.kategorisatker.push({
                                label: item.nama,
                                code: this.datakategorisatker.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.kategorisatker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        async AmbilDatasatker() {
            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI2.get("parastapainnovationsatker-GetAll?random=" + random + "&kdunor=" + this.selectedkdunor + "&kategorisatker=" + this.selectedkategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatker = [];
                        this.satker = [];
                        this.datasatker = Response.data.content.data;
                        this.datasatker.forEach((item) => {
                            this.satker.push({
                                label: '[' + item.kode_satker + '] ' + item.nama_satker,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.level_piu,
                            });
                        });
                        this.satker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.selectedlabelsatker = '';
                    this.ambildata();
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        async ambildata() {
            var tempkdsatker = this.selectedlabelsatker.split("]");
            var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
            //alert(tempkodesatker);
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPI.get("parastapainnovationreset-PK?random=" + random + "&jenis_pk=" + this.selectedjenispk + "&kode_pelaksana=" + tempkodesatker).then(
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
        async AmbilDataReff() {
            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationjenispk-JenisPK?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datajenispk = [];
                        this.jenispk = [];
                        this.datajenispk = Response.data.content.data;
                        this.datajenispk.forEach((item) => {
                            this.jenispk.push({
                                label: item.nama,
                                code: this.datajenispk.indexOf(item),
                                tag: item.id,
                            });
                            if (item.is_active == 1) {
                                this.selectedjenispk = item.id;
                                this.defaultSelectedjenispk = {
                                    code: this.datajenispk.indexOf(item),
                                    label: item.nama,
                                    tag: item.id,
                                };
                            }
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            });

            var pilihkategorisatker = '';
            var kodekategorisatker = '';
            pilihkategorisatker = this.selectedkategorisatker;

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetUnor?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datakdunor = [];
                        this.kdunor = [];
                        this.datakdunor = Response.data.content.data;
                        this.datakdunor.forEach((item) => {
                            this.kdunor.push({
                                label: item.nama,
                                code: this.datakdunor.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.kdunor.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            this.halamanloading = true;

            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetKategoriSatker?random=" + random + "&kdbalai=" + kodekategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakategorisatker = [];
                        this.kategorisatker = [];
                        this.datakategorisatker = Response.data.content.data;
                        this.datakategorisatker.forEach((item) => {
                            if (item.id == pilihkategorisatker) {
                                this.defaultSelectedkategorisatker = {
                                    code: this.datakategorisatker.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };
                            }
                            this.kategorisatker.push({
                                label: item.nama,
                                code: this.datakategorisatker.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.kategorisatker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
            //alert(this.jenis_piusistem);
            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationsatker-GetAll?random=" + random + "&kdunor=" + this.selectedkdunor + "&kategorisatker=" + this.selectedkategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatker = [];
                        this.satker = [];
                        this.datasatker = Response.data.content.data;
                        this.datasatker.forEach((item) => {
                            this.satker.push({
                                label: '[' + item.kode_satker + '] ' + item.nama_satker,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.level_piu,
                            });
                        });
                        this.satker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        hapus(kode) {
            var param = encodeURIComponent(CryptoJS.AES.encrypt(this.halaman.toString(), 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
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
                    mainAPI.post("parastapainnovationreset-Delete", data).then(
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
                                    title: 'Data telah dihapus',
                                });
                                return false;
                            }
                        }
                    ).catch(
                        error => {
                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                        }
                    )
                }
                else {
                    document.getElementById('aktif' + kode).checked = true;
                }
            });
            return false;
        },
    },
    mounted() {
        this.getOtentifikasi();
        this.AmbilDataReff();
    }
}
</script>
<style></style>