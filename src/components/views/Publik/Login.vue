<template>
    <!-- Spinner Start -->
    <div id="spinner" v-if="halamanloading"
        class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        &nbsp;<img src="../../../../src/assets/img/logo.png" height="40">
        &nbsp;<span class="text-primary">..Loading...</span>
    </div>
    <!-- Spinner End -->
    <div class="row contentlogin">
        <div class="col-sm-4">
            <div class="lockscreen-name">&nbsp;</div>
            <div class="lockscreen-logo wow fadeInLeft">
                <img src="../../../../src/assets/img/logo.png" alt="Admin Logo" class="wow fadeInLeft"
                    style="opacity: .8;height: 55px;">
            </div>
            <div class="help-block text-center wow fadeInLeft">
                <span class="text-primary">Direktorat Jenderal Sumber Daya Air</span><br></br>
                <span class="text-primary">Kementerian Pekerjaan Umum</span>
            </div>
            <div class="help-block text-center wow fadeInLeft">
                <label class="text-primary">MONITORING KEGIATAN SDA</label>
            </div>
            <div class="lockscreen-name">&nbsp;</div>
            <!-- START LOCK SCREEN ITEM -->
            <div class="lockscreen-item wow fadeInLeft">
                <!-- lockscreen image -->
                <div class="lockscreen-image">
                    <img src="../../../assets/img/3177440.png" alt="User Image">
                </div>
                <!-- /.lockscreen-image -->

                <!-- lockscreen credentials (contains the form) -->
                <div class="lockscreen-credentials">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="username" id="username" :isFilled="true"
                            v-model="username">

                        <div class="input-group-append">
                            <button type="button" class="btn">
                                <i class="fas fa-arrow-right text-muted"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- /.lockscreen credentials -->

            </div>
            <!-- /.lockscreen-item -->
            <!-- User name -->
            <div class="lockscreen-name">&nbsp;</div>

            <!-- START LOCK SCREEN ITEM -->
            <div class="lockscreen-item wow fadeInLeft">
                <!-- lockscreen image -->
                <div class="lockscreen-image">
                    <img src="../../../assets/img/4992489.png" alt="User Password">
                </div>
                <!-- /.lockscreen-image -->

                <!-- lockscreen credentials (contains the form) -->
                <div class="lockscreen-credentials">
                    <div class="input-group">
                        <input :type="[showPassword ? 'text' : 'password']" class="form-control" placeholder="password"
                            id="password" :isFilled="true" v-model="password">

                        <div class="input-group-append">
                            <button type="button" class="btn" @click="toggleShow">
                                <i
                                    :class="{ 'fas fa-eye-slash text-muted': showPassword, 'fas fa-eye text-muted': !showPassword }"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- /.lockscreen credentials -->
            </div>
            <div class="lockscreen-name">&nbsp;</div>
            <!-- START LOCK SCREEN ITEM -->
            <div class="lockscreen-item wow fadeInLeft">
                <!-- lockscreen image -->
                <div class="lockscreen-image">
                    <img src="../../../assets/img/kalender.png" alt="User Image">
                </div>
                <!-- /.lockscreen-image -->

                <!-- lockscreen credentials (contains the form) -->
                <div class="lockscreen-credentials">
                    <div class="input-group">
                        <select class="custom-select" :id="'selecttahun'" @change="cekisi('selecttahun')">
                            <template v-for="(datalist, urutpilihannya) in tahun" :key="urutpilihannya">
                                <option :value="datalist.tag" :selected="datalist.tag == tahunsekarang">
                                    {{ datalist.label }}
                                </option>
                            </template>
                        </select>
                    </div>
                </div>
                <!-- /.lockscreen credentials -->

            </div>
            <!-- START LOCK SCREEN ITEM -->
            <div class="lockscreen-item wow fadeInLeft">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-primary" style="font-size: small;">Kode&nbsp;&nbsp;
                                Captcha</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Captcha" id="capcha" :isFilled="true"
                            v-model="capcha" disabled @click.right.prevent @keydown="keydown" @copy.prevent
                            @paste.prevent style="background-color: #FFD700;">
                    </div>
                    <!-- /.input group -->
                </div>
            </div>
            <div class="lockscreen-item wow fadeInLeft">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-primary" style="font-size: small;">Ulangi Captcha</span>
                        </div>
                        <input type="text" class="form-control" placeholder="" id="capchainput" :isFilled="true"
                            v-model="capchainput" @click.right.prevent @keydown="keydown" @copy.prevent @paste.prevent
                            style="text-transform:uppercase">
                    </div>
                    <!-- /.input group -->
                </div>
            </div>
            <!-- /.lockscreen-item -->
            <!-- User name -->
            <center class="wow fadeInLeft">
                <input type="checkbox" id="customSwitchAuth" @click="rubahisi()">
                <label for="customSwitchAuth" style="font-size: small;">
                    <span>&nbsp;Autentikasi Pengguna Manusia</span>
                </label>
            </center>
            <div class="lockscreen-item wow fadeInLeft" style="background: transparent;">
                <button class="btn btn-danger2 btn-block text-white" placeholder="Username" data-toggle="tooltip"
                    data-placement="left" title="Masuk ke Halaman Admin.." style="color: black;" v-on:click="loginAct"
                    :disabled="showHuman == false">
                    <b><i class="fas fa-sign-in-alt"></i>
                        <span>Masuk</span>
                    </b>
                </button>
            </div>
            <!-- /.lockscreen-item -->
        </div>
        <a href="https://s.id/layananSAKIP" target="_blank">
            <img src="../../../../src/assets/img/sakip.png" alt="Admin Logo" class="adi img-circle wow fadeInUp"
                data-toggle="tooltip" data-placement="left" title="Support Center" name="image_name"
                style="height: 48px;width: 48px;position: fixed;bottom: 10px;right: 60px;">
        </a>
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert2';

export default {
    components: {
        swal
    },
    data() {
        return {
            halamanloading: true,
            tahun: new Date().getFullYear(),
            username: "", password: "",
            showHuman: false,
            showPassword: false,
            bahasa: localStorage.getItem("bahasasistem"),
            client_id: 'app-db-005',
            secret_key: 'VMkuMWlu3btNCCm5RmExg2l1ZuLKeax5PwBSQuYPIxFEW9cgT3lUnYTMxUSGd7eB9mMqMq0fPsAKCMbwJkY8WUPkDvlVz2jdWBoq6QRDxjO',
            ipnya: '',
            capcha: this.makeid(5), capchainput: "",
            tahun: [],
            datatahun: [],
            defaultSelectedtahun: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtahun: new Date().getFullYear(),
            datapesanreff: '',
            tahunsekarang: new Date().getFullYear(),
        };
    },
    methods: {
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        rubahisi() {
            if ((this.showHuman == false) && (this.capcha == this.capchainput.toUpperCase())) {
                if (this.username.length == 0) {
                    this.showHuman = false;
                    document.getElementById("customSwitchAuth").checked = false;
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Isikan username',
                    });
                    return false;
                }
                if (this.password.length == 0) {
                    document.getElementById("customSwitchAuth").checked = false;
                    this.showHuman = false;
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Isikan password',
                    });
                    return false;
                }
                this.showHuman = true;
            }
            else {
                if (this.capcha != this.capchainput.toUpperCase()) {
                    document.getElementById("customSwitchAuth").checked = false;
                    this.showHuman = false;
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Kode keamanan tidak sama',
                    });
                }
                this.showHuman = false;
            }
        },
        async AmbilDataReff() {
            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_APIDEFAULT,
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2",
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("reff/017_tahun.php?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    this.datatahun = [];
                    this.tahun = [];
                    const tahunRows = Array.isArray(Response?.data?.content?.data) ? Response.data.content.data : [];

                    if (this.datapesanreff == 'data diketemukan' && tahunRows.length > 0) {
                        this.datatahun = tahunRows;
                        this.datatahun.forEach((item) => {
                            this.tahun.push({
                                label: item.nama,
                                code: this.datatahun.indexOf(item) + 1,
                                tag: item.nama,
                            });
                        });
                    }

                    if (this.tahun.length === 0) {
                        const fallbackYear = String(new Date().getFullYear());
                        this.tahun = [{
                            label: fallbackYear,
                            code: 1,
                            tag: fallbackYear,
                        }];
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                const fallbackYear = String(new Date().getFullYear());
                this.tahun = [{
                    label: fallbackYear,
                    code: 1,
                    tag: fallbackYear,
                }];
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        cekisi(isinya) {
            this.selectedtahun = document.getElementById(isinya).value;
        },
        async loginAct() {

            const mainAPIIP = axios.create({
                baseURL: process.env.VUE_APP_URL_APIDEFAULT,
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2",
                },
            });
            var random = Math.random();

            await mainAPIIP.get("parastapainnovationip-Key?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.ipnya = Response.data.randkey;
                    }
                    else {
                        this.ipnya = '';
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                this.datapesan = "";
                console.log(error);
            });

            const data = {
                username: this.username,
                katakunci: this.password,
                ipnya: this.ipnya
            };


            if ((this.username == "") || (this.password == "")) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Isikan kolom secara lengkap..',
                });
                document.getElementById('customSwitchAuth').checked = false;
                document.getElementById("username").focus();
                this.showHuman = false;
                return false;
            }

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_APIDEFAULT,
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2" + this.ipnya,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            await mainAPI.post("parastapainnovation-login", data).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: Response.data.message,
                        });
                        this.showHuman = false;
                        document.getElementById('customSwitchAuth').checked = false;
                        return false;

                    }
                    else {
                        const mainAPIUser = axios.create({
                            baseURL: process.env.VUE_APP_URL_APIDEFAULT,
                            headers: {
                                Authorization: "Bearer " + Response.data.accessToken,
                            },
                        });
                        mainAPIUser.get("parastapainnovationUser-GetUser?kduser=" + Response.data.content.data[0].tmpsys + "&level=" + Response.data.content.data[0].level).then(
                            Res => {
                                if (Res.data.response == 'error') {
                                    swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000
                                    }).fire({
                                        icon: 'warning',
                                        title: Res.data.message,
                                    });
                                    document.getElementById("username").focus();
                                    this.showHuman = false;
                                    document.getElementById('customSwitchAuth').checked = false;
                                    return false;

                                }
                                else {
                                    localStorage.setItem("tokensistem", JSON.stringify(Response.data.accessToken));
                                    localStorage.setItem("usistem", JSON.stringify(Response.data.content.data[0].tmpsys));
                                    localStorage.setItem("iduser", JSON.stringify(Res.data.content.data[0].id));
                                    localStorage.setItem("lsistem", JSON.stringify(Res.data.content.data[0].level));
                                    localStorage.setItem("nmlsistem", JSON.stringify(Res.data.content.data[0].namaleveluser));
                                    localStorage.setItem("ksatkersistem", JSON.stringify(Res.data.content.data[0].kategori_satker));
                                    localStorage.setItem("nmksatkersistem", JSON.stringify(Res.data.content.data[0].nama_kategori_satker));
                                    localStorage.setItem("satkersistem", JSON.stringify(Res.data.content.data[0].satker));
                                    localStorage.setItem("kdsatkersistem", JSON.stringify(Res.data.content.data[0].kode_satker));
                                    localStorage.setItem("nmsatkersistem", JSON.stringify(Res.data.content.data[0].nama_satker));
                                    localStorage.setItem("nmusistem", JSON.stringify(Res.data.content.data[0].nama));
                                    localStorage.setItem("d5sistem", JSON.stringify(Res.data.content.data[0].md5nya));
                                    localStorage.setItem("jbtsistem", JSON.stringify(Res.data.content.data[0].jabatan));
                                    localStorage.setItem("imgsistem", JSON.stringify(Res.data.content.data[0].foto));
                                    localStorage.setItem("statsistem", JSON.stringify(Res.data.content.data[0].status_piu));
                                    localStorage.setItem("levpiusistem", JSON.stringify(Res.data.content.data[0].level_piu));
                                    localStorage.setItem("verifsistem", JSON.stringify(Res.data.content.data[0].verif));
                                    localStorage.setItem("verifsistem2", JSON.stringify(Res.data.content.data[0].verif2));
                                    localStorage.setItem("verifsistem3", JSON.stringify(Res.data.content.data[0].verif3));
                                    localStorage.setItem("evaluasisistem", JSON.stringify(Res.data.content.data[0].evaluasi));
                                    localStorage.setItem("levpiubalaisistem", JSON.stringify(Res.data.content.data[0].level_piu_balai));
                                    localStorage.setItem("jenis_piusistem", JSON.stringify(Res.data.content.data[0].jenis_piu));
                                    localStorage.setItem("tahunpkawal", JSON.stringify(Res.data.content.data[0].tahunpkawal));
                                    localStorage.setItem("tahunpkrevisi", JSON.stringify(Res.data.content.data[0].tahunpkrevisi));
                                    localStorage.setItem("tahunpkakhir", JSON.stringify(Res.data.content.data[0].tahunpkakhir));
                                    localStorage.setItem("datatahunaktif", this.selectedtahun);
                                    localStorage.setItem("tsistem", new Date().toString());
                                    this.showHuman = false;
                                    window.location.replace("/Dashboard");
                                }
                            }
                        ).catch(
                            error => {
                                swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000
                                }).fire({
                                    icon: 'warning',
                                    title: error,
                                });
                                this.showHuman = false;
                                document.getElementById('customSwitchAuth').checked = false;
                                return false;
                            }
                        )
                    }
                }
            ).catch(
                error => {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: error,
                    });
                    this.showHuman = false;
                    document.getElementById('customSwitchAuth').checked = false;
                    return false;
                }
            )
        },
    },
    mounted() {
        this.AmbilDataReff();
        try {
            document.getElementById("username").focus();
            document.getElementById('customSwitchAuth').checked = false;
            this.showHuman = false;
            this.showPassword = false;
            this.JustClearlocalStorage();
        } catch (error) {

        }
        this.halamanloading = false;
    },
}
</script>

<style>
.adi:hover {
    transform: scale(1.15);
    /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>
