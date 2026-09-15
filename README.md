<div align="center">

# 🥢 LUMPIA KANJENG
### Mahakarya Kerenyahan Tradisional Semarang // Estd. 1978

[![Status](https://img.shields.io/badge/Status-Active%20%26%20Ready-33ff66?style=for-the-badge&logo=github)](https://github.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla%20Luxury-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Procedural%20ASMR-f0a500?style=for-the-badge&logo=audio&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![HTML5 Canvas](https://img.shields.io/badge/Canvas-Virtual%20Card%20Engine-ffc436?style=for-the-badge&logo=canvas&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

<p align="center">
  <b>Web Application Pengalaman Kuliner Interaktif Modern untuk Brand Warisan Lumpia Semarang.</b><br>
  Dilengkapi Sintesis Audio ASMR Kerenyahan Prosedural, Studio Rakit Lumpia Mandiri (DIY), Simulator Penggorengan Wajan, Generator Kartu Member 3D Glassmorphic, Portal Kemitraan Franchise, hingga Pencetak Struk Thermal Digital.
</p>

[Jelajahi Menu](#-fitur-unggulan) • [Alur Autentikasi](#-sistem-autentikasi--keanggotaan) • [Teknologi](#-arsitektur--teknologi) • [Cara Menjalankan](#-cara-menjalankan-secara-lokal)

---

</div>

## 🌟 Cuplikan Antarmuka (Preview)

```text
 ____________________________________________________________________________
|  🥢 LUMPIA KANJENG     [Menu]  [Rakit Sendiri]  [Studio ASMR]   👑 Danang  |
|============================================================================|
|                                                                            |
|   🔥 KERENYAHAN EMAS,                    .----------------------------.    |
|      KENIKMATAN LEGENDARIS               |  🥢 LUMPIA KANJENG  [VIP]  |    |
|      DI SETIAP GIGITAN.                  |  [≡] Chip EMV   )))        |    |
|                                          |  LK-VIP-2026-7712          |    |
|   [🔥 Pesan Lumpia] [🎨 Rakit DIY]       |  RADEN MAS DANANG          |    |
|                                          '----------------------------'    |
|____________________________________________________________________________|
```

---

## 🔥 Fitur Unggulan

### 1. 🎧 Procedural Culinary ASMR Audio Engine (`audio.js`)
- **100% Bebas Aset MP3 Eksternal**: Menggunakan **Web Audio API** prosedural untuk menghasilkan suara organik:
  - **Golden Crunch Bite**: Gelombang *bandpass filtered noise* multi-layer yang menirukan rekahan kerenyahan kulit lumpia asli.
  - **Hot Oil Sizzle**: Simulasi desis gelembung minyak panas di wajan secara kontinu dengan pengatur frekuensi dinamis.
  - **Sauce Bubble Pop & Cash Register Ding**: Resonansi audio interaktif saat menambah menu dan checkout.

### 2. 🎨 Interactive DIY Lumpia Studio (Rakit Sendiri)
- Pengunjung dapat meracik lumpia impian secara interaktif:
  - Pilihan kulit: *Kulit Emas Renyah*, *Kulit Gandum*, atau *Kulit Pandan*.
  - Isian kombinasi: *Rebung Madu Kanjeng, Udang Laut, Kepiting, Rendang Wagyu, Jamur Truffle*.
  - Parameter indikator: **Meteran Kerenyahan (Crunch)**, **Umami**, dan **Tingkat Pedas**.
  - Visual tumpukan isian dan lapisan kulit rendered secara real-time.

### 3. 🎴 Live 3D Virtual Member Card & Canvas Card Generator
- **3D Parallax Tilt Effect**: Kartu digital bereaksi dinamis terhadap pergerakan mouse kursor dengan kilau holografik (*card glare*).
- **Dual Stream Portal**:
  - **Member VIP Kanjeng Club**: Akses diskon 15% seumur hidup, traktiran porsi gratis di hari ultah, dan CrunchPoints.
  - **Mitra Kemitraan & Franchise**: Pilihan paket *Gerobak Heritage Kayu Jati*, *Reseller & Cloud Kitchen*, atau *Island Booth Mall*.
- **Unduh Kartu Digital (PNG)**: Mesin **HTML5 Canvas (800x480)** yang langsung menggambar kartu resmi beresolusi tinggi untuk disimpan ke galeri perangkat pengguna.

### 4. 🧾 Keranjang Belanja Pintar & Thermal Receipt Printer
- **Diskon Member Otomatis**: Jika pengguna login sebagai member, subtotal belanja otomatis dipotong diskon 15%.
- **Thermal Receipt Modal**: Menghasilkan struk nota retro lengkap dengan nomor order acak, rincian varian, barcode QRIS simulasi, dan tanggal transaksi.
- **Pemesanan WhatsApp Instan**: Mengubah keranjang belanja menjadi format pesan WhatsApp terstruktur dan siap kirim ke kasir/dapur.

---

## 🔐 Sistem Autentikasi & Keanggotaan

Aplikasi memiliki alur autentikasi lokal (*client-side session storage*) yang terintegrasi penuh:

| Jalur Halaman | URL Berkas | Deskripsi |
| :--- | :--- | :--- |
| **Beranda Utama** | [`index.html`](index.html) | Navigasi pintar: Menampilkan tombol `Masuk` dan `👑 Daftar` saat tamu, atau widget profil `👑 [Nama] (VIP)` dengan tombol `Keluar` saat sesi login aktif. |
| **Masuk Akun** | [`login.html`](login.html) | Portal login heritage dengan pemilihan mode (*Member VIP* / *Mitra Franchise*), validasi PIN 6 digit, modal pemulihan PIN, dan tombol demo 1-klik. |
| **Pendaftaran** | [`daftar.html`](daftar.html) / [`register.html`](register.html) | Formulir pendaftaran komprehensif, validasi data Indonesia (+62/08), generator ID unik (`LK-VIP-2026-XXXX`), dan pratinjau kartu 3D langsung. |

### ⚡ Akun Demo Bawaan (Siap 1-Klik di Halaman Login):
- **👑 Member VIP**:
  - No. WhatsApp: `081234567890`
  - PIN Rahasia: `123456`
  - Hak: Diskon 15% Otomatis, 350 CrunchPoints
- **🤝 Mitra Bisnis**:
  - No. WhatsApp: `081298765432`
  - PIN Rahasia: `123456`
  - Hak: Paket Gerobak Heritage Kayu Jati

---

## 📁 Struktur Direktori Proyek

```bash
lumpiagit/
├── index.html         # Halaman utama (Hero ASMR, Menu, DIY Studio, Wajan Sizzle, Lokasi, Keranjang)
├── login.html         # Portal masuk akun (Member VIP & Mitra Bisnis)
├── login.js           # Controller autentikasi login & demo accounts
├── daftar.html        # Portal pendaftaran resmi & kartu digital 3D
├── register.html      # Endpoint alternatif resmi pendaftaran
├── daftar.css         # Desain kartu 3D glassmorphic, form, dan modal
├── daftar.js          # Controller pendaftaran, canvas renderer, dan Web Audio feedback
├── app.js             # Controller utama aplikasi beranda, keranjang, dan state navbar
├── audio.js           # Procedural Web Audio API sound synthesizer
└── style.css          # Design system, palet warna, tipografi, dan animasi CSS
```

---

## 🎨 Desain & Palet Visual

Aplikasi ini mengadopsi estetika **Heritage Javanese Luxury Meets Modern Dark Mode**:

| Token Warna | Nilai Hex | Penggunaan |
| :--- | :--- | :--- |
| **Deep Emerald** | `#0c1813` | Background utama kedai & suasana malam |
| **Card Emerald** | `#14231c` | Kontainer kartu menu & studio kerja |
| **Radiant Gold** | `#ffc436` | Aksen tombol utama, stempel keaslian, teks hero |
| **Heritage Gold** | `#f0a500` | Border emas, chip EMV, ornamen mahkota |
| **Terracotta** | `#d9532f` | Notifikasi pedas & aksen cabai rawit |
| **Cream Linen** | `#fbf8f2` | Tipografi primer agar nyaman dibaca |

- **Tipografi**:
  - *Serif Elegan*: `Instrument Serif`
  - *Antarmuka Modern*: `Plus Jakarta Sans`
  - *Data & Kartu Identitas*: `Space Grotesk`

---

## 🚀 Cara Menjalankan Secara Lokal

Proyek ini dibangun murni menggunakan teknologi web standar (**Zero External Build Tools & Zero Heavy Dependencies**).

### Opsi 1: Buka Langsung di Browser
1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/lumpiagit.git
   ```
2. Klik dua kali pada berkas `index.html` untuk membuka langsung di Google Chrome, Microsoft Edge, Firefox, atau Safari.

### Opsi 2: Menggunakan Live Server (VS Code / Laragon)
1. Letakkan folder di dalam direktori server lokal (misal: `laragon/www/lumpiagit` atau `xampp/htdocs/lumpiagit`).
2. Akses melalui browser:
   ```text
   http://localhost/lumpiagit/
   ```
3. Atau buka melalui ekstensi **Live Server** di VS Code (`Go Live` pada port 5500).

---

## 🛡️ Hak Cipta & Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).  
Didedikasikan untuk melestarikan dan memodernisasi kuliner warisan Indonesia.

<div align="center">
  <sub>Dibuat dengan rasa hormat untuk cita rasa legendaris Indonesia 🥢 Semarang Heritage Estd. 1978.</sub>
</div>
