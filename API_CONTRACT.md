# Dokumen Kontrak API (API Contract)
**Sistem Pendataan Administrasi Desa Sukamulya**

Dokumen ini ditujukan untuk tim **Backend Developer**. Semua format *request* dan *response* di bawah ini adalah representasi dari tipe data (TypeScript) yang digunakan di sisi *Frontend*. Tim Backend diharapkan membangun API yang menghasilkan struktur JSON yang sesuai dengan kontrak ini agar integrasi berjalan tanpa *error* di sisi antarmuka (*UI*).

---

## Base Configuration
- **Base URL**: `/api/v1` (contoh: `https://api.desasukamulya.id/api/v1`)
- **Authentication**: JWT Bearer Token. 
  - Header: `Authorization: Bearer <token>`
- **Standard Response Format**:
  Setiap *response* API (baik berhasil maupun gagal) wajib dibungkus dalam standar berikut:
  ```json
  {
    "success": true,
    "message": "Pesan sukses atau error",
    "data": { ... } // null jika error
  }
  ```

---

## 1. Modul Autentikasi (Auth)

### 1.1. Login
- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "Login berhasil",
    "data": {
      "token": "eyJhbG...",
      "user": {
        "id": "USR-001",
        "username": "admin_sukamulya",
        "role": "SUPER_ADMIN",
        "name": "Niamilah Nabil Syahputra"
      }
    }
  }
  ```

---

## 2. Modul Dashboard

### 2.1. Get Dashboard Statistics
- **Endpoint**: `GET /dashboard/stats`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Data statistik berhasil diambil",
    "data": {
      "totalPenduduk": 2160,
      "pertumbuhanPenduduk": 12,
      "totalKK": 645,
      "pertumbuhanKK": 3,
      "rasioJenisKelamin": {
        "lakiLaki": 1050,
        "perempuan": 1110
      },
      "usiaProduktif": {
        "jumlah": 1420,
        "persentase": 65.7
      },
      "sebaranRW": [
        { "name": "RW 01", "total": 400 },
        { "name": "RW 02", "total": 300 }
      ]
    }
  }
  ```

---

## 3. Modul Layanan Surat

### 3.1. Simpan Surat (Buat Surat)
- **Endpoint**: `POST /surat`
- **Request Body**:
  ```json
  {
    "jenisSurat": "Surat Keterangan Domisili",
    "nik": "3329102203060002",
    "namaLengkap": "Dadan Ramadhan",
    "keperluan": "Persyaratan pembuatan rekening bank",
    "keteranganTambahan": "Alamat domisili saat ini di Dusun Cikadu"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Surat berhasil dibuat",
    "data": {
      "idSurat": "SRT-20260729-001",
      "nomorSuratResmi": "470 / 084 / DS.SKM / VII / 2026",
      "tanggal": "2026-07-29"
    }
  }
  ```

### 3.2. Get Arsip Surat (Dengan Pagination & Filter)
- **Endpoint**: `GET /surat/arsip`
- **Query Params**: `?page=1&limit=10&jenis=Surat Keterangan Domisili&search=Dadan`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Arsip berhasil diambil",
    "data": {
      "items": [
        {
          "id": "SRT-20260729-001",
          "nomor": "470 / 084 / DS.SKM / VII / 2026",
          "nik": "3329102203060002",
          "pemohon": "Dadan Ramadhan",
          "jenis": "Surat Keterangan Domisili",
          "keperluan": "Persyaratan pembuatan rekening bank",
          "tanggal": "29 Juli 2026"
        }
      ],
      "meta": {
        "total": 150,
        "page": 1,
        "lastPage": 15
      }
    }
  }
  ```

---

## 4. Modul Manajemen Warga

### 4.1. Get Daftar Warga
- **Endpoint**: `GET /warga`
- **Query Params**: `?search=Niam&rw=02`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Data warga berhasil diambil",
    "data": {
      "items": [
        {
          "id": "WRG-123",
          "nik": "3200112233445566",
          "namaLengkap": "Niamilah Nabil Syahputra",
          "tempatLahir": "Pangandaran",
          "tanggalLahir": "2000-01-01",
          "jenisKelamin": "L",
          "agama": "Islam",
          "statusPerkawinan": "Belum Kawin",
          "alamat": "Jalan Raya Sukamulya",
          "dusun": "Cikadu",
          "rt": "01",
          "rw": "02",
          "statusWarga": "AKTIF",
          "sumberData": "INPUT_MANUAL"
        }
      ]
    }
  }
  ```

### 4.2. Tambah Warga Baru
- **Endpoint**: `POST /warga`
- **Request Body**: (Sama dengan object warga di atas tanpa `id`)

---

## 5. Modul Catat Peristiwa

### 5.1. Catat Kelahiran
- **Endpoint**: `POST /peristiwa/kelahiran`
- **Request Body**:
  ```json
  {
    "nomorKK": "3200112233440000",
    "namaBayi": "Bayi Ajaib",
    "tanggalLahir": "2026-07-28",
    "jenisKelamin": "L",
    "namaAyah": "Ayah Fulan",
    "namaIbu": "Ibu Fulanah"
  }
  ```

### 5.2. Catat Kematian
- **Endpoint**: `POST /peristiwa/kematian`
- **Request Body**:
  ```json
  {
    "nikYangMeninggal": "3200112233445566",
    "tanggalWafat": "2026-07-28",
    "penyebab": "Sakit / Usia Lanjut",
    "tempatMeninggal": "RSUD Pangandaran",
    "namaPelapor": "Kerabat Fulan"
  }
  ```


---

## 6. Modul Manajemen Pengguna (User & Role)

### 6.1. Get Daftar Pengguna
- **Endpoint**: `GET /users`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Daftar pengguna berhasil diambil",
    "data": {
      "items": [
        {
          "id": "USR-001",
          "username": "admin_sukamulya",
          "name": "Niamilah Nabil Syahputra",
          "role": "SUPER_ADMIN",
          "status": "AKTIF"
        },
        {
          "id": "USR-002",
          "username": "staf_pelayanan",
          "name": "Staf Desa",
          "role": "ADMIN",
          "status": "AKTIF"
        }
      ]
    }
  }
  ```

### 6.2. Tambah/Ubah Pengguna (Role Assignment)
- **Endpoint**: `POST /users`
- **Request Body**:
  ```json
  {
    "username": "kades_baru",
    "password": "password123",
    "name": "Nama Kades",
    "role": "SUPER_ADMIN"
  }
  ```

---
> **Catatan untuk Backend**: 
> Semua operasi penulisan (*POST/PUT/DELETE*) harus mengecek *authorization token*. Mohon pastikan implementasi validasi (CORS, Rate Limiting) dan sanitasi input juga dilakukan di sisi server.
