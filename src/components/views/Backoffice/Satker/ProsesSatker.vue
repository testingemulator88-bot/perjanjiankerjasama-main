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
                                <li class="breadcrumb-item"><a href="/Satker">Satker</a></li>
                                <li class="breadcrumb-item active">Pengaturan Satker</li>
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
                                    <h3 class="card-title">Form Input Satker</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>Unit Organisasi<small class="text-info"> (*wajib
                                                    dipilih)</small></label>
                                            <v-select :options="kdunor" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedkdunor" @update:modelValue="onkdunorChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Balai<small class="text-info"> (*wajib
                                                    dipilih)</small></label>
                                            <v-select :options="kategorisatker" :reduce="(label) => label.code"
                                                label="label" v-model="defaultSelectedkategorisatker"
                                                @update:modelValue="onkategorisatkerChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Kode Satker<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="kode_satker"
                                                    name="kode_satker" placeholder="Kode Satker" v-model="kode_satker">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Kode Satker Pendek<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="kode_satker_pendek" name="kode_satker_pendek"
                                                    placeholder="Kode Satker" v-model="kode_satker_pendek">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Kode Satker Lama<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="kode_satker_old" name="kode_satker_old"
                                                    placeholder="Kode Satker Lama" v-model="kode_satker_old">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Kode Satker Lama Pendek<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="kode_satker_old_pendek" name="kode_satker_old_pendek"
                                                    placeholder="Kode Satker Lama" v-model="kode_satker_old_pendek">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Nama <small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="nama_satker"
                                                    name="nama_satker" placeholder="Nama" v-model="nama_satker">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Status</label>
                                            <v-select :options="status_piu" :reduce="(label) => label.code"
                                                label="label" v-model="defaultSelectedstatus_piu"
                                                @update:modelValue="onstatus_piuChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Level</label>
                                            <v-select :options="level_piu" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedlevel_piu"
                                                @update:modelValue="onlevel_piuChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Status Aktif</label>
                                            <div class="input-group mb-3">
                                                <input type="checkbox" :checked="aktif == 0" id="aktif"> &nbsp;Satker
                                                Aktif
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
                                        @click="simpan()" v-if="(mode == 'Tambah')" data-toggle="tooltip"
                                        data-placement="left" title="Simpan data.."><i class="fas fa-plus-square"></i>
                                        Simpan</button>
                                    <button type="button" class="btn btn-sm btn-success3 float-left text-white lebar2"
                                        v-if="(mode != 'Tambah')" @click="update()" data-toggle="tooltip"
                                        data-placement="left" title="Update data.."><i class="fa fa-check-circle"></i>
                                        Update</button>
                                    <button type="button" class="btn btn-sm btn-danger3 float-left text-white lebar2"
                                        @click="batalproses()" data-toggle="tooltip" data-placement="left"
                                        title="Batalkan proses.."><i class="fas fa-window-close"></i> Batal</button>
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
import Footer from "../../componen/Footer.vue";
import NavBar from "../../componen/NavBar.vue";
import Menu from "../../componen/Menu.vue";

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
            kode_satker: '',
            kode_satker_pendek: '',
            kode_satker_old: '',
            kode_satker_old_pendek: '',
            nama_satker: '',
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
            status_piu: [],
            datastatus_piu: [],
            defaultSelectedstatus_piu: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedstatus_piu: '',
            level_piu: [],
            datalevel_piu: [],
            defaultSelectedlevel_piu: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedlevel_piu: '',
            mode: '',
            aktif: '0',
            validasi: false,
            tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
        }
    },
    methods: {
        onlyNumberKey(evt) {
            // Only ASCII character in that range allowed
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            } return;
        },
        cekkekuatan() {
            //alert(this.passworddata);
            this.strengthdata = 0;
            var lowerCase = this.passworddata.match(/[a-z]/);
            var upperCase = this.passworddata.match(/[A-Z]/);
            var numbers = this.passworddata.match(/[0-9]/);
            var width = this.passworddata.length;
            var specialCharacters = this.passworddata.match(/[\!\~\@\&\#\$\%\^\&\*\(\)\{\}\?\-\_\+\=]/);
            if (width > 8) {
                this.strengthdata = this.strengthdata + 20;
            }
            if (lowerCase) {
                this.strengthdata = this.strengthdata + 20;
            }
            if (upperCase) {
                this.strengthdata = this.strengthdata + 20;
            }
            if (numbers) {
                this.strengthdata = this.strengthdata + 20;
            }
            if (specialCharacters) {
                this.strengthdata = this.strengthdata + 20;
            }
            document.getElementById('persennyapassworddata').style.width = this.strengthdata + "%";
            document.getElementById('tulisanpersennyapassworddata').innerHTML = this.strengthdata + "%";
        },
        getOtentifikasi() {
            var time = Date.parse(localStorage.getItem("tsistem"));
            var timeakhir = time + (3 * 60 * 60 * 1000);
            var timesekarang = Date.parse(new Date());
            if (timesekarang > timeakhir) {
                this.ClearlocalStorage();
            }
            this.halamanloading = false;
        },
        onkdunorChange(a) {
            try {
                this.selectedkdunor = this.kdunor[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onkategorisatkerChange(a) {
            try {
                this.selectedkategorisatker = this.kategorisatker[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onstatus_piuChange(a) {
            try {
                this.selectedstatus_piu = this.status_piu[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onlevel_piuChange(a) {
            try {
                this.selectedlevel_piu = this.level_piu[a].tag;
            }
            catch (err) {
                return;
            }
        },
        batalproses() {
            var param = this.secretencData.split('|');
            window.location.replace("/Satker/" + encodeURIComponent(CryptoJS.AES.encrypt(param[1], 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()));
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
            await mainAPIData.get("parastapainnovationreff-GetUnor?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
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
            await mainAPIData.get("parastapainnovationreff-GetKategoriSatker?random=" + random).then(
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

            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetStatusPIU?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datastatus_piu = [];
                        this.status_piu = [];
                        this.datastatus_piu = Response.data.content.data;
                        this.datastatus_piu.forEach((item) => {
                            this.status_piu.push({
                                label: item.nama,
                                code: this.datastatus_piu.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.status_piu.unshift({
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

            await mainAPIData.get("parastapainnovationreff-GetLevelPIU?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datalevel_piu = [];
                        this.level_piu = [];
                        this.datalevel_piu = Response.data.content.data;
                        this.datalevel_piu.forEach((item) => {
                            this.level_piu.push({
                                label: item.nama,
                                code: this.datalevel_piu.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.level_piu.unshift({
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
        async AmbilDataSingel() {
            this.halamanloading = true;
            var mainAPIDataSingel = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            var param = this.secretencData.split('|');
            await mainAPIDataSingel.get("parastapainnovationsatker-GetByID?id=" + param[0] + "&random=" + random).then(
                Response => {
                    this.selectedkdunor = Response.data.content.data[0].idunor;
                    this.kode_satker = Response.data.content.data[0].kode_satker;
                    this.kode_satker_pendek = Response.data.content.data[0].kode_satker_pendek;
                    this.kode_satker_old = Response.data.content.data[0].kode_satker_old;
                    this.kode_satker_old_pendek = Response.data.content.data[0].kode_satker_old_pendek;
                    this.nama_satker = Response.data.content.data[0].nama_satker;
                    this.selectedkategorisatker = Response.data.content.data[0].idbalai;
                    this.selectedstatus_piu = Response.data.content.data[0].status_piu;
                    this.selectedlevel_piu = Response.data.content.data[0].level_piu;
                    this.aktif = Response.data.content.data[0].aktif;
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIDataSingel.get("parastapainnovationreff-GetUnor?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakdunor = [];
                        this.kdunor = [];
                        this.datakdunor = Response.data.content.data;
                        this.datakdunor.forEach((item) => {
                            if (item.id == this.selectedkdunor) {
                                this.defaultSelectedkdunor = {
                                    code: this.datakdunor.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };

                            }
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
            await mainAPIDataSingel.get("parastapainnovationreff-GetKategoriSatker?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakategorisatker = [];
                        this.kategorisatker = [];
                        this.datakategorisatker = Response.data.content.data;
                        this.datakategorisatker.forEach((item) => {
                            if (item.id == this.selectedkategorisatker) {
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

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIDataSingel.get("parastapainnovationreff-GetStatusPIU?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datastatus_piu = [];
                        this.status_piu = [];
                        this.datastatus_piu = Response.data.content.data;
                        this.datastatus_piu.forEach((item) => {
                            if (item.id == this.selectedstatus_piu) {
                                this.defaultSelectedstatus_piu = {
                                    code: this.datastatus_piu.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };

                            }
                            this.status_piu.push({
                                label: item.nama,
                                code: this.datastatus_piu.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.status_piu.unshift({
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

            await mainAPIDataSingel.get("parastapainnovationreff-GetLevelPIU?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datalevel_piu = [];
                        this.level_piu = [];
                        this.datalevel_piu = Response.data.content.data;
                        this.datalevel_piu.forEach((item) => {
                            if (item.id == this.selectedlevel_piu) {
                                this.defaultSelectedlevel_piu = {
                                    code: this.datalevel_piu.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };

                            }
                            this.level_piu.push({
                                label: item.nama,
                                code: this.datalevel_piu.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.level_piu.unshift({
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
        validasidata() {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if ((this.selectedkdunor == '') || (this.selectedkdunor == null) || (this.selectedkdunor == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Unit Organisasi',
                });
                return false;
            }
            if ((this.selectedkategorisatker == '') || (this.selectedkategorisatker == null) || (this.selectedkategorisatker == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Kategori Satker',
                });
                return false;
            }
            if (document.getElementById('kode_satker').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Kode',
                });
                document.getElementById('kode_satker').focus();
                return false;
            }
            if (document.getElementById('nama_satker').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Nama',
                });
                document.getElementById('nama_satker').focus();
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

            var aktif = '0';
            if (document.getElementById('aktif').checked == false) {
                aktif = '1';
            }

            var param = this.secretencData.split('|');
            var fd = new FormData();
            fd.append("kdunor", this.selectedkdunor);
            fd.append("kode_satker", this.kode_satker);
            fd.append("kode_satker_pendek", this.kode_satker_pendek);
            fd.append("kode_satker_old", this.kode_satker_old);
            fd.append("kode_satker_old_pendek", this.kode_satker_old_pendek);
            fd.append("kdbalai", this.selectedkategorisatker);
            fd.append("status_piu", this.selectedstatus_piu);
            fd.append("level_piu", this.selectedlevel_piu);
            fd.append("nama_satker", this.nama_satker);
            fd.append("aktif", aktif);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationsatker-Add", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                            window.location.replace("/Satker/" + encodeURIComponent(CryptoJS.AES.encrypt(param[1], 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()));
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
            var aktif = '0';
            if (document.getElementById('aktif').checked == false) {
                aktif = '1';
            }

            var param = this.secretencData.split('|');
            var fd = new FormData();
            fd.append("kdunor", this.selectedkdunor);
            fd.append("kode_satker", this.kode_satker);
            fd.append("kode_satker_pendek", this.kode_satker_pendek);
            fd.append("kode_satker_old", this.kode_satker_old);
            fd.append("kode_satker_old_pendek", this.kode_satker_old_pendek);
            fd.append("kdbalai", this.selectedkategorisatker);
            fd.append("status_piu", this.selectedstatus_piu);
            fd.append("level_piu", this.selectedlevel_piu);
            fd.append("nama_satker", this.nama_satker);
            fd.append("aktif", aktif);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", param[0]);
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationsatker-Update", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah terupdate..', 'success').then(function () {
                            window.location.replace("/Satker/" + encodeURIComponent(CryptoJS.AES.encrypt(param[1], 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()));
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
        this.AmbilDataReff();
        var param = this.secretencData.split('|');
        this.mode = param[0];
        if (param[0] != 'Tambah') {
            this.AmbilDataSingel();
        }
    }
}
</script>
<style></style>