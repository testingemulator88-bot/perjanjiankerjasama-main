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
        <div class="modal fade" id="costumModalopsi" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-yellow">
                        <h4 class="modal-title">Opsi Data {{ opsi }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row">
                            <input type="hidden" class="form-control form-control-sm" id="mode" name="mode"
                                placeholder="mode" v-model="mode">
                            <input type="hidden" class="form-control form-control-sm" id="opsi" name="opsi"
                                placeholder="opsi" v-model="opsi">
                            <input type="hidden" class="form-control form-control-sm" id="parent" name="parent"
                                placeholder="parent" v-model="parent">
                            <input type="hidden" class="form-control form-control-sm" id="id" name="id" placeholder="id"
                                v-model="id">
                            <input type="hidden" class="form-control form-control-sm" id="level" name="level"
                                placeholder="level" v-model="level">
                            <div class="col-sm-12">
                                <label>Tahun <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <v-select :options="listtahun" :reduce="(label) => label.code" label="label"
                                    v-model="defaultSelectedtahun" @update:modelValue="ontahunChange"
                                    style="background-color: #ffffff;padding-bottom: 10px;"
                                    :disabled="isSelectDisabled"></v-select>
                            </div>
                            <div class="col-sm-12">
                                <label>Kode <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="kode" name="kode"
                                        placeholder="Kode" v-model="kode">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <label>Kode Unik<small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="kode_unique"
                                        name="kode_unique" placeholder="Kode Unik" v-model="kode_unique">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'UNOR'">
                                <label>Unit Organisasi<small class="text-info"> (*wajib
                                        dipilih)</small></label>
                                <v-select :options="kdunor" :reduce="(label) => label.code" label="label"
                                    v-model="defaultSelectedkdunor" @update:modelValue="onkdunorChange"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12">
                                <label>Paramater / Isian Data <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="nama" name="nama"
                                        placeholder="Paramater / Isian Data" v-model="nama">
                                </div>
                            </div>
                            <div class="col-sm-12"
                                v-if="opsi == 'ISS' || opsi == 'ISP' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Satuan<small class="text-info"> (*wajib
                                        dipilih)</small></label>
                                <v-select :options="satuan" :reduce="(label) => label.code" label="label"
                                    v-model="defaultSelectedsatuan" @update:modelValue="onsatuanChange"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12"
                                v-if="opsi == 'ISP' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Output<small class="text-info"> (*wajib
                                        dipilih)</small></label>
                                <v-select :options="output" :reduce="(label) => label.code" label="label"
                                    v-model="defaultSelectedoutput" @update:modelValue="onoutputChange"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12"
                                v-if="opsi == 'ISP' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Outcome<small class="text-info"> (*wajib
                                        dipilih)</small></label>
                                <v-select :options="outcome" :reduce="(label) => label.code" label="label"
                                    v-model="defaultSelectedoutcome" @update:modelValue="onoutcomeChange"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12"
                                v-if="opsi == 'ISP' || opsi == 'SK' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Pelaksana</label>
                                <v-select multiple :options="pelaksana" :reduce="(label) => label.code" label="label"
                                    @option:selected="onpelaksanaChangeSelect($event)"
                                    @option:deselected="onpelaksanaChangeDeselect($event)" v-model="arraynamapelaksana"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12"
                                v-if="opsi == 'ISP' || opsi == 'SK' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Akses Cetak</label>
                                <v-select multiple :options="cetak" :reduce="(label) => label.code" label="label"
                                    @option:selected="oncetakChangeSelect($event)"
                                    @option:deselected="oncetakChangeDeselect($event)" v-model="arraynamacetak"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12" style="display: none;"
                                v-if="opsi == 'ISP' || opsi == 'SK' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Akses Verif Ke-1</label>
                                <v-select multiple :options="verif" :reduce="(label) => label.code" label="label"
                                    @option:selected="onverifChangeSelect($event)"
                                    @option:deselected="onverifChangeDeselect($event)" v-model="arraynamaverif"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12" style="display: none;"
                                v-if="opsi == 'ISP' || opsi == 'SK' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Akses Verif Ke-2</label>
                                <v-select multiple :options="verif2" :reduce="(label) => label.code" label="label"
                                    @option:selected="onverif2ChangeSelect($event)"
                                    @option:deselected="onverif2ChangeDeselect($event)" v-model="arraynamaverif2"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Kolom 1 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="kolom1" name="kolom1"
                                        placeholder="Kolom 1" v-model="kolom1">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Kolom 2 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="kolom2" name="kolom2"
                                        placeholder="Kolom 2" v-model="kolom2">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Kolom 3 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="kolom3" name="kolom3"
                                        placeholder="Kolom 3" v-model="kolom3">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Kolom 4 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="kolom4" name="kolom4"
                                        placeholder="Kolom 4" v-model="kolom4">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Kolom 5</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="kolom5" name="kolom5"
                                        placeholder="Kolom 5" v-model="kolom5">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Kolom Isian <small class="text-info"> (*wajib
                                        diisi jika ada)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="isian_kolom"
                                        name="isian_kolom" placeholder="Kolom Isian" v-model="isian_kolom">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Rumus Kolom 1 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="rumuskolom1"
                                        name="rumuskolom1" placeholder="Rumus Kolom 1" v-model="rumuskolom1">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Rumus Kolom 2 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="rumuskolom2"
                                        name="rumuskolom2" placeholder="Rumus Kolom 2" v-model="rumuskolom2">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Rumus Kolom 3 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="rumuskolom3"
                                        name="rumuskolom3" placeholder="Rumus Kolom 3" v-model="rumuskolom3">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Rumus Kolom 4 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="rumuskolom4"
                                        name="rumuskolom4" placeholder="Rumus Kolom 4" v-model="rumuskolom4">
                                </div>
                            </div>
                            <div class="col-sm-12" v-if="opsi == 'ISP'">
                                <label>Rumus Kolom 5 <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm" id="rumuskolom5"
                                        name="rumuskolom5" placeholder="Rumus Kolom 5" v-model="rumuskolom5">
                                </div>
                            </div>
                            <div class="col-sm-12"
                                v-if="opsi == 'ISS' || opsi == 'ISP' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Rumus<small class="text-info"> (*wajib
                                        dipilih)</small></label>
                                <v-select :options="hitungan_pk" :reduce="(label) => label.code" label="label"
                                    v-model="defaultSelectedhitungan_pk" @update:modelValue="onhitungan_pkChange"
                                    style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                            </div>
                            <div class="col-sm-12"
                                v-if="(opsi == 'ISS' || opsi == 'ISP' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO') && selectedhitungan_pk > 1">
                                <label>Jumlah Hitungan<small class="text-info"> (*wajib
                                        dipilih)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="jumlahkomponen"
                                        name="jumlahkomponen" placeholder="Jumlah Hitungan" v-model="tmpjumlahkomponen"
                                        @change="ubahkomponen()">
                                </div>
                            </div>
                            <div class="col-sm-12"
                                v-if="(opsi == 'ISS' || opsi == 'ISP' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO') && jumlahkomponen > 0 && selectedhitungan_pk > 1">
                                <div class="table-responsive table-wrapper" style="font-size: smaller !important;">
                                    <table class="table m-0" id="tabeldetail">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">No</th>
                                                <th style="width: 150px;">Nama Kolom</th>
                                                <th style="width: 150px;">Bobot Kolom</th>
                                                <th style="width: 150px;">Rumus Kolom</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="index in jumlahkomponen" :key="index"
                                                v-if="validasikomponen.length > 0">
                                                <tr>
                                                    <td class="text-center">{{ index }}</td>
                                                    <td>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i
                                                                        class="fab fa-creative-commons-share"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'kolomkomponen' + index" name="kolomkomponen"
                                                                placeholder="Kolom"
                                                                :value="validasikomponen[index - 1].kolomkomponen">
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i
                                                                        class="fab fa-creative-commons-share"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'bobotkomponen' + index" name="bobotkomponen"
                                                                placeholder="Bobot"
                                                                :value="validasikomponen[index - 1].bobotkomponen">
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i
                                                                        class="fab fa-creative-commons-share"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'rumuskomponen' + index" name="rumuskomponen"
                                                                placeholder="Rumus"
                                                                :value="validasikomponen[index - 1].rumuskomponen">
                                                        </div>
                                                    </td>
                                                </tr>
                                            </template>
                                            <template v-for="index in jumlahkomponen" :key="index"
                                                v-if="validasikomponen.length == 0">
                                                <tr>
                                                    <td class="text-center">{{ index }}</td>
                                                    <td>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i
                                                                        class="fab fa-creative-commons-share"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'kolomkomponen' + index" name="kolomkomponen"
                                                                placeholder="Kolom"
                                                                :value="validasikomponen[index - 1].kolomkomponen">
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i
                                                                        class="fab fa-creative-commons-share"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'bobotkomponen' + index" name="bobotkomponen"
                                                                placeholder="Bobot"
                                                                :value="validasikomponen[index - 1].bobotkomponen">
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i
                                                                        class="fab fa-creative-commons-share"></i></span>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'rumuskomponen' + index" name="rumuskomponen"
                                                                placeholder="Rumus"
                                                                :value="validasikomponen[index - 1].rumuskomponen">
                                                        </div>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-sm-12"
                                v-if="opsi == 'ISS' || opsi == 'ISP' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Angka Belakang Koma</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="belakangkoma"
                                        name="belakangkoma" placeholder="Angka Belakang Koma" v-model="belakangkoma">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <label>Urutan Data <small class="text-info"> (*wajib
                                        diisi)</small></label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i
                                                class="fab fa-creative-commons-share"></i></span>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="urut" name="urut"
                                        placeholder="Urutan Data" v-model="urut">
                                </div>
                            </div>
                            <div class="col-sm-12"
                                v-if="opsi == 'ISS' || opsi == 'ISP' || opsi == 'IKSK' || opsi == 'RO' || opsi == 'IRO'">
                                <label>Hitungan Data<small class="text-info"></small></label>
                                <div class="input-group mb-3">
                                    <input type="checkbox" :checked="kumulatif == 1" id="kumulatif"
                                        @click="pilihkumulatif()"> &nbsp;
                                    <label for="kumulatif" @click="pilihkumulatif()">Kumulatif</label>
                                </div>
                            </div>
                        </div>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-primary btn-sm lebar2 text-white" @click="simpan()">
                                <i class="fas fa-plus-square"></i>
                                Simpan
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
                            <h5>Indikator</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Indikator</li>
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
                            <div class="card cardputih collapsed-card">
                                <div class="card-header border-transparent bg-yellow" data-card-widget="collapse"
                                    style="cursor: pointer;">
                                    <label>Filter Kolom</label>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-plus" style="color: black;"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body px-3">
                                    <div class="row">
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxOpsi" value="optionOpsi" checked
                                                    @click="showOpsi = !showOpsi">
                                                <label for="customCheckboxOpsi" class="custom-control-label">
                                                    Opsi
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxTipe" value="optionTipe" checked
                                                    @click="showTipe = !showTipe">
                                                <label for="customCheckboxTipe" class="custom-control-label">
                                                    Tipe
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxKode" value="optionKode" checked
                                                    @click="showKode = !showKode">
                                                <label for="customCheckboxKode" class="custom-control-label">
                                                    Kode
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxKodeUnik" value="optionKodeUnik"
                                                    checked @click="showKodeUnique = !showKodeUnique">
                                                <label for="customCheckboxKodeUnik" class="custom-control-label">
                                                    Kode Unik
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxIndikator" value="optionIndikator"
                                                    checked @click="showIndikator = !showIndikator">
                                                <label for="customCheckboxIndikator" class="custom-control-label">
                                                    Indikator
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxSatuan" value="optionSatuan"
                                                    checked @click="showSatuan = !showSatuan">
                                                <label for="customCheckboxSatuan" class="custom-control-label">
                                                    Satuan
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxOuput" value="optionOuput" checked
                                                    @click="showOuput = !showOuput">
                                                <label for="customCheckboxOuput" class="custom-control-label">
                                                    Ouput
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxOuput" value="optionOuput" checked
                                                    @click="showOuput = !showOuput">
                                                <label for="customCheckboxOuput" class="custom-control-label">
                                                    Output
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxOutcome" value="optionOutcome"
                                                    checked @click="showOutcome = !showOutcome">
                                                <label for="customCheckboxOutcome" class="custom-control-label">
                                                    Outcome
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxPelaksana" value="optionPelaksana"
                                                    checked @click="showPelaksana = !showPelaksana">
                                                <label for="customCheckboxPelaksana" class="custom-control-label">
                                                    Pelaksana
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxRumus" value="optionRumus" checked
                                                    @click="showRumus = !showRumus">
                                                <label for="customCheckboxRumus" class="custom-control-label">
                                                    Rumus
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            <label>Pilihan Data Tahun</label>
                            <v-select :options="listtahun" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedtahun" @update:modelValue="ontahunChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            <input type="text" v-model="carikata" class="form-control form-control-sm"
                                placeholder="Masukkan Kata Kunci Pencarian">
                        </div>
                        <div class="col-sm-12 wow fadeInDown">&nbsp;</div>
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="table-responsive table-wrapper">
                                <table class="table m-0" id="tabeldata" style="font-size: smaller;">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;" v-if="showOpsi">Opsi</th>
                                            <th style="width: 50px;" v-if="showTipe">TIPE</th>
                                            <th style="width: 50px;" v-if="showKode">KODE</th>
                                            <th style="width: 50px;" v-if="showKodeUnique">KODE UNIK</th>
                                            <th style="width: 250px;" v-if="showIndikator">UNIT ORGANISASI / SASARAN
                                                STRATEGIS / PROGRAM / SASARAN
                                                PROGRAM / INDIKATOR SASARAN PROGRAM / KEGIATAN / SASARAN KEGIATAN /
                                                INDIKATOR
                                                SASARAN KEGIATAN / KRO / RO
                                            </th>
                                            <th style="width: 150px;" v-if="showSatuan">SATUAN</th>
                                            <th style="width: 150px;" v-if="showOuput">OUTPUT</th>
                                            <th style="width: 150px;" v-if="showOutcome">OUTCOME</th>
                                            <th style="width: 150px;" v-if="showPelaksana">PELAKSANA</th>
                                            <th style="width: 50px;" v-if="showRumus">RUMUS</th>
                                        </tr>
                                    </thead>
                                    <template v-for="(datalist, urutlist) in filteredKataData" :key="urutlist">
                                        <tbody>
                                            <tr>
                                                <td class="text-center" :class="datalist.class" v-if="showOpsi">
                                                    <div class="btn-group" v-if="datalist.level == 'UNOR'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('SS', null, datalist.id, datalist.kdunor, 2, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">SASARAN
                                                                STRATEGIS</a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group" v-if="datalist.level == 'SS'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('ISS', null, datalist.id, datalist.kdunor, 3, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">INDIKATOR
                                                                KINERJA SASARAN STRATEGIS</a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group" v-if="datalist.level == 'ISS'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('PROGRAM', null, datalist.id, datalist.kdunor, 4, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">PROGRAM</a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group" v-if="datalist.level == 'PROGRAM'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('SP', null, datalist.id, datalist.kdunor, 5, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">
                                                                SASARAN PROGRAM
                                                            </a>
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('KEGIATAN', null, datalist.id, datalist.kdunor, 7, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">
                                                                KEGIATAN
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group" v-if="datalist.level == 'SP'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('ISP', null, datalist.id, datalist.kdunor, 6, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">INDIKATOR
                                                                KINERJA PROGRAM
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group" v-if="datalist.level == 'KEGIATAN'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('SK', null, datalist.id, datalist.kdunor, 8, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">
                                                                SASARAN KEGIATAN
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group" v-if="datalist.level == 'SK'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('IKSK', null, datalist.id, datalist.kdunor, 9, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">
                                                                INDIKATOR KINERJA KEGIATAN
                                                            </a>
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('KRO', null, datalist.id, datalist.kdunor, 10, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">
                                                                KLASIFIKASI RINCIAN OUTPUT
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group" v-if="datalist.level == 'KRO'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('RO', null, datalist.id, datalist.kdunor, 11, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">
                                                                RINCIAN OUTPUT
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group" v-if="datalist.level == 'RO'">
                                                        <button type="btn btn-primary3 lebar4 btn-sm text-white"
                                                            style="font-size: smaller !important;display: none;"
                                                            class="btn btn-danger3 btn-sm dropdown-toggle dropdown-icon text-white"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            <i class="fas fa-plus"></i>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tambah&nbsp;&nbsp;
                                                            <span class="sr-only"> Toggle Dropdown</span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu"
                                                            style="font-size: smaller !important;display: none;">
                                                            <a class="dropdown-item" href="javascript:void(0)"
                                                                @click="prosesdata('IRO', null, datalist.id, datalist.kdunor, 12, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Tambah')">
                                                                INDIKATOR RINCIAN OUTPUT
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <button type="button"
                                                        class="btn btn-primary3 lebar4 btn-sm text-white"
                                                        style="font-size: smaller !important;"
                                                        @click="prosesdata(datalist.level, datalist.id, datalist.id_parent, datalist.kdunor, datalist.urutlevel, datalist.kode, datalist.textindikator, datalist.urut, datalist.satuan, datalist.output, datalist.outcome, datalist.kode_unique, datalist.pelaksana, datalist.pelaksanacode, datalist.pelaksanalabel, datalist.cetak, datalist.cetakcode, datalist.cetaklabel, datalist.verif, datalist.verifcode, datalist.veriflabel, datalist.verif2, datalist.verif2code, datalist.verif2label, datalist.hitungan_pk, datalist.kolom1, datalist.kolom2, datalist.kolom3, datalist.kolom4, datalist.kolom5, datalist.rumuskolom1, datalist.rumuskolom2, datalist.rumuskolom3, datalist.rumuskolom4, datalist.rumuskolom5, datalist.isian_kolom, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datalist.belakangkoma, datalist.kumulatif, 'Edit')"
                                                        data-toggle="tooltip" data-placement="left"
                                                        title="Edit data.."><i class="fas fa-edit"></i>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit
                                                        Data</button>
                                                    <button type="button"
                                                        class="btn btn-danger lebar4 btn-sm text-white"
                                                        style="font-size: smaller !important;"
                                                        @click="hapus(datalist.id)" data-toggle="tooltip"
                                                        data-placement="left" title="Hapus data.."><i
                                                            class="fas fa-trash-alt"></i>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hapus Data</button>
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showTipe">
                                                    {{ datalist.level }}
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showKode">
                                                    {{ datalist.kode }}
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showKodeUnique">
                                                    {{ datalist.kode_unique }}
                                                </td>
                                                <td :class="datalist.class" v-if="showIndikator">
                                                    {{ datalist.textindikator }}
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showSatuan">
                                                    <span v-html="datalist.namasatuan"></span>
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showOuput">
                                                    <span v-html="datalist.namaoutput"></span>
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showOutcome">
                                                    <span v-html="datalist.namaoutcome"></span>
                                                </td>
                                                <td :class="datalist.class" v-if="showPelaksana">
                                                    {{ datalist.pelaksanalabel }}
                                                </td>
                                                <td :class="datalist.class" v-if="showRumus">
                                                    {{ datalist.namahitungan_pk }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                    <tbody v-if="(datapesan == 'data kosong')">
                                        <tr>
                                            <td class="text-center">
                                                <button type="button" class="btn btn-danger3 btn-sm text-white"
                                                    @click="prosesdata('UNOR', null, null, null, '1', null, null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', '0', 'Tambah')"
                                                    data-toggle="tooltip" data-placement="left" title="Tambah Unor.."
                                                    style="font-size: smaller !important;">
                                                    <i class="fas fa-plus"></i> Tambah Unor
                                                </button>
                                            </td>
                                            <td colspan="8">Data masih kosong</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            &nbsp;
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            &nbsp;
                        </div>
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
            showOpsi: true,
            showTipe: true,
            showKode: true,
            showKodeUnique: true,
            showIndikator: true,
            showSatuan: true,
            showOuput: true,
            showOutcome: true,
            showPelaksana: true,
            showRumus: true,
            carikata: '',
            iduser: JSON.parse(localStorage.getItem("usistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            datapesanreff: '',
            datapesan: '',
            datamaster: [],
            mode: '',
            kode: '',
            kode_unique: '',
            opsi: '',
            id: '',
            parent: '',
            level: '',
            nama: '',
            urut: 1,
            tahun: new Date().getFullYear(),
            kdunor: [],
            datakdunor: [],
            defaultSelectedkdunor: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkdunor: '',

            satuan: [],
            datasatuan: [],
            defaultSelectedsatuan: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedsatuan: '',

            output: [],
            dataoutput: [],
            defaultSelectedoutput: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedoutput: '',

            outcome: [],
            dataoutcome: [],
            defaultSelectedoutcome: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedoutcome: '',


            listtahun: [],
            datatahun: [],
            defaultSelectedtahun: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: 0,
            },
            selectedtahun: '',

            pelaksana: [],
            datapelaksana: [],
            defaultSelectedpelaksana: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedpelaksana: '',
            paramselectedpelaksana: [],
            paramselectedpelaksanacode: [],
            paramselectedpelaksanalabel: [],
            arraynamapelaksana: [],

            cetak: [],
            datacetak: [],
            defaultSelectedcetak: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedcetak: '',
            paramselectedcetak: [],
            paramselectedcetakcode: [],
            paramselectedcetaklabel: [],
            arraynamacetak: [],

            verif: [],
            dataverif: [],
            defaultSelectedverif: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedverif: '',
            paramselectedverif: [],
            paramselectedverifcode: [],
            paramselectedveriflabel: [],
            arraynamaverif: [],

            verif2: [],
            dataverif2: [],
            defaultSelectedverif2: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedverif2: '',
            paramselectedverif2: [],
            paramselectedverif2code: [],
            paramselectedverif2label: [],
            arraynamaverif2: [],

            isSelectDisabled: true,

            hitungan_pk: [],
            datahitungan_pk: [],
            defaultSelectedhitungan_pk: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedhitungan_pk: '',
            kolom1: '',
            kolom2: '',
            kolom3: '',
            kolom4: '',
            kolom5: '',
            rumuskolom1: '',
            rumuskolom2: '',
            rumuskolom3: '',
            rumuskolom4: '',
            rumuskolom5: '',
            isian_kolom: '',
            jumlahkomponen: 0,
            tmpjumlahkomponen: 0,
            kolomkomponen: '',
            bobotkomponen: '',
            rumuskomponen: '',
            validasikomponen: [],
            validasi: false,
            belakangkoma: 2,
            kumulatif: 0,
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
        pilihkumulatif() {
            if (document.getElementById('kumulatif').checked == true) {
                this.kumulatif = 1;
            }
            else {
                this.kumulatif = 0;
            }
        },
        onpelaksanaChangeSelect(events) {
            this.paramselectedpelaksana = [];
            this.paramselectedpelaksanacode = [];
            this.paramselectedpelaksanalabel = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedpelaksana.push((events[i].tag));
                this.paramselectedpelaksanacode.push((events[i].code));
                this.paramselectedpelaksanalabel.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselectedpelaksana));
        },
        onpelaksanaChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedpelaksana);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedpelaksana.length; i++) {
                if (this.paramselectedpelaksana[i] !== yghilang) {
                    temparray.push(this.paramselectedpelaksana[i]);
                }
            }
            for (let i = 0; i < this.paramselectedpelaksanacode.length; i++) {
                if (this.paramselectedpelaksanacode[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedpelaksanacode[i]);
                }
            }
            for (let i = 0; i < this.paramselectedpelaksanalabel.length; i++) {
                if (this.paramselectedpelaksanalabel[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedpelaksanalabel[i]);
                }
            }
            this.paramselectedpelaksana = temparray;
            this.paramselectedpelaksanacode = temparraycode;
            this.paramselectedpelaksanalabel = temparraylabel;
            //alert(JSON.stringify(this.paramselectedpelaksanalabel));
        },
        oncetakChangeSelect(events) {
            this.paramselectedcetak = [];
            this.paramselectedcetakcode = [];
            this.paramselectedcetaklabel = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedcetak.push((events[i].tag));
                this.paramselectedcetakcode.push((events[i].code));
                this.paramselectedcetaklabel.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselectedcetak));
        },
        oncetakChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedcetak);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedcetak.length; i++) {
                if (this.paramselectedcetak[i] !== yghilang) {
                    temparray.push(this.paramselectedcetak[i]);
                }
            }
            for (let i = 0; i < this.paramselectedcetakcode.length; i++) {
                if (this.paramselectedcetakcode[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedcetakcode[i]);
                }
            }
            for (let i = 0; i < this.paramselectedcetaklabel.length; i++) {
                if (this.paramselectedcetaklabel[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedcetaklabel[i]);
                }
            }
            this.paramselectedcetak = temparray;
            this.paramselectedcetakcode = temparraycode;
            this.paramselectedcetaklabel = temparraylabel;
            //alert(JSON.stringify(this.paramselectedcetaklabel));
        },
        onverifChangeSelect(events) {
            this.paramselectedverif = [];
            this.paramselectedverifcode = [];
            this.paramselectedveriflabel = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedverif.push((events[i].tag));
                this.paramselectedverifcode.push((events[i].code));
                this.paramselectedveriflabel.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselectedverif));
        },
        onverifChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedverif);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedverif.length; i++) {
                if (this.paramselectedverif[i] !== yghilang) {
                    temparray.push(this.paramselectedverif[i]);
                }
            }
            for (let i = 0; i < this.paramselectedverifcode.length; i++) {
                if (this.paramselectedverifcode[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedverifcode[i]);
                }
            }
            for (let i = 0; i < this.paramselectedveriflabel.length; i++) {
                if (this.paramselectedveriflabel[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedveriflabel[i]);
                }
            }
            this.paramselectedverif = temparray;
            this.paramselectedverifcode = temparraycode;
            this.paramselectedveriflabel = temparraylabel;
            //alert(JSON.stringify(this.paramselectedveriflabel));
        },
        onverif2ChangeSelect(events) {
            this.paramselectedverif2 = [];
            this.paramselectedverif2code = [];
            this.paramselectedverif2label = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedverif2.push((events[i].tag));
                this.paramselectedverif2code.push((events[i].code));
                this.paramselectedverif2label.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselectedverif2));
        },
        onverif2ChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedverif2);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedverif2.length; i++) {
                if (this.paramselectedverif2[i] !== yghilang) {
                    temparray.push(this.paramselectedverif2[i]);
                }
            }
            for (let i = 0; i < this.paramselectedverif2code.length; i++) {
                if (this.paramselectedverif2code[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedverif2code[i]);
                }
            }
            for (let i = 0; i < this.paramselectedverif2label.length; i++) {
                if (this.paramselectedverif2label[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedverif2label[i]);
                }
            }
            this.paramselectedverif2 = temparray;
            this.paramselectedverif2code = temparraycode;
            this.paramselectedverif2label = temparraylabel;
            //alert(JSON.stringify(this.paramselectedverif2label));
        },
        onkdunorChange(a) {
            try {
                this.selectedkdunor = this.kdunor[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onsatuanChange(a) {
            try {
                this.selectedsatuan = this.satuan[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onhitungan_pkChange(a) {
            try {
                this.selectedhitungan_pk = this.hitungan_pk[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onoutputChange(a) {
            try {
                this.selectedoutput = this.output[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onoutcomeChange(a) {
            try {
                this.selectedoutcome = this.outcome[a].tag;
            }
            catch (err) {
                return;
            }
        },
        ontahunChange(a) {
            try {
                this.selectedtahun = this.listtahun[a].tag;
                this.ambildata();
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
            await mainAPIData.get("parastapainnovationreff-GetSatuan?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datasatuan = [];
                        this.satuan = [];
                        this.datasatuan = Response.data.content.data;
                        this.datasatuan.forEach((item) => {
                            this.satuan.push({
                                label: item.nama,
                                code: this.datasatuan.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.satuan.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });

                        this.dataoutput = [];
                        this.output = [];
                        this.dataoutput = Response.data.content.data;
                        this.dataoutput.forEach((item) => {
                            this.output.push({
                                label: item.nama,
                                code: this.dataoutput.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.output.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });

                        this.dataoutcome = [];
                        this.outcome = [];
                        this.dataoutcome = Response.data.content.data;
                        this.dataoutcome.forEach((item) => {
                            this.outcome.push({
                                label: item.nama,
                                code: this.dataoutcome.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.outcome.unshift({
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
            await mainAPIData.get("parastapainnovationreff-RenstraTahun?random=" + random).then(
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
                                tag: item.id,
                            });
                            if (item.is_active == '1') {
                                this.selectedtahun = item.id;
                                this.defaultSelectedtahun = {
                                    code: this.datatahun.indexOf(item),
                                    label: item.tahun,
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
            })

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetLevelPIU?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datapelaksana = [];
                        this.pelaksana = [];
                        this.datapelaksana = Response.data.content.data;
                        this.datapelaksana.forEach((item) => {
                            this.pelaksana.push({
                                label: item.nama,
                                code: this.datapelaksana.indexOf(item),
                                tag: item.id,
                            });
                        });

                        this.datacetak = [];
                        this.cetak = [];
                        this.datacetak = Response.data.content.data;
                        this.datacetak.forEach((item) => {
                            this.cetak.push({
                                label: item.nama,
                                code: this.datacetak.indexOf(item),
                                tag: item.id,
                            });
                        });

                        this.dataverif = [];
                        this.verif = [];
                        this.dataverif = Response.data.content.data;
                        this.dataverif.forEach((item) => {
                            this.verif.push({
                                label: item.nama,
                                code: this.dataverif.indexOf(item),
                                tag: item.id,
                            });
                        });

                        this.dataverif2 = [];
                        this.verif2 = [];
                        this.dataverif2 = Response.data.content.data;
                        this.dataverif2.forEach((item) => {
                            this.verif2.push({
                                label: item.nama,
                                code: this.dataverif2.indexOf(item),
                                tag: item.id,
                            });
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
            await mainAPIData.get("parastapainnovationreff-GetNilai?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datahitungan_pk = [];
                        this.hitungan_pk = [];
                        this.datahitungan_pk = Response.data.content.data;
                        this.datahitungan_pk.forEach((item) => {
                            this.hitungan_pk.push({
                                label: item.nama,
                                code: this.datahitungan_pk.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.hitungan_pk.unshift({
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
        async ambildata() {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPI.get("indikatorAwal-GetData?random=" + random + "&tahun=" + this.selectedtahun).then(
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
        ubahkomponen() {
            //alert(this.tmpjumlahkomponen);
            this.validasikomponen = [];
            var kolomkomponentmp = this.kolomkomponen.split("#");
            var bobotkomponentmp = this.bobotkomponen.split("#");
            var rumuskomponentmp = this.rumuskomponen.split("#");
            for (let i = 0; i < this.tmpjumlahkomponen; i++) {
                this.validasikomponen.push({
                    kolomkomponen: kolomkomponentmp[i],
                    bobotkomponen: bobotkomponentmp[i],
                    rumuskomponen: rumuskomponentmp[i],
                });

            }
            this.jumlahkomponen = this.tmpjumlahkomponen;
        },
        prosesdata(tipe, id, parent, unor, level, kode, nama, urut, satuan, output, outcome, kode_unique, pelaksana, pelaksanacode, pelaksanalabel, cetak, cetakcode, cetaklabel, verif, verifcode, veriflabel, verif2, verif2code, verif2label, hitungan_pk, kolom1, kolom2, kolom3, kolom4, kolom5, rumuskolom1, rumuskolom2, rumuskolom3, rumuskolom4, rumuskolom5, isian_kolom, jumlahkomponen, kolomkomponen, bobotkomponen, rumuskomponen, belakangkoma, kumulatif, mode) {
            this.kumulatif = kumulatif;
            this.opsi = tipe;
            this.belakangkoma = belakangkoma;
            this.parent = parent;
            this.id = id;
            this.selectedkdunor = unor;
            this.level = level;
            this.mode = mode;
            this.kolom1 = kolom1;
            this.kolom2 = kolom2;
            this.kolom3 = kolom3;
            this.kolom4 = kolom4;
            this.kolom5 = kolom5;
            this.rumuskolom1 = rumuskolom1;
            this.rumuskolom2 = rumuskolom2;
            this.rumuskolom3 = rumuskolom3;
            this.rumuskolom4 = rumuskolom4;
            this.rumuskolom5 = rumuskolom5;
            this.isian_kolom = isian_kolom;
            this.jumlahkomponen = jumlahkomponen;
            this.tmpjumlahkomponen = jumlahkomponen;
            this.kolomkomponen = kolomkomponen;
            this.bobotkomponen = bobotkomponen;
            this.rumuskomponen = rumuskomponen;
            this.validasikomponen = [];
            this.tahun = this.selectedtahun;
            var kolomkomponentmp = this.kolomkomponen.split("#");
            var bobotkomponentmp = this.bobotkomponen.split("#");
            var rumuskomponentmp = this.rumuskomponen.split("#");
            for (let i = 0; i < this.jumlahkomponen; i++) {
                this.validasikomponen.push({
                    kolomkomponen: kolomkomponentmp[i],
                    bobotkomponen: bobotkomponentmp[i],
                    rumuskomponen: rumuskomponentmp[i],
                });

            }
            if (this.mode == 'Tambah') {
                this.nama = '';
                this.kode = '';
                this.kode_unique = '';
                this.selectedsatuan = '';
                this.selectedoutput = '';
                this.selectedoutcome = '';
                this.defaultSelectedsatuan = {
                    code: 0,
                    label: 'Pilih Salah Satu',
                    tag: '',
                };
                this.defaultSelectedoutput = {
                    code: 0,
                    label: 'Pilih Salah Satu',
                    tag: '',
                };
                this.defaultSelectedoutcome = {
                    code: 0,
                    label: 'Pilih Salah Satu',
                    tag: '',
                };
                this.defaultSelectedhitungan_pk = {
                    code: 0,
                    label: 'Pilih Salah Satu',
                    tag: '',
                };
                this.urut = 1;
            }
            else {
                this.paramselectedpelaksana = [];
                this.paramselectedpelaksanacode = [];
                this.paramselectedpelaksanalabel = [];
                this.arraynamapelaksana = [];
                this.paramselectedcetak = [];
                this.paramselectedcetakcode = [];
                this.paramselectedcetaklabel = [];
                this.arraynamacetak = [];
                this.paramselectedverif = [];
                this.paramselectedverifcode = [];
                this.paramselectedveriflabel = [];
                this.arraynamaverif = [];
                this.paramselectedverif2 = [];
                this.paramselectedverif2code = [];
                this.paramselectedverif2label = [];
                this.arraynamaverif2 = [];
                this.nama = nama;
                this.kode = kode;
                this.kode_unique = kode_unique;
                this.selectedsatuan = satuan;
                this.selectedoutput = output;
                this.selectedoutcome = outcome;
                this.selectedhitungan_pk = hitungan_pk;

                if ((pelaksana != '') && (pelaksana != null)) {
                    var temppelaksana = pelaksana.split(',');
                    for (let i = 0; i < temppelaksana.length; i++) {
                        this.paramselectedpelaksana.push(temppelaksana[i]);
                    }

                    var temppelaksanacode = pelaksanacode.split(',');
                    for (let i = 0; i < temppelaksanacode.length; i++) {
                        this.paramselectedpelaksanacode.push(temppelaksanacode[i]);
                    }

                    var temppelaksanalabel = pelaksanalabel.split(',');
                    for (let i = 0; i < temppelaksanalabel.length; i++) {
                        this.paramselectedpelaksanalabel.push(temppelaksanalabel[i]);
                    }

                    if ((pelaksanalabel != '') && (pelaksanalabel != null)) {
                        var myArray = pelaksana.split(",");
                        var myArraylabel = pelaksanalabel.split(",");
                        var myArraycode = pelaksanacode.split(",");
                        //alert(myArray.length);
                        this.arraynamapelaksana = [];
                        for (let i = 0; i < myArray.length; i++) {
                            this.arraynamapelaksana.push({
                                label: myArraylabel[i],
                                code: parseInt(myArraycode[i]),
                                tag: myArray[i],
                            });
                        }
                    }
                }

                if ((cetak != '') && (cetak != null)) {
                    var tempcetak = cetak.split(',');
                    for (let i = 0; i < tempcetak.length; i++) {
                        this.paramselectedcetak.push(tempcetak[i]);
                    }

                    var tempcetakcode = cetakcode.split(',');
                    for (let i = 0; i < tempcetakcode.length; i++) {
                        this.paramselectedcetakcode.push(tempcetakcode[i]);
                    }

                    var tempcetaklabel = cetaklabel.split(',');
                    for (let i = 0; i < tempcetaklabel.length; i++) {
                        this.paramselectedcetaklabel.push(tempcetaklabel[i]);
                    }

                    if ((cetaklabel != '') && (cetaklabel != null)) {
                        var myArraycetak = cetak.split(",");
                        var myArraylabelcetak = cetaklabel.split(",");
                        var myArraycodecetak = cetakcode.split(",");
                        //alert(myArray.length);
                        this.arraynamacetak = [];
                        for (let i = 0; i < myArraycetak.length; i++) {
                            this.arraynamacetak.push({
                                label: myArraylabelcetak[i],
                                code: parseInt(myArraycodecetak[i]),
                                tag: myArraycetak[i],
                            });
                        }
                    }
                }

                if ((verif != '') && (verif != null)) {
                    var tempverif = verif.split(',');
                    for (let i = 0; i < tempverif.length; i++) {
                        this.paramselectedverif.push(tempverif[i]);
                    }

                    var tempverifcode = verifcode.split(',');
                    for (let i = 0; i < tempverifcode.length; i++) {
                        this.paramselectedverifcode.push(tempverifcode[i]);
                    }

                    var tempveriflabel = veriflabel.split(',');
                    for (let i = 0; i < tempveriflabel.length; i++) {
                        this.paramselectedveriflabel.push(tempveriflabel[i]);
                    }

                    if ((veriflabel != '') && (veriflabel != null)) {
                        var myArrayverif = verif.split(",");
                        var myArraylabelverif = veriflabel.split(",");
                        var myArraycodeverif = verifcode.split(",");
                        //alert(myArray.length);
                        this.arraynamaverif = [];
                        for (let i = 0; i < myArrayverif.length; i++) {
                            this.arraynamaverif.push({
                                label: myArraylabelverif[i],
                                code: parseInt(myArraycodeverif[i]),
                                tag: myArrayverif[i],
                            });
                        }
                    }
                }

                if ((verif2 != '') && (verif2 != null)) {
                    var tempverif2 = verif2.split(',');
                    for (let i = 0; i < tempverif2.length; i++) {
                        this.paramselectedverif2.push(tempverif2[i]);
                    }

                    var tempverif2code = verif2code.split(',');
                    for (let i = 0; i < tempverif2code.length; i++) {
                        this.paramselectedverif2code.push(tempverif2code[i]);
                    }

                    var tempverif2label = verif2label.split(',');
                    for (let i = 0; i < tempverif2label.length; i++) {
                        this.paramselectedverif2label.push(tempverif2label[i]);
                    }

                    if ((verif2label != '') && (verif2label != null)) {
                        var myArrayverif2 = verif2.split(",");
                        var myArraylabelverif2 = verif2label.split(",");
                        var myArraycodeverif2 = verif2code.split(",");
                        //alert(myArray.length);
                        this.arraynamaverif2 = [];
                        for (let i = 0; i < myArrayverif2.length; i++) {
                            this.arraynamaverif2.push({
                                label: myArraylabelverif2[i],
                                code: parseInt(myArraycodeverif2[i]),
                                tag: myArrayverif2[i],
                            });
                        }
                    }
                }

                this.urut = urut;
            }

            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            mainAPIData.get("parastapainnovationreff-GetUnor?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
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
            mainAPIData.get("parastapainnovationreff-GetSatuan?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datasatuan = [];
                        this.satuan = [];
                        this.datasatuan = Response.data.content.data;
                        this.datasatuan.forEach((item) => {
                            this.satuan.push({
                                label: item.nama,
                                code: this.datasatuan.indexOf(item) + 1,
                                tag: item.id,
                            });
                            if (item.id == this.selectedsatuan) {
                                this.defaultSelectedsatuan = {
                                    code: this.datasatuan.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };
                            }
                        });
                        this.satuan.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });

                        this.dataoutput = [];
                        this.output = [];
                        this.dataoutput = Response.data.content.data;
                        this.dataoutput.forEach((item) => {
                            this.output.push({
                                label: item.nama,
                                code: this.dataoutput.indexOf(item) + 1,
                                tag: item.id,
                            });
                            if (item.id == this.selectedoutput) {
                                this.defaultSelectedoutput = {
                                    code: this.dataoutput.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };
                            }
                        });
                        this.output.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });

                        this.dataoutcome = [];
                        this.outcome = [];
                        this.dataoutcome = Response.data.content.data;
                        this.dataoutcome.forEach((item) => {
                            this.outcome.push({
                                label: item.nama,
                                code: this.dataoutcome.indexOf(item) + 1,
                                tag: item.id,
                            });
                            if (item.id == this.selectedoutcome) {
                                this.defaultSelectedoutcome = {
                                    code: this.dataoutcome.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };
                            }
                        });
                        this.outcome.unshift({
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
            mainAPIData.get("parastapainnovationreff-GetNilai?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datahitungan_pk = [];
                        this.hitungan_pk = [];
                        this.datahitungan_pk = Response.data.content.data;
                        this.datahitungan_pk.forEach((item) => {
                            this.hitungan_pk.push({
                                label: item.nama,
                                code: this.datahitungan_pk.indexOf(item) + 1,
                                tag: item.id,
                            });
                            if (item.id == this.selectedhitungan_pk) {
                                this.defaultSelectedhitungan_pk = {
                                    code: this.datahitungan_pk.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };
                            }
                        });
                        this.hitungan_pk.unshift({
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

            $('#costumModalopsi').modal('show');
        },
        validasidata() {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if ((this.selectedtahun == '') || (this.selectedtahun == null) || (this.selectedtahun == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Tahun Data',
                });
                document.getElementById('tahun').focus();
                return false;
            }
            if ((document.getElementById('opsi').value == 'UNOR') && ((this.selectedkdunor == '') || (this.selectedkdunor == null) || (this.selectedkdunor == undefined))) {
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
            this.validasi = true;
            return;
        },
        simpan() {
            this.validasidata();
            if (this.validasi == false) {
                return false;
            }
            //alert(this.jumlahkomponen);
            var kolomkomponen = "";
            var bobotkomponen = "";
            var rumuskomponen = "";
            for (let i = 1; i <= this.jumlahkomponen; i++) {
                if (i == 1) {
                    kolomkomponen = kolomkomponen + document.getElementById('kolomkomponen' + i).value;
                    bobotkomponen = bobotkomponen + document.getElementById('bobotkomponen' + i).value;
                    rumuskomponen = rumuskomponen + document.getElementById('rumuskomponen' + i).value;
                }
                else {
                    kolomkomponen = kolomkomponen + '#' + document.getElementById('kolomkomponen' + i).value;
                    bobotkomponen = bobotkomponen + '#' + document.getElementById('bobotkomponen' + i).value;
                    rumuskomponen = rumuskomponen + '#' + document.getElementById('rumuskomponen' + i).value;
                }
                //alert(kolomkomponen);
                //alert(bobotkomponen);
                //alert(rumuskomponen);
            }
            //return;
            var fd = new FormData();
            fd.append("mode", this.mode);
            fd.append("urutlevel", this.level);
            fd.append("id", this.id);
            fd.append("kode", this.kode);
            fd.append("kode_unique", this.kode_unique);
            fd.append("id_parent", this.parent);
            fd.append("tahun", this.tahun);
            fd.append("kdunor", this.selectedkdunor);
            fd.append("level", this.opsi);
            fd.append("nama", this.nama);
            fd.append("satuan", this.selectedsatuan);
            fd.append("hitungan_pk", this.selectedhitungan_pk);
            fd.append("output", this.selectedoutput);
            fd.append("outcome", this.selectedoutcome);
            fd.append("pelaksana", this.paramselectedpelaksana);
            fd.append("pelaksanacode", this.paramselectedpelaksanacode);
            fd.append("pelaksanalabel", this.paramselectedpelaksanalabel);
            fd.append("cetak", this.paramselectedcetak);
            fd.append("cetakcode", this.paramselectedcetakcode);
            fd.append("cetaklabel", this.paramselectedcetaklabel);
            fd.append("verif", this.paramselectedverif);
            fd.append("verifcode", this.paramselectedverifcode);
            fd.append("veriflabel", this.paramselectedveriflabel);
            fd.append("verif2", this.paramselectedverif2);
            fd.append("verif2code", this.paramselectedverif2code);
            fd.append("verif2label", this.paramselectedverif2label);
            fd.append("hitungan_pk", this.selectedhitungan_pk);
            fd.append("kolom1", this.kolom1);
            fd.append("kolom2", this.kolom2);
            fd.append("kolom3", this.kolom3);
            fd.append("kolom4", this.kolom4);
            fd.append("kolom5", this.kolom5);
            fd.append("rumuskolom1", this.rumuskolom1);
            fd.append("rumuskolom2", this.rumuskolom2);
            fd.append("rumuskolom3", this.rumuskolom3);
            fd.append("rumuskolom4", this.rumuskolom4);
            fd.append("rumuskolom5", this.rumuskolom5);
            fd.append("isian_kolom", this.isian_kolom);
            fd.append("jumlahkomponen", this.jumlahkomponen);
            fd.append("kolomkomponen", kolomkomponen);
            fd.append("bobotkomponen", bobotkomponen);
            fd.append("rumuskomponen", rumuskomponen);
            fd.append("urut", this.urut);
            fd.append("belakangkoma", this.belakangkoma);
            fd.append("kumulatif", this.kumulatif);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));
            if (this.mode != 'Tambah') {
                swal.fire({
                    title: "Konfirmasi",
                    text: "Reset data indikator terpilih karena perubahan rumus?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Tidak",
                    confirmButtonColor: "#003d68",
                    cancelButtonColor: "#ffaa05",
                    confirmButtonText: "Reset"
                }).then((result) => {
                    if (result.isConfirmed) {
                        fd.append("rubahrumus", "1");
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                "Content-Type": "form-data",
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            },
                        });
                        mainAPI.post("indikatorAwal-Add", fd).then(
                            Response => {
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                                        window.location.replace("/IndikatorAwal");
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
                    else {
                        fd.append("rubahrumus", "0");
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                "Content-Type": "form-data",
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            },
                        });
                        mainAPI.post("indikatorAwal-Add", fd).then(
                            Response => {
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                                        window.location.replace("/IndikatorAwal");
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
            }
            else {
                fd.append("rubahrumus", "0");
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                mainAPI.post("indikatorAwal-Add", fd).then(
                    Response => {
                        if (Response.data.response == 'error') {
                            swal.fire('Peringatan', Response.data.message, 'error');
                        }
                        else {
                            swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                                window.location.replace("/IndikatorAwal");
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
        },
        hapus(id) {
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
                    const data = { id: id, deletedby: JSON.parse(localStorage.getItem("usistem")) }
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    mainAPI.post("indikatorAwal-Delete", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire('Informasi', 'Data telah dihapus..', 'success').then(function () {
                                    window.location.replace("/IndikatorAwal");
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
        this.AmbilDataReff();
        this.ambildata();
    }
}
</script>
<style></style>