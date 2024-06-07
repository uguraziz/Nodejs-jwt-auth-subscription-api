# Node.js JWT ile Üyelik ve Abonelik Sistem API

Bu proje, Node.js kullanılarak geliştirilmiş bir üyelik ve abonelik sistemi API'si sağlar. 
JSON Web Token (JWT) kullanılarak kimlik doğrulama ve yetkilendirme sağlanır. Kullanıcı kaydı, 
girişi, 
profil bilgilerinin alınması,
şifre sıfırlama 
plan crud,
abonelik crud
ödeme crud
gibi işlemleri gerçekleştirebilirsiniz.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token) ile kimlik doğrulama
- bcrypt ile şifreleme
- Joi ile veri doğrulama
- Nodemailer ile e-posta gönderme
- express-rate-limit ile API isteklerinin sınırlanması
- express-mongo-sanitize ile MongoDB sorgularının güvenli hale getirilmesi
- cors ile Cross-Origin Resource Sharing (CORS) yönetimi

## Başlarken

1. Gerekli bağımlılıkları yükleyin: `npm install`
2. `.env` dosyası gerekli ortam değişkenlerini ayarlayın
3. Uygulamayı başlatın: `npm start`
4. Postman'de request gönderirken header kısmında content-type/application-json yapmayı unutmayın

## Endpoints (Rotalar)

- `POST /api/login`: Kullanıcı girişi için
- `POST /api/register`: Kullanıcı kaydı için
- `GET /api/me`: Mevcut kullanıcı bilgilerini getirir
- `GET /api/users`: Tüm kullanıcıları getirir (Yönetici için)
- `POST /api/forget-password`: Şifreyi sıfırlamak için sıfırlama kodu oluşturur ve e-posta gönderir
- `POST /api/reset-code-check`: Sıfırlama kodunun doğruluğunu kontrol eder
- `POST /api/reset-password`: Şifreyi sıfırlar


- `GET /api/plan/get`: Tüm planları getirir. sonuna /id getirilirse ilgili planı getirir.
- `POST /api/plan/create`: Plan kaydı için
- `POST /api/plan/update`: Plan güncelleme için
- `DELETE /api/plan/delete/:id`: Planı silmek için


- `GET /api/subs/get`: Tüm abonelikleri getirir. sonuna /id getirilirse ilgili aboneliği getirir.
- `POST /api/subs/create`: Abonelik kaydı için
- `POST /api/subs/update`: Abonelik güncelleme için
- `DELETE /api/subs/delete/:id`: Abonelik silmek için
 

- `GET /api/pay/get`: Tüm Ödemeleri getirir. sonuna /id getirilirse ilgili ödemeyi getirir.
- `POST /api/pay/create`: Plan kaydı için
- `POST /api/pay/update`: Plan güncelleme için
- `DELETE /api/pay/delete/:id`: Planı silmek için
