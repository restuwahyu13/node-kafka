![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Apache_kafka_wordtype.svg/2560px-Apache_kafka_wordtype.svg.png)

## What is Kafka

**Apache Kafka** adalah open source platform distribusi streaming data yang dirancang untuk menyimpan, mengalirkan, dan memproses data secara real-time, yang dimana kafka dikembangkan oleh insiyur perangkat lunak dari **Linkend** tepatnya pada tahun 2010 yang di buat dengan bahasa pemerograman **Java**, yang dimana kala itu kafka digunakan untuk mengumpulkan dan menganalisa data secara realtime di linkend. selain tersedia untuk versi open source kafka juga tersedia untuk enterprise version yang dimana didukung langsung oleh author dari si kafka itu sendiri, untuk info lebih lanjut bisa silahkan kunjungi [Confluent](https://www.confluent.io) dan untuk TypeScript code resource silahkan [Cek Disini](https://github.com/restuwahyu13/node-shared-modules/blob/master/packages/kafka/src/index.ts).

## KafKa Terminologi

- **Topic:** adalah wadah untuk tempat menampung setiap partition berdasarkan nama topic yang telah dibuat sebelumnya, jika di ibaratkan ke database partition adalah database itu sendiri.

- **Partition:** adalah wadah untuk tempat menampung dari setiap data yang dikirim melalui topic dan setiap partisi dikelola secara terpisah, jika di ibaratkan ke database partition adalah table pada database.

- **Broker:** adalah aplikasi yang bertanggung jawab untuk menerima dan menyimpan data dari producer dan memastikan data tersebut dikirim kepada consumer.

- **Producer:** adalah aplikasi yang bertugas untuk mengirim data ke topic tertentu yang kemudian data kan dimasukan kedalam partition.

- **Consumer:** adalah aplikasi yang bertugas untuk membaca data yang dikirim dari producer melalui topic yang di simpan ke dalam partition.

- **Offset:** adalah urutan unique dari sebuah data (message) yang di simpan di dalam sebuah partisi, yang dimana urutannya dimulai dari index ke 0 dan juga untuk memastikan bahwa data yang disimpan tidak akan tertukar dengan data lainnya, jika di analogikan ke dalam database offset adalah rows pada table.

- **ZooKeeper:** adalah layanan koordinasi untuk manajemen cluster Kafka. zooKeeper bertanggung jawab untuk menyimpan metadata tentang broker, partisi, dan consumer di cluster Kafka.

- **Cluster:** adalah kemampuan untuk memperluas 1 brokers menjadi banyak brokers.

- **Node:** adalah 1 dari banyak instance brokers yang masing - masing memiliki partition, offset, replication didalamnya, yang dimana 1 instance nodes akan bertindak sebagai seorang leader (master), untuk mengontrol menulis dan membaca data dan yang lainnya akan bertidak sebagai seorang folower (queue mirror), jadi jika leadernya mati maka akan di gantikan oleh folowernya, begitu juga seterusnya.

- **Replication:** adalah kemampuan untuk mengkloning (duplikasi) sebuah partition, yang dimana berfungsi ketika partition tersebut hilang, maka bisa mengambil data (message) tersebut dari salinan partition yang sudah di cloning (duplikasi).

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

  - **Polling Pattern:** berfungsi untuk mendapatkan data baru dari topik tertentu, yang dimana consumer akan memerikan setiap partition secara terus menerus untuk mendapatkan data yang paling terbaru.

  - **Load Balancing Pattern:** berfungsi untuk menyeimbangkan pemerosesan data dari topik, cara ini biasanya akan terlihat ketika anda menggunakan consumer group, yang dimana dari masing - masing consumer yang berada didalam group yang sama akan di seimbangkan bebannya,
  maksudnya disini adalah 1 partition akan di assign ke 1 konsumer, berikut adalah beberapa algoritma load balancing yang dimiliki oleh kafka konsumer seperti RoundRobinAssignor, RangeAssignor, StickyAssignor, CooperativeStickyAssignor dan ConsumerPartitionAssignor.

  - **Once Processing Pattern:** berfungsi untuk memastikan data yang diproses hanya bisa satu kali digunakan.

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

### Consumer Group Behaviour