<template>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar elevation-4 sidebar-light-navy">
        <div class="sidebar os-theme-dark">
            <!-- Sidebar user (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <a href="#" class="d-block text-white" data-widget="pushmenu" role="button">
                        <i class="fas fa-align-right text-white"></i>&nbsp;
                    </a>
                </div>
                <div class="image">
                    <a href="#" class="d-block text-white">MONIKA</a>
                </div>
            </div>

            <!-- SidebarSearch Form -->
            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column nav-flat nav-child-indent" data-widget="treeview"
                    role="menu" data-accordion="false">
                    <li class="nav-item">
                        <router-link to="/Dashboard"
                            :class="[(route.name == 'Dashboard' ? 'nav-link active' : 'nav-link')]" id="Dashboard"><i
                                class="nav-icon fas fa-th"></i>
                            <p style="font-weight: bolder;">
                                Beranda
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/GIS" :class="[(route.name == 'GIS' ? 'nav-link active' : 'nav-link')]"
                            id="GIS"><i class="nav-icon fas fa-map-marked"></i>
                            <p style="font-weight: bolder;">
                                Peta
                            </p>
                        </router-link>
                    </li>
                    <li :class="[((route.name == 'DetailProgres' || route.name == 'RekapSDABalai' || route.name == 'RekapSatker' || route.name == 'KontraktualSDABalai' || route.name == 'DetailPaket' || route.name == 'DaftarKontraktual'
                        || route.name == 'KontraktualSatker') ? 'nav-item menu-open' : 'nav-item')]">
                        <a href="#" :class="[((route.name == 'DetailProgres' || route.name == 'RekapSDABalai' || route.name == 'RekapSatker' || route.name == 'KontraktualSDABalai' || route.name == 'DetailPaket' || route.name == 'DaftarKontraktual'
                            || route.name == 'KontraktualSatker') ? 'nav-link active' : 'nav-link')]">
                            <i class="nav-icon fab fa-buromobelexperte"></i>
                            <p>
                                e Monitoring
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li
                                :class="[((route.name == 'DetailProgres' || route.name == 'RekapSDABalai' || route.name == 'RekapSatker') ? 'nav-item menu-open' : 'nav-item')]">
                                <a href="#"
                                    :class="[((route.name == 'DetailProgres' || route.name == 'RekapSDABalai' || route.name == 'RekapSatker') ? 'nav-link active' : 'nav-link')]">
                                    &nbsp;&nbsp;&nbsp;<i class="fas fa-book-open"></i>
                                    <p>
                                        &nbsp;&nbsp;Progres Fisik & Keu
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <router-link :to="'/RekapSDABalai/' + folderbalaidansatker"
                                            :class="[((route.name == 'RekapSDABalai') ? 'nav-link active' : 'nav-link')]"
                                            id="RekapSDABalai"><i class="nav-icon far fa-circle text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">Progres SDA / Balai</p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link :to="'/RekapSatker/' + folderbalaidansatker"
                                            :class="[((route.name == 'RekapSatker') ? 'nav-link active' : 'nav-link')]"
                                            id="RekapSatker"><i class="nav-icon far fa-circle text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">Progres Satker</p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link :to="'/DetailProgres/' + folderbalaidansatker"
                                            :class="[((route.name == 'DetailProgres') ? 'nav-link active' : 'nav-link')]"
                                            id="DetailProgres"><i class="nav-icon far fa-circle text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">Detail Progres Fisik &
                                                Keu.</p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <li
                                :class="[((route.name == 'DetailKontraktual' || route.name == 'KontraktualSDABalai' || route.name == 'KontraktualSatker' || route.name == 'DetailPaket' || route.name == 'DaftarKontraktual') ? 'nav-item menu-open' : 'nav-item')]">
                                <a href="#"
                                    :class="[((route.name == 'DetailKontraktual' || route.name == 'KontraktualSDABalai' || route.name == 'KontraktualSatker' || route.name == 'DetailPaket' || route.name == 'DaftarKontraktual') ? 'nav-link active' : 'nav-link')]">
                                    &nbsp;&nbsp;&nbsp;<i class="far fa-bookmark"></i>
                                    <p>
                                        &nbsp;&nbsp;&nbsp;Paket Kontraktual
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <router-link :to="'/KontraktualSDABalai/' + folderbalaidansatker"
                                            :class="[((route.name == 'KontraktualSDABalai') ? 'nav-link active' : 'nav-link')]"
                                            id="KontraktualSDABalai"><i
                                                class="nav-icon far fa-circle text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">Rekap SDA / Balai</p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link :to="'/KontraktualSatker/' + folderbalaidansatker"
                                            :class="[((route.name == 'KontraktualSatker') ? 'nav-link active' : 'nav-link')]"
                                            id="KontraktualSatker"><i class="nav-icon far fa-circle text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">Rekap Satker</p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link :to="'/DetailPaket/' + folderbalaidansatker"
                                            :class="[((route.name == 'DetailPaket') ? 'nav-link active' : 'nav-link')]"
                                            id="DetailPaket"><i class="nav-icon far fa-circle text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">Detail Paket Kontraktual
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item" style="display: none;">
                                        <router-link :to="'/DaftarKontraktual/' + folderbalaidansatker"
                                            :class="[((route.name == 'DaftarKontraktual') ? 'nav-link active' : 'nav-link')]"
                                            id="DaftarKontraktual"><i class="nav-icon far fa-circle text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">Daftar Kontraktual</p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(5) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(8) || leveluser.includes(9))"
                        :class="[((route.name == 'PerjanjianKinerjaSatker' || route.name == 'PerjanjianKinerjaBalai' || route.name == 'PerjanjianKinerjaSatkerAwal' || route.name == 'PerjanjianKinerjaBalaiAwal' || route.name == 'PerjanjianKinerjaSatkerAkhir' || route.name == 'PerjanjianKinerjaBalaiAkhir' || route.name == 'PerjanjianKinerjaDirjen' || route.name == 'PerjanjianKinerjaDirjenAwal' || route.name == 'PerjanjianKinerjaDirjenAkhir' || route.name == 'ResumeCapaian' || route.name == 'ResumeCapaianSatker' || route.name == 'ResumeTargetAwal' || route.name == 'ResumeTargetAwalSatker') ? 'nav-item menu-open' : 'nav-item')]">
                        <a href="#"
                            :class="[((route.name == 'PerjanjianKinerjaSatker' || route.name == 'PerjanjianKinerjaBalai' || route.name == 'PerjanjianKinerjaSatkerAwal' || route.name == 'PerjanjianKinerjaBalaiAwal' || route.name == 'PerjanjianKinerjaSatkerAkhir' || route.name == 'PerjanjianKinerjaBalaiAkhir' || route.name == 'PerjanjianKinerjaDirjen' || route.name == 'PerjanjianKinerjaDirjenAwal' || route.name == 'PerjanjianKinerjaDirjenAkhir' || route.name == 'ResumeCapaian' || route.name == 'ResumeCapaianSatker' || route.name == 'ResumeTargetAwal' || route.name == 'ResumeTargetAwalSatker') ? 'nav-link active' : 'nav-link')]">
                            <i class="nav-icon fas fa-copy"></i>
                            <p>
                                Perjanjian Kinerja
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(5) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(8) || leveluser.includes(9)) && pkawalaktif == '1'"
                                :class="[((route.name == 'PerjanjianKinerjaSatkerAwal' || route.name == 'PerjanjianKinerjaBalaiAwal' || route.name == 'PerjanjianKinerjaDirjenAwal') ? 'nav-item menu-open' : 'nav-item')]">
                                <a href="#" style="font-size: smaller;color: #ffffff;"
                                    :class="[((route.name == 'PerjanjianKinerjaSatkerAwal' || route.name == 'PerjanjianKinerjaBalaiAwal' || route.name == 'PerjanjianKinerjaDirjenAwal') ? 'nav-link active' : 'nav-link')]">
                                    <i class="nav-icon fas fa-clipboard-check text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">
                                        PK Awal
                                        <i class="right fas fa-angle-left">
                                        </i>
                                        <span class="right badge badge-primary">Now</span>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(4) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(5) || leveluser.includes(8) || leveluser.includes(9))">
                                        <router-link :to="'/PerjanjianKinerjaSatkerAwal/' + foldersatker"
                                            :class="[((route.name == 'PerjanjianKinerjaSatkerAwal') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaSatkerAwal"><i
                                                class="nav-icon fas fa-book text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                <span v-if="leveluser.includes(8)">SKPD</span>
                                                <span v-else-if="leveluser.includes(4)">Direktorat</span>
                                                <span
                                                    v-else-if="leveluser.includes(6) || leveluser.includes(7)">Satker</span>
                                                <span v-else-if="leveluser.includes(9)">Balai Teknis</span>
                                                <span v-else-if="leveluser.includes(5)">SKPD / Satker / Baltek</span>
                                                <span v-else>SKPD / Satker / Baltek / Direktorat</span>
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6))">
                                        <router-link :to="'/PerjanjianKinerjaBalaiAwal/' + folderbalai"
                                            :class="[((route.name == 'PerjanjianKinerjaBalaiAwal') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaBalaiAwal"><i
                                                class="nav-icon far fa-building text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                <span v-if="leveluser.includes(6)">Balai</span>
                                                <span v-else>Balai / Dirjen</span>
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item" v-if="(leveluser.includes(3))">
                                        <router-link :to="'/PerjanjianKinerjaDirjenAwal/' + folderbalai"
                                            :class="[((route.name == 'PerjanjianKinerjaDirjenAwal') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaDirjenAwal"><i
                                                class="nav-icon far fa-building text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                Dirjen SDA
                                            </p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <li v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(5) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(8) || leveluser.includes(9)) && pkawalaktif == '1'"
                                :class="[((route.name == 'ResumeTargetAwal' || route.name == 'ResumeTargetAwalSatker') ? 'nav-item menu-open' : 'nav-item')]">
                                <a href="#" style="font-size: smaller;color: #ffffff;"
                                    :class="[((route.name == 'ResumeTargetAwal' || route.name == 'ResumeTargetAwalSatker') ? 'nav-link active' : 'nav-link')]">
                                    <i class="nav-icon fas fa-coins text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">
                                        Resume PK Awal
                                        <i class="right fas fa-angle-left"></i>
                                        <span class="right badge badge-danger">New</span>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(5) || leveluser.includes(8) || leveluser.includes(9))">
                                        <router-link :to="'/ResumeTargetAwal/' + folderbalai"
                                            :class="[((route.name == 'ResumeTargetAwal') ? 'nav-link active' : 'nav-link')]"
                                            id="ResumeTargetAwal"><i
                                                class="nav-icon fab fa-fort-awesome text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                Resume PK Awal B/BWS
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6))">
                                        <router-link :to="'/ResumeTargetAwalSatker/' + foldersatker"
                                            :class="[((route.name == 'ResumeTargetAwalSatker') ? 'nav-link active' : 'nav-link')]"
                                            id="ResumeTargetAwalSatker"><i
                                                class="nav-icon fab fa-fort-awesome-alt text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                Resume PK Awal Satker
                                            </p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <li v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(5) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(8) || leveluser.includes(9)) && pkrevisiaktif == '1'"
                                :class="[((route.name == 'PerjanjianKinerjaSatker' || route.name == 'PerjanjianKinerjaBalai' || route.name == 'PerjanjianKinerjaDirjen') ? 'nav-item menu-open' : 'nav-item')]">
                                <a href="#" style="font-size: smaller;color: #ffffff;"
                                    :class="[((route.name == 'PerjanjianKinerjaSatker' || route.name == 'PerjanjianKinerjaBalai' || route.name == 'PerjanjianKinerjaDirjen') ? 'nav-link active' : 'nav-link')]">
                                    <i class="nav-icon fas fa-clipboard-check text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">
                                        PK Revisi
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(4) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(5) || leveluser.includes(8) || leveluser.includes(9))">
                                        <router-link :to="'/PerjanjianKinerjaSatker/' + foldersatker"
                                            :class="[((route.name == 'PerjanjianKinerjaSatker') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaSatker"><i
                                                class="nav-icon fas fa-book text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                <span v-if="leveluser.includes(8)">SKPD</span>
                                                <span v-else-if="leveluser.includes(4)">Direktorat</span>
                                                <span
                                                    v-else-if="leveluser.includes(6) || leveluser.includes(7)">Satker</span>
                                                <span v-else-if="leveluser.includes(9)">Balai Teknis</span>
                                                <span v-else-if="leveluser.includes(5)">SKPD / Satker / Baltek</span>
                                                <span v-else>SKPD / Satker / Baltek / Direktorat</span>
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6))">
                                        <router-link :to="'/PerjanjianKinerjaBalai/' + folderbalai"
                                            :class="[((route.name == 'PerjanjianKinerjaBalai') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaBalai"><i
                                                class="nav-icon far fa-building text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                <span v-if="leveluser.includes(6)">Balai</span>
                                                <span v-else>Balai / Dirjen</span>
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item" v-if="(leveluser.includes(3))">
                                        <router-link :to="'/PerjanjianKinerjaDirjen/' + folderbalai"
                                            :class="[((route.name == 'PerjanjianKinerjaDirjen') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaDirjen"><i
                                                class="nav-icon far fa-building text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                Dirjen SDA
                                            </p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <li v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(5) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(8) || leveluser.includes(9)) && pkakhiraktif == '1'"
                                :class="[((route.name == 'PerjanjianKinerjaSatkerAkhir' || route.name == 'PerjanjianKinerjaBalaiAkhir' || route.name == 'PerjanjianKinerjaDirjenAkhir') ? 'nav-item menu-open' : 'nav-item')]">
                                <a href="#" style="font-size: smaller;color: #ffffff;"
                                    :class="[((route.name == 'PerjanjianKinerjaSatkerAkhir' || route.name == 'PerjanjianKinerjaBalaiAkhir' || route.name == 'PerjanjianKinerjaDirjenAkhir') ? 'nav-link active' : 'nav-link')]">
                                    <i class="nav-icon fas fa-clipboard-check text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">
                                        PK Akhir
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(4) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(5) || leveluser.includes(8) || leveluser.includes(9))">
                                        <router-link :to="'/PerjanjianKinerjaSatkerAkhir/' + foldersatker"
                                            :class="[((route.name == 'PerjanjianKinerjaSatkerAkhir') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaSatkerAkhir"><i
                                                class="nav-icon fas fa-book text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                <span v-if="leveluser.includes(8)">SKPD</span>
                                                <span v-else-if="leveluser.includes(4)">Direktorat</span>
                                                <span
                                                    v-else-if="leveluser.includes(6) || leveluser.includes(7)">Satker</span>
                                                <span v-else-if="leveluser.includes(9)">Balai Teknis</span>
                                                <span v-else-if="leveluser.includes(5)">SKPD / Satker / Baltek</span>
                                                <span v-else>SKPD / Satker / Baltek / Direktorat</span>
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6))">
                                        <router-link :to="'/PerjanjianKinerjaBalaiAkhir/' + folderbalai"
                                            :class="[((route.name == 'PerjanjianKinerjaBalaiAkhir') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaBalaiAkhir"><i
                                                class="nav-icon far fa-building text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                            <p class="text-warning2" style="font-size: small;">
                                                <span v-if="leveluser.includes(6)">Balai</span>
                                                <span v-else>Balai / Dirjen</span>
                                            </p>
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item" v-if="(leveluser.includes(3))">
                                        <router-link :to="'/PerjanjianKinerjaDirjenAkhir/' + folderbalai"
                                            :class="[((route.name == 'PerjanjianKinerjaDirjenAkhir') ? 'nav-link active' : 'nav-link')]"
                                            id="PerjanjianKinerjaDirjenAkhir"><i
                                                class="nav-icon far fa-building text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                Dirjen SDA
                                            </p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <li v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(5) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(8) || leveluser.includes(9)) && pkakhiraktif == '1'"
                                :class="[((route.name == 'ResumeCapaian' || route.name == 'ResumeCapaianSatker') ? 'nav-item menu-open' : 'nav-item')]">
                                <a href="#" style="font-size: smaller;color: #ffffff;"
                                    :class="[((route.name == 'ResumeCapaian' || route.name == 'ResumeCapaianSatker') ? 'nav-link active' : 'nav-link')]">
                                    <i class="nav-icon fas fa-gifts text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">
                                        Resume Capaian
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6) || leveluser.includes(7) || leveluser.includes(5) || leveluser.includes(8) || leveluser.includes(9))">
                                        <router-link :to="'/ResumeCapaian/' + folderbalai"
                                            :class="[((route.name == 'ResumeCapaian') ? 'nav-link active' : 'nav-link')]"
                                            id="ResumeCapaian"><i
                                                class="nav-icon fab fa-fort-awesome text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                Resume Capaian B/BWS
                                            </p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6))">
                                        <router-link :to="'/ResumeCapaianSatker/' + foldersatker"
                                            :class="[((route.name == 'ResumeCapaianSatker') ? 'nav-link active' : 'nav-link')]"
                                            id="ResumeCapaianSatker"><i
                                                class="nav-icon fab fa-fort-awesome-alt text-warning2"></i>
                                            <p class="text-warning2" style="font-size: small;">
                                                Resume Capaian Satker
                                            </p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li :class="[((route.name == 'Komponen' || route.name == 'ProsesKomponen' || route.name == 'SubKomponen' || route.name == 'ProsesSubKomponen' || route.name == 'KriteriaPenilaian' || route.name == 'ProsesKriteriaPenilaian'
                        || route.name == 'PilihanJawaban' || route.name == 'ProsesPilihanJawaban' || route.name == 'Evaluator' || route.name == 'ProsesEvaluator' || route.name == 'PenilaianLKE' || route.name == 'InputLKE' || route.name == 'Evaluatan' || route.name == 'ProsesEvaluatan'
                    ) ? 'nav-item menu-open' : 'nav-item')]"
                        v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(7) || leveluser.includes(6) || leveluser.includes(8)) || leveluser.includes(9) || ((leveluser.includes(4) || jenis_piusistem.includes(21, 6, 31)))">
                        <a href="#" :class="[((route.name == 'Komponen' || route.name == 'ProsesKomponen' || route.name == 'SubKomponen' || route.name == 'ProsesSubKomponen' || route.name == 'KriteriaPenilaian' || route.name == 'ProsesKriteriaPenilaian'
                            || route.name == 'PilihanJawaban' || route.name == 'ProsesPilihanJawaban' || route.name == 'Evaluator' || route.name == 'ProsesEvaluator' || route.name == 'PenilaianLKE' || route.name == 'InputLKE' || route.name == 'Evaluatan' || route.name == 'ProsesEvaluatan'
                        ) ? 'nav-link active' : 'nav-link')]"
                            v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(7) || leveluser.includes(6) || leveluser.includes(8)) || leveluser.includes(9) || ((leveluser.includes(4) || jenis_piusistem.includes(21, 6, 31)))">
                            <i class="nav-icon fab fa-audible"></i>
                            <p>
                                LKE
                                <i class="right fas fa-angle-left"></i>
                                <span class="right badge badge-danger">New</span>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item" v-if="(leveluser.includes(1))">
                                <router-link to="/Komponen"
                                    :class="[((route.name == 'Komponen' || route.name == 'ProsesKomponen') ? 'nav-link active' : 'nav-link')]"
                                    id="Komponen">
                                    <i class="nav-icon fas fa-list text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Komponen</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1))">
                                <router-link to="/SubKomponen"
                                    :class="[((route.name == 'SubKomponen' || route.name == 'ProsesSubKomponen') ? 'nav-link active' : 'nav-link')]"
                                    id="SubKomponen">
                                    <i class="nav-icon fas fa-list text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Sub Komponen</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1))">
                                <router-link to="/KriteriaPenilaian"
                                    :class="[((route.name == 'KriteriaPenilaian' || route.name == 'ProsesKriteriaPenilaian') ? 'nav-link active' : 'nav-link')]"
                                    id="KriteriaPenilaian">
                                    <i class="nav-icon fas fa-list text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Kriteria</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1))">
                                <router-link to="/PilihanJawaban"
                                    :class="[((route.name == 'PilihanJawaban' || route.name == 'ProsesPilihanJawaban') ? 'nav-link active' : 'nav-link')]"
                                    id="PilihanJawaban">
                                    <i class="nav-icon fas fa-list text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Pilihan Jawaban</p>
                                </router-link>
                            </li>
                            <li class="nav-item"
                                v-if="(leveluser.includes(1)) || leveluser.includes(5) || leveluser.includes(6)">
                                <router-link to="/Evaluator"
                                    :class="[((route.name == 'Evaluator' || route.name == 'ProsesEvaluator') ? 'nav-link active' : 'nav-link')]"
                                    id="Evaluator">
                                    <i class="nav-icon fas fa-list text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Tim Evaluator</p>
                                </router-link>
                            </li>

                            <li class="nav-item"
                                v-if="(leveluser.includes(4) || leveluser.includes(6)) || leveluser.includes(7) || leveluser.includes(8) || leveluser.includes(9) || jenis_piusistem.includes(21, 6, 31)">
                                <router-link to="/Evaluatan"
                                    :class="[((route.name == 'Evaluatan' || route.name == 'ProsesEvaluatan') ? 'nav-link active' : 'nav-link')]"
                                    id="Evaluatan">
                                    <i class="nav-icon fas fa-list text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Tim Evaluatan</p>
                                </router-link>
                            </li>

                            <li class="nav-item"
                                v-if="(leveluser.includes(1) || leveluser.includes(5)) || leveluser.includes(7)">
                                <router-link to="/PenilaianLKE"
                                    :class="[((route.name == 'PenilaianLKE' || route.name == 'ProsesPenilaianLKE') ? 'nav-link active' : 'nav-link')]"
                                    id="PenilaianLKE">
                                    <i class="nav-icon fas fa-clipboard-check text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;"
                                        v-if="(leveluser.includes(1) || leveluser.includes(5))">Evaluasi LKE Satker
                                        Balai</p>
                                    <p class="text-warning2" style="font-size: small;" v-if="(leveluser.includes(7))">
                                        Input LKE</p>
                                </router-link>
                            </li>

                            <li class="nav-item"
                                v-if="(leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(6) || leveluser.includes(8)) || leveluser.includes(9) || ((leveluser.includes(4) || jenis_piusistem.includes(21, 6, 31)))">
                                <router-link to="/InputLKE"
                                    :class="[((route.name == 'InputLKE') ? 'nav-link active' : 'nav-link')]"
                                    id="InputLKE">
                                    <i class="nav-icon fas fa-clipboard-check text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;"
                                        v-if="(leveluser.includes(1) || leveluser.includes(2))">Evaluasi LKE Pusat</p>
                                    <p class="text-warning2" style="font-size: small;"
                                        v-if="(leveluser.includes(6) || leveluser.includes(8)) || leveluser.includes(9) || ((leveluser.includes(4) || jenis_piusistem.includes(21, 6, 31)))">
                                        Input LKE</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li :class="[((route.name == 'Unor' || route.name == 'ProsesUnor' || route.name == 'KategoriSatker' || route.name == 'ProsesKategoriSatker' || route.name == 'Satker' || route.name == 'ProsesSatker'
                        || route.name == 'Satuan' || route.name == 'ProsesSatuan' || route.name == 'Indikator' || route.name == 'ProsesIndikator'
                        || route.name == 'IndikatorAwal' || route.name == 'IndikatorAkhir' || route.name == 'Pengumuman' || route.name == 'ProsesPengumuman' || route.name == 'IKU' || route.name == 'ProsesIKU'
                    ) ? 'nav-item menu-open' : 'nav-item')]" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                        <a href="#" :class="[((route.name == 'Unor' || route.name == 'ProsesUnor' || route.name == 'KategoriSatker' || route.name == 'ProsesKategoriSatker' || route.name == 'Satker' || route.name == 'ProsesSatker'
                            || route.name == 'Satuan' || route.name == 'ProsesSatuan' || route.name == 'Indikator' || route.name == 'ProsesIndikator'
                            || route.name == 'IndikatorAwal' || route.name == 'IndikatorAkhir' || route.name == 'Pengumuman' || route.name == 'ProsesPengumuman' || route.name == 'IKU' || route.name == 'ProsesIKU'
                        ) ? 'nav-link active' : 'nav-link')]" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                            <i class="nav-icon fas fa-edit"></i>
                            <p>
                                Master Sistem
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link to="/Pengumuman"
                                    :class="[((route.name == 'Pengumuman' || route.name == 'ProsesPengumuman') ? 'nav-link active' : 'nav-link')]"
                                    id="Pengumuman"><i class="nav-icon fas fa-bullhorn text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Pengumuman</p>
                                    <span class="right badge badge-danger">New</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link to="/IKU"
                                    :class="[((route.name == 'IKU' || route.name == 'ProsesIKU') ? 'nav-link active' : 'nav-link')]"
                                    id="IKU"><i class="nav-icon fas fa-brush text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Master IKU</p>
                                    <span class="right badge badge-danger">New</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link to="/Unor"
                                    :class="[((route.name == 'Unor' || route.name == 'ProsesUnor') ? 'nav-link active' : 'nav-link')]"
                                    id="Unor"><i class="nav-icon fab fa-megaport text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Unit Organisasi</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link to="/KategoriSatker"
                                    :class="[((route.name == 'KategoriSatker' || route.name == 'ProsesKategoriSatker') ? 'nav-link active' : 'nav-link')]"
                                    id="KategoriSatker"><i class="nav-icon fas fa-address-card text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Balai</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link :to="'/Satker/' + folderawal"
                                    :class="[((route.name == 'Satker' || route.name == 'ProsesSatker') ? 'nav-link active' : 'nav-link')]"
                                    id="Satker"><i class="nav-icon far fa-address-card text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Satker</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link to="/Satuan"
                                    :class="[((route.name == 'Satuan' || route.name == 'ProsesSatuan') ? 'nav-link active' : 'nav-link')]"
                                    id="Satuan"><i class="nav-icon fab fa-yelp text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Satuan</p>
                                </router-link>
                            </li>
                            <li v-if="(leveluser.includes(1) || leveluser.includes(2))"
                                :class="[((route.name == 'Indikator' || route.name == 'IndikatorAwal' || route.name == 'IndikatorAkhir') ? 'nav-item menu-open' : 'nav-item')]">
                                <a href="#" style="font-size: smaller;color: #ffffff;"
                                    :class="[((route.name == 'Indikator' || route.name == 'IndikatorAwal' || route.name == 'IndikatorAkhir') ? 'nav-link active' : 'nav-link')]">
                                    <i class="nav-icon fas fa-chart-line text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">
                                        Indikator PK
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                        <router-link :to="'/IndikatorAwal/'"
                                            :class="[((route.name == 'IndikatorAwal' || route.name == 'ProsesIndikatorAwal') ? 'nav-link active' : 'nav-link')]"
                                            id="IndikatorAwal"><i class="nav-icon far fa-circle text-warning2"
                                                style="font-size: small;color: #ffffff;"></i>
                                            <p style="font-size: small;color: #ffffff;">Indikator PK Awal</p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                        <router-link to="/Indikator"
                                            :class="[((route.name == 'Indikator' || route.name == 'ProsesIndikator') ? 'nav-link active' : 'nav-link')]"
                                            id="Indikator"><i class="nav-icon far fa-circle text-warning2"
                                                style="font-size: small;color: #ffffff;"></i>
                                            <p class="text-warning2" style="font-size: small;">Indikator PK Revisi</p>
                                        </router-link>
                                    </li>
                                    <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                        <router-link :to="'/IndikatorAkhir/'"
                                            :class="[((route.name == 'IndikatorAkhir' || route.name == 'ProsesIndikatorAkhir') ? 'nav-link active' : 'nav-link')]"
                                            id="IndikatorAkhir"><i class="nav-icon far fa-circle text-warning2"
                                                style="font-size: small;color: #ffffff;"></i>
                                            <p style="font-size: small;color: #ffffff;">Indikator PK Akhir</p>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li :class="[((route.name == 'User' || route.name == 'ProsesUser' || route.name == 'DataEmon' || route.name == 'ProsesDataEmon' || route.name == 'LayerPeta' || route.name == 'AturPK' || route.name == 'ResetPK') ? 'nav-item menu-open' : 'nav-item')]"
                        v-if="(leveluser.includes(1) || leveluser.includes(2))">
                        <a href="#"
                            :class="[((route.name == 'User' || route.name == 'ProsesUser' || route.name == 'DataEmon' || route.name == 'ProsesDataEmon' || route.name == 'LayerPeta' || route.name == 'AturPK' || route.name == 'ResetPK') ? 'nav-link active' : 'nav-link')]"
                            v-if="(leveluser.includes(1) || leveluser.includes(2))">
                            <i class="nav-icon fas fa-cog"></i>
                            <p>
                                Pengaturan
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item" v-if="(leveluser.includes(1))">
                                <router-link to="/LayerPeta"
                                    :class="[((route.name == 'LayerPeta') ? 'nav-link active' : 'nav-link')]"
                                    id="LayerPeta"><i class="nav-icon fas fa-project-diagram text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Pengaturan Peta</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1))">
                                <router-link to="/DataEmon"
                                    :class="[((route.name == 'DataEmon' || route.name == 'ProsesDataEmon') ? 'nav-link active' : 'nav-link')]"
                                    id="DataEmon"><i class="nav-icon fas fa-database text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Import Data Emon</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link to="/AturPK"
                                    :class="[((route.name == 'AturPK') ? 'nav-link active' : 'nav-link')]"
                                    id="AturPK"><i class="nav-icon fas fa-address-card text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Pengaturan PK</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link to="/ResetPK"
                                    :class="[((route.name == 'ResetPK') ? 'nav-link active' : 'nav-link')]"
                                    id="ResetPK"><i class="nav-icon fab fa-researchgate text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Reset Verifikasi PK</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="(leveluser.includes(1) || leveluser.includes(2))">
                                <router-link to="/User"
                                    :class="[((route.name == 'User' || route.name == 'ProsesUser') ? 'nav-link active' : 'nav-link')]"
                                    id="User"><i class="nav-icon fas fa-user-friends text-warning2"></i>
                                    <p class="text-warning2" style="font-size: small;">Pengaturan Pengguna</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" @click="keluar()">
                            <i class="nav-icon fas fa-sign-out-alt"></i>
                            <p>Keluar</p>
                        </a>
                    </li>
                    <li>&nbsp;</li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
