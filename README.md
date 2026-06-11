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
