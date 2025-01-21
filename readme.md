Cara menjalankan aplikasi

1. Install NodeJS
2. Install PostgreSQL
3. Jalankan perintah "npm install" pada terminal directory project
4. Setup database pada config/config.json
5. Jalankan perintah "npx sequelize-cli db:create" untuk generate database
6. Jalankan perintah "npx sequelize-cli db:migrate" untuk generate database
7. Jika berhasil database dan tabel akan ada di postgre
8. Jalankan service menggunakan perintah "npm run start"
9. buka pada browser http://localhost:3000

Untuk registrasi akun silahkan gunakan postman menggunakan end point berikut

End Point : /petugas/api/inputpetugas
Method : POST
Request Body : {
    "nama_petugas" : "nama_petugas",
    "username" : "admin",
    "password" : "admin",
    "repeat_password" : "admin",
    "level" : "Admin" 
}