<template>
    <div class="wrapper">
        <NavBar />
        <Menu />
        <!-- Spinner Start -->
        <div id="spinner" v-if="halamanloading"
            class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            style="opacity: 0.5;z-index: 999;">
            <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;z-index: 999;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->
        <div class="modal fade" id="costumModalopsi" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Database emon</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <div id="spinner" v-if="halamandata"
                            class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
                            style="opacity: 0.5;z-index: 999;">
                            <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;z-index: 999;"
                                role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <span class="text-danger" id="labeltabel"> {{ tabel }}</span>
                        </div>
                        <p>
                        <div class="row px-3">
                            <div class="col-sm-12 px-3">
                                <div class="table-responsive table-wrapper" style="font-size: smaller !important;">
                                    <table class="table m-0" id="tabeldata">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">No</th>
                                                <th style="width: 10px;">
                                                    Opsi<br>Pilih semua
                                                    <br><input type="checkbox" id="customallSwitchAuth"
                                                        @click="pilihsemua()">
                                                </th>
                                                <th style="width: 150px;">Tabel</th>
                                                <th style="width: 50px;">Jumlah Data Di Emon</th>
                                                <th style="width: 50px;">Status Tabel</th>
                                                <th style="width: 150px;">Tanggal Data</th>
                                                <th style="width: 150px;">Jumlah Data Di Database</th>
                                                <th style="width: 50px;">Status Backup</th>
                                                <th style="width: 150px;">Opsi</th>
                                            </tr>
                                        </thead>
                                        <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian">
                                            <tbody class="mailbox-messages">
                                                <tr>
                                                    <td class="text-center">
                                                        {{ urutisian + 1 }}
                                                    </td>
                                                    <td class="text-center">
                                                        <input type="checkbox"
                                                            :id="'customSwitchAuth' + '_' + dataisian.tabels_name">
                                                    </td>
                                                    <td>
                                                        {{ dataisian.tabels_name }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ G_numFormat(dataisian.jumlah_data) }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ dataisian.eksisttabel }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ G_formatDate(dataisian.tanggaldata) }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ G_numFormat(dataisian.jumlahdidb) }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ dataisian.backuptabel }}
                                                    </td>
                                                    <td class="text-center">
                                                        <button type="button"
                                                            v-if="dataisian.eksisttabel == 'belum ada'"
                                                            class="btn btn-primary btn-sm lebar2 text-white"
                                                            @click="buattabelemon(dataisian.tabels_name, dataisian.columns, dataisian.columnstype)"
                                                            data-toggle="tooltip" data-placement="left"
                                                            title="Buat tabel db emon..">
                                                            <i class="far fa-calendar-plus"></i>
                                                            Buat Tabel
                                                        </button><br v-if="dataisian.eksisttabel == 'belum ada'">
                                                        <button type="button"
                                                            v-if="dataisian.eksisttabel == 'sudah ada'"
                                                            class="btn btn-success btn-sm lebar2 text-white"
                                                            @click="importsingletabelemon(dataisian.tabels_name)"
                                                            data-toggle="tooltip" data-placement="left"
                                                            title="Import tabel db emon..">
                                                            <i class="fas fa-cloud-download-alt"></i>
                                                            Import Data Tabel
                                                        </button>
                                                        <button type="button"
                                                            v-if="dataisian.backuptabel == 'belum backup' && dataisian.eksisttabel == 'sudah ada'"
                                                            class="btn btn-primary btn-sm lebar2 text-white"
                                                            @click="backupsingletabelemon(dataisian.tabels_name)"
                                                            data-toggle="tooltip" data-placement="left"
                                                            title="Backup tabel db emon..">
                                                            <i class="fas fa-box-open"></i>
                                                            Backup Data Tabel
                                                        </button>
                                                        <button type="button"
                                                            v-if="dataisian.eksisttabel == 'sudah ada'"
                                                            class="btn btn-danger btn-sm lebar2 text-white"
                                                            @click="hapustabelemon(dataisian.tabels_name)"
                                                            data-toggle="tooltip" data-placement="left"
                                                            title="Delete Tabel..">
                                                            <i class="fas fa-trash-alt"></i>
                                                            Delete Tabel
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </table>
                                </div>
                            </div>
                        </div>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                @click="importdataemon()">
                                <i class="fas fa-cloud-download-alt"></i>
                                Import Data Emon
                            </button>
                            <button type="button" class="btn btn-primary btn-sm lebar2 text-white"
                                @click="backupdataemon()">
                                <i class="fas fa-box-open"></i>
                                Backup Data Emon
                            </button>
                            <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-wrapper py-3">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6 wow fadeInDown">
                            <h5>Data Emon</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Data Emon</li>
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
                                    <div class="col-sm-12 text-center p-2">
                                        <button type="button" class="btn btn-danger3 btn-sm text-white lebar2"
                                            @click="prosesdata('Tambah')" data-toggle="tooltip" data-placement="left"
                                            title="Tambah data..">
                                            <i class="fas fa-plus"></i> Tambah
                                        </button>
                                    </div>
                                    <div class="col-sm-12 float-left pb-2 px-3">
                                        Jumlah Data: {{ G_numFormat(jumlahdata) }}
                                        <span style="float: right;">
                                            Halaman ke: <select v-model="halaman" @change="onChangeHalaman($event)">
                                                <option v-for="index in jumlahhalaman" :key="index">
                                                    {{ index }}</option>
                                            </select> dari {{ jumlahhalaman }}
                                        </span>
                                    </div>
                                    <div class="col-sm-12 float-left pb-2 px-3">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-biru"><i
                                                        class="fas fa-search"></i></span>
                                            </div>
                                            <input type="text" v-model="carikata" class="form-control form-control-sm"
                                                placeholder="Masukkan Kata Kunci Pencarian Tanggal Data Emon"
                                                @keyup="ambildata()">
                                        </div>
                                    </div>
                                    <div class="table-responsive table-wrapper">
                                        <table class="table m-0" id="tabeldata">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">No</th>
                                                    <th style="width: 150px;">Tanggal Data Emon</th>
                                                    <th style="width: 150px;">Tanggal Upload</th>
                                                    <th style="width: 150px;">Status Data Emon</th>
                                                    <th style="width: 150px;">Tanggal Import ke Database</th>
                                                    <th style="width: 150px;">Status Backup Data Emon</th>
                                                    <th style="width: 150px;">Tanggal Backup ke Database</th>
                                                    <th style="width: 150px;">Opsi</th>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td>{{ (urutlist + 1) + ((halaman - 1) * 20) }}</td>
                                                        <td>
                                                            {{ G_formatDate(datalist.nama) }}
                                                        </td>
                                                        <td>
                                                            {{ G_formatDate(datalist.tanggal) }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.statusdb }}
                                                        </td>
                                                        <td>
                                                            {{ G_formatDate(datalist.tanggal_import) }}
                                                        </td>
                                                        <td>
                                                            {{ datalist.status_backup }}
                                                        </td>
                                                        <td>
                                                            {{ G_formatDate(datalist.tanggal_backup) }}
                                                        </td>
                                                        <td class="text-center">
                                                            <button type="button"
                                                                class="btn btn-info3 btn-sm lebar2 text-white"
                                                                @click="lihatddemon(datalist.filenya_emon)"
                                                                data-toggle="tooltip" data-placement="left"
                                                                title="Proses db emon..">
                                                                <i class="fas fa-cogs"></i>
                                                                Proses Data Emon
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                            <tbody v-if="(datapesan == 'data kosong')">
                                                <tr>
                                                    <td colspan="8">Data masih kosong</td>
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
            halamandata: false,
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
            filenya_emon: '',
            keterangansukses: '',
            tabel: '',
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
        pilihsemua() {
            if (document.getElementById('customallSwitchAuth').checked == true) {
                $('.mailbox-messages input[type=\'checkbox\']').prop('checked', true);
            }
            else {
                $('.mailbox-messages input[type=\'checkbox\']').prop('checked', false);
            }
        },
        hapustabelemon(namatabel) {
            swal.fire({
                title: "Konfirmasi",
                text: "Yakin Hendak Hapus Data " + namatabel + "?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Hapus"
            }).then((result) => {
                if (result.isConfirmed) {
                    var fd = new FormData();
                    fd.append("namatabel", namatabel);
                    fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            "Content-Type": "form-data",
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                        },
                    });
                    mainAPI.post("emon-DeleteTable", fd).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire('Informasi', 'Tabel telah dihapus..', 'success').then(function () {
                                    window.location.replace("/DataEmon");
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
                }
            });
            return false;
        },
        buattabelemon(namatabel, kolomtabel, typekolom) {
            var fd = new FormData();
            fd.append("namatabel", namatabel);
            fd.append("kolomtabel", kolomtabel);
            fd.append("typekolom", typekolom);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("emon-CreateTable", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Tabel telah dibuat..', 'success').then(function () {
                            window.location.replace("/DataEmon");
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
        async importdataemon() {
            swal.fire({
                title: "Konfirmasi",
                text: "Yakin Hendak Import Data Emon?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Import"
            }).then((result) => {
                if (result.isConfirmed) {
                    var checkedCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="customSwitchAuth_"]:checked');
                    var count = 0;
                    var tabelgabung = "";
                    checkedCheckboxes.forEach(checkbox => {
                        this.halamanloading = true;
                        if (count == 0) {
                            tabelgabung = tabelgabung + checkbox.id.replace("customSwitchAuth_", "");
                        }
                        else {
                            tabelgabung = tabelgabung + "," + checkbox.id.replace("customSwitchAuth_", "");
                        }
                        count++;
                    });
                    // The 'length' property of the NodeList will give you the count
                    if (count <= 0) {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: 'Mohon Pilih Checkbox Tabel Yang Akan Diimport',
                        });
                        return false;
                    }
                    this.halamanloading = false;
                    this.importalltabelemon(tabelgabung);
                }
            });
            return false;
        },
        async backupdataemon() {
            var checkedCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="customSwitchAuth_"]:checked');
            var count = 0;
            var tabelgabung = "";
            checkedCheckboxes.forEach(checkbox => {
                this.halamanloading = true;
                if (count == 0) {
                    tabelgabung = tabelgabung + checkbox.id.replace("customSwitchAuth_", "");
                }
                else {
                    tabelgabung = tabelgabung + "," + checkbox.id.replace("customSwitchAuth_", "");
                }
                count++;
            });
            // The 'length' property of the NodeList will give you the count
            if (count <= 0) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Checkbox Tabel Yang Akan Diimport',
                });
                return false;
            }
            this.halamanloading = false;
            await this.backupalltabelemon(tabelgabung);
        },
        async backupalltabelemon(tabel) {
            this.tabel = 'Loading';
            this.halamandata = true;
            this.tabel = 'Proses import data emon harap tunggu..';

            var fd = new FormData();
            fd.append("filenya_emon", this.filenya_emon);
            fd.append("tabel", tabel);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("emon-Backup", fd).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.keterangansukses = '';
                        this.keterangansukses = Response.data.content.data;
                        swal.fire('Informasi', 'data emon berhasil dibackup..', 'success').then(function () {
                            window.location.replace("/DataEmon");
                        });
                    }
                    else {
                        this.keterangansukses = '';
                    }
                    this.halamandata = false;
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
        async importalltabelemon(tabel) {
            this.tabel = 'Loading';
            this.halamandata = true;
            this.tabel = 'Proses import data emon harap tunggu..';

            var fd = new FormData();
            fd.append("db", this.filenya_emon);
            fd.append("tabel", tabel);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("emon-GetTable", fd).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.keterangansukses = '';
                        this.keterangansukses = Response.data.content.data;
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'success',
                            title: 'data emon berhasil diimport',
                        });

                        setTimeout(function () {
                            $('#costumModalopsi').modal('hide');
                        }, 1000);
                    }
                    else {
                        this.keterangansukses = '';
                    }
                    this.halamandata = false;
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
        async backupsingletabelemon(tabel) {
            if (document.getElementById('customSwitchAuth_' + tabel).checked == false) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Checkbox Tabel Terkait',
                });
                return false;
            }
            this.tabel = 'Loading';
            this.halamandata = true;
            this.tabel = 'Proses import data ' + tabel + ' harap tunggu..';

            var fd = new FormData();
            fd.append("filenya_emon", this.filenya_emon);
            fd.append("tabel", tabel);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("emon-Backup", fd).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.keterangansukses = '';
                        this.keterangansukses = Response.data.content.data;
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'success',
                            title: this.keterangansukses,
                        });

                        setTimeout(function () {
                            $('#costumModalopsi').modal('hide');
                        }, 1000);
                    }
                    else {
                        this.keterangansukses = '';
                    }
                    this.halamandata = false;
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
        async importsingletabelemon(tabel) {
            if (document.getElementById('customSwitchAuth_' + tabel).checked == false) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Checkbox Tabel Terkait',
                });
                return false;
            }
            this.tabel = 'Loading';
            this.halamandata = true;
            this.tabel = 'Proses import data ' + tabel + ' harap tunggu..';

            var fd = new FormData();
            fd.append("db", this.filenya_emon);
            fd.append("tabel", tabel);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("emon-GetTable", fd).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.keterangansukses = '';
                        this.keterangansukses = Response.data.content.data;
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'success',
                            title: this.keterangansukses,
                        });

                        setTimeout(function () {
                            $('#costumModalopsi').modal('hide');
                        }, 1000);
                    }
                    else {
                        this.keterangansukses = '';
                    }
                    this.halamandata = false;
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
            await mainAPI.get("parastapainnovationunor-GetData?random=" + random + "&halaman=" + halamannya + "&cari=" + this.carikata).then(
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
            await mainAPI.get("emon-GetData?random=" + random + "&halaman=" + this.halaman + "&cari=" + this.carikata).then(
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
            window.location.replace("/ProsesDataEmon/" + bytes);
        },
        lihatddemon(filenya) {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            mainAPI.get("emon-ShowTabel?random=" + random + "&db=" + filenya).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.filenya_emon = '';
                        this.filenya_emon = filenya;
                        this.isiandata = [];
                        this.isiandata = Response.data.content.data;
                    }
                    else {
                        this.isiandata = [];
                        this.filenya_emon = '';
                    }
                    $('#costumModalopsi').modal('show');
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                this.ClearlocalStorage();
                this.halamanloading = false;
            });
        },
    },
    mounted() {
        this.getOtentifikasi();
        this.ambildata();
    }
}
</script>
<style></style>