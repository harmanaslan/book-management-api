# Book Management REST API

Bu proje NestJS ile hazırlanmış basit bir Book Management REST API çalışmasıdır.

Amaç:

* REST standartlarına uygun basit CRUD endpointleri oluşturmak
* Controller / Service / DTO / Entity yapısını kullanmak
* Veritabanı kullanmadan local JSON dosyası üzerinden okuma/yazma yapmak

## Kullanılan Teknolojiler

* NestJS
* TypeScript
* Node.js
* Local JSON File Storage

## Book Modeli


{
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
}


## Proje Kurulumu

Projeyi indirdikten sonra bağımlılıkları kurmak için:


npm install


## Projeyi Çalıştırma

Geliştirme modunda çalıştırmak için:


npm run start:dev


Proje varsayılan olarak şu adreste çalışır:


http://localhost:3000


## Endpointler

### Tüm Kitapları Listele

GET /books

Örnek:

http://localhost:3000/books


### ID'ye Göre Kitap Getir

GET /books/:id


Örnek:


http://localhost:3000/books/58


Kitap bulunamazsa `404 Not Found` döner.

Örnek hata cevabı:


{
  "message": "Book with id 58 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### Yeni Kitap Ekle

POST /books


Örnek Body:


{
  "title": "Suç ve Ceza",
  "author": "Fyodor Dostoyevski",
  "year": 1866,
  "genre": "Roman"
}


PowerShell örneği:


Invoke-RestMethod -Method Post -Uri "http://localhost:3000/books" -ContentType "application/json" -Body '{"title":"Suç ve Ceza","author":"Fyodor Dostoyevski","year":1866,"genre":"Roman"}'


### Kitap Güncelle

PATCH /books/:id


Örnek Body:


{
  "genre": "Klasik Roman"
}


PowerShell örneği:


Invoke-RestMethod -Method Patch -Uri "http://localhost:3000/books/1" -ContentType "application/json" -Body '{"genre":"Klasik Roman"}'


### Kitap Sil


DELETE /books/:id


PowerShell örneği:


Invoke-RestMethod -Method Delete -Uri "http://localhost:3000/books/1"


## Veri Saklama

Projede veritabanı kullanılmamıştır.

Kitap verileri local olarak şu dosyada tutulur:


data/books.json


`GET` işlemleri bu dosyadan okuma yapar.

`POST`, `PATCH` ve `DELETE` işlemleri sonrasında `data/books.json` dosyası güncellenir.

## Proje Yapısı


book-management-api
├── data
│   └── books.json
├── src
│   ├── books
│   │   ├── dto
│   │   │   ├── create-book.dto.ts
│   │   │   └── update-book.dto.ts
│   │   ├── entities
│   │   │   └── book.entity.ts
│   │   ├── books.controller.ts
│   │   ├── books.controller.spec.ts
│   │   ├── books.service.ts
│   │   └── books.service.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── package.json
└── README.md


## Tamamlanan Özellikler

* `GET /books` ile tüm kitapları listeleme
* `GET /books/:id` ile id’ye göre kitap getirme
* `POST /books` ile yeni kitap ekleme
* `PATCH /books/:id` ile kitap güncelleme
* `DELETE /books/:id` ile kitap silme
* Kitap bulunamadığında `404 Not Found` döndürme
* Local `data/books.json` dosyasından okuma/yazma
* Controller, Service, DTO ve Entity yapısını kullanma

## Son Revizyon

Gelen geri bildirimler doğrultusunda proje yapısı NestJS standartlarına daha uygun hale getirildi.

Yapılan geliştirmeler:

* BooksModule oluşturuldu.
* BooksController ve BooksService, BooksModule içine taşındı.
* AppModule sadeleştirildi.
* Global ValidationPipe eklendi.
* class-validator ve class-transformer paketleri kuruldu.
* CreateBookDto ve UpdateBookDto için validation kuralları eklendi.
* DTO dışında gönderilen alanların engellenmesi sağlandı.
* Hatalı veri gönderimlerinde 400 Bad Request response dönmesi sağlandı.


2.TASK

Bu repository içinde ikinci aşama olarak basit bir Task Planner API geliştirilmiştir.

Bu yapı basit bir Jira alternatifi mantığında hazırlanmıştır.

### Kullanılan Yapılar

- MongoDB
- Mongoose
- JWT Authentication
- Role Guard
- Admin / User rol ayrımı
- DTO validation
- bcryptjs ile password hashing

### Auth Endpointleri

- POST /auth/register
- POST /auth/login
- GET /auth/profile
- GET /auth/admin-test

### Project Endpointleri

- POST /projects
- GET /projects

### Task Endpointleri

- POST /tasks
- GET /tasks/my-tasks
- PATCH /tasks/:id/status

### Roller

ADMIN:

- Proje oluşturabilir.
- Task oluşturabilir.
- Taskı bir user’a atayabilir.

USER:

- Kendine atanmış taskları görebilir.
- Kendi task statusunu güncelleyebilir.

### Task Status Değerleri

- TODO
- IN_PROGRESS
- DONE

### Tamamlanan Özellikler 14.06.2026 00:17

- Kullanıcı register/login işlemleri yapıldı.
- Şifreler bcryptjs ile hashlenerek MongoDB’ye kaydedildi.
- Login sonrası JWT accessToken üretildi.
- JwtAuthGuard ile token kontrolü yapıldı.
- RolesGuard ile ADMIN / USER yetki ayrımı yapıldı.
- ADMIN rolündeki kullanıcı proje oluşturabilir hale getirildi.
- ADMIN rolündeki kullanıcı task oluşturup user’a atayabilir hale getirildi.
- USER rolündeki kullanıcı sadece kendine atanmış taskları görebilir hale getirildi.
- USER rolündeki kullanıcı kendi task statusunu TODO, IN_PROGRESS veya DONE olarak güncelleyebilir hale getirildi.

## Feedback geliştirmeleri 14.06.2026   16:15

Gelen feedbackler doğrultusunda proje üzerinde ek geliştirmeler yapılmıştır.

 Eklenen Geliştirmeler:

- src/commons klasör yapısı oluşturuldu.
- constants, dto, filters, interfaces ve utils klasörleri eklendi.
- Pagination için ortak PaginationQueryDto oluşturuldu.
- Books endpointine genre, author ve createdBy filtreleme eklendi.
- Books endpointine page ve limit parametreleriyle pagination eklendi.
- Magic number kullanımını azaltmak için APP_CONSTANTS yapısı eklendi.
- Global Exception Filter oluşturuldu.
- Error response formatı merkezi hale getirildi.
- Controller endpointlerine HTTP status kodları eklendi.

 Örnek Books Query Kullanımları:

GET /books?page=1&limit=2

GET /books?genre=Roman

GET /books?author=George%20Orwell

GET /books?createdBy=user

GET /books?createdBy=admin&page=1&limit=2

- Standart Error Response Formatı

{
  "success": false,
  "statusCode": 404,
  "timestamp": "2026-06-14T13:04:06.778Z",
  "path": "/books/999",
  "message": "Book with id 999 not found"
}

## Second Feedback Improvements - 17.06.2026 22:48

Bu geliştirme adımında proje daha profesyonel bir NestJS yapısına yaklaştırılmıştır.

- `book.service.ts` içinde kullanılan senkron dosya işlemleri kaldırıldı.
- Books modülü local `data/books.json` yapısından MongoDB/Mongoose yapısına taşındı.
- Başarılı response'ları standart hale getirmek için global response interceptor eklendi.
- Gelen isteklerde method, URL, status code ve işlem süresini takip etmek için logging interceptor eklendi.
- Controller endpointlerinde dönüş tipleri daha net hale getirildi.
- MongoDB ObjectId doğrulaması için `ParseObjectIdPipe` eklendi.
- Books detail, update ve delete endpointlerinde ObjectId doğrulaması uygulandı.
- Swagger API dokümantasyonu projeye entegre edildi.
- DTO dosyalarına Swagger için `@ApiProperty` ve `@ApiPropertyOptional` decorator'ları eklendi.

Swagger dokümantasyonu:

http://localhost:3000/api-docs

Not: Books verileri artık `data/books.json` dosyasında değil, MongoDB üzerinde tutulur.