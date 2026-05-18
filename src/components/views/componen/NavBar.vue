<template>
  <div class="modal fade" id="costumModalprofil" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
    aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Profil {{ namauser }}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-justify">
          <p>
          <div class="row">
            <div class="col-sm-12">
              <label>Nama</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control form-control-sm" id="namauser" name="namauser"
                  placeholder="Nama User" v-model="namauser">
              </div>
            </div>
            <div class="col-sm-12">
              <label>Username</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="far fa-address-card"></i></span>
                </div>
                <input type="text" class="form-control form-control-sm" id="username" name="username"
                  placeholder="Username" v-model="username" disabled>
                <input type="hidden" class="form-control form-control-sm" id="username_tmp" name="username_tmp"
                  placeholder="Username" v-model="username_tmp">
              </div>
            </div>
            <div class="col-sm-12">
              <label>Password Lama </label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" class="form-control form-control-sm" id="password" name="password"
                  placeholder="Password Lama" v-model="password">
              </div>
            </div>
            <div class="col-sm-12">
              <label>Password Baru </label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" class="form-control form-control-sm" id="passwordbaru" name="passwordbaru"
                  placeholder="Password Baru" v-model="passwordbaru" @keyup="cekkekuatan()">
              </div>
            </div>
            <div class="col-sm-12">
              <label>Kekuatan kata sandi</label>
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                  style="width:0%" id="persennyapassword">
                  <span id="tulisanpersennyapassword">0%</span>
                </div>
              </div>
            </div>
            <!--SERTIFIKAT GAMBAR 1-->
            <div class="col-sm-12" style="display:none;">
              <label>Foto<small class="text-info"> (*images files)</small>
              </label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="far fa-file-image"></i></span>
                </div>
                <input type="file" class="form-control form-control-sm" id="fileToUploadfilenya_user"
                  name="fileToUploadfilenya_user" placeholder="fileToUpload" style="font-size: smaller;"
                  accept="image/*">
                <input type="hidden" class="form-control form-control-sm" id="filenya_user" name="filenya_user"
                  placeholder="File Dokumentasi" v-model="filenya_user">
              </div>
            </div>
            <div class="col-sm-12" style="display:none;">
              <label>Opsi</label>
              <div class="row">
                <div class="col-sm-8">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                      style="width:0%" id="persennyafilenya_user">
                      <span id="tulisanpersenfilenya_user">0%</span>
                    </div>
                  </div>
                  <br>
                  <span class="text-success" id="suksesnyafilenya_user"></span>
                </div>
                <div class="col-sm-4 text-center">
                  <button type="button" class="btn btn-warning btn-sm lebar text-white"
                    @click="upload('filenya_user', 'image/*')">Upload
                    File</button>
                  <button type="button" class="btn btn-danger btn-sm lebar text-white"
                    @click="clearfile('filenya_user')">Hapus
                    File</button>
                </div>
              </div>
            </div>
            <!--SERTIFIKAT GAMBAR 1 END-->
          </div>
          </p>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-success3 btn-sm lebar2 text-white" @click="UpdateProfil()"
            :disabled="(strength < 60)"><i class="fas fa-user-edit"></i>
            Ubah</button>
          <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal"> <i
              class="far fa-times-circle"></i>
            Batal</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <div class="modal fade" id="costumModalpesan" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
    aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Pesan masuk {{ namauser }}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-justify">
          <p>
          <div class="row">
            <div class="col-sm-12 float-left pb-2 px-3">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-biru"><i class="fas fa-search"></i></span>
                </div>
                <input type="text" v-model="carikata" class="form-control form-control-sm"
                  placeholder="Masukkan Kata Kunci Pencarian Pesan">
              </div>
            </div>
            <div class="col-sm-12">
              <div class="table-responsive table-wrapper" style="font-size: x-small !important;">
                <table class="table m-0" id="tabelpesan">
                  <thead>
                    <tr>
                      <th style="width: 20px;">No</th>
                      <th style="width: 120px;">Tanggal</th>
                      <th style="width: 320px;">Pesan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(datalist, urutlist) in filteredKataData" :key="urutlist">
                      <tr>
                        <td class="text-center">
                          <span :style="[datalist.readed == '0' ? 'color:#228B22' : 'color:#111']">
                            {{ urutlist + 1 }}
                          </span>
                        </td>
                        <td class="text-left">
                          <span :style="[datalist.readed == '0' ? 'color:#228B22' : 'color:#111']">
                            {{ G_formatDate(datalist.tanggal) }}
                          </span>
                        </td>
                        <td class="text-left">
                          <a href="javascript:void(0)"
                            :style="[datalist.readed == '0' ? 'color:#228B22' : 'color:#111']"
                            @click="bukapesan(datalist.id, datalist.mode, datalist.id_pelaksana, datalist.kode_pelaksana, datalist.kdbalai, datalist.nama_satker, datalist.jenis_pk)">
                            <span v-if="datalist.jenis_pk == 1">[PK Awal] </span>
                            <span v-else-if="datalist.jenis_pk == 2">[PK Revisi] </span>
                            <span v-else>[PK Akhir] </span>
                            <span>{{ datalist.nama }}</span>
                          </a>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </p>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal"> <i
              class="far fa-times-circle"></i>
            Tutup</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-dark navbar-navy"
    style="border: none;background-color: #003d68 !important;z-index: 3 !important;">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link wow fadeInDown" data-widget="pushmenu" href="javascript:void(0)" role="button"
          style="font-size: large;">
          <i class="fas fa-align-left" style="color: aliceblue;"></i>
        </a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto wow fadeInDown" id="navbar" style="position: fixed;right: 20px;">
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-item" data-toggle="dropdown" href="javascript:void(0)">
          <img :src="folder" alt="User Profil" class="img-size-50 mr-3 img-circle" style="height: 50px !important;">
          <b class="text-white">{{ namauser }} <i class="fas fa-angle-down"></i></b>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="javascript:void(0)" class="dropdown-item" @click="UbahProfil()">
            <i class="fas fa-user mr-2"></i> Profil
          </a>
          <div class="dropdown-divider"></div>
          <a href="javascript:void(0)" class="dropdown-item" v-on:click="logoutAct">
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </a>
        </div>
      </li>
      <li class="nav-item dropdown" style="padding-left: 30px !important;">
        <a class="nav-item" href="javascript:void(0)" style="padding-left: 30px !important;">
          <span class="badge badge-success navbar-badge" style="font-size: smaller !important;"><i
              class="far fa-comments"></i>&nbsp;
            <span class="badge badge-warning navbar-badge" style="font-size: smaller !important;position: static;"
              v-if="jumlahpesan > 0">
              {{ jumlahpesan }}
            </span>
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
          style="max-height: 300px !important;overflow-y: auto;">
          <a href="javascript:void(0)" class="dropdown-item dropdown-footer text-success"
            style="font-size: smaller;background-color: #ffc107;" @click="LihatPesan()">Lihat semua pesan</a>
          <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
            <div class="dropdown-divider"></div>
            <a href="javascript:void(0)" class="dropdown-item" style="font-size: smaller !important;"
              @click="bukapesan(datalist.id, datalist.mode, datalist.id_pelaksana, datalist.kode_pelaksana, datalist.kdbalai, datalist.nama_satker, datalist.jenis_pk)">
              <span style="white-space: pre-line;">
                <span v-if="datalist.jenis_pk == 1">[PK Awal] </span>
                <span v-else-if="datalist.jenis_pk == 2">[PK Revisi] </span>
                <span v-else>[PK Akhir] </span>
                {{ datalist.nama }}
              </span>
            </a>
            <div class="media-body">
              <p class="dropdown-item text-sm text-muted" style="font-size: x-small !important;"><i
                  class="far fa-clock mr-1"></i> {{ G_formatDate(datalist.tanggal) }}</p>
            </div>
          </template>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
export default {
  components: {
    swal
  },
  data() {
    return {
      tahun: new Date().getFullYear(),
      namauser: JSON.parse(localStorage.getItem("nmusistem")),
      leveluser: JSON.parse(localStorage.getItem("lsistem")),
      levpiusistem: JSON.parse(localStorage.getItem("levpiusistem")),
      levpiubalaisistem: JSON.parse(localStorage.getItem("levpiubalaisistem")),
      kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
      ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
      verifsistem: JSON.parse(localStorage.getItem("verifsistem")),
      verif2sistem: JSON.parse(localStorage.getItem("verifsistem2")),
      evaluasisistem: JSON.parse(localStorage.getItem("evaluasisistem")),
      jenis_piusistem: JSON.parse(localStorage.getItem("jenis_piusistem")),
      username: '',
      username_tmp: '',
      password: '',
      carikata: '',
      passwordbaru: '',
      filenya_user: JSON.parse(localStorage.getItem("imgsistem")),
      folder: process.env.VUE_APP_URL_API + JSON.parse(localStorage.getItem("datatahunaktif")) + '/' + 'view_parastapainnovation-GambarUser?f=' + JSON.parse(localStorage.getItem("imgsistem")),
      strength: 0,
      jumlahpesan: 0,
      datamaster: [],
      datainbox: [],
      kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
      ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
      foldersatker: encodeURIComponent(CryptoJS.AES.encrypt(JSON.parse(localStorage.getItem("kdsatkersistem")), 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
      folderbalai: encodeURIComponent(CryptoJS.AES.encrypt(JSON.parse(localStorage.getItem("ksatkersistem")), 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
      tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
    };
  },
  computed: {
    filteredKataData() {
      const filteredWorkers = this.carikata === ""
        ? this.datainbox
        : this.datainbox.filter(wo => Object.values(wo).join("").toLowerCase().indexOf(this.carikata.toLowerCase()) !== -1);
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
    bukapesan(id, mode, id_pelaksana, foldersatker, folderbalai, nama, jenis_pk) {
      //alert(id);
      //alert(mode);
      //alert(folderbalai + "_[" + foldersatker + "] " + nama + "_" + id_pelaksana);
      var temp = folderbalai + "_[" + foldersatker + "] " + nama + "_" + id_pelaksana
      var tempbalai = folderbalai + "_" + id_pelaksana

      var alamatnyapkbalai = '';
      var alamatnyapksatker = '';
      if (jenis_pk == '1') {
        alamatnyapkbalai = '/PerjanjianKinerjaBalaiAwal/';
        alamatnyapksatker = '/PerjanjianKinerjaSatkerAwal/';
      }
      else if (jenis_pk == '2') {
        alamatnyapkbalai = '/PerjanjianKinerjaBalai/';
        alamatnyapksatker = '/PerjanjianKinerjaSatker/';
      }
      else {
        alamatnyapkbalai = '/PerjanjianKinerjaBalaiAkhir/';
        alamatnyapksatker = '/PerjanjianKinerjaSatkerAkhir/';
      }
      //return;
      if (this.leveluser.includes(7) || this.leveluser.includes(6) || this.leveluser.includes(3) || this.leveluser.includes(5) || this.leveluser.includes(2) || this.leveluser.includes(1) || this.leveluser.includes(9) || this.leveluser.includes(8) || this.leveluser.includes(4)) {
        const data = {
          id: id,
          mode: mode,
        }
        const mainAPI = axios.create({
          baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        //alert(id);
        //alert(mode);
        mainAPI.post("notif-Update", data).then(
          Response => {
            var kode = encodeURIComponent(CryptoJS.AES.encrypt(temp, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
            var kodebalai = encodeURIComponent(CryptoJS.AES.encrypt(tempbalai, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
            //var kode = encodeURIComponent(CryptoJS.AES.encrypt(foldersatker, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
            if (Response.data.response == 'error') {
              swal.fire('Peringatan', Response.data.message, 'error');
            }
            else {
              if ((id_pelaksana == '45') || (id_pelaksana == '32')) {
                window.location.replace(alamatnyapkbalai + kodebalai);
              }
              else {
                window.location.replace(alamatnyapksatker + kode);
              }

            }
          }
        ).catch(
          error => {
            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
          }
        )
      }
    },
    cekkekuatan() {
      //alert(this.passwordbaru);
      this.strength = 0;
      var lowerCase = this.passwordbaru.match(/[a-z]/);
      var upperCase = this.passwordbaru.match(/[A-Z]/);
      var numbers = this.passwordbaru.match(/[0-9]/);
      var width = this.passwordbaru.length;
      var specialCharacters = this.passwordbaru.match(/[\!\~\@\&\#\$\%\^\&\*\(\)\{\}\?\-\_\+\=]/);
      if (width > 8) {
        this.strength = this.strength + 20;
      }
      if (lowerCase) {
        this.strength = this.strength + 20;
      }
      if (upperCase) {
        this.strength = this.strength + 20;
      }
      if (numbers) {
        this.strength = this.strength + 20;
      }
      if (specialCharacters) {
        this.strength = this.strength + 20;
      }
      document.getElementById('persennyapassword').style.width = this.strength + "%";
      document.getElementById('tulisanpersennyapassword').innerHTML = this.strength + "%";
    },
    getOtentifikasi() {
      const mainAPIUser = axios.create({
        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokensistem"),
        },
      });

      mainAPIUser.get("parastapainnovation-GetDataUserName?kduser=" + localStorage.getItem("usistem")).then(
        Res => {
          if (Res.data.response == 'error') {
            //alert(Res.data.response);
            this.ClearlocalStorage();
            return false;
          }
          else {
            //alert(JSON.stringify(Res.data));
            this.username = Res.data.content.data[0].username;
            this.username_tmp = Res.data.content.data[0].username;
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
        }
      );

      var time = Date.parse(localStorage.getItem("tsistem"));
      var timeakhir = time + (3 * 60 * 60 * 1000);
      var timesekarang = Date.parse(new Date());
      if (timesekarang > timeakhir) {
        localStorage.removeItem('tokensistem');
        localStorage.removeItem('usistem');
        localStorage.removeItem('lsistem');
        localStorage.removeItem('nmlsistem');
        localStorage.removeItem('ksatkersistem');
        localStorage.removeItem('nmksatkersistem');
        localStorage.removeItem('satkersistem');
        localStorage.removeItem('kdsatkersistem');
        localStorage.removeItem('nmsatkersistem');
        localStorage.removeItem('nmusistem');
        localStorage.removeItem('d5sistem');
        localStorage.removeItem('jbtsistem');
        localStorage.removeItem('imgsistem');
        localStorage.removeItem('tsistem');
        localStorage.removeItem('statsistem');
        localStorage.removeItem('levpiusistem');
        localStorage.removeItem('verifsistem');
        localStorage.removeItem('verifsistem2');
        localStorage.removeItem('evaluasisistem');
        localStorage.removeItem('levpiubalaisistem');
        localStorage.removeItem('jenis_piusistem');
        localStorage.removeItem('datatahunaktif');
        window.location.replace("/");
      }
    },
    clearfile(idnya) {
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
      mainAPI.post("parastapainnovation-FilesDeleted", fd).then(
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
    upload(idnya, tipenya) {
      var elmnt = document.getElementById("fileToUpload" + idnya);
      try {
        var namanya = elmnt.files[0].name;
        //alert(elmnt.files[0]['type'].toUpperCase());
        if (tipenya == 'image/*') {
          if ((elmnt.files[0]['type'].toUpperCase() != 'IMAGE/JPG') && (elmnt.files[0]['type'].toUpperCase() != 'IMAGE/JPEG') && (elmnt.files[0]['type'].toUpperCase() != 'IMAGE/PNG') && (elmnt.files[0]['type'].toUpperCase() != 'IMAGE/GIF')) {
            document.getElementById('suksesnya' + idnya).innerHTML = '*file harus format gambar';
            return;
          }
        }
        else {
          if (elmnt.files[0]['type'] != tipenya) {
            document.getElementById('suksesnya' + idnya).innerHTML = '*file harus format pdf';
            return;
          }
        }
      } catch (error) {
        document.getElementById('suksesnya' + idnya).innerHTML = '*pilih file terlebih dahulu';
        return;
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
      mainAPI.post("parastapainnovation-FilesUpload", fd, {
        onUploadProgress: function (uploadEvent) {
          document.getElementById('persennya' + idnya).style.width = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
          document.getElementById('tulisanpersen' + idnya).innerHTML = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
        }
      }).then(
        function (res) {
          document.getElementById('suksesnya' + idnya).innerHTML = res.data.message;
          if (res.data.filename != undefined) {
            document.getElementById(idnya).value = res.data.filename;
          }
        }
      ).catch(function (e) {
        document.getElementById('suksesnya' + idnya).innerHTML = res.data.message;
        document.getElementById(idnya).value = '';
        console.log(e);
      }
      )
    },
    LihatPesan() {
      $('#costumModalpesan').modal('show');
    },
    UbahProfil() {
      $('#costumModalprofil').modal('show');
    },
    UpdateProfil() {
      if (this.username == '') {
        swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        }).fire({
          icon: 'warning',
          title: 'Isikan username..',
        });
        return false;
      }
      if (this.password == '') {
        swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        }).fire({
          icon: 'warning',
          title: 'Isikan password..',
        });
        return false;
      }
      if (this.passwordbaru == '') {
        swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        }).fire({
          icon: 'warning',
          title: 'Isikan password baru..',
        });
        return false;
      }
      swal.fire({
        title: "Konfirmasi",
        text: "Yakin Hendak Ubah Kata Sandi / Password?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Batal",
        confirmButtonColor: "#003d68",
        cancelButtonColor: "#ffaa05",
        confirmButtonText: "Ubah"
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            kduser: JSON.parse(localStorage.getItem("usistem")),
            nama: this.namauser,
            username: this.username,
            username_tmp: this.username_tmp,
            passwordlama: this.password,
            passwordbaru: this.passwordbaru,
            foto: document.getElementById('filenya_user').value,
          };
          const mainAPI = axios.create({
            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tokensistem"),
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          mainAPI.post("parastapainnovation-ChangeUserPassword", data).then(
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
                return false;
              }
              else {
                swal.fire({
                  title: "Informasi",
                  text: "Profil Pengguna Telah Dirubah!",
                  icon: "success"
                }).then(function () {
                  localStorage.removeItem('tokensistem');
                  localStorage.removeItem('usistem');
                  localStorage.removeItem('lsistem');
                  localStorage.removeItem('nmlsistem');
                  localStorage.removeItem('ksatkersistem');
                  localStorage.removeItem('nmksatkersistem');
                  localStorage.removeItem('satkersistem');
                  localStorage.removeItem('kdsatkersistem');
                  localStorage.removeItem('nmsatkersistem');
                  localStorage.removeItem('nmusistem');
                  localStorage.removeItem('d5sistem');
                  localStorage.removeItem('jbtsistem');
                  localStorage.removeItem('imgsistem');
                  localStorage.removeItem('tsistem');
                  localStorage.removeItem('statsistem');
                  localStorage.removeItem('levpiusistem');
                  localStorage.removeItem('verifsistem');
                  localStorage.removeItem('verifsistem2');
                  localStorage.removeItem('evaluasisistem');
                  localStorage.removeItem('levpiubalaisistem');
                  localStorage.removeItem('jenis_piusistem');
                  localStorage.removeItem('datatahunaktif');
                  window.location.replace("/");
                });
                $('.swal2-container').css("z-index", '999999');
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
            }
          )
        }
      });
      $('.swal2-container').css("z-index", '999999');
      return false;
    },
    async logoutAct() {
      swal.fire({
        title: "Konfirmasi",
        text: "Yakin Hendak Keluar Aplikasi?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Batal",
        confirmButtonColor: "#003d68",
        cancelButtonColor: "#ffaa05",
        confirmButtonText: "Keluar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.ClearlocalStorage();
        }
      });

      return false;
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
      //alert(this.leveluser);
      var levpiusistem = '';
      var jenis_piusistem = '';
      jenis_piusistem = this.jenis_piusistem;
      if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
        //alert(this.levpiubalaisistem);
        levpiusistem = this.levpiubalaisistem;
        if (levpiusistem == null) {
          if (this.leveluser.includes(2)) {
            levpiusistem = this.jenis_piusistem;
          }
          else if (this.jenis_piusistem == '37' || this.jenis_piusistem == '36' || this.jenis_piusistem == '38') {
            levpiusistem = this.jenis_piusistem;
          }
          else {
            levpiusistem = this.levpiusistem;
          }
        }
        else if (this.jenis_piusistem == '37' || this.jenis_piusistem == '36' || this.jenis_piusistem == '38') {
          levpiusistem = this.jenis_piusistem;
        }
      }
      else {
        levpiusistem = this.levpiusistem;
      }
      //alert(levpiusistem);
      //alert(jenis_piusistem);
      //alert(this.kdsatkersistem);
      //alert(this.ksatkersistem);
      //alert(this.leveluser);

      await mainAPI.get("notif-All?random=" + random + "&kode_pelaksana=" + this.kdsatkersistem + "&kode_balai=" + this.ksatkersistem + "&level=" + this.leveluser + "&levpiusistem=" + levpiusistem + "&jenis_piusistem=" + jenis_piusistem).then(
        Response => {
          this.datapesan = Response.data.message;
          //alert(this.datapesan);
          //console.log(this.datapesan);
          if (this.datapesan == 'data diketemukan') {
            this.datainbox = [];
            this.datainbox = Response.data.content.data;
            //this.jumlahpesan = Response.data.content.jumlah;
          }
          else {
          }
          this.halamanloading = false;
        }
      ).catch(error => {
        //console.log(error);
        this.datainbox = [];
        //this.ClearlocalStorage();
        this.halamanloading = false;
      });

      this.halamanloading = true;
      await mainAPI.get("notif-GetData?random=" + random + "&kode_pelaksana=" + this.kdsatkersistem + "&kode_balai=" + this.ksatkersistem + "&level=" + this.leveluser + "&levpiusistem=" + levpiusistem + "&jenis_piusistem=" + jenis_piusistem).then(
        Response => {
          this.datapesan = Response.data.message;
          //alert(this.datapesan);
          //console.log(this.datapesan);
          if (this.datapesan == 'data diketemukan') {
            this.datamaster = [];
            this.datamaster = Response.data.content.data;
            this.jumlahpesan = Response.data.content.jumlah;
          }
          else {
            this.datamaster = [];
            this.jumlahpesan = 0;
          }
          this.halamanloading = false;
        }
      ).catch(error => {
        //console.log(error);
        this.datamaster = [];
        this.jumlahpesan = 0;
        //this.ClearlocalStorage();
        this.halamanloading = false;
      });
    },
  },
  mounted() {
    this.getOtentifikasi();
    this.ambildata();
  },
}
</script>

<style></style>