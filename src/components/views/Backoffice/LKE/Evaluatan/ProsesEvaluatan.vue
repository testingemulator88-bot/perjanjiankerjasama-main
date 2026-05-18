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
                                <li class="breadcrumb-item"><a href="/Evaluatan">Evaluatan</a></li>
                                <li class="breadcrumb-item active">Form Input Evaluatan</li>
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
                                    <h3 class="card-title">Form Input Evaluatan</h3>
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
                                                NIP
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="nip"
                                                    name="nip" placeholder="NIP" v-model="nip">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Nama Tim Evaluatan
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="tim"
                                                    name="tim" placeholder="Nama Tim Evaluatan" v-model="tim">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>
                                                Jabatan
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="fab fa-creative-commons-share"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="jabatan"
                                                    name="jabatan" placeholder="Jabatan" v-model="jabatan">
                                            </div>
                                        </div>

                                        <div class="col-sm-12">
                                            <label>
                                                Pilih Data Tahun
                                                <small class="text-info"> (*wajib diisi)</small>
                                            </label>
                                            <v-select :options="listtahun" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedtahun" @update:modelValue="ontahunChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;">
                                            </v-select>
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
            iduser: JSON.parse(localStorage.getItem("iduser")),
            dleveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            kode_satker: JSON.parse(localStorage.getItem("kdsatkersistem")),
            secretencData: decodeURIComponent(CryptoJS.AES.decrypt(this.route.params.id, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString(CryptoJS.enc.Utf8)),
            listtahun: [],
            datatahun: [],
            defaultSelectedtahun: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            tahun: new Date().getFullYear(),
            selectedtahun: new Date().getFullYear(),
            tim: '',
            wilayah: '',
            nip: '',
            jabatan: '',
            user: [],
            datauser: [],
            defaultSelecteduser: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selecteduser: '',

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
            window.location.replace("/Evaluatan");
        },
        ontahunChange(a) {
            try {
                this.selectedtahun = this.listtahun[a].tag;
            }
            catch (err) {
                return;
            }
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
            await mainAPIData.get("reff/000_defaulttahun.php?random=" + random + "&table=hasil_lke").then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datatahun = [];
                        this.listtahun = [];
                        this.datatahun = Response.data.content.data;
                        this.datatahun.forEach((item) => {
                            this.listtahun.push({
                                label: item.tahun,
                                code: this.datatahun.indexOf(item),
                                tag: item.tahun,
                            });
                            if (item.tahun == this.selectedtahun) {
                                this.defaultSelectedtahun = {
                                    code: this.datatahun.indexOf(item),
                                    label: item.tahun,
                                    tag: item.tahun,
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

            await mainAPIDataSingel.get("masterlke-EditEvaluatan?id=" + this.secretencData + "&random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.tim = Response.data.content.data[0].tim;
                        this.wilayah = Response.data.content.data[0].wilayah;
                        this.selectedtahun = Response.data.content.data[0].tahun;
                        this.nip = Response.data.content.data[0].nip;
                        this.jabatan = Response.data.content.data[0].jabatan;

                        // Update defaultSelectedtahun berdasarkan selectedtahun baru
                        this.datatahun.forEach((item) => {
                            if (item.tahun == this.selectedtahun) {
                                this.defaultSelectedtahun = {
                                    code: this.datatahun.indexOf(item),
                                    label: item.tahun,
                                    tag: item.tahun,
                                };
                            }
                        });
                    }
                    else {
                        this.tim = '';
                        this.wilayah = '';
                        this.selectedtahun = new Date().getFullYear();
                        this.nip = '';
                        this.jabatan = '';
                    }

                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.ClearlocalStorage();
                this.halamanloading = false;
                return false;
            })
        },
        validasidata() {
            if ((this.selectedtahun == '') || (this.selectedtahun == null) || (this.selectedtahun == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data Tahun',
                });

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

            fd.append("nip", this.nip);
            fd.append("jabatan", this.jabatan);
            fd.append("id_user", this.kode_satker);
            fd.append("tim", this.tim);
            fd.append("tahun", this.selectedtahun);
            fd.append("level", this.dleveluser);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("masterlke-AddEvaluatan", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                            window.location.replace("/Evaluatan");
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

            var fd = new FormData();
            fd.append("id_user", this.kode_satker);
            fd.append("nip", this.nip);
            fd.append("jabatan", this.jabatan);
            fd.append("tim", this.tim);
            fd.append("tahun", this.selectedtahun);
            fd.append("level", this.dleveluser);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", this.secretencData);

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("masterlke-UpdateEvaluatan", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah terupdate..', 'success').then(function () {
                            window.location.replace("/Evaluatan");
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
    async mounted() {
        this.getOtentifikasi();
        await this.AmbilDataReff();
        if (this.secretencData != 'Tambah') {
            await this.AmbilDataSingel();
        }
    }
}
</script>
<style></style>
