# Snap Documentation

Open API Pembayaran berbasis SNAP diperlukan pedoman untuk pemberian akses dan credential dari Penyedia Layanan kepada Pengguna Layanan. Hal ini mempertimbangkan bahwa Open API Pembayaran berbasis SNAP yang disediakan oleh Penyedia Layanan, tidak dapat diakses secara langsung oleh publik. Penyedia Layanan mensyaratkan proses administrasi sebelum calon Pengguna Layanan dapat mengakses Open API Pembayaran berbasis SNAP yang diselenggarakan oleh Penyedia Layanan.

Pada tahap proses administrasi, Penyedia Layanan baik Penyelenggara Jasa Pembayaran (PJP) Bank maupun PJP Lembaga Selain Bank, memerlukan sejumlah data guna mengetahui identitas dari calon Pengguna Layanan sebagai dasar agar dapat memberikan credential dan akses.

## Table Of Content

- [Flow Diagram](#flow-diagram)
- [Command](#command)
  - [Docker Lifecycle](#docker-lifecycle)
  - [Application Lifecycle](#application-lifecycle)
  - [Migrations Lifecycle](#migrations-lifecycle)
- [Flow Process](#flow-process)
- [Folder Structure](#folder-structure)
- [API Services](#api-services)
  - [BCA](#bca)
    + [Signature Auth](#signature-auth)
    + [Access Token B2B](#access-token-b2b)
    + [Signature Service](#signature-service)
    + [Transfer Inquiry](#transfer-inquiry)
    + [Transfer Payment](#transfer-payment)
    + [Transfer Status](#transfer-status)
  - [BI](#bi)
    + [Signature Auth](#signature-auth)
    + [Access Token B2B](#access-token-b2b)
    + [Signature Service](#signature-service)
    + [Transfer Inquiry](#transfer-inquiry)
    + [Transfer Payment](#transfer-payment)
    + [Transfer Status](#transfer-status)
- [Tech Stack](#tech-stack)

## Flow Diagram

![](https://i.imgur.com/XkIfoi7.png")

## Command

- #### **Docker Lifecycle**

  - `make dcub` - digunakan untuk menjalakan service, sekaligus membuild service yang belum ada menjadi docker image, biasanya fungsi ini digunakan ketika docker image belum tersedia di local komputer.

  - `make dcubn` - digunakan untuk menjalakan service, sekaligus membuild ulang service yang ada menjadi docker image, tetapi tanpa mempengaruhi service yang lainnya yang sedang berjalan, biasanya fungsi ini digunakan ketika kita melakukan perubahan pada salah satu service atau lebih, baik itu perubahan dari sisi code atau yang lainnya.

  - `make dcund` - digunakan untuk menjalakan service, tetapi tanpa perlu membuild ulang service tersebut menjadi docker image, biasanya fungsi ini digunakan ketika kita melakukan perubahan config pada aplikasi, contoh ketika kita merubah environtment value pada .env file yang digunakan.

- #### **Application Lifecycle**

  - `make bca` - digunakan untuk menjalakan service bca, biasanya fungsi ini digunakan ketika, kita sedang melakukan tahap pengembangan pada aplikasi yang sedang kita buat.

  - `make bi` - digunakan untuk menjalakan service bi, biasanya fungsi ini digunakan ketika, kita sedang melakukan tahap pengembangan pada aplikasi yang sedang kita buat.

- #### **Migrations Lifecycle**

  - `make kmake` - biasanya fungsi ini digunakan ketika, kita ingin membuat sebuah migration file database baru untuk aplikasi yang kita buat.

  - `make kmig` - biasanya fungsi ini digunakan ketika, kita ingin menjalakan semua file migration database yang telah kita buat sebelumnya.

  - `make kroll` - biasanya fungsi ini digunakan ketika, kita ingin menghapus semua table yang tersedia di dalam database.

  - `make klist` - biasanya fungsi ini digunakan ketika, kita ingin melihat list migration file yang telah kita buat sebelumnya, apakah sudah pernah dijalankan atau belum pernah dijalankan.

  - `make kres` - biasanya fungsi ini digunakan ketika, kita ingin menghapus semua data yang sudah ada sebelumnya di setiap table database.

  - `make kseed` - biasanya fungsi ini digunakan ketika, kita ingin menambahkan data ke dalam database, biasanya digunakan ketika aplikasi sedang dalam tahap pengembangan sebagai dummy data.

## Flow Process

- Ketikan command `export $(cat .env | xargs)` pada terminal, terlebih dahulu sebelum menjalankan aplikasi dengan docker, bertujuan untuk mengexport semua environment variable yang dibutuhkan oleh aplikasi.
- Kemudian jalankan docker dengan mengetikan command `make dcub` pada terminal, jika docker image sebelumnya belum pernah dibuat sama sekali.
- Kemudian ketika docker sudah berhasil dijalankan, tetapi ada beberapa service yang mati, maka anda perlu menjalankan command dengan mengetikan `docker restart <container id>` pada terminal.
- Kemudian jika migration database di rasa belum tersedia, maka anda harus menjalankan command dengan mengetikan `make kmig` pada terminal.

### Folder Structure

- **dockers** digunakan untuk menaruh setiap dockerfile baru, yang dimana nanti akan digunakan oleh aplikasi.
- **domains** digunakan untuk menaruh setiap service baru, yang dimana nanti akan digunakan oleh aplikasi.
- **helpers** digunakan untuk menaruh setiap tools baru, yang dimana nanti akan digunakan oleh aplikasi.
- **packages** digunakan untuk menaruh setiap library baru, yang dimana nanti akan digunakan oleh aplikasi.

```text
├── dockers
│   └── go
│   |   └── Dockerfile.bca
│   |   └── Dockerfile.bi
|   |
└── domains
│   └── bca
│   |    └── api
│   │    |   └── main.go
│   │    |   └── handler.go
│   │    |   └── service.go
|   |    |
│   |    └── cmd
│   │    |   └── main.go
|   |    |
│   |    └── worker
│   │    |   └── main.go
│   │    |   └── handler.go
│   │    |   └── service.go
|   |    |
│   │    └── builder.go
│   │    └── dao.go
│   │    └── dto.go
│   │    └── model.go
│   │    └── validation.go
|   |
└── migrations
│   └── src
│   |    └── migrations
│   │    |   └── transaction.ts
│   │    |   └── transaction_history.ts
│   │    |   └── transaction_logs.ts
|   |    |
│   |    └── seeds
│   │    |   └── transaction.ts
│   │    |   └── transaction_history.ts
|   |    |
│   │    └── knexfile.ts
│   │    └── package.json
│   │    └── dto.go
│   │    └── pnpm-lock.yaml
│   │    └── tsconfig.json
|   |
└── helpers
│   └── helper.snapResponse.go
│   └── helper.snapToken.go
│   └── helper.snapValidation.go
|   |
└── packages
│   └── pkg.rabbitmq.go
│   └── pkg.viper.go
│   └── pkg.jwt.go
```

## API Services

- ### **BCA**

  - ### **Signature Auth**:

    Digunakan untuk mengenerate signature auth token, yang dimana nanti akan digunakan untuk mengenerate access token B2B.

    - **Service**: Signature Auth
    - **Url**: https://pluto014.purwanto.co.id
    - **Method**: POST
    - **Path**: /open/api/v1.0/signature-auth
    - **Headers**:
      ``` text
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-CLIENT-KEY: 2b58fb2a9070410980d5b6dc872a2d3d
      Private_Key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb1FJQ
      ```
    - Body: Empty

  - ### **Access Token B2B**:

    Digunakan untuk mengenerate access token B2B, yang dimana nanti akan digunakan untuk mengenerate signature service token.

    - **Service**: Signature Auth
    - **Url**: https://pluto014.purwanto.co.id
    - **Method**: POST
    - **Path**: /open/api/v1.0/signature-auth
    - **Headers**:
      ``` text
      Content-Type: application/json
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-CLIENT-KEY: 2b58fb2a9070410980d5b6dc872a2d3d
      X-SIGNATURE: AQHMlvZsfqHzAyG4ofAUk710NxWk9Pwp2CYlF9l3H7tReAvPZMSmplObTL4srQm==
      ```
    - Body:
      ``` json
      {
          "grantType": "client_credentials",
          "additionalInfo": {}
      }
      ```

  - ### **Signature Service**:

      Digunakan untuk mengenerate signature service token, yang dimana nanti signature service token akan digunakan untuk mengakses setiap service yang akan digunakan.

    - **Service**: Signature Service
    - **Url**: https://pluto014.purwanto.co.id
    - **Method**: POST
    - **Path**: /open/api/v1.0/signature-service
    - **Headers**:
      ``` text
      Content-Type: application/json
      AccessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjJiNThmYjJhOTA3MDQx
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-CLIENT-SECRET: knzreerALgnl/9cweVvxezkZ+k8+dweeRD/eOs2olHQmdHtTV6fMJ5CRPD1dFuY7
      HttpMethod: POST
      EndpoinUrl: /openapi/v1.0/transfer-va/inquiry
      ```
    - Body:
      ``` json
        {
            "partnerServiceId": "   34599",
            "customerNo": "654760266542182454",
            "virtualAccountNo": "   34599654760266542182454",
            "trxDateInit": "2023-05-18T20:11:00+07:00",
            "channelCode": 6011,
            "language": "",
            "amount": null,
            "hashedSourceAccountNo": "",
            "sourceBankCode": "014",
            "additionalInfo": {
                "value": ""
            },
            "passApp": "",
            "inquiryRequestId": "202202110909311234500001136962"
        }
      ```

  - ### **Transfer Inquiry**:

    Digunakan untuk mendapatkan detail informasi terkait va number ke bank, apakah va number tersebut sudah terdaftar atau belum terdaftar.

    - **Service**: Transfer Inquiry
    - **Url**: https://pluto014.purwanto.co.id
    - **Method**: POST
    - **Path**: /open/api/v1.0/transfer-inquiry
    - **Headers**:
      ``` text
      Content-Type: application/json
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjJ
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-SIGNATURE: 1bqvd17Rv5mo0zUT34Uyg6pMMo7AcMimd6aiTsu75247/L6rXKekMXyTImxaz/mHfusbi5Fe2n/InYvC1pDI5g==
      X-PARTNER-ID: 14535
      X-EXTERNAL-ID: 32038
      CHANNEL-ID: 95231
      ```
    - Body:
      ``` json
        {
            "partnerServiceId": "   34599",
            "customerNo": "654760266542182454",
            "virtualAccountNo": "   34599654760266542182454",
            "trxDateInit": "2023-05-18T20:11:00+07:00",
            "channelCode": 6011,
            "language": "",
            "amount": null,
            "hashedSourceAccountNo": "",
            "sourceBankCode": "014",
            "additionalInfo": {
                "value": ""
            },
            "passApp": "",
            "inquiryRequestId": "202202110909311234500001136962"
        }
      ```

  - ### **Transfer Payment**:

    Digunakan untuk medapatkan detail informasi pembayaran ke bank, terkait va number yang digunakan ketika melakukan pembayaran.

    - **Service**: Transfer Payment
    - **Url**: https://pluto014.purwanto.co.id
    - **Method**: POST
    - **Path**: /open/api/v1.0/transfer-payment
    - **Headers**:
      ``` text
      Content-Type: application/json
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjJ
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-SIGNATURE: 1bqvd17Rv5mo0zUT34Uyg6pMMo7AcMimd6aiTsu75247/L6rXKekMXyTImxaz/mHfusbi5Fe2n/InYvC1pDI5g==
      X-PARTNER-ID: 14535
      X-EXTERNAL-ID: 32038
      CHANNEL-ID: 95231
      ```
    - Body:
      ``` json
        {
            "partnerServiceId": "   23132",
            "customerNo": "210963661413650253",
            "virtualAccountNo": "   23132210963661413650253",
            "virtualAccountName": "Jokul Doe",
            "virtualAccountEmail": "janam_xxx@hotmail.com",
            "virtualAccountPhone": "Orlando Roberts",
            "trxId": "",
            "paymentRequestId": "202202111031031234500001136962",
            "channelCode": 6011,
            "hashedSourceAccountNo": "",
            "sourceBankCode": "014",
            "paidAmount": {
                "value": "100000.00",
                "currency": "IDR"
            },
            "cumulativePaymentAmount": null,
            "paidBills": "",
            "totalAmount": {
                "value": "100000.00",
                "currency": "IDR"
            },
            "trxDateTime": "2022-02-12T17:29:57+07:00",
            "referenceNo": "00113696201",
            "journalNum": "",
            "paymentType": "",
            "flagAdvise": "N",
            "subCompany": "00000",
            "billDetails": [
                {
                    "billCode": "",
                    "billNo": "123456789012345678",
                    "billName": "",
                    "billShortName": "",
                    "billDescription": {
                        "english": "Maintenance",
                        "indonesia": "Pemeliharaan"
                    },
                    "billSubCompany": "00000",
                    "billAmount": {
                        "value": "100000.00",
                        "currency": "IDR"
                    },
                    "additionalInfo": {
                        "value": "Test Additional Data"
                    },
                    "billReferenceNo": "00113696201"
                }
            ],
            "freeTexts": [],
            "additionalInfo": {
                "value": ""
            }
        }
      ```

  - ### **Transfer Status**:

    Digunakan untuk melakukan pengecekan payment status ke bank, apakah va number sudah berhasil dibayar atau belum berhasil dibayar.

    - **Service**: Transfer Status
    - **Url**: https://pluto014.purwanto.co.id
    - **Method**: POST
    - **Path**: /open/api/v1.0/transfer-status
    - **Headers**
      ``` text
      Content-Type: application/json
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjJ
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-SIGNATURE: 1bqvd17Rv5mo0zUT34Uyg6pMMo7AcMimd6aiTsu75247/L6rXKekMXyTImxaz/mHfusbi5Fe2n/InYvC1pDI5g==
      X-PARTNER-ID: 14535
      X-EXTERNAL-ID: 32038
      CHANNEL-ID: 95231
      ```
    - Body:
      ``` json
        {
            "partnerServiceId": "   14535",
            "customerNo": "123456789012345678",
            "virtualAccountNo": "   14535123456789012345678",
            "inquiryRequestId": "202202111031031234500001136962",
            "paymentRequestId": "202202111031031234500001136962",
            "additionalInfo": {}
        }
      ```

- ### **BI**

  - ### **Signature Auth**:

    Digunakan untuk mengenerate signature auth token, yang dimana nanti akan digunakan untuk mengenerate access token B2B.

    - **Service**: Signature Auth
    - **Url**: https://pluto000.purwanto.co.id
    - **Method**: POST
    - **Path**: /snap/v1/api/v1.0/utilities/signature-auth
    - **Headers**:
      ``` json
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-CLIENT-KEY: 2b58fb2a9070410980d5b6dc872a2d3d
      Private_Key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb1FJQ
      ```
    - Body: Empty

  - ### **Access Token B2B**:

    Digunakan untuk mengenerate access token B2B, yang dimana nanti akan digunakan untuk mengenerate signature service token.

    - **Service**: Signature Auth
    - **Method**: POST
    - **Path**: /snap/v1/api/v1.0/utilities/signature-auth
    - **Headers**:
      ``` text
      Content-Type: application/json
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-CLIENT-KEY: 2b58fb2a9070410980d5b6dc872a2d3d
      X-SIGNATURE: AQHMlvZsfqHzAyG4ofAUk710NxWk9Pwp2CYlF9l3H7tReAvPZMSmplObTL4srQm==
      ```
    - Body:
      ``` json
      {
          "grantType": "client_credentials",
          "additionalInfo": {}
      }
      ```

  - ### **Signature Service**:

      Digunakan untuk mengenerate signature service token, yang dimana nanti signature service token akan digunakan untuk mengakses setiap service yang akan digunakan.

    - **Service**: Signature Service
    - **Url**: https://pluto000.purwanto.co.id
    - **Method**: POST
    - **Path**: /snap/v1/api/v1.0/utilities/signature-service
    - **Headers**:
      ``` text
      Content-Type: application/json
      AccessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjJiNThmYjJhOTA3MDQx
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-CLIENT-SECRET: knzreerALgnl/9cweVvxezkZ+k8+dweeRD/eOs2olHQmdHtTV6fMJ5CRPD1dFuY7
      HttpMethod: POST
      EndpoinUrl: /openapi/v1.0/transfer-va/inquiry
      ```
    - Body:
      ``` json
        {
            "partnerServiceId": "  88899",
            "customerNo": "12345678901234567890",
            "virtualAccountNo": "  08889912345678901234567890",
            "txnDateInit": "20201231T235959Z",
            "channelCode": 6011,
            "language": "ID",
            "amount": {
                "value": "12345678.00",
                "currency": "IDR"
            },
            "hashedSourceAccountNo": "abcdefghijklmnopqrstuvwxyz123456",
            "sourceBankCode": "008",
            "passApp": "abcdefghijklmnopqrstuvwxyz",
            "inquiryRequestId": "abcdef-123456-abcdef",
            "additionalInfo": {
                "deviceId": "12345679237",
                "channel": "mobilephone"
            }
        }
      ```

  - ### **Transfer Inquiry**:

    Digunakan untuk mendapatkan detail informasi terkait va number ke bank, apakah va number tersebut sudah terdaftar atau belum terdaftar.

    - **Service**: Transfer Inquiry
    - **Url**: https://pluto000.purwanto.co.id
    - **Method**: POST
    - **Path**: /snap/v1/api/v1.0/transfer-inquiry
    - **Headers**:
      ``` text
      Content-Type: application/json
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjJ
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-SIGNATURE: 1bqvd17Rv5mo0zUT34Uyg6pMMo7AcMimd6aiTsu75247/L6rXKekMXyTImxaz/mHfusbi5Fe2n/InYvC1pDI5g==
      X-PARTNER-ID: 14535
      X-EXTERNAL-ID: 32038
      CHANNEL-ID: 95231
      ```
    - Body:
      ``` json
            {
                "partnerServiceId": "  088899",
                "customerNo": "12345678901234567890",
                "virtualAccountNo": "  08889912345678901234567890",
                "virtualAccountName": "Jokul Doe",
                "virtualAccountEmail": "jokul@email.com",
                "virtualAccountPhone": "6281828384858",
                "trxId": "abcdefgh1234",
                "paymentRequestId": "abcdef-123456-abcdef",
                "channelCode": 6011,
                "hashedSourceAccountNo": "abcdefghijklmnopqrstuvwxyz123456",
                "sourceBankCode": "008",
                "paidAmount": {
                    "value": "12345678.00",
                    "currency": "IDR"
                },
                "cumulativePaymentAmount": {
                    "value": "12345678.00",
                    "currency": "IDR"
                },
                "paidBills": "95000",
                "totalAmount": {
                    "value": "12345678.00",
                    "currency": "IDR"
                },
                "trxDateTime": "20201231T235959Z",
                "referenceNo": "123456789012345",
                "journalNum": "123456",
                "paymentType": 1,
                "flagAdvise": "Y",
                "subCompany": "12345",
                "billDetails": [
                    {
                        "billCode": "01",
                        "billNo": "123456789012345678",
                        "billName": "Bill A for Jan",
                        "billShortName": "Bill A",
                        "billDescription": {
                            "english": "Maintenance",
                            "indonesia": "Pemeliharaan"
                        },
                        "billSubCompany": "00001",
                        "billAmount": {
                            "value": "12345678.00",
                            "currency": "IDR"
                        },
                        "additionalInfo": {},
                        "billReferenceNo": "123456789012345"
                    }
                ],
                "freeTexts": [
                    {
                        "english": "Free text",
                        "indonesia": "Tulisan bebas"
                    }
                ],
                "additionalInfo": {}
            }
      ```

  - ### **Transfer Payment**:

    Digunakan untuk medapatkan detail informasi pembayaran ke bank, terkait va number yang digunakan ketika melakukan pembayaran.

    - **Service**: Transfer Payment
    - **Url**: https://pluto000.purwanto.co.id
    - **Method**: POST
    - **Path**: /snap/v1/api/v1.0/transfer-payment
    - **Headers**:
      ``` text
      Content-Type: application/json
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjJ
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-SIGNATURE: 1bqvd17Rv5mo0zUT34Uyg6pMMo7AcMimd6aiTsu75247/L6rXKekMXyTImxaz/mHfusbi5Fe2n/InYvC1pDI5g==
      X-PARTNER-ID: 14535
      X-EXTERNAL-ID: 32038
      CHANNEL-ID: 95231
      ```
    - Body:
      ``` json
        {
            "partnerServiceId": "   23132",
            "customerNo": "210963661413650253",
            "virtualAccountNo": "   23132210963661413650253",
            "virtualAccountName": "Jokul Doe",
            "virtualAccountEmail": "janam_xxx@hotmail.com",
            "virtualAccountPhone": "Orlando Roberts",
            "trxId": "",
            "paymentRequestId": "202202111031031234500001136962",
            "channelCode": 6011,
            "hashedSourceAccountNo": "",
            "sourceBankCode": "014",
            "paidAmount": {
                "value": "100000.00",
                "currency": "IDR"
            },
            "cumulativePaymentAmount": null,
            "paidBills": "",
            "totalAmount": {
                "value": "100000.00",
                "currency": "IDR"
            },
            "trxDateTime": "2022-02-12T17:29:57+07:00",
            "referenceNo": "00113696201",
            "journalNum": "",
            "paymentType": "",
            "flagAdvise": "N",
            "subCompany": "00000",
            "billDetails": [
                {
                    "billCode": "",
                    "billNo": "123456789012345678",
                    "billName": "",
                    "billShortName": "",
                    "billDescription": {
                        "english": "Maintenance",
                        "indonesia": "Pemeliharaan"
                    },
                    "billSubCompany": "00000",
                    "billAmount": {
                        "value": "100000.00",
                        "currency": "IDR"
                    },
                    "additionalInfo": {
                        "value": "Test Additional Data"
                    },
                    "billReferenceNo": "00113696201"
                }
            ],
            "freeTexts": [],
            "additionalInfo": {
                "value": ""
            }
        }
      ```

  - ### **Transfer Status**:

      Digunakan untuk melakukan pengecekan payment status ke bank, apakah va number sudah berhasil dibayar atau belum berhasil dibayar.

    - **Service**: Transfer Status
    - **Url**: https://pluto000.purwanto.co.id
    - **Method**: POST
    - **Path**: /snap/v1/api/v1.0/transfer-status
    - **Headers**
      ``` text
      Content-Type: application/json
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjJ
      X-TIMESTAMP: 2023-06-02T23:16:00+07:00
      X-SIGNATURE: 1bqvd17Rv5mo0zUT34Uyg6pMMo7AcMimd6aiTsu75247/L6rXKekMXyTImxaz/mHfusbi5Fe2n/InYvC1pDI5g==
      X-PARTNER-ID: 14535
      X-EXTERNAL-ID: 32038
      CHANNEL-ID: 95231
      ```
    - Body:
      ``` json
        {
           "partnerServiceId":"  088899",
           "customerNo":12345678901234567890,
           "virtualAccountNo":"  08889912345678901234567890",
           "inquiryRequestId":"abcdef-123456-abcdef",
           "paymentRequestId":"abcdef-123456-abcdef",
           "additionalInfo":{

           }
        }
      ```

## Tech Stack

- Programming
  - Go
  - TypeScript

- Message Broker
  - RabbitMQ

- Database
  - MySQL

- Containerize
  - Docker
