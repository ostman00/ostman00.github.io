---
title: "AKUZEM: Moodle İçin Geliştirdiğimiz Modern Öğretmen ve Yönetim Paneli"
excerpt: "Üniversitede klasik Moodle arayüzünün hantallığını çözmek için React ile sıfırdan geliştirdiğimiz modern öğretmen kokpiti ve uzaktan eğitim yönetim arayüzü."
category: "Proje"
date: "2026-08-19"
readingTime: "6 dk okuma"
featured: false
---

> 🚀 **GitHub Deposu:** [github.com/ostman00/frontend-moodle](https://github.com/ostman00/frontend-moodle) &nbsp;|&nbsp; **Altyapı Rehberi:** [UZEM Yüksek Erişilebilirlik Mimarisi](/blog/uzem-rehber)

Üniversitelerde uzaktan eğitim süreçlerinin kalbi genellikle Moodle üzerinde atar. Moodle arka planda sınavları, kullanıcı yetkilerini ve ders materyallerini yönetmek için çok güçlü bir sistem olsa da, arayüz tarafında akademisyenlerin işini ciddi anlamda zorlaştıran bir yapıya sahip.

Her işlem için sayfanın baştan yüklenmesi, sınav sorusu eklerken onlarca farklı menü arasında kaybolunması ve canlı ders bağlantılarının karmaşıklığı hocalarımız için günlük bir çile haline gelmişti. 

Bu projede amacımız; Moodle'ın arkadaki güvenilir veritabanını ve altyapısını hiç bozmadan, hocalarımızın karşısına hızlı, sade ve tek ekrandan her şeyi halledebilecekleri modern bir arayüz çıkarmaktı.

---

## Bu Proje Neden Doğdu?

Moodle'ın standart panelini kullanan hocalarımızın yaşadığı en temel sıkıntılar şunlardı:

1. **Aşırı Tıklama ve Sayfa Yenileme:** Bir hocanın 10 soruluk bir sınav hazırlaması veya soru bankasına yeni sorular eklemesi için en az 15-20 kez sayfa yenilemesi ve karmaşık formları doldurması gerekiyordu.
2. **Toplu Soru Yükleme Zorluğu:** Standart Moodle, Excel veya metin formatındaki soruları doğrudan alırken çok katı şablonlar ister. Şablondaki en ufak bir virgül hatasında tüm yükleme çöker ve nerede hata yapıldığını hoca anlayamazdı.
3. **Canlı Ders (BigBlueButton) Karmaşası:** Canlı derslerin başlatılması, öğrencilerin odaya alınması ve kilitlerin yönetimi farklı menülerde dağınıktı.
4. **Sınav Dönemlerinde Sunucu Yükü:** Binlerce öğrenci ve yüzlerce hoca aynı anda klasik Moodle sayfalarında gezindikçe sunucular her istek için bütün HTML sayfasını baştan derliyor, bu da sistemi yavaşlatıyordu.

---

## Neler Yaptık ve Nasıl Bir Sistem Kurduk?

Bu problemleri çözmek için Moodle'ı sadece bir veri tabanı ve yetki motoru olarak arkada bıraktık. Ön yüze ise React ve Vite kullanarak modern bir tek sayfa uygulaması (SPA) geliştirdik.

### 1. Öğretmen Kokpiti (Dashboard)
Hocalarımız sisteme giriş yaptığında dağınık Moodle menüleri yerine derli toplu bir özet paneliyle karşılaşıyor:
- O günkü ve o haftaki aktif dersler,
- Yaklaşan ödev teslimleri ve sınavlar,
- Canlı ders başladığında tek tıkla doğrudan odaya geçiş butonu,
- Öğrencilerden gelen mesajlar ve duyurular tek ekranda toplanıyor.

### 2. Akıllı Soru Bankası ve Toplu Yükleme
Hocaların en çok vakit kaybettiği soru hazırlama sürecini baştan tasarladık:
- Sağ taraftan açılan hızlı yükleme paneliyle hocalar hazırladıkları soru listesini sisteme bırakabiliyor.
- Sistem dosyayı sunucuya göndermeden önce tarayıcıda anında kontrol ediyor: Hangi soruda doğru şık unutulmuş, hangi sorunun metni boş kalmış gibi detayları hocaya hemen gösteriyor.
- Sorular tek tıkla Vize, Final veya Mazeret kategorilerine ayrılarak Moodle'ın soru havuzuna işleniyor.

### 3. Akademik Başarı ve Raporlama
Hangi öğrencinin hangi derse katıldığı, sınavda ne kadar süre kaldığı ve sınıftaki genel başarı ortalaması grafiklerle görselleştirildi. İhtiyaç duyulduğunda bu listeler tek tuşla Excel olarak indirilebiliyor.

### 4. BigBlueButton Canlı Ders Entegrasyonu
Hocalar canlı derse girmek için ayrı şifreler veya linklerle uğraşmıyor; doğrudan panel üzerinden tek bir tıklamayla moderatör olarak canlı derse bağlanabiliyor, toplantıyı kilitleyebiliyor veya bitirebiliyor.

---

## Arka Planla (Moodle) Nasıl Haberleşiyor?

Moodle'ın standart dışa açılan servisleri bazı özel ihtiyaçlarımız için yetersiz kalıyordu (örneğin doğrudan soru bankasına toplu müdahale etmek gibi). Bunun için Moodle tarafına özel bir PHP eklentisi yazdık.

Ön taraftaki React uygulaması, hocanın yaptığı işlemleri güvenli bağlantı üzerinden doğrudan bu eklentiye iletiyor. Eklenti de gelen istekleri Moodle'ın kendi veritabanı kurallarına göre işleyip sonucu React paneline geri döndürüyor.

Ayrıca sistemimiz tek bir sunucuda değil, yük dengeleyiciler arkasındaki birden fazla sunucu üzerinde çalıştığı için, geliştirdiğimiz eklentiyi tüm sunuculara otomatik olarak dağıtan ve izinlerini ayarlayan senkronizasyon araçlarını da mimarinin bir parçası olarak kurguladık.

---

## Sonuç

Proje yayına alındıktan sonra aldığımız geri bildirimler oldukça sevindirici oldu:

- **Zaman Tasarrufu:** Hocaların soru yükleme ve sınav hazırlama süreleri dakikalardan saniyelere indi.
- **Eğitim İhtiyacının Azalması:** Karmaşık Moodle arayüzü için sürekli destek isteyen hocalar, yeni sade panelle birlikte neredeyse hiç desteğe ihtiyaç duymadan işlerini halledebilir oldu.
- **Sunucu Rahatlaması:** Ön yüzün bağımsız çalışması sayesinde sunucular sadece saf veri ilettiği için sınav haftalarında yaşanan yoğunluk ve kasılmalar ciddi oranda azaldı.

Bu proje bizim için, eski ve hantal bir platformun arkadaki gücünü koruyarak, modern teknolojilerle nasıl kullanıcı dostu bir hale getirilebileceğinin çok güzel bir deneyimi oldu.
