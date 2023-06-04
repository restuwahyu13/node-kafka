![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Apache_kafka_wordtype.svg/2560px-Apache_kafka_wordtype.svg.png)

## What is Kafka

**Apache Kafka** adalah open source platform distribusi streaming data yang dirancang untuk menyimpan, mengalirkan, dan memproses data secara real-time, yang dimana kafka dikembangkan oleh insiyur perangkat lunak dari **Linkend** tepatnya pada tahun 2010 yang di buat dengan bahasa pemerograman **Java**, yang dimana kala itu kafka digunakan untuk mengumpulkan dan menganalisa data secara realtime di linkend. selain tersedia untuk versi open source kafka juga tersedia untuk enterprise version yang dimana didukung langsung oleh author dari si kafka itu sendiri, untuk info lebih lanjut bisa silahkan kunjungi [Confluent](https://www.confluent.io) dan untuk TypeScript code resource silahkan [Cek Disini](https://github.com/restuwahyu13/node-shared-modules/blob/master/packages/kafka/src/index.ts).

### Kafka Feature

- #### Strength

  - **Pub-sub Messaging:** memungkinkan kafka mengizinkan banyak publisher untuk mengirim pesan ke banyak konsumer secara bersamaan.

  - **Horizontal Scaling:** memungkinkan kafka bisa mengatur dan menangani data permintaan dari banyak sumber dalam skala besar tanpa penurunan kinerja.

  - **Durability & Fault Tolerance:** memungkinkan kafka memiliki kemampuan untuk mempertahankan data dalam skala besar dengan keamanan data yang tinggi dan juga mempertahankan ketersediaan data meskipun ada beberapa node pada cluster yang mengalami kegagalan.

  - **High Throughput:** memungkinkan kafka dapat menangani dan mengirimkan volume data dalam jumlah yang besar dengan cepat dan efisien.

  - **Low Latency:** memungkinkan kafka memastikan setiap mengirim dan memproses data dengan waktu yang sangat cepat dan singkat.

  - **Stream Processing:** memungkinkan kafka melakukan pengolahan data secara real-time dalam jumlah yang besar dengan cara mengambil data secara terus-menerus.

  - **Data Retention:** memungkinkan kafka untuk mempertahankan pesan yang dikirimkan ke topik dalam waktu tertentu yang ditentukan sebelum pesan dihapus dari sistem.

  - **Platform Agnostic:** memungkinkan kafka dapat digunakan diberbagai platform, termasuk sistem operasi, infrastruktur, dan bahasa pemrograman.

- #### Weakness

  - **Memerlukan sumber daya yang cukup besar:** memungkinkan kafka memerlukan sumber daya komputasi yang cukup besar untuk menjalankan dan mengelola data dalam jumlah yang besar.

  - **Sulit untuk diatur dan dikonfigurasi:** memungkinkan konfigurasi kafka membutuhkan pengetahuan mendalam tentang sistem dan infrastruktur, serta persyaratan bisnis yang spesifik.

  - **Tidak mendukung transaksi ACID:** memungkinkan kafka tidak mendukung proses transaksi ACID di level aplikasi, yang dapat menjadi masalah untuk beberapa aplikasi bisnis.

  - **Tidak ada fitur rekonsiliasi data:** memungkinkan kafka tidak memungkinkan rekonsiliasi data antara beberapa sistem atau sumber data, yang dapat menyebabkan masalah sinkronisasi data.

  - **Tidak cocok untuk data terstruktur yang kompleks:** memungkinkan kafka tidak mendukung data terstruktur yang sangat kompleks, sehingga membutuhkan sistem atau alat eksternal untuk memproses data tersebut.

  - **Ketergantungan pada sumber daya pihak ketiga:** memungkinkan kafka memerlukan sumber daya pihak ketiga seperti ZooKeeper untuk mengelola cluster Kafka. Ketergantungan ini dapat menyebabkan masalah stabilitas dan kerentanan keamanan.

## KafKa Terminologi

- **Topic:** adalah wadah tempat menampung setiap partisi berdasarkan nama topic yang telah dibuat sebelumnya, jika di ibaratkan ke database partisi adalah database itu sendiri.

- **Partition:** adalah wadah untuk tempat menampung dari setiap data yang dikirim melalui topic dan setiap partisi dikelola secara terpisah, jika di ibaratkan ke database partisi adalah table pada database.

- **Broker:** adalah aplikasi yang bertanggung jawab untuk menerima dan menyimpan data dari producer dan memastikan data tersebut dikirim kepada consumer.

- **Producer:** adalah aplikasi yang bertugas untuk mengirim data ke topic tertentu yang kemudian data dimasukan kedalam partisi.

- **Consumer:** adalah aplikasi yang bertugas untuk membaca data yang dikirim dari producer melalui topic yang di simpan ke dalam partisi.

- **Offset:** adalah urutan unique dari sebuah data (message) yang di simpan di dalam sebuah partisi, yang dimana urutannya dimulai dari index ke 0 dan juga untuk memastikan bahwa data yang disimpan tidak akan tertukar dengan data lainnya, jika di analogikan ke dalam database offset adalah row pada table.

- **ZooKeeper:** adalah layanan koordinasi untuk manajemen cluster Kafka. zooKeeper bertanggung jawab untuk menyimpan metadata tentang broker, partisi, dan consumer di cluster Kafka.

- **Cluster:** adalah kemampuan untuk memperluas 1 brokers menjadi banyak brokers.

- **Node:** adalah 1 dari banyak instance brokers yang masing - masing memiliki partisi, offset, replication didalamnya, yang dimana 1 instance nodes akan bertindak sebagai seorang leader (master), untuk mengontrol menulis dan membaca data dan yang lainnya akan bertidak sebagai seorang folower (queue mirror), jadi jika leadernya mati maka akan di gantikan oleh folowernya, begitu juga seterusnya.

- **Replication:** adalah kemampuan untuk mengkloning (duplikasi) sebuah partisi, yang dimana berfungsi ketika partisi tersebut hilang, maka bisa mengambil data (message) tersebut dari salinan partisi yang sudah di cloning (duplikasi).

## Kafka Pattern

- #### Broker Pattern

  - **Publish-Subscribe Pattern:** digunakan untuk mendistribusikan pesan dari publisher ke konsumer, yang dimana publisher sebagai pengirim dan konsumer sebagai penerima.

  - **Partitioning Pattern:** digunakan untuk memecah data menjadi bagian-bagian kecil yang dapat dikelola secara terpisah.

  - **Replication Pattern:** digunakan untuk membuat salinan data, dari partisi yang dimana salah satunya nanti akan bertindak sebagai leader dan follower.

  - **Batch Processing Pattern:** digunakan untuk memproses data dalam jumlah yang besar secara bersamaan atau serentak.

  - **Asynchronous Messaging Pattern:** digunakan untuk memastikan bahwa setiap pesan yang dikirim dan diterima, memiliki kurun waktu yang berbeda.

- #### Consumer Pattern

  - **Single Consumer Pattern:** berfungsi sebagai konsumer tunggal digunakan saat hanya ada satu aplikasi yang mengkonsumsi data dari topik tertentu.

  - **Consumer Group Pattern:** berfungsi untuk memproses data dari topik, yang dimana data di proses secara bersama - sama dengan 1 group yang sama, yang didalam nya terdiri dari beberapa konsumer, tujuan nya agar pemerosesan data menjadi jauh lebih cepat dan effisien.

  - **Subscribe Pattern:** berfungsi untuk berlangganan pesan dari topik tertentu.

  - **Polling Pattern:** berfungsi untuk mendapatkan data terbaru dari topik tertentu, yang dimana consumer akan mengecek setiap partisi secara terus menerus untuk mendapatkan data yang paling terbaru.

  - **Load Balancing Pattern:** berfungsi untuk menyeimbangkan pemerosesan data dari topik, cara ini biasanya akan terlihat ketika anda menggunakan consumer group, yang dimana dari masing - masing consumer yang berada didalam group yang sama akan di seimbangkan bebannya,
  maksudnya disini adalah 1 partisi akan di assign ke 1 konsumer, berikut adalah beberapa algoritma load balancing yang dimiliki oleh kafka konsumer seperti RoundRobinAssignor, RangeAssignor, StickyAssignor, CooperativeStickyAssignor dan ConsumerPartitionAssignor.

  - **Once Processing Pattern:** berfungsi untuk memastikan setiap data yang diproses hanya bisa satu kali digunakan.

  - **Lifo Pattern** berfungsi untuk membaca data yang dikirim dari publisher ke konsumer, yang dimana data yang terakhir masuk akan yang pertama kali dibaca.

- #### Publisher Pattern

  - **Publish Pattern:** berfungsi untuk mengirim pesan dari satu atau banyak topik. kemudian konsumer yang berlangganan ke topik tersebut akan menerima pesan yang dikirim dari topik tertentu.

  - **Event sourcing Pattern:** berfungsi sebagai pola pengembangan Event sourcing, yang dimana semua perubahan dalam aplikasi akan dikirim sebagai berita acara.

  - **Message Queueing Pattern:** berfungsi sebagai pola sistem antrian pesan, yang dimana setiap data yang dikirim akan masuk kedalam antrian untuk dilakukan pemrosesan lebih lanjut.

  - **Broadcast Pattern:** berfungsi untuk mengirim banyak pesan sekaligus ke semua konsumer yang berlangganan ke topik tertentu.

## Diference Queue & Topic Concept

- **Queue Pattern:** yang dimana proses nya itu setelah data tersebut di konsume oleh konsumer, maka data tersebut akan langsung di hapus oleh queue, tetapi bisa juga data tidak langsung di hapus dengan melakukan Unacknowledge.
- **Topic Pattern:** yang dimana proses nya itu setelah data tersebut di konsume oleh konsumer, maka data tersebut tidak akan langsung di hapus, dikarenakan data akan baru dihapus sesuai dengan rentang waktu yang telah di tentukan oleh topic.

## Diference Action Consumer Process

- #### RabbitMQ

  - **Acknowledge:** yang dimana proses nya untuk memberitahu konsumer bahwa data telah berhasil di baca dan data akan langsung di hapus.
  - **Unacknowledge:** yang dimana proses nya untuk memberitahu konsumer bahwa data telah berhasil di baca, tetapi data tidak akan langsung di hapus dikarenakan data akan dimasukan ulang kedalam antrian pesan.

- #### Kafka

  - **Commit:** yang dimana proses nya untuk memberitahu konsumer bahwa data telah berhasil di baca, tetapi data tidak akan langsung dihapus sampai rentang waktu yang telah di tentukan.
  - **Uncommit:** yang dimana proses nya untuk memberitahu konsumer bahwa data tidak berhasil di baca dan data akan dimasukan ulang kedalam antrian pesan.

### Kafka Behaviour

  - **Consumer Group:** memiliki perilaku unique seperti, katakanlah kita memiliki topic dengan nama `kafka.logger` dengan 3 partisi, yang dimana kita juga memiliki 3 konsumer yang berada didalam konsumer group tersebut katakanlah nama konsumer group tersebut adalah `kafka.logger.group`, dari ke 3 konsumer tersebut maka kafka akan meng-assign masing - masing partisi tersebut per-konsumer contoh konsumer 1 untuk partisi 1, konsumer 2 untuk partisi 2 dan konsumer 3 untuk partisi 3. dari ke 3 partisi tersebut akan ada yang bertindak sebagai leader dan yang lainnya bertindak sebagai follower, tetapi jika leader sebelumnya nya mati maka salah satu follower akan ada yang bertindak sebagai leader selanjutnya, jika leader sebelumnya sudah kembali menyala maka leader sebelumnya akan menjadi follower, yang mengatur setiap tindakan untuk pemilihan leader dan follower adalah tanggung jawab dari `zookeeper`, dikarenakan memanglah zookeeper yang ditugaskan oleh kafka untuk memanage semua lalu lintas di kafka mulai dari pembuatan partisi, pembuatan replication, yang mengatur metadata config etc. sedangkan tehnik yang digunakan oleh kafka ketika ada konsumer yang mati dan bisa bergabung kembali ada fiture dari rebalancing yang dimiliki oleh kafka, sehingga konsumer yang mati sebelumnya akan bergabung kembali ke konsumer group sebelumnya `kafka.logger.group`, tetapi bagaimana jika ada konsumer lain yang berbeda group katakanlah `kafka.logger.group.new` dengan 1 konsumer didalamnya, tetapi mengkonsume data dari topic dengan nama yang sama contoh `kafka.logger`, yang terjadi adalah konsumer group yang baru akan di assign ke partisi yang sama, dikarenakan konsumer group yang baru hanya memiliki single konsumer maka konsumer tersebut akan di assign ke partisi no 1 oleh kafka, kenapa kok bisa begitu ?, dikarenakan kafka menggunakan load balancing untuk menyeimbangkan beban untuk pembagian partisi dengan menggunakan tehnik `RoundRobinAssignor` secara default yang digunakan, tetapi bagaimana jika partisi yang dimiliki oleh kafka hanya 1 partisi sedangkan ada 3 konsumer yang mengkonsume dari topic tersebut, yang terjadi maka adalah offset dari partisi tersebut akan di bagi menjadi per-konsumer, contoh offset ke 0 - 10 untuk konsumer ke 1, offset ke 11 - 20 untuk konsumer 2, offset ke 21 - 30 untuk konsumer ke 3 dan seterusnya.

  - **Partition:** memiliki perilaku unique seperti, ketika topic baru pertamakali dibuat secara default topic hanya memiliki 1 partisi, tetapi kita bisa menambahkan banyak partisi ketika saat membuat topic. ketika kita pertama kali mulai membuat topic contoh katakanlah dengan nama `testing.bos` yang dimana memiliki 3 partisi, yang terjadi adalah ketika topic itu berhasil dibuat, maka partisi yang kita buat pasti akan selalu di awali dengan partisi ke 0, dikarenakan diawal kita membuat topic dengan 3 partisi maka partisi yang kita miliki didalam topic tersebut adalah partisi ke 0, partisi ke 1 dan partisi ke 2, dikarenakan konsep partisi itu sendiri di kafka mirip seperti stuktur data array list, yang dimana data akan selalu di mulai dari index ke 0. partisi juga sama seperti consumer group partisi memiliki konsep leader dan follower, partisi juga memilki konsep yang dinamakan replikasi secara default itu value nya 3, yang dimana replikasi berguna sebagai backup ketika terjadi kehilangan partisi, contoh katakanlah ketika partisi 0 mati maka data masih bisa diambil oleh konsumer dari salinan partisi yang mati tersebut (partisi 0). ketika publisher menambahkan data ke sebuah topic katakanlah dengan nama `testing.bos` yang memiliki 3 partisi, maka data yang di publish ke topic tersebut bisa saja masuk ke partisi 1 melainkan bukan ke partisi 0 begitu juga seterusnya, dikarenakan partisi itu sendiri menggunakan konsep polling sama seperti ketika konsumer ingin mengambil data terbaru dari setiap partisi, simplenya polling itu memastikan dari ke 3 partisi tersebut yang sekiranya siap untuk di tambahkan sebuah data dari partisi yang mana.

  - **Offset:** memiliki perilaku unique seperti, topic yang dimana offset hampir mirip dengan topic konsepnya yang dimana urutan data akan selalu dimulai dari index ke 0, jika di ibaratkan database offset sama seperti row pada table. ketika kita mengirim data dari publisher kedalam topic kemudian data tersebut katakanlah masuk kedalam partisi 0, yang terjadi adalah data tersebut akan berada di urutan offset ke 0, yang dimana fungsi offset itu sendiri untuk memastikan bahwa setiap data yang berada didalam sebuah partisi tidak memiliki duplikasi data. jika kita mengirim data kembali dari publisher maka urutan data tersebut berada di offset ke 1, maka dari itu ada istilah `first offset` dan `next offset`, yang dimana first offset adalah offset sebelumnya dan next offset adalah offset selanjutnya, secara default batas offset itu maksiimal 50, katakanlah offset yang kita punya kita batasi contoh 10, jika offset sudah mencapai ambang batas offset yaitu 10, maka urutan data selanjut nya yang dikrim akan berada di posisi offset ke 0 dan bukan ke offset 11, dikarenaka ambang batas offset yang kita tentukan adalah 10 bukan 20 maka dari itu offset akan balik lagi ke urutan awal, beda cerita jika offset nya itu sekarang sedang berada di urutan 9 maka next offset nya adalah 10.