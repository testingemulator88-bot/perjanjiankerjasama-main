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
                                <li class="breadcrumb-item"><a href="/KrineriaPenilaian">Kriteria</a></li>
                                <li class="breadcrumb-item active">Form Input Kriteria</li>
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
                                    <h3 class="card-title">Form Input Kriteria</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>Sub Komponen
                                                <small class="text-info"> (*wajib dipilih)</small>
                                            </label>
                                            <v-select :options="subkomponen" :reduce="(label) => label.code"
                                                label="label" v-model="defaultSelectedsubkomponen"
                                                @update:modelValue="onsubkomponenChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;">
                                            </v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Kode Kriteria
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="kode_kriteria" name="kode_kriteria" placeholder="Kode Kriteria"
                                                    v-model="kode_kriteria">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Nama Kriteria
                                                <small class="text-info"> (*wajib diisi)</small>
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="nama_kriteria" name="nama_kriteria" placeholder="Nama Kriteria"
                                                    v-model="nama_kriteria">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Langkah Kerja
                                                <small class="text-info"> (*wajib diisi)</small>
                                            </label>
                                            <quill-editor v-model:value="langkah_kerja" id="langkah_kerja"
                                                style="height: 25vh;"></quill-editor>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Daftar Evidence
                                            </label>
                                            <quill-editor v-model:value="daftar_evidence" id="daftar_evidence"
                                                style="height: 25vh;"></quill-editor>
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
import { quillEditor } from 'vue3-quill';
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
        Footer, NavBar, Menu, vSelect, swal, quillEditor
    },
    data() {
        return {
            halamanloading: true,
            iduser: JSON.parse(localStorage.getItem("usistem")),
            dleveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            secretencData: decodeURIComponent(CryptoJS.AES.decrypt(this.route.params.id, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString(CryptoJS.enc.Utf8)),
            kode_kriteria: '',
            nama_kriteria: '',
            langkah_kerja: '',
            daftar_evidence: '',
            subkomponen: [],
            datasubkomponen: [],
            defaultSelectedsubkomponen: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedsubkomponen: '',

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
        onsubkomponenChange(a) {
            try {
                this.selectedsubkomponen = this.subkomponen[a].tag;
            }
            catch (err) {
                return;
            }
        },
        batalproses() {
            window.location.replace("/KriteriaPenilaian");
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
            await mainAPIData.get("masterlke-ReffSubKomponen?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasubkomponen = [];
                        this.subkomponen = [];
                        this.datasubkomponen = Response.data.content.data;

                        this.datasubkomponen.forEach((item) => {
                            this.subkomponen.push({
                                label: item.nama,
                                code: this.datasubkomponen.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.subkomponen.unshift({
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

            await mainAPIDataSingel.get("masterlke-EditKriteria?id=" + this.secretencData + "&random=" + random).then(
                Response => {
                    this.kode_kriteria = Response.data.content.data[0].kode_kriteria;
                    this.nama_kriteria = Response.data.content.data[0].nama_kriteria;
                    this.langkah_kerja = Response.data.content.data[0].langkah_kerja;
                    this.daftar_evidence = Response.data.content.data[0].daftar_evidence;
                    this.selectedsubkomponen = Response.data.content.data[0].id_subkomponen;

                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIDataSingel.get("masterlke-ReffSubKomponen?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasubkomponen = [];
                        this.subkomponen = [];
                        this.datasubkomponen = Response.data.content.data;

                        this.datasubkomponen.forEach((item) => {
                            if (item.id == this.selectedsubkomponen) {
                                this.defaultSelectedsubkomponen = {
                                    code: this.datasubkomponen.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };

                            }
                            this.subkomponen.push({
                                label: item.nama,
                                code: this.datasubkomponen.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.subkomponen.unshift({
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
            if ((this.selectedsubkomponen == '') || (this.selectedsubkomponen == null) || (this.selectedsubkomponen == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Sub Komponen',
                });
                return false;
            }
            if (document.getElementById('kode_kriteria').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('kode_kriteria').focus();
                return false;
            }
            if (document.getElementById('nama_kriteria').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('nama_kriteria').focus();
                return false;
            }
            if (document.getElementById('langkah_kerja').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('langkah_kerja').focus();
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

            fd.append("id_subkomponen", this.selectedsubkomponen);
            fd.append("kode_kriteria", this.kode_kriteria);
            fd.append("nama_kriteria", this.nama_kriteria);
            fd.append("langkah_kerja", this.langkah_kerja);
            fd.append("daftar_evidence", this.daftar_evidence);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("masterlke-AddKriteria", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                            window.location.replace("/KriteriaPenilaian");
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
            fd.append("id_subkomponen", this.selectedsubkomponen);
            fd.append("kode_kriteria", this.kode_kriteria);
            fd.append("nama_kriteria", this.nama_kriteria);
            fd.append("langkah_kerja", this.langkah_kerja);
            fd.append("daftar_evidence", this.daftar_evidence);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", this.secretencData);

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("masterlke-UpdateKriteria", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah terupdate..', 'success').then(function () {
                            window.location.replace("/KriteriaPenilaian");
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