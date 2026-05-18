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
                            <input type="hidden" class="form-control form-control-sm" id="id" name="id" placeholder="id"
                                v-model="id">

                            <div class="col-sm-12">
                                <label>Tahun
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fab fa-creative-commons-share"></i>
                                        </span>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="tahun" name="tahun"
                                        placeholder="Tahun" v-model="tahun">
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <div id="drag_drop" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                                    Drag & Drop File Disini
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <input type="file" multiple name="file" id="fileInput" class="hidden-input"
                                    @change="onChange" ref="file" accept="application/pdf" />
                                <br>
                                <div class="row" v-if="files.length">
                                    <div v-for="file in files" :key="file.name" class="row">
                                        <div class="col-sm-10 float-left">
                                            {{ file.name }}
                                            <input type="hidden" class="form-control form-control-sm"
                                                :id="'pic' + files.indexOf(file)" placeholder="File Beranda">
                                        </div>
                                        <div class="col-sm-2 text-right">
                                            <button type="button" class="btn btn-sm btn-danger3 float-right text-white"
                                                @click="remove(files.indexOf(file))" data-toggle="tooltip"
                                                data-placement="left" title="Hapus file.."><i
                                                    class="fas fa-window-close"></i></button>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="progress">
                                                <div class="progress-bar" role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width:0%"
                                                    :id="'persennyapic' + files.indexOf(file)">
                                                    <span :id="'tulisanpersenpic' + files.indexOf(file)">0%</span>
                                                </div>
                                            </div>
                                            <br>
                                            <span class="text-success"
                                                :id="'suksesnyapic' + files.indexOf(file)"></span>
                                        </div>
                                    </div>
                                    <div class="col-sm-12" v-if="files.length">
                                        <button type="button"
                                            class="btn btn-sm btn-success float-left text-white lebar2"
                                            @click="upload()" data-toggle="tooltip" data-placement="left"
                                            title="Update data..">
                                            <i class="fas fa-upload"></i> Upload Data
                                        </button>
                                    </div>
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

        <div class="modal fade" id="costumModalCekopsi" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-yellow">
                        <h4 class="modal-title">Evaluasi Data {{ opsi }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row">
                            <input type="hidden" class="form-control form-control-sm" id="mode" name="mode"
                                placeholder="mode" v-model="mode">
                            <input type="hidden" class="form-control form-control-sm" id="id" name="id" placeholder="id"
                                v-model="id">

                            <template v-for="(isiandatalist, urutlist) in isiandata" :key="urutlist">
                                <div class="col-sm-12">
                                    <object class="pdf" :data="folder_preview + isiandatalist.dokumen"
                                        style="width:100%;height: 45vh;">
                                    </object>
                                </div>
                            </template>

                            <div class="col-sm-12">
                                <label>Tahun
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fab fa-creative-commons-share"></i>
                                        </span>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="tahun_evaluasi"
                                        name="tahun" placeholder="Tahun" v-model="tahun">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <label>Pemenuhan Kriteria
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <select class="form-control form-control-sm" name="kriteria_penilaian1"
                                    id="kriteria_penilaian1" v-model="kriteria_penilaian1">
                                    <option value="">-- Pilih Opsi --</option>
                                    <option value="1">Ada</option>
                                    <option value="0">Tidak Ada</option>
                                </select>
                            </div>

                            <div class="col-sm-12">
                                <label>Terpenuhi dan sesuai Kebijakan Mandat nasional
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <select class="form-control form-control-sm" name="kriteria_penilaian2"
                                    id="kriteria_penilaian2" v-model="kriteria_penilaian2">
                                    <option value="">-- Pilih Opsi --</option>
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>

                            <div class="col-sm-12">
                                <label>Terpenuhi dan telah dipertahankan dalam setidaknya 1 tahun terakhir
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <select class="form-control form-control-sm" name="kriteria_penilaian3"
                                    id="kriteria_penilaian3" v-model="kriteria_penilaian3">
                                    <option value="">-- Pilih Opsi --</option>
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>

                            <div class="col-sm-12">
                                <label>Terpenuhi dan telah dipertahankan dalam setidaknya 5 tahun terakhir
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <select class="form-control form-control-sm" name="kriteria_penilaian4"
                                    id="kriteria_penilaian4" v-model="kriteria_penilaian4">
                                    <option value="">-- Pilih Opsi --</option>
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>

                            <div class="col-sm-12 mt-2">
                                <label>Status Ketersediaan Data</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="evaluasi_status" id="eval_sudah"
                                        value="sudah" v-model="evaluasi_status">
                                    <label class="form-check-label" for="eval_sudah">Sudah lengkap</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="evaluasi_status" id="eval_belum"
                                        value="belum" v-model="evaluasi_status">
                                    <label class="form-check-label" for="eval_belum">Belum lengkap</label>
                                </div>
                            </div>

                            <!-- Jika Belum lengkap : tampilkan semua input -->

                            <template v-if="evaluasi_status === 'belum'">
                                <div class="col-sm-12">
                                    <label>Tanggal Evaluasi
                                        <small class="text-info"> (*wajib diisi jika file pendukung ada yang
                                            kurang)</small>
                                    </label>
                                    <input type="date" id="tanggal_evaluasi" name="tanggal_evaluasi"
                                        v-model="tanggal_evaluasi" class="form-control form-control-sm" />
                                </div>

                                <div class="col-sm-12">
                                    <label>
                                        Catatan Hasil Evaluasi
                                    </label>
                                    <quill-editor v-model:value="catatanHasilEvaluasi" id="catatanHasilEvaluasi"
                                        style="height: 25vh;"></quill-editor>
                                </div>

                                <!-- <div class="col-sm-12">
                                    <label>
                                        Tanggapan Evaluator
                                    </label>
                                    <quill-editor v-model:value="tanggapanEvaluatorEvaluasi" id="tanggapanEvaluatorEvaluasi" style="height: 25vh;"></quill-editor>
                                </div>

                                <div class="col-sm-12">
                                    <label>
                                        Rekomendasi
                                    </label>
                                    <quill-editor v-model:value="rekomendasiEvaluasi" id="rekomendasiEvaluasi" style="height: 25vh;"></quill-editor>
                                </div>

                                <div class="col-sm-12">
                                    <label>
                                        Tindak Lanjut
                                    </label>
                                    <quill-editor v-model:value="tindakLanjutEvaluasi" id="tindakLanjutEvaluasi" style="height: 25vh;"></quill-editor>
                                </div> -->
                            </template>
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

        <div class="modal fade" id="costumModalTanggapan" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-yellow">
                        <h4 class="modal-title">Tanggapan {{ opsi }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row">
                            <input type="hidden" class="form-control form-control-sm" id="mode" name="mode"
                                placeholder="mode" v-model="mode">
                            <input type="hidden" class="form-control form-control-sm" id="id" name="id" placeholder="id"
                                v-model="id">

                            <div class="col-sm-12">
                                <label>Tahun
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fab fa-creative-commons-share"></i>
                                        </span>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="tahun" name="tahun"
                                        placeholder="Tahun" v-model="tahun">
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <label>
                                    Catatan Hasil Evaluasi
                                </label>
                                <quill-editor v-model:value="catatan_evaluator_tanggapan"
                                    id="catatan_evaluator_tanggapan" style="height: 25vh; background-color: #eaeaea;"
                                    :disabled="true"></quill-editor>
                            </div>

                            <div class="col-sm-12">
                                <label>
                                    Tanggapan
                                </label>
                                <quill-editor v-model:value="tanggapan_satker" id="tanggapan_satker"
                                    style="height: 25vh;"></quill-editor>
                            </div>

                            <div class="col-sm-12">
                                <div id="drag_drop2" @dragover="dragover2" @dragleave="dragleave2" @drop="drop2">
                                    Drag & Drop File Disini
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <input type="file" multiple name="file" id="fileInput" class="hidden-input"
                                    @change="onChange2" ref="file2" accept="application/pdf" />
                                <br>
                                <div class="row" v-if="files2.length">
                                    <div v-for="file in files2" :key="file.name" class="row">
                                        <div class="col-sm-10 float-left">
                                            {{ file.name }}
                                            <input type="hidden" class="form-control form-control-sm"
                                                :id="'pic2' + files2.indexOf(file)" placeholder="File Beranda">
                                        </div>
                                        <div class="col-sm-2 text-right">
                                            <button type="button" class="btn btn-sm btn-danger3 float-right text-white"
                                                @click="remove2(files2.indexOf(file))" data-toggle="tooltip"
                                                data-placement="left" title="Hapus file.."><i
                                                    class="fas fa-window-close"></i></button>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="progress">
                                                <div class="progress-bar" role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width:0%"
                                                    :id="'persennyapic2' + files2.indexOf(file)">
                                                    <span :id="'tulisanpersenpic2' + files2.indexOf(file)">0%</span>
                                                </div>
                                            </div>
                                            <br>
                                            <span class="text-success"
                                                :id="'suksesnyapic2' + files2.indexOf(file)"></span>
                                        </div>
                                    </div>
                                    <div class="col-sm-12" v-if="files2.length">
                                        <button type="button"
                                            class="btn btn-sm btn-success float-left text-white lebar2"
                                            @click="uploadTanggapan()" data-toggle="tooltip" data-placement="left"
                                            title="Update data..">
                                            <i class="fas fa-upload"></i> Upload Data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-primary btn-sm lebar2 text-white" @click="simpan()">
                                <i class="fas fa-plus-square"></i> Simpan
                            </button>
                            <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i> Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="costumModalPerbaikan" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-yellow">
                        <h4 class="modal-title">Evaluasi Data Perbaikan {{ opsi }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row">
                            <input type="hidden" class="form-control form-control-sm" id="mode" name="mode"
                                placeholder="mode" v-model="mode">
                            <input type="hidden" class="form-control form-control-sm" id="id" name="id" placeholder="id"
                                v-model="id">

                            <div class="col-sm-12">
                                <label>
                                    Tanggapan Satker
                                </label>
                                <quill-editor v-model:value="jawaban_satker" id="jawaban_satker"
                                    style="height: 25vh; background-color: #eaeaea;" :disabled="true"></quill-editor>
                            </div>

                            <template v-for="(isianbuktidukung, urutlist) in isi_bukti_dukung" :key="urutlist">
                                <div class="col-sm-12">
                                    <object class="pdf" :data="folder_preview + isianbuktidukung.bukti_dokumen"
                                        style="width:100%;height: 45vh;">
                                    </object>
                                </div>
                            </template>

                            <div class="col-sm-12">
                                <label>Tahun
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fab fa-creative-commons-share"></i>
                                        </span>
                                    </div>
                                    <input type="number" class="form-control form-control-sm" id="tahun_evaluasi"
                                        name="tahun" placeholder="Tahun" v-model="tahun">
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <label>Pemenuhan Kriteria
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <select class="form-control form-control-sm" name="kriteria_penilaian1_perbaikan"
                                    id="kriteria_penilaian1_perbaikan" v-model="kriteria_penilaian1_perbaikan">
                                    <option value="">-- Pilih Opsi --</option>
                                    <option value="1">Ada</option>
                                    <option value="0">Tidak Ada</option>
                                </select>
                            </div>

                            <div class="col-sm-12">
                                <label>Terpenuhi dan sesuai Kebijakan Mandat nasional
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <select class="form-control form-control-sm" name="kriteria_penilaian2_perbaikan"
                                    id="kriteria_penilaian2_perbaikan" v-model="kriteria_penilaian2_perbaikan">
                                    <option value="">-- Pilih Opsi --</option>
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>

                            <div class="col-sm-12">
                                <label>Terpenuhi dan telah dipertahankan dalam setidaknya 1 tahun terakhir
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <select class="form-control form-control-sm" name="kriteria_penilaian3_perbaikan"
                                    id="kriteria_penilaian3_perbaikan" v-model="kriteria_penilaian3_perbaikan">
                                    <option value="">-- Pilih Opsi --</option>
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>

                            <div class="col-sm-12">
                                <label>Terpenuhi dan telah dipertahankan dalam setidaknya 5 tahun terakhir
                                    <small class="text-info"> (*wajib diisi)</small>
                                </label>
                                <select class="form-control form-control-sm" name="kriteria_penilaian4_perbaikan"
                                    id="kriteria_penilaian4_perbaikan" v-model="kriteria_penilaian4_perbaikan">
                                    <option value="">-- Pilih Opsi --</option>
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>

                            <div class="col-sm-12">
                                <label>
                                    Tanggapan Evaluator
                                </label>
                                <quill-editor v-model:value="tanggapan_evaluator" id="tanggapan_evaluator"
                                    style="height: 25vh;"></quill-editor>
                            </div>

                            <div class="col-sm-12">
                                <label>
                                    Rekomendasi
                                </label>
                                <quill-editor v-model:value="rekomendasi" id="rekomendasi"
                                    style="height: 25vh;"></quill-editor>
                            </div>

                            <div class="col-sm-12">
                                <label>
                                    Tindak Lanjut
                                </label>
                                <quill-editor v-model:value="tindak_lanjut" id="tindak_lanjut"
                                    style="height: 25vh;"></quill-editor>
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

        <div class="modal fade" id="customModalUbahBatasEvaluasi" data-easein="flipBounceYIn" tabindex="-1"
            role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static"
            data-keyboard="false" style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-yellow">
                        <h4 class="modal-title">Ubah Batas Evaluasi {{ opsi }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row">
                            <input type="hidden" class="form-control form-control-sm" id="mode" name="mode"
                                placeholder="mode" v-model="mode">
                            <input type="hidden" class="form-control form-control-sm" id="id" name="id" placeholder="id"
                                v-model="id">

                            <input type="hidden" class="form-control form-control-sm" id="tahun" name="tahun"
                                v-model="tahun">

                            <div class="col-sm-12">
                                <label>Tanggal Evaluasi</label>
                                <input type="date" id="tanggal_evaluasi_perbaikan" name="tanggal_evaluasi_perbaikan"
                                    v-model="tanggal_evaluasi_perbaikan" class="form-control form-control-sm" />
                            </div>

                            <div class="col-sm-12">
                                <label>
                                    Tanggapan Evaluator
                                </label>
                                <quill-editor v-model:value="tanggapanEvaluatorEvaluasi2"
                                    id="tanggapanEvaluatorEvaluasi2" style="height: 25vh;"></quill-editor>
                            </div>

                            <div class="col-sm-12">
                                <label>
                                    Rekomendasi
                                </label>
                                <quill-editor v-model:value="rekomendasiEvaluasi2" id="rekomendasiEvaluasi2"
                                    style="height: 25vh;"></quill-editor>
                            </div>

                            <div class="col-sm-12">
                                <label>
                                    Tindak Lanjut
                                </label>
                                <quill-editor v-model:value="tindakLanjutEvaluasi2" id="tindakLanjutEvaluasi2"
                                    style="height: 25vh;"></quill-editor>
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
                            <h5>Penilaian LKE</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Home </a></li>
                                <li class="breadcrumb-item active">Penilaian LKE</li>
                            </ol>
                        </div>
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row wow fadeInDown" v-if="leveluser.includes(7)">
                        <div class="col-md-3 col-sm-6 col-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-info">
                                    <i class="far fa-paper-plane"></i>
                                </span>

                                <div class="info-box-content">
                                    <span class="info-box-text">LKE di Ajukan</span>
                                    <span class="info-box-number">{{ total_lke_diajukan }}</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                        <div class="col-md-3 col-sm-6 col-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-secondary">
                                    <i class="fas fa-list"></i>
                                </span>

                                <div class="info-box-content">
                                    <span class="info-box-text">LKE di Evaluasi</span>
                                    <span class="info-box-number">{{ total_lke_dievaluasi }}</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                        <div class="col-md-3 col-sm-6 col-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-warning">
                                    <i class="fa fa-clipboard"></i>
                                </span>

                                <div class="info-box-content">
                                    <span class="info-box-text">LKE Revisi</span>
                                    <span class="info-box-number">{{ total_lke_revisi }}</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                        <div class="col-md-3 col-sm-6 col-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-success">
                                    <i class="fas fa-clipboard-check"></i>
                                </span>

                                <div class="info-box-content">
                                    <span class="info-box-text">LKE Diterima</span>
                                    <span class="info-box-number">{{ total_lke_diterima }}</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                    </div>

                    <div class="row">
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="card cardputih">
                                <div class="col-sm-12 wow fadeInDown" v-if="leveluser.includes(1)">
                                    <label>Pusat / Balai</label>
                                    <v-select :options="kategorisatker" :reduce="(label) => label.code" label="label"
                                        v-model="defaultSelectedkategorisatker"
                                        @update:modelValue="onkategorisatkerChange"
                                        style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                </div>
                                <div class="col-sm-12 wow fadeInDown"
                                    v-if="leveluser.includes(1) || leveluser.includes(5)">
                                    <label>Satker</label>
                                    <v-select :options="satker" :reduce="(label) => label.code" label="label"
                                        v-model="defaultSelectedsatker" @update:modelValue="onsatkerChange"
                                        style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                </div>
                                <div class="col-sm-12 wow fadeInDown">
                                    <label>Pilihan Data Tahun</label>
                                    <v-select :options="listtahun" :reduce="(label) => label.code" label="label"
                                        v-model="defaultSelectedtahun" @update:modelValue="ontahunChange"
                                        style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                </div>

                                <div class="col-sm-12 wow fadeInDown"
                                    v-if="datamaster.length > 0 && leveluser.includes(5)">
                                    &nbsp;</div>
                                <div class="col-sm-12 wow fadeInDown"
                                    v-if="datamaster.length > 0 && leveluser.includes(5)">
                                    <div class="card cardputih collapsed-card">
                                        <div class="card-header border-transparent bg-yellow"
                                            data-card-widget="collapse" style="cursor: pointer;">
                                            <label>Pengaturan Tanda tangan</label>
                                            <div class="card-tools">
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                    <i class="fas fa-plus" style="color: black;"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body px-3">
                                            <div class="row">
                                                <!-- <div class="col-sm-6">
                                                    <label>Nomor Surat <small class="text-info"> (Opsional)</small></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fab fa-creative-commons-share"></i>
                                                            </span>
                                                        </div>
                                                        <input type="text" class="form-control form-control-sm" id="no_surat" name="no_surat" placeholder="Nomor Surat" v-model="no_surat">
                                                    </div>
                                                </div> -->
                                                <div class="col-sm-12">
                                                    <label>Lokasi Tanda tangan <small class="text-info"> (*wajib
                                                            diisi)</small></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fab fa-creative-commons-share"></i>
                                                            </span>
                                                        </div>
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="tempat_ttd" name="tempat_ttd"
                                                            placeholder="Lokasi Tanda tangan" v-model="tempat_ttd">
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <label>Tanggal Tanda tangan<small class="text-info"> (*wajib
                                                            diisi)</small></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fab fa-creative-commons-share"></i>
                                                            </span>
                                                        </div>
                                                        <input type="date" class="form-control form-control-sm"
                                                            id="tgl_surat" name="tgl_surat"
                                                            placeholder="Tanggal Tanda tangan" v-model="tgl_surat">
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <label>NIP<small class="text-info"> (*wajib diisi)</small></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fab fa-creative-commons-share"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="nip_pejabat" name="nip_pejabat" placeholder="NIP"
                                                            v-model="nip_pejabat">
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <label>Nama Pejabat<small class="text-info"> (*wajib
                                                            diisi)</small></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fab fa-creative-commons-share"></i>
                                                            </span>
                                                        </div>
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="nama_pejabat" name="nama_pejabat"
                                                            placeholder="Nama Pejabat" v-model="nama_pejabat">
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <label>Jabatan<small class="text-info"> (*wajib
                                                            diisi)</small></label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fab fa-creative-commons-share"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="jabatan" name="jabatan" placeholder="Jabatan"
                                                            v-model="jabatan">
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 text-center">
                                                    <button type="button"
                                                        class="btn btn-primary btn-sm lebar2 text-white"
                                                        @click="simpanttd()">
                                                        <i class="fas fa-plus-square"></i>
                                                        Simpan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12 wow fadeInDown"
                                    v-if="datamaster.length > 0 && leveluser.includes(5)">
                                    &nbsp;
                                </div>

                                <div class="col-sm-12 text-center wow fadeInDown"
                                    v-if="leveluser.includes(1) || leveluser.includes(5)">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-secondary">
                                            <i class="fas fa-file-word"></i> Export Word
                                        </button>
                                        <button type="button" class="btn btn-secondary dropdown-toggle"
                                            data-toggle="dropdown" aria-expanded="false">
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div class="dropdown-menu" role="menu" style="">
                                            <a class="dropdown-item" href="#" @click="exportWord()">LHE</a>
                                            <a class="dropdown-item" href="#" @click="exportWordBA()">Berita Acara
                                                Kesepakatan</a>
                                        </div>
                                    </div>
                                    &nbsp;
                                    <button class="btn btn-success" @click="exportExcel()" data-toggle="tooltip"
                                        data-placement="top" title="Export Excel">
                                        <i class="fas fa-file-excel"></i> Export Excel
                                    </button>
                                </div>

                                <div class="col-sm-12 wow fadeInDown">
                                    &nbsp;
                                </div>

                                <div class="card-body p-0">
                                    <div class="table-responsive table-wrapper">
                                        <table class="table m-0" id="tabeldata" style="font-size: smaller;">
                                            <thead>
                                                <tr>
                                                    <th rowspan="3" style="width: 10px;">No</th>
                                                    <th rowspan="3" style="width: 70px;">Komponen/<br>Sub
                                                        Komponen/<br>Kriteria
                                                    </th>
                                                    <th rowspan="3" style="width: 30px;">Bobot</th>
                                                    <th colspan="2" style="width: 50px;">Instansi Pemerintah</th>
                                                    <th rowspan="3" style="width: 50px;">Langkah<br>Kerja</th>
                                                    <th rowspan="3" style="width: 50px;">Daftar<br>Evidence</th>
                                                    <th colspan="5" style="width: 100px;"
                                                        v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                        Kriteria Penilaian
                                                    </th>
                                                    <th rowspan="3" style="width: 50px;">Hasil<br>Evaluasi</th>
                                                    <th rowspan="3" style="width: 50px;">Nilai<br>Hasil<br>Evaluasi</th>
                                                    <th rowspan="3" style="width: 50px;">Batas Evaluasi</th>
                                                    <th rowspan="3" style="width: 100px;">Catatan<br>Hasil<br>Evaluasi
                                                    </th>
                                                    <th rowspan="3" style="width: 100px;">Tanggapan<br>Tim<br>Evaluator
                                                    </th>
                                                    <th rowspan="3" style="width: 100px;">Rekomendasi</th>
                                                    <th rowspan="3" style="width: 100px;">Status<br>Tindak<br>Lanjut
                                                    </th>
                                                    <th rowspan="3" style="width: 50px;">Aksi</th>
                                                </tr>
                                                <tr>
                                                    <th rowspan="2" style="width: 20px;">Jawaban</th>
                                                    <th rowspan="2" style="width: 20px;">Nilai</th>
                                                    <th colspan="2" style="width: 50px;"
                                                        v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                        Pemenuhan Kriteria
                                                    </th>
                                                    <th rowspan="2" style="width: 50px;"
                                                        v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                        Terpenuhi dan sesuai Kebijakan Mandat Nasional
                                                    </th>
                                                    <th rowspan="2" style="width: 50px;"
                                                        v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                        Terpenuhi dan telah dipertahankan dalam setidaknya 1 tahun
                                                        terakhir
                                                    </th>
                                                    <th rowspan="2" style="width: 50px;"
                                                        v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                        Terpenuhi dan telah dipertahankan dalam setidaknya 5 tahun
                                                        terakhir
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 50px;"
                                                        v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                        Ada/<br>Tidak Ada
                                                    </th>
                                                    <th style="width: 50px;"
                                                        v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                        Nilai
                                                    </th>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td class="text-center levelkomponenbaru">
                                                            {{ datalist.kode_komponen }}
                                                        </td>
                                                        <td class="levelkomponenbaru">
                                                            {{ datalist.nama_komponen }}
                                                        </td>
                                                        <td class="text-center levelkomponenbaru">
                                                            {{ datalist.bobot_komponen }}
                                                        </td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="text-center levelkomponenbaru">
                                                            {{ G_numKoma(datalist.nilai_komponen) }}
                                                        </td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"
                                                            v-if="leveluser.includes(1) || leveluser.includes(5)"></td>
                                                        <td class="levelkomponenbaru"
                                                            v-if="leveluser.includes(1) || leveluser.includes(5)"></td>
                                                        <td class="levelkomponenbaru"
                                                            v-if="leveluser.includes(1) || leveluser.includes(5)"></td>
                                                        <td class="levelkomponenbaru"
                                                            v-if="leveluser.includes(1) || leveluser.includes(5)"></td>
                                                        <td class="levelkomponenbaru"
                                                            v-if="leveluser.includes(1) || leveluser.includes(5)"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                        <td class="levelkomponenbaru"></td>
                                                    </tr>
                                                    <template
                                                        v-for="(datasubkomponen, urutsubkomponen) in datalist.detail_subkomponen"
                                                        :key="urutsubkomponen">
                                                        <tr>
                                                            <td class="text-center levelsubkomponenbaru">
                                                                {{ datasubkomponen.kode_subkomponen }}
                                                            </td>
                                                            <td class="levelsubkomponenbaru">
                                                                {{ datasubkomponen.nama_subkomponen }}
                                                            </td>
                                                            <td class="text-center levelsubkomponenbaru">
                                                                {{ datasubkomponen.bobot_subkomponen }}
                                                            </td>
                                                            <td class="text-center levelsubkomponenbaru">
                                                                {{ datasubkomponen.nilai_evaluasi }}
                                                            </td>
                                                            <td class="text-center levelsubkomponenbaru">
                                                                {{ G_numKoma(datasubkomponen.nilai_instansi_pemerintah)
                                                                }}
                                                            </td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                            </td>
                                                            <td class="levelsubkomponenbaru"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                            </td>
                                                            <td class="levelsubkomponenbaru"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                            </td>
                                                            <td class="levelsubkomponenbaru"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                            </td>
                                                            <td class="levelsubkomponenbaru"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                            </td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                            <td class="levelsubkomponenbaru"></td>
                                                        </tr>
                                                        <tr v-for="(datadetailkriteria, urutdetailkriteria) in datasubkomponen.detailKriteria"
                                                            :key="urutdetailkriteria">
                                                            <td class="text-center">
                                                                {{ datadetailkriteria.kode_kriteria }}
                                                            </td>

                                                            <td colspan="4">
                                                                {{ datadetailkriteria.nama_kriteria }}
                                                            </td>
                                                            <td>
                                                                <span v-html="datadetailkriteria.langkah_kerja"></span>
                                                            </td>
                                                            <td>
                                                                <span
                                                                    v-html="datadetailkriteria.daftar_evidence"></span>
                                                            </td>
                                                            <td class="text-center"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                                {{ datadetailkriteria.kriteria_penilaian1 }}
                                                            </td>
                                                            <td class="text-center" :rowspan="datasubkomponen.rowspan"
                                                                v-if="urutdetailkriteria == 0 && (leveluser.includes(1) || leveluser.includes(5))">
                                                                {{ datasubkomponen.pemenuhan_kriteria }}
                                                            </td>
                                                            <td class="text-center"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                                {{ datadetailkriteria.kriteria_penilaian2 }}
                                                            </td>
                                                            <td class="text-center"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                                {{ datadetailkriteria.kriteria_penilaian3 }}
                                                            </td>
                                                            <td class="text-center"
                                                                v-if="leveluser.includes(1) || leveluser.includes(5)">
                                                                {{ datadetailkriteria.kriteria_penilaian4 }}
                                                            </td>
                                                            <td class="text-center" :rowspan="datasubkomponen.rowspan"
                                                                v-if="urutdetailkriteria == 0">
                                                                {{ datasubkomponen.nilai_evaluasi }}
                                                            </td>
                                                            <td class="text-center" :rowspan="datasubkomponen.rowspan"
                                                                v-if="urutdetailkriteria == 0">
                                                                {{ datasubkomponen.nilai }}
                                                            </td>
                                                            <td class="text-center">
                                                                {{
                                                                G_formatDateNonWIB(datadetailkriteria.tanggal_evaluasi)
                                                                }}
                                                            </td>
                                                            <td class="text-center">
                                                                <span
                                                                    v-html="datadetailkriteria.catatan_evaluator"></span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span
                                                                    v-html="datadetailkriteria.tanggapan_evaluator"></span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span v-html="datadetailkriteria.rekomendasi"></span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span v-html="datadetailkriteria.tindak_lanjut"></span>
                                                            </td>
                                                            <td class="text-center">
                                                                <button type="button"
                                                                    v-if="datadetailkriteria.data_lke == '0' && leveluser.includes(7) && datadetailkriteria.status_lke == ''"
                                                                    class="btn btn-primary3 btn-sm lebar2 text-white"
                                                                    @click="prosesdata(datadetailkriteria.id_kriteria, datadetailkriteria.id_lke, 'Tambah')"
                                                                    data-toggle="tooltip" data-placement="left"
                                                                    title="Tambah data..">
                                                                    <i class="fas fa-plus"></i> Tambah Data
                                                                </button>

                                                                <span
                                                                    v-if="datadetailkriteria.data_lke == '1' && leveluser.includes(7) && datadetailkriteria.status_lke == '1'">
                                                                    <i class="fas fa-spinner"></i> Data sedang diproses
                                                                    Evaluasi
                                                                </span>
                                                                <br>

                                                                <button type="button"
                                                                    v-if="datadetailkriteria.data_lke == '1' && leveluser.includes(7) && datadetailkriteria.status_lke == '1'"
                                                                    class="btn btn-primary3 btn-sm lebar2 text-white"
                                                                    @click="prosesdata(datadetailkriteria.id_kriteria, datadetailkriteria.id_lke, 'ResetBuktiDukung')"
                                                                    data-toggle="tooltip" data-placement="left"
                                                                    title="Reset data..">
                                                                    <i class="fas fa-sync-alt"></i> Reset Data
                                                                </button>

                                                                <button type="button"
                                                                    v-if="datadetailkriteria.data_lke == '1' && (leveluser.includes(1) || leveluser.includes(5)) && datadetailkriteria.status_lke == '1'"
                                                                    class="btn btn-primary3 btn-sm lebar2 text-white"
                                                                    @click="prosesdata(datadetailkriteria.id_kriteria, datadetailkriteria.id_lke, 'Evaluasi')"
                                                                    data-toggle="tooltip" data-placement="left"
                                                                    title="Evaluasi data..">
                                                                    <i class="fas fa-eye"></i> Evaluasi Data
                                                                </button>

                                                                <button type="button"
                                                                    v-if="datadetailkriteria.data_lke == '1' && leveluser.includes(7) && datadetailkriteria.status_lke == '2'"
                                                                    class="btn btn-success btn-sm lebar2 text-white"
                                                                    @click="prosesdata(datadetailkriteria.id_kriteria, datadetailkriteria.id_lke, 'Tanggapan')"
                                                                    data-toggle="tooltip" data-placement="left"
                                                                    title="Tanggapan.."
                                                                    :disabled="isTanggapanDisabled(datadetailkriteria.tanggal_evaluasi)">
                                                                    <i class="fas fa-edit"></i> Tanggapan
                                                                </button>

                                                                <span
                                                                    v-if="datadetailkriteria.data_lke == '1' && (leveluser.includes(1) || leveluser.includes(5)) && isTanggapanDisabled(datadetailkriteria.tanggal_evaluasi) == false && datadetailkriteria.status_lke == '2'">
                                                                    <i class="fas fa-spinner"></i> Data sedang diproses
                                                                    Perbaikan
                                                                </span>

                                                                <span
                                                                    v-if="datadetailkriteria.data_lke == '1' && (leveluser.includes(1) || leveluser.includes(5)) && isTanggapanDisabled(datadetailkriteria.tanggal_evaluasi) == true && datadetailkriteria.status_lke == '2'">
                                                                    <i class="fas fa-times-circle"></i> Data tidak
                                                                    diperbaiki <br>

                                                                    <button type="button"
                                                                        v-if="datadetailkriteria.data_lke == '1' && (leveluser.includes(1) || leveluser.includes(5)) && datadetailkriteria.status_lke == '2'"
                                                                        class="btn btn-success btn-sm lebar2 text-white"
                                                                        @click="prosesdata(datadetailkriteria.id_kriteria, datadetailkriteria.id_lke, 'UbahBatasEvaluasi')"
                                                                        data-toggle="tooltip" data-placement="left"
                                                                        title="Ubah Batas Evaluasi">
                                                                        <i class="fas fa-edit"></i> Ubah Batas Evaluasi
                                                                    </button>
                                                                </span>

                                                                <span
                                                                    v-if="datadetailkriteria.data_lke == '1' && leveluser.includes(7) && datadetailkriteria.status_lke == '3'">
                                                                    <i class="fas fa-spinner"></i> Data sedang diproses
                                                                    Evaluasi Ulang
                                                                </span>

                                                                <button type="button"
                                                                    v-if="datadetailkriteria.data_lke == '1' && leveluser.includes(7) && datadetailkriteria.status_lke == '3'"
                                                                    class="btn btn-primary3 btn-sm lebar2 text-white"
                                                                    @click="prosesdata(datadetailkriteria.id_kriteria, datadetailkriteria.id_lke, 'ResetBuktiDukungTanggapan')"
                                                                    data-toggle="tooltip" data-placement="left"
                                                                    title="Reset data..">
                                                                    <i class="fas fa-sync-alt"></i> Reset Data Tanggapan
                                                                </button>

                                                                <button type="button"
                                                                    v-if="datadetailkriteria.data_lke == '1' && (leveluser.includes(1) || leveluser.includes(5)) && datadetailkriteria.status_lke == '3'"
                                                                    class="btn btn-primary3 btn-sm lebar2 text-white"
                                                                    @click="prosesdata(datadetailkriteria.id_kriteria, datadetailkriteria.id_lke, 'Perbaikan')"
                                                                    data-toggle="tooltip" data-placement="left"
                                                                    title="Evaluasi data Perbaikan..">
                                                                    <i class="fas fa-eye"></i> Evaluasi Data Perbaikan
                                                                </button>

                                                                <span
                                                                    v-if="datadetailkriteria.data_lke == '1' && datadetailkriteria.status_lke == '4'">
                                                                    <i class="fas fa-check-circle"></i> Data telah
                                                                    selesai dievaluasi
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </tbody>
                                            </template>
                                            <tbody v-if="(datapesan == 'data kosong')">
                                                <tr>
                                                    <td
                                                        :colspan="leveluser.includes(1) || leveluser.includes(5) ? 20 : (leveluser.includes(6) || leveluser.includes(7) ? 15 : 10)">
                                                        Data masih kosong</td>
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
import $, { data } from 'jquery';
import axios from 'axios';
import vSelect from 'vue-select';
import swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import * as XLSX from 'xlsx';
import { quillEditor } from 'vue3-quill';
import Footer from "../../../componen/Footer.vue";
import NavBar from "../../../componen/NavBar.vue";
import Menu from "../../../componen/Menu.vue";

import VueApexCharts from "vue3-apexcharts";
window.Apex.chart = { fontFamily: "Poppins-SemiBold, Arial, sans-serif" };
export default {
    components: {
        Footer, NavBar, Menu, vSelect, swal, quillEditor
    },
    data() {
        return {
            halamanloading: true,
            iduser: JSON.parse(localStorage.getItem("iduser")),
            // id_user: JSON.parse(localStorage.getItem("iduser")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            kode_satker: JSON.parse(localStorage.getItem("kdsatkersistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            kategori_satker: JSON.parse(localStorage.getItem("ksatkersistem")),
            datapesan: '',
            datamaster: [],
            listtahun: [],
            datatahun: [],
            defaultSelectedtahun: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtahun: new Date().getFullYear(),
            satker: [],
            datasatker: [],
            defaultSelectedsatker: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            },
            selectedsatker: '',
            selectedlabelsatker: '',
            mode: '',
            id: '',
            id_lke: '',
            tahun: new Date().getFullYear(),
            folder_foto: process.env.VUE_APP_URL_API + JSON.parse(localStorage.getItem("datatahunaktif")) + '/' + 'parastapainnovation_dokumen-File?f=',
            folder_dokumen: process.env.VUE_APP_URL_API + JSON.parse(localStorage.getItem("datatahunaktif")) + '/' + 'masterlke-FileUserLKE?f=',
            folder_preview: process.env.VUE_APP_URL_API + JSON.parse(localStorage.getItem("datatahunaktif")) + '/' + 'masterlke-PreviewFileUserLKE?f=',
            files: [],
            files2: [],
            isDragging: false,
            isDragging2: false,
            kriteria_penilaian1: '',
            kriteria_penilaian2: '',
            kriteria_penilaian3: '',
            kriteria_penilaian4: '',
            tanggal_evaluasi: '',
            catatanHasilEvaluasi: '',
            tanggapanEvaluatorEvaluasi: '',
            rekomendasiEvaluasi: '',
            tindakLanjutEvaluasi: '',
            tanggapan_satker: '',
            kriteria_penilaian1_perbaikan: '',
            kriteria_penilaian2_perbaikan: '',
            kriteria_penilaian3_perbaikan: '',
            kriteria_penilaian4_perbaikan: '',
            tanggapan_evaluator: '',
            rekomendasi: '',
            tindak_lanjut: '',
            jawaban_satker: '',
            kriteria_penilaian_lke_perbaikan: '',
            tanggal_evaluasi_perbaikan: '',
            isiandata: [],
            isi_bukti_dukung: [],
            validasi: false,
            kategorisatker: [],
            datakategorisatker: [],
            defaultSelectedkategorisatker: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkategorisatker: '',
            id_evaluator: '',
            no_surat: '',
            tempat_ttd: '',
            tgl_surat: '',
            nip_pejabat: '',
            nama_pejabat: '',
            jabatan: '',
            evaluasi_status: 'belum',
            tanggapanEvaluatorEvaluasi2: '',
            rekomendasiEvaluasi2: '',
            tindakLanjutEvaluasi2: '',
            catatan_evaluator_tanggapan: '',
            total_lke_diajukan: 0,
            total_lke_dievaluasi: 0,
            total_lke_revisi: 0,
            total_lke_diterima: 0,
            validasi: false,
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
        isTanggapanDisabled(tanggalEvaluasi) {
            if (!tanggalEvaluasi) return true;

            // Kalau ternyata object, ambil field yang isinya string tanggal
            let tglStr = tanggalEvaluasi;
            if (typeof tanggalEvaluasi === "object") {
                // cek isi object (console.log dulu biar tau strukturnya)
                if (tanggalEvaluasi.date) {
                    tglStr = tanggalEvaluasi.date;
                }
                else if (tanggalEvaluasi.tanggal) {
                    tglStr = tanggalEvaluasi.tanggal;
                }
                else {
                    return true; // fallback: disable
                }
            }

            const evalDate = new Date(tglStr);
            if (isNaN(evalDate.getTime())) {
                return true; // disable kalau parsing gagal
            }

            // set sampai akhir hari
            evalDate.setHours(23, 59, 59, 999);
            const now = new Date();

            return now.getTime() > evalDate.getTime();
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
            this.AmbilDataSatker1();
        },
        onsatkerChange(a) {
            try {
                this.selectedsatker = this.satker[a].tag;
                this.selectedlabelsatker = this.satker[a].label;
            }
            catch (err) {
                return;
            }
            this.ambildata();
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
        onChange() {
            this.files.push(...this.$refs.file.files);
        },
        onChange2() {
            this.files2.push(...this.$refs.file2.files);
        },
        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
            document.getElementById('drag_drop').style.borderColor = '#333';
        },
        dragover2(e) {
            e.preventDefault();
            this.isDragging2 = true;
            document.getElementById('drag_drop2').style.borderColor = '#333';
        },
        dragleave() {
            this.isDragging = false;
            document.getElementById('drag_drop').style.borderColor = '#ccc';
        },
        dragleave2() {
            this.isDragging2 = false;
            document.getElementById('drag_drop2').style.borderColor = '#ccc';
        },
        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.onChange();
            this.isDragging = false;
        },
        drop2(e) {
            e.preventDefault();
            this.$refs.file2.files = e.dataTransfer.files;
            this.onChange2();
            this.isDragging2 = false;
        },
        remove(i) {
            this.files.splice(i, 1);

            if (this.files.length === 0 && this.$refs.file) {
                this.$refs.file.value = '';
            }
        },
        remove2(i) {
            this.files2.splice(i, 1);

            if (this.files2.length === 0 && this.$refs.file2) {
                this.$refs.file2.value = '';
            }
        },
        upload() {
            const files = this.files;

            //validasi ukuran file max 10 mb
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 10485760) {  //10 MB = 10 x 1024 x 1024 = 10485760 bytes
                    swal.fire('Peringatan', 'File "' + files[i].name + '" melebihi ukuran maksimal 10 MB. Mohon kompres file terlebih dahulu', 'warning');
                    return false;
                }
            }

            var fd = new FormData();
            files.forEach((file) => {
                fd.append("fileToUpload", file, file.name);
                fd.append("folderToUpload", 'pic');
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                mainAPI.post("parastapainnovationimg-FilesUpload", fd, {
                    onUploadProgress: function (uploadEvent) {
                        document.getElementById('persennyapic' + files.indexOf(file)).style.width = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                        document.getElementById('tulisanpersenpic' + files.indexOf(file)).innerHTML = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                    }
                }).then(
                    Response => {
                        document.getElementById('suksesnyapic' + files.indexOf(file)).innerHTML = Response.data.message;
                        if (Response.data.filename != undefined) {
                            document.getElementById('pic' + files.indexOf(file)).value = Response.data.filename;
                        }
                    }

                ).catch(function (e) {
                    document.getElementById('suksesnyapic' + files.indexOf(file)).innerHTML = Response.data.message;
                    document.getElementById('pic' + files.indexOf(file)).value = '';
                    //console.log(e);
                }
                )
            });
            return false;
        },
        uploadTanggapan() {
            const files = this.files2;

            //validasi ukuran file max 10 mb
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 10485760) {  //10 MB = 10 x 1024 x 1024 = 10485760 bytes
                    swal.fire('Peringatan', 'File "' + files[i].name + '" melebihi ukuran maksimal 10 MB. Mohon kompres file terlebih dahulu', 'warning');
                    return false;
                }
            }

            var fd = new FormData();
            files.forEach((file) => {
                fd.append("fileToUpload", file, file.name);
                fd.append("folderToUpload", 'pic');
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                mainAPI.post("parastapainnovationimg-FilesUpload", fd, {
                    onUploadProgress: function (uploadEvent) {
                        document.getElementById('persennyapic2' + files.indexOf(file)).style.width = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                        document.getElementById('tulisanpersenpic2' + files.indexOf(file)).innerHTML = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                    }
                }).then(
                    Response => {
                        document.getElementById('suksesnyapic2' + files.indexOf(file)).innerHTML = Response.data.message;
                        if (Response.data.filename != undefined) {
                            document.getElementById('pic2' + files.indexOf(file)).value = Response.data.filename;
                        }
                    }

                ).catch(function (e) {
                    document.getElementById('suksesnyapic2' + files.indexOf(file)).innerHTML = Response.data.message;
                    document.getElementById('pic2' + files.indexOf(file)).value = '';
                    //console.log(e);
                }
                )
            });
            return false;
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

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetMasterSatker?random=" + random + "&kategorisatker=" + this.kategori_satker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatker = [];
                        this.satker = [];
                        this.datasatker = Response.data.content.data;
                        this.datasatker.forEach((item) => {
                            this.satker.push({
                                label: '[' + item.kode_satker + '] ' + item.nama,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.kode_satker,
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
        async AmbilDataSatker1() {
            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetMasterSatker?random=" + random + "&kategorisatker=" + this.selectedkategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatker = [];
                        this.satker = [];
                        this.datasatker = Response.data.content.data;
                        this.datasatker.forEach((item) => {
                            this.satker.push({
                                label: '[' + item.kode_satker + '] ' + item.nama,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.kode_satker,
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
        async ambildata() {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            var random = Math.random();
            if (this.leveluser.includes(1) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                var pelaksana = this.selectedsatker;
            }

            if (this.leveluser.includes(7)) {
                var pelaksana = this.kode_satker;
            }

            await mainAPI.get("masterlke-GetAllPenilaianLKE?random=" + random + "&tahun=" + this.selectedtahun + "&id_user=" + pelaksana + "&level=" + this.leveluser).then(
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

            this.halamanloading = true;
            var random = Math.random();
            await mainAPI.get("penilaianlke-GetTTDLKE?random=" + random + "&kode_satker=" + this.kode_satker + "&tahun=" + this.selectedtahun).then(
                Response => {
                    this.datapesan = Response.data.message;

                    if (this.datapesan == 'data diketemukan') {
                        this.no_surat = Response.data.content.data[0].no_surat;
                        this.tempat_ttd = Response.data.content.data[0].tempat_ttd;
                        this.tgl_surat = Response.data.content.data[0].tgl_surat;
                        this.nip_pejabat = Response.data.content.data[0].nip_pejabat;
                        this.nama_pejabat = Response.data.content.data[0].nama_pejabat;
                        this.jabatan = Response.data.content.data[0].jabatan;

                        this.halamanloading = false;
                    }
                    else {
                        this.no_surat = '';
                        this.tempat_ttd = '';
                        this.tgl_surat = '';
                        this.nip_pejabat = '';
                        this.nama_pejabat = '';
                        this.jabatan = '';

                        this.halamanloading = false;
                    }

                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            });

            this.halamanloading = true;
            await mainAPI.get("penilaianlke-GetSummaryPenilaianLKE?random=" + random + "&tahun=" + this.selectedtahun + "&id_user=" + pelaksana + "&level=" + this.leveluser).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.total_lke_diajukan = Response.data.content.data[0].total_lke_diajukan;
                        this.total_lke_dievaluasi = Response.data.content.data[0].total_lke_dievaluasi;
                        this.total_lke_revisi = Response.data.content.data[0].total_lke_revisi;
                        this.total_lke_diterima = Response.data.content.data[0].total_lke_diterima;
                    }
                    else {
                        this.total_lke_diajukan = 0;
                        this.total_lke_dievaluasi = 0;
                        this.total_lke_revisi = 0;
                        this.total_lke_diterima = 0;
                    }

                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            });
        },
        simpan() {
            if (this.mode == 'Tambah') {
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
                    document.getElementById('tahun_evaluasi').focus();
                    return false;
                }

                if (this.files.length == 0) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih File Dokumen Pendukung',
                    });
                    document.getElementById('drag_drop').focus();
                    return false;
                }

                var tempfiles = '';
                for (let i = 0; i < this.files.length; i++) {
                    if (i == 0) {
                        tempfiles = tempfiles + document.getElementById('pic' + i).value;
                    }
                    else {
                        tempfiles = tempfiles + ',' + document.getElementById('pic' + i).value;
                    }
                }

                //alert(tempfiles);
                //return false;
                var fd = new FormData();
                fd.append("id_kriteria", this.id);
                fd.append("tahun", this.selectedtahun);
                fd.append("id_user", this.iduser);
                fd.append("kode_satker", this.kode_satker);
                fd.append("level", this.leveluser);
                fd.append("upload_dok_satker", tempfiles);

                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                mainAPI.post("masterlke-AddPenilaianLKE", fd).then(
                    Response => {
                        if (Response.data.response == 'error') {
                            swal.fire('Peringatan', Response.data.message, 'error');
                        }
                        else {
                            swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(() => {
                                $('#costumModalopsi').modal('hide');
                                this.ambildata();
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
            else if (this.mode == 'Evaluasi') {
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
                    document.getElementById('tahun_evaluasi').focus();
                    return false;
                }

                if ((this.kriteria_penilaian1 == '') || (this.kriteria_penilaian1 == null) || (this.kriteria_penilaian1 == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih Pemenuhan Kriteria',
                    });
                    return false;
                }

                if ((this.kriteria_penilaian2 == '') || (this.kriteria_penilaian2 == null) || (this.kriteria_penilaian2 == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih Terpenuhi dan sesuai Kebijakan Mandat nasional',
                    });
                    return false;
                }

                if ((this.kriteria_penilaian3 == '') || (this.kriteria_penilaian3 == null) || (this.kriteria_penilaian3 == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih Terpenuhi dan telah dipertahankan dalam setidaknya 1 tahun terakhir',
                    });
                    return false;
                }

                if ((this.kriteria_penilaian4 == '') || (this.kriteria_penilaian4 == null) || (this.kriteria_penilaian4 == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih Terpenuhi dan telah dipertahankan dalam setidaknya 5 tahun terakhir',
                    });
                    return false;
                }

                if (this.evaluasi_status === 'sudah') {
                    // sudah lengkap data maka isi otomatis tanda strip
                    this.catatanHasilEvaluasi = '-';
                    this.tanggapanEvaluatorEvaluasi = '-';
                    this.rekomendasiEvaluasi = '-';
                    this.tindakLanjutEvaluasi = '-';
                }
                else {
                    if ((this.tanggal_evaluasi == '') || (this.tanggal_evaluasi == null) || (this.tanggal_evaluasi == undefined)) {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: 'Mohon Isikan Tanggal Evaluasi',
                        });
                        document.getElementById('tanggal_evaluasi').focus();
                        return false;
                    }
                }

                var fd = new FormData();
                fd.append("id_kriteria", this.id);
                fd.append("id_lke", this.id_lke);
                fd.append("tahun", this.selectedtahun);
                fd.append("id_user", this.selectedsatker);
                fd.append("level", this.leveluser);
                fd.append("kode_satker", this.kode_satker);
                fd.append("kriteria_penilaian1", this.kriteria_penilaian1);
                fd.append("kriteria_penilaian2", this.kriteria_penilaian2);
                fd.append("kriteria_penilaian3", this.kriteria_penilaian3);
                fd.append("kriteria_penilaian4", this.kriteria_penilaian4);
                fd.append("tanggal_evaluasi", this.tanggal_evaluasi);
                fd.append("catatan_hasil_evaluasi", this.catatanHasilEvaluasi);
                fd.append("tanggapan_evaluator", this.tanggapanEvaluatorEvaluasi);
                fd.append("rekomendasi", this.rekomendasiEvaluasi);
                fd.append("tindak_lanjut", this.tindakLanjutEvaluasi);

                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                mainAPI.post("masterlke-EvaluasiLKE", fd).then(
                    Response => {
                        if (Response.data.response == 'error') {
                            swal.fire('Peringatan', Response.data.message, 'error');
                        }
                        else {
                            swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(() => {
                                $('#costumModalCekopsi').modal('hide');
                                this.ambildata();
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
            else if (this.mode == 'Tanggapan') {
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
                    document.getElementById('tahun_evaluasi').focus();
                    return false;
                }

                if (this.tanggapan_satker == '' || this.tanggapan_satker == null || this.tanggapan_satker == undefined) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Isikan Tanggapan Anda',
                    });
                    document.getElementById('tanggapan_satker').focus();
                    return false;
                }

                if (this.files2.length == 0) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih File Dokumen Pendukung',
                    });
                    document.getElementById('drag_drop2').focus();
                    return false;
                }

                var tempfiles = '';
                for (let i = 0; i < this.files2.length; i++) {
                    if (i == 0) {
                        tempfiles = tempfiles + document.getElementById('pic2' + i).value;
                    }
                    else {
                        tempfiles = tempfiles + ',' + document.getElementById('pic2' + i).value;
                    }
                }

                var fd = new FormData();
                fd.append("id_kriteria", this.id);
                fd.append("id_lke", this.id_lke);
                fd.append("tahun", this.selectedtahun);
                fd.append("id_user", this.iduser);
                fd.append("level", this.leveluser);
                fd.append("kode_satker", this.kode_satker);
                fd.append("link_bukti_dukung", tempfiles);
                fd.append("tanggapan_satker", this.tanggapan_satker);

                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                mainAPI.post("masterlke-UpdateTanggapanSatker", fd).then(
                    Response => {
                        if (Response.data.response == 'error') {
                            swal.fire('Peringatan', Response.data.message, 'error');
                        }
                        else {
                            swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(() => {
                                $('#costumModalTanggapan').modal('hide');
                                this.ambildata();
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
            else if (this.mode == 'Perbaikan') {
                if ((this.kriteria_penilaian1_perbaikan == '') || (this.kriteria_penilaian1_perbaikan == null) || (this.kriteria_penilaian1_perbaikan == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih Pemenuhan Kriteria',
                    });
                    return false;
                }

                if ((this.kriteria_penilaian2_perbaikan == '') || (this.kriteria_penilaian2_perbaikan == null) || (this.kriteria_penilaian2_perbaikan == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih Terpenuhi dan sesuai Kebijakan Mandat nasional',
                    });
                    return false;
                }

                if ((this.kriteria_penilaian3_perbaikan == '') || (this.kriteria_penilaian3_perbaikan == null) || (this.kriteria_penilaian3_perbaikan == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih Terpenuhi dan telah dipertahankan dalam setidaknya 1 tahun terakhir',
                    });
                    return false;
                }

                if ((this.kriteria_penilaian4_perbaikan == '') || (this.kriteria_penilaian4_perbaikan == null) || (this.kriteria_penilaian4_perbaikan == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Pilih Terpenuhi dan telah dipertahankan dalam setidaknya 5 tahun terakhir',
                    });
                    return false;
                }

                if ((this.tanggapan_evaluator == '' || this.tanggapan_evaluator == null || this.tanggapan_evaluator == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Isikan Tanggapan Evaluator',
                    });
                    document.getElementById('tanggapan_evaluator').focus();
                    return false;
                }

                if ((this.rekomendasi == '' || this.rekomendasi == null || this.rekomendasi == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Isikan Rekomendasi',
                    });
                    document.getElementById('rekomendasi').focus();
                    return false;
                }

                if ((this.tindak_lanjut == '' || this.tindak_lanjut == null || this.tindak_lanjut == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Isikan Tindak Lanjut',
                    });
                    document.getElementById('tindak_lanjut').focus();
                    return false;
                }

                var fd = new FormData();
                fd.append("id_kriteria", this.id);
                fd.append("id_lke", this.id_lke);
                fd.append("tahun", this.selectedtahun);
                fd.append("id_user", this.selectedsatker);
                fd.append("level", this.leveluser);
                fd.append("kode_satker", this.kode_satker);
                fd.append("kriteria_penilaian1", this.kriteria_penilaian1_perbaikan);
                fd.append("kriteria_penilaian2", this.kriteria_penilaian2_perbaikan);
                fd.append("kriteria_penilaian3", this.kriteria_penilaian3_perbaikan);
                fd.append("kriteria_penilaian4", this.kriteria_penilaian4_perbaikan);
                fd.append("tanggapan_evaluator", this.tanggapan_evaluator);
                fd.append("rekomendasi", this.rekomendasi);
                fd.append("tindak_lanjut", this.tindak_lanjut);

                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                mainAPI.post("masterlke-UpdateStatusPerbaikan", fd).then(
                    Response => {
                        if (Response.data.response == 'error') {
                            swal.fire('Peringatan', Response.data.message, 'error');
                        }
                        else {
                            swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(() => {
                                $('#costumModalPerbaikan').modal('hide');
                                this.ambildata();
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
            else if (this.mode == 'UbahBatasEvaluasi') {
                if ((this.tanggapanEvaluatorEvaluasi2 == '' || this.tanggapanEvaluatorEvaluasi2 == null || this.tanggapanEvaluatorEvaluasi2 == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Isikan Tanggapan Evaluator',
                    });
                    document.getElementById('tanggapanEvaluatorEvaluasi2').focus();
                    return false;
                }

                if ((this.rekomendasiEvaluasi2 == '' || this.rekomendasiEvaluasi2 == null || this.rekomendasiEvaluasi2 == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Isikan Rekomendasi',
                    });
                    document.getElementById('rekomendasiEvaluasi2').focus();
                    return false;
                }

                if ((this.tindakLanjutEvaluasi2 == '' || this.tindakLanjutEvaluasi2 == null || this.tindakLanjutEvaluasi2 == undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Mohon Isikan Tindak Lanjut',
                    });
                    document.getElementById('tindakLanjutEvaluasi2').focus();
                    return false;
                }

                var fd = new FormData();
                fd.append("id_kriteria", this.id);
                fd.append("id_lke", this.id_lke);
                fd.append("tahun", this.selectedtahun);
                fd.append("id_user", this.selectedsatker);
                fd.append("level", this.leveluser);
                fd.append("kode_satker", this.kode_satker);
                fd.append("tanggal_evaluasi", this.tanggal_evaluasi_perbaikan);
                fd.append("tanggapan_evaluator", this.tanggapanEvaluatorEvaluasi2);
                fd.append("rekomendasi", this.rekomendasiEvaluasi2);
                fd.append("tindak_lanjut", this.tindakLanjutEvaluasi2);

                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                mainAPI.post("masterlke-UbahBatasEvaluasi", fd).then(
                    Response => {
                        if (Response.data.response == 'error') {
                            swal.fire('Peringatan', Response.data.message, 'error');
                        }
                        else {
                            swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(() => {
                                $('#customModalUbahBatasEvaluasi').modal('hide');
                                this.ambildata();
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
        prosesdata(id, id_lke, mode) {
            this.id = id;
            this.id_lke = id_lke;
            this.mode = mode;
            this.tahun = this.selectedtahun;

            if (this.mode == 'Tambah') {
                this.files = [];
                $('#costumModalopsi').modal('show');
            }
            else if(this.mode == 'ResetBuktiDukung'){
                
                swal.fire({
                    title: "Konfirmasi",
                    text: "Yakin Hendak Reset Bukti Dukung?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Batal",
                    confirmButtonColor: "#003d68",
                    cancelButtonColor: "#ffaa05",
                    confirmButtonText: "Reset"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const data = { kode: this.id_lke, deletedby: JSON.parse(localStorage.getItem("usistem")) }
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        });
                        mainAPI.post("penilaianlke-ResetDataBUktiDukungLKE", data).then(
                            Response => {
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.fire('Informasi', 'Data telah direset..', 'success').then(function () {
                                        window.location.replace("/PenilaianLKE");
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
            }
            else if (this.mode == 'Evaluasi') {
                this.kriteria_penilaian1 = '';
                this.kriteria_penilaian2 = '';
                this.kriteria_penilaian3 = '';
                this.kriteria_penilaian4 = '';
                this.tanggal_evaluasi = '';
                this.catatanHasilEvaluasi = '';
                this.tanggapanEvaluatorEvaluasi = '';
                this.rekomendasiEvaluasi = '';
                this.tindakLanjutEvaluasi = '';
                this.evaluasi_status = 'belum';

                this.halamanloading = true;
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                var random = Math.random();
                mainAPI.get("masterlke-getKriteriaLKEbyID?random=" + random + "&tahun=" + this.selectedtahun + "&id_kriteria=" + this.id + "&id_user=" + this.selectedsatker + "&id_lke=" + this.id_lke).then(
                    Response => {
                        this.datapesan = Response.data.message;
                        if (this.datapesan == 'data diketemukan') {
                            this.isiandata = [];
                            this.isiandata = Response.data.content.data;
                        }
                        else {
                            this.isiandata = [];
                        }

                        $('#costumModalCekopsi').modal('show');
                        this.halamanloading = false;
                    }
                ).catch(error => {
                    console.log(error);
                    this.ClearlocalStorage();
                    this.halamanloading = false;
                });
            }
            else if (this.mode == 'Tanggapan') {
                this.files2 = [];
                this.tanggapan_satker = '';

                this.halamanloading = true;
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                var random = Math.random();
                mainAPI.get("masterlke-getKriteriaLKEbyID?random=" + random + "&id_lke=" + this.id_lke).then(
                    Response => {
                        this.datapesan = Response.data.message;
                        if (this.datapesan == 'data diketemukan') {
                            this.catatan_evaluator_tanggapan = '';
                            this.catatan_evaluator_tanggapan = Response.data.content.catatan_evaluator[0].catatan_evaluator;
                        }
                        else {
                            this.catatan_evaluator_tanggapan = '';
                        }

                        $('#costumModalTanggapan').modal('show');
                        this.halamanloading = false;
                    }
                ).catch(error => {
                    console.log(error);
                    this.ClearlocalStorage();
                    this.halamanloading = false;
                });
            }
            else if(this.mode == 'ResetBuktiDukungTanggapan'){
                swal.fire({
                    title: "Konfirmasi",
                    text: "Yakin Hendak Reset Bukti Dukung Tanggapan ?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Batal",
                    confirmButtonColor: "#003d68",
                    cancelButtonColor: "#ffaa05",
                    confirmButtonText: "Reset"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const data = { kode: this.id_lke, deletedby: JSON.parse(localStorage.getItem("usistem")) }
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        });
                        mainAPI.post("penilaianlke-ResetDataBUktiDukungTanggapanLKE", data).then(
                            Response => {
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.fire('Informasi', 'Data telah direset..', 'success').then(function () {
                                        window.location.replace("/PenilaianLKE");
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
            }
            else if (this.mode == 'Perbaikan') {
                this.kriteria_penilaian1_perbaikan = '';
                this.kriteria_penilaian2_perbaikan = '';
                this.kriteria_penilaian3_perbaikan = '';
                this.kriteria_penilaian4_perbaikan = '';
                this.tanggapan_evaluator = '';
                this.rekomendasi = '';
                this.tindak_lanjut = '';

                this.halamanloading = true;
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                var random = Math.random();
                mainAPI.get("masterlke-getKriteriaLKEbyID?random=" + random + "&tahun=" + this.selectedtahun + "&id_kriteria=" + this.id + "&id_user=" + this.selectedsatker + "&id_lke=" + this.id_lke).then(
                    Response => {
                        this.datapesan = Response.data.message;
                        if (this.datapesan == 'data diketemukan') {
                            this.isi_bukti_dukung = [];
                            this.isi_bukti_dukung = Response.data.content.bukti;
                            this.jawaban_satker = Response.data.content.jawaban[0].jawaban;
                            this.kriteria_penilaian_lke_perbaikan = Response.data.content.kriteria_penilaian_lke[0];

                            this.kriteria_penilaian1_perbaikan = this.kriteria_penilaian_lke_perbaikan.kriteria_penilaian1;
                            this.kriteria_penilaian2_perbaikan = this.kriteria_penilaian_lke_perbaikan.kriteria_penilaian2;
                            this.kriteria_penilaian3_perbaikan = this.kriteria_penilaian_lke_perbaikan.kriteria_penilaian3;
                            this.kriteria_penilaian4_perbaikan = this.kriteria_penilaian_lke_perbaikan.kriteria_penilaian4;
                        }
                        else {
                            this.isi_bukti_dukung = [];
                            this.jawaban_satker = '';
                            this.kriteria_penilaian_lke_perbaikan = [];
                        }
                        $('#costumModalPerbaikan').modal('show');
                        this.halamanloading = false;
                    }
                ).catch(error => {
                    console.log(error);
                    this.ClearlocalStorage();
                    this.halamanloading = false;
                });
            }
            else if (this.mode == 'UbahBatasEvaluasi') {
                this.tanggal_evaluasi_perbaikan = '';
                this.tanggapanEvaluatorEvaluasi2 = '';
                this.rekomendasiEvaluasi2 = '';
                this.tindakLanjutEvaluasi2 = '';

                $('#customModalUbahBatasEvaluasi').modal('show');
            }

        },
        exportWord() {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
                responseType: 'blob', // <-- penting!
            });

            var random = Math.random();
            let namaSatker = this.selectedlabelsatker.replace(/[^a-zA-Z0-9_\- ]/g, '').replace(/\s+/g, '_');
            let tahun_doc = this.selectedtahun;
            const filename = `LHE_${namaSatker}_${tahun_doc}.docx`;

            if (this.leveluser.includes(1) || this.leveluser.includes(5)) {
                this.id_evaluator = this.iduser;
            }
            else {
                this.id_evaluator = '';
            }

            mainAPI.get("penilaianlke-ExportWordLHE?random=" + random + "&tahun=" + this.selectedtahun + "&id_user=" + this.selectedsatker + "&level=" + this.leveluser + "&id_evaluator=" + this.id_evaluator + "&kode_satker_evaluator=" + this.kode_satker).then(
                response => {
                    // Buat link download dari blob
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename); // nama file
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', 'Export gagal: ' + error, 'error');
                this.ClearlocalStorage();
                this.halamanloading = false;
            });
        },
        exportWordBA() {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
                responseType: 'blob', // <-- penting!
            });

            var random = Math.random();
            let namaSatker = this.selectedlabelsatker.replace(/[^a-zA-Z0-9_\- ]/g, '').replace(/\s+/g, '_');
            let tahun_doc = this.selectedtahun;
            const filename = `Berita_Acara_Kesepakatan_${namaSatker}_${tahun_doc}.docx`;

            if (this.leveluser.includes(1) || this.leveluser.includes(5)) {
                this.id_evaluator = this.kode_satker;
            }
            else {
                this.id_evaluator = '';
            }

            mainAPI.get("penilaianlke-ExportWordBA?random=" + random + "&tahun=" + this.selectedtahun + "&id_user=" + this.selectedsatker + "&level=" + this.leveluser + "&id_evaluator=" + this.id_evaluator + "&kode_satker_evaluator=" + this.kode_satker + "&kategori_satker=" + this.kategori_satker).then(
                response => {
                    // Buat link download dari blob
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename); // nama file
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', 'Export gagal: ' + error, 'error');
                this.ClearlocalStorage();
                this.halamanloading = false;
            });
        },
        exportExcel() {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
                responseType: 'blob', // <-- penting!
            });

            var random = Math.random();
            let namaSatker = this.selectedlabelsatker.replace(/[^a-zA-Z0-9_\- ]/g, '').replace(/\s+/g, '_');
            let tahun_doc = this.selectedtahun;
            const filename = `Data_LKE_${namaSatker}_${tahun_doc}.xlsx`;

            if (this.leveluser.includes(1) || this.leveluser.includes(5)) {
                this.id_evaluator = this.iduser;
            }
            else {
                this.id_evaluator = '';
            }

            mainAPI.get("penilaianlke-ExportExcelLKE?random=" + random + "&tahun=" + this.selectedtahun + "&id_user=" + this.selectedsatker + "&level=" + this.leveluser + "&id_evaluator=" + this.id_evaluator).then(
                response => {
                    // Buat link download dari blob
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename); // nama file
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', 'Export gagal: ' + error, 'error');
                // this.ClearlocalStorage();
                console.log(error);
                this.halamanloading = false;
            });
        },
        resetFileInput() {
            this.files = [];
            if (this.$refs.file) {
                this.$refs.file.value = '';
            }

            this.files2 = [];
            if (this.$refs.file2) {
                this.$refs.file2.value = '';
            }
        },
        simpanttd() {
            if (this.tempat_ttd == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi Data Lokasi Tanda Tangan'
                });
                return false;
            }

            if (this.tgl_surat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi Data Tanggal Tanda Tangan'
                });
                return false;
            }

            if (this.nip_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi Data NIP'
                });
                return false;
            }

            if (this.nama_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi Data Nama Pejabat'
                });
                return false;
            }

            if (this.jabatan == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi Data Jabatan'
                });
                return false;
            }

            var fd = new FormData();
            fd.append("kode_satker", this.kode_satker);
            fd.append("tahun", this.selectedtahun);
            // fd.append("no_surat", this.no_surat);
            fd.append("tempat_ttd", this.tempat_ttd);
            fd.append("tgl_surat", this.tgl_surat);
            fd.append("nip_pejabat", this.nip_pejabat);
            fd.append("nama_pejabat", this.nama_pejabat);
            fd.append("jabatan", this.jabatan);

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            mainAPI.post("penilaianlke-SimpanTTDLKE", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Peringatan', 'Data pengaturan tanda tangan telah tersimpan', 'success');
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
    },
    mounted() {
        this.getOtentifikasi();
        this.AmbilDataReff();
        this.ambildata();

        // Reset file input saat modal ditutup
        $('#costumModalopsi').on('hidden.bs.modal', () => {
            this.resetFileInput();
        });

        $('#costumModalTanggapan').on('hidden.bs.modal', () => {
            this.resetFileInput();
        });
    }
}
</script>
<style></style>
