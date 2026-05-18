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
                                <li class="breadcrumb-item"><a href="/SubKomponen">Komponen</a></li>
                                <li class="breadcrumb-item active">Form Input Sub Komponen</li>
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
                                    <h3 class="card-title">Form Input Sub Komponen</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>Komponen
                                                <small class="text-info"> (*wajib dipilih)</small>
                                            </label>
                                            <v-select :options="komponen" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedkomponen" @update:modelValue="onkomponenChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;">
                                            </v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Kode Sub Komponen
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="kode_subkomponen" name="kode_subkomponen"
                                                    placeholder="Kode Sub Komponen" v-model="kode_subkomponen">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Nama Sub Komponen
                                                <small class="text-info"> (*wajib diisi)</small>
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="nama_subkomponen" name="nama_subkomponen"
                                                    placeholder="Nama Sub Komponen" v-model="nama_subkomponen">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Bobot Sub Komponen
                                                <small class="text-info"> (*wajib diisi)</small>
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="number" class="form-control form-control-sm"
                                                    id="bobot_subkomponen" name="bobot_subkomponen" placeholder="Bobot"
                                                    v-model="bobot_subkomponen">
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
            kode_subkomponen: '',
            nama_subkomponen: '',
            bobot_subkomponen: '',
            komponen: [],
            datakomponen: [],
            defaultSelectedkomponen: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkomponen: '',

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
        getOtentifikasi() {
            var time = Date.parse(localStorage.getItem("tsistem"));
            var timeakhir = time + (3 * 60 * 60 * 1000);
            var timesekarang = Date.parse(new Date());
            if (timesekarang > timeakhir) {
                this.ClearlocalStorage();
            }
            this.halamanloading = false;
        },
        onkomponenChange(a) {
            try {
                this.selectedkomponen = this.komponen[a].tag;
            }
            catch (err) {
                return;
            }
        },
        batalproses() {
            window.location.replace("/SubKomponen");
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
            await mainAPIData.get("masterlke-ReffKomponen?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakomponen = [];
                        this.komponen = [];
                        this.datakomponen = Response.data.content.data;
                        this.datakomponen.forEach((item) => {
                            this.komponen.push({
                                label: item.nama,
                                code: this.datakomponen.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.komponen.unshift({
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

            await mainAPIDataSingel.get("masterlke-EditSubKomponen?id=" + this.secretencData + "&random=" + random).then(
                Response => {
                    this.kode_subkomponen = Response.data.content.data[0].kode_subkomponen;
                    this.nama_subkomponen = Response.data.content.data[0].nama_subkomponen;
                    this.bobot_subkomponen = Response.data.content.data[0].bobot_subkomponen;
                    this.selectedkomponen = Response.data.content.data[0].id_komponen;

                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIDataSingel.get("masterlke-ReffKomponen?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakomponen = [];
                        this.komponen = [];
                        this.datakomponen = Response.data.content.data;

                        this.datakomponen.forEach((item) => {
                            if (item.id == this.selectedkomponen) {
                                this.defaultSelectedkomponen = {
                                    code: this.datakomponen.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };

                            }
                            this.komponen.push({
                                label: item.nama,
                                code: this.datakomponen.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.komponen.unshift({
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
            if ((this.selectedkomponen == '') || (this.selectedkomponen == null) || (this.selectedkomponen == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Komponen',
                });
                return false;
            }
            if (document.getElementById('kode_subkomponen').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('kode_subkomponen').focus();
                return false;
            }
            if (document.getElementById('nama_subkomponen').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('nama_subkomponen').focus();
                return false;
            }
            if (document.getElementById('bobot_subkomponen').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('bobot_subkomponen').focus();
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

            fd.append("id_komponen", this.selectedkomponen);
            fd.append("kode_subkomponen", this.kode_subkomponen);
            fd.append("nama_subkomponen", this.nama_subkomponen);
            fd.append("bobot_subkomponen", this.bobot_subkomponen);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("masterlke-AddSubKomponen", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                            window.location.replace("/SubKomponen");
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
            fd.append("id_komponen", this.selectedkomponen);
            fd.append("kode_subkomponen", this.kode_subkomponen);
            fd.append("nama_subkomponen", this.nama_subkomponen);
            fd.append("bobot_subkomponen", this.bobot_subkomponen);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", this.secretencData);

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("masterlke-UpdateSubKomponen", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah terupdate..', 'success').then(function () {
                            window.location.replace("/SubKomponen");
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
        if (this.secretencData != 'Tambah') {
            this.AmbilDataSingel();
        }
    }
}
</script>
<style></style>