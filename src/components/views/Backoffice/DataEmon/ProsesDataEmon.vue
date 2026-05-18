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
                                <li class="breadcrumb-item"><a href="/DataEmon">Data Emon</a></li>
                                <li class="breadcrumb-item active">Pengaturan Data Emon</li>
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
                                    <h3 class="card-title">Form Input Data Emon</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <div class="row">
                                        <!--PETA 1-->
                                        <div class="col-sm-12">
                                            <label>File db emon<small class="text-info"> (*db files)</small>
                                            </label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="far fa-file-image"></i></span>
                                                </div>
                                                <input type="file" class="form-control form-control-sm"
                                                    id="fileToUploadfilenya_emon" name="fileToUploadfilenya_emon"
                                                    placeholder="fileToUpload" style="font-size: smaller;" accept=".db">
                                                <input type="hidden" class="form-control form-control-sm"
                                                    id="filenya_emon" name="filenya_emon" placeholder="File EMON">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Opsi</label>
                                            <div class="row">
                                                <div class="col-sm-9">
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" aria-valuenow="0"
                                                            aria-valuemin="0" aria-valuemax="100" style="width:0%"
                                                            id="persennyafilenya_emon">
                                                            <span id="tulisanpersenfilenya_emon">0%</span>
                                                        </div>
                                                    </div>
                                                    <br>
                                                    <span class="text-success" id="suksesnyafilenya_emon"></span>
                                                </div>
                                                <div class="col-sm-3 text-center">
                                                    <button type="button"
                                                        class="btn btn-warning btn-sm lebar text-white"
                                                        @click="uploadfilepeta('filenya_emon', '.db')">Upload
                                                        File</button>
                                                    <button type="button" class="btn btn-danger btn-sm lebar"
                                                        @click="clearfilepeta('filenya_emon')">Hapus File</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!--PETA 1 END-->
                                        <div class="col-sm-12">
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer p-3">
                                    <button type="button" class="btn btn-sm btn-success3 float-left text-white lebar2"
                                        @click="simpan()" v-if="(secretencData == 'Tambah')" data-toggle="tooltip"
                                        data-placement="left" title="Simpan data.."><i class="fas fa-plus-square"></i>
                                        Simpan</button>
                                    <button type="button" class="btn btn-sm btn-success3 float-left text-white lebar2"
                                        v-if="(secretencData != 'Tambah')" @click="update()" data-toggle="tooltip"
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
            //levelkabkot: JSON.parse(localStorage.getItem("bdlsistem")),
            //levelkelurahan: JSON.parse(localStorage.getItem("sbdsistem")),
            secretencData: decodeURIComponent(CryptoJS.AES.decrypt(this.route.params.id, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString(CryptoJS.enc.Utf8)),
            filenya_emon: '',
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
        uploadfilepeta(idnya, tipenya) {
            var elmnt = document.getElementById("fileToUpload" + idnya);
            //alert(elmnt.files[0].name);
            //alert(elmnt.files[0].name.slice(-7));
            try {
                if (elmnt.files[0].name == '') {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Isikan File db..',
                    });
                    return false;
                }
                if (elmnt.files[0].name === undefined) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Isikan File db..',
                    });
                    return false;
                }
                if (elmnt.files[0].name.slice(-2).toUpperCase() != 'DB') {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Kesalahan Format Data DB..',
                    });
                    return false;
                }

                var fd = new FormData();
                fd.append("fileToUpload", elmnt.files[0], elmnt.files[0].name);
                fd.append("folderToUpload", idnya);
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                mainAPI.post("parastapainnovationimg2-FilesUpload", fd, {
                    onUploadProgress: function (uploadEvent) {
                        document.getElementById('persennya' + idnya).style.width = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                        document.getElementById('tulisanpersen' + idnya).innerHTML = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                    }
                }).then(
                    function (res) {
                        document.getElementById('suksesnya' + idnya).innerHTML = res.data.message;
                        if (res.data.filename != undefined) {
                            document.getElementById(idnya).value = res.data.filename;
                            //this.filenya_emon = document.getElementById(idnya).value;
                        }
                    }
                ).catch(function (e) {
                    document.getElementById('suksesnya' + idnya).innerHTML = res.data.message;
                    document.getElementById(idnya).value = '';
                    console.log(e);
                }
                )
            } catch (error) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Isikan File geojson..',
                });
                return false;
            }

        },
        clearfilepeta(idnya) {
            if (document.getElementById(idnya).value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'File Tidak Tersedia',
                });
                return false;
            }

            var fd = new FormData();
            fd.append("folderToUpload", idnya);
            fd.append("filenya", document.getElementById(idnya).value);
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationimg2-FilesDeleted", fd).then(
                Response => {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: Response.data.message,
                    });
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

            document.getElementById('fileToUpload' + idnya).value = '';
            document.getElementById(idnya).value = '';
            document.getElementById('persennya' + idnya).style.width = "0%";
            document.getElementById('tulisanpersen' + idnya).innerHTML = "0%";
            document.getElementById('suksesnya' + idnya).innerHTML = '';
            return false;
        },
        batalproses() {
            window.location.replace("/DataEmon");
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

            await mainAPIDataSingel.get("parastapainnovationunor-GetByID?id=" + this.secretencData + "&random=" + random).then(
                Response => {
                    this.kdbalai = Response.data.content.data[0].kdbalai;
                    this.kdbalai_old = Response.data.content.data[0].kdbalai_old;
                    this.nama_kategori = Response.data.content.data[0].nama;
                    this.alamat = Response.data.content.data[0].alamat;
                    this.latitude = Response.data.content.data[0].latitude;
                    this.longitude = Response.data.content.data[0].longitude;
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        validasidata() {
            if ((document.getElementById('filenya_emon').value == '') || (document.getElementById('filenya_emon').value === null) || (document.getElementById('filenya_emon').value === undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Isikan File DB emon..',
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
            fd.append("filenya_emon", document.getElementById('filenya_emon').value);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("emon-Add", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
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
        update() {
            this.validasidata();
            if (this.validasi == false) {
                return false;
            }
            //alert(this.usernamedatatmp);
            //alert(this.usernamedata);
            var fd = new FormData();
            fd.append("filenya_emon", document.getElementById('filenya_emon').value);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", this.secretencData);
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationunor-Update", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah terupdate..', 'success').then(function () {
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