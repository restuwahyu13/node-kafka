![](https://www.azul.com/wp-content/uploads/2017/03/kafka.jpg)

## Pengenalan Kafka

**Apache Kafka** adalah open source platform distribusi streaming data yang dirancang untuk menyimpan, mengalirkan, dan memproses data secara real-time, yang dimana kafka dikembangkan oleh insiyur perangkat lunak dari **Linkend** tepatnya pada tahun 2010 yang di buat dengan bahasa pemerograman **Java**, yang dimana kala itu kafka digunakan untuk menampilkan realtime analitik untuk menampilkan jumlah data pengunjung profile di linkend. selain tersedia untuk versi open source kafka juga tersedia untuk enterprise version yang dimana didukung langsung oleh author dari si kafka itu sendiri, untuk info lebih lanjut bisa silahkan kunjungi [Confluent](https://www.confluent.io).

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

  - **Polling Pattern:** berfungsi untuk mendapatkan data baru dari topik tertentu.

  - **Load Balancing Pattern:** berfungsi untuk menyeimbangkan pemerosesan data dari topik, cara ini biasanya akan terlihat ketika anda menggunakan consumer group, yang dimana dari masing - masing consumer yang berada didalam group yang sama akan di seimbangkan bebannya,
  maksudnya disini adalah 1 partition akan di assign ke 1 konsumer, berikut adalah beberapa algoritma load balancing yang dimiliki oleh kafka konsumer seperti RoundRobinAssignor, RangeAssignor, StickyAssignor, CooperativeStickyAssignor dan ConsumerPartitionAssignor.

  - **Once Processing Pattern:** berfungsi untuk memastikan data yang diproses hanya bisa satu kali digunakan.

  - **Lifo Pattern** berfungsi untuk membaca data yang dikirim dari publisher ke konsumer, yang dimana data yang terakhir masuk akan yang pertama kali dibaca.

- #### Publisher Pattern

  - **Publish Pattern:** berfungsi untuk mengirim pesan dari satu atau banyak topik. kemudian konsumer yang berlangganan ke topik tersebut akan menerima pesan yang dikirim dari topik tertentu.

  - **Event sourcing Pattern:** berfungsi sebagai pola pengembangan Event sourcing, yang dimana semua perubahan dalam aplikasi akan dikirim sebagai berita acara.

  - **Message Queueing Pattern:** berfungsi sebagai pola sistem antrian pesan, yang dimana setiap data yang dikirim akan masuk kedalam antrian untuk dilakukan pemrosesan lebih lanjut.

  - **Broadcast Pattern:** berfungsi untuk mengirim banyak pesan sekaligus ke semua konsumer yang berlangganan ke topik tertentu.