export default {
    components: {
        swal
    },
    setup() {
        const route = useRoute()
        watch(() => route.name, () => {
        });

        return { route };
    },
    data() {
        return {
            tahun: new Date().getFullYear(),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            levpiusistem: JSON.parse(localStorage.getItem("levpiusistem")),
            jenis_piusistem: JSON.parse(localStorage.getItem("jenis_piusistem")),
            ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
            nmksatkersistem: JSON.parse(localStorage.getItem("nmksatkersistem")),
            kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
            nmsatkersistem: JSON.parse(localStorage.getItem("nmsatkersistem")),
            folderawal: encodeURIComponent(CryptoJS.AES.encrypt('1', 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
            foldersatker: encodeURIComponent(CryptoJS.AES.encrypt(JSON.parse(localStorage.getItem("kdsatkersistem")), 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
            folderbalai: encodeURIComponent(CryptoJS.AES.encrypt(JSON.parse(localStorage.getItem("ksatkersistem")), 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
            //folderbalaidansatker: encodeURIComponent(CryptoJS.AES.encrypt(JSON.parse(localStorage.getItem("ksatkersistem")) + "_" + JSON.parse(localStorage.getItem("kdsatkersistem")), 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
            folderbalaidansatker: encodeURIComponent(CryptoJS.AES.encrypt('Kosong', 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString()),
            datapesan: '',
            datamaster: [],
            pkawalaktif: '1',
            pkrevisiaktif: '1',
            pkakhiraktif: '1',
            tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
        };
    },
    methods: {
        getOtentifikasi() {
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
        async ambildata() {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPI.get("parastapainnovationatur-PK?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                        for (let i = 0; i < this.datamaster.length; i++) {
                            if (this.datamaster[i].id == '1' && this.datamaster[i].showmenu == '1') {
                                this.pkawalaktif = '1';
                            }
                            if (this.datamaster[i].id == '1' && this.datamaster[i].showmenu == '0') {
                                this.pkawalaktif = '0';
                            }
                            if (this.datamaster[i].id == '2' && this.datamaster[i].showmenu == '1') {
                                this.pkrevisiaktif = '1';
                            }
                            if (this.datamaster[i].id == '2' && this.datamaster[i].showmenu == '0') {
                                this.pkrevisiaktif = '0';
                            }
                            if (this.datamaster[i].id == '3' && this.datamaster[i].showmenu == '1') {
                                this.pkakhiraktif = '1';
                            }
                            if (this.datamaster[i].id == '3' && this.datamaster[i].showmenu == '0') {
                                this.pkakhiraktif = '0';
                            }
                        }
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
        keluar() {
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
    },
    mounted() {
        this.getOtentifikasi();
        this.ambildata();
        //alert(this.leveluser);
        if ((localStorage.getItem("tokensistem") == null)) {
            window.location.replace("/");
        }
    }
}
</script>

<style></style>