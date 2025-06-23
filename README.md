# Duyarlı Ürün Karusel ve Hero Slider

Bu proje, modern bir e-ticaret web sitesi için duyarlı bir hero slider ve ürün karuselden oluşan, kendi başına çalışan bir JavaScript uygulamasıdır.

## 🎯 Temel Özellikler

- **Sekmeli Hero Slider**  
  Birden fazla sekme, her sekmede dinamik arka plan ve yumuşak geçiş animasyonları.

- **Ürün Karuseli**  
  Ürün listesi bir GET isteğiyle alınır ve yatay bir karusel şeklinde görüntülenir. Kullanıcı ileri-geri kaydırabilir.

- **Local Storage Önbellekleme**  
  Ürünler ilk çekildikten sonra `localStorage`'a kaydedilir. Sonraki ziyaretlerde ürünler direkt buradan yüklenir.

- **Favori Ekleme**  
  Her ürün kartında kalp simgesi vardır. Kullanıcı beğendiği ürünü favorilere ekleyip çıkarabilir. Favoriler tarayıcıda kalıcıdır.

- **Dinamik İndirim Hesaplama**  
  Eğer bir ürünün `price` ve `original_price` değeri farklıysa, her ikisi de gösterilir ve indirim oranı otomatik hesaplanıp görüntülenir.

- **Duyarlı Tasarım**  
  Tüm tasarım masaüstü ve mobilde sorunsuz şekilde uyum sağlar.

- **Üçüncü Parti Kütüphane Yok**  
  Tamamen vanilla JavaScript kullanılarak, dinamik HTML ve CSS ile geliştirilmiştir. Harici framework veya kütüphane bulunmaz.

## 🚀 Çalıştırma Adımları

1. **Anasayfada olduğunuzdan emin olun.**  
   Eğer başka bir sayfada çalıştırılırsa `wrong page` mesajı konsola yazılır ve çalışmaz.

2. **Chrome Geliştirici Araçları’nı açın.**  
   `Console` sekmesine geçin.

3. **JavaScript dosyasının tamamını kopyalayıp konsola yapıştırın.**  
   Enter tuşuna basın.

4. **Arayüzü keşfedin:**  
   - Sekmeleri değiştirin  
   - Ürün karuselde gezin  
   - Ürünleri favorilere ekleyin/çıkarın  
   - Ürüne tıklayarak yeni sekmede açın

## 📂 Proje Yapısı

- **Tek JavaScript Dosyası**  
  Tüm HTML üretimi, CSS ekleme, veri çekme, localStorage yönetimi, event listener’lar ve etkileşimler tek dosyada yer alır.

- **Harici HTML/CSS yoktur**  
  Tüm yapı doğrudan JavaScript ile oluşturulur.

## 🗂️ Kullanım Notları

- Eğitim ve örnek uygulama amaçlıdır.
- Chrome tarayıcıda masaüstünde test edilmesi önerilir.
- Backend veya API anahtarı gerekmez; herkese açık JSON kullanır.

## ⚖️ Lisans

Ticari olmayan, eğitim amaçlı kullanıma açıktır.  
İhtiyacınıza göre serbestçe düzenleyebilir ve geliştirebilirsiniz.

---

**Projeyi incelediğiniz için teşekkürler!**
