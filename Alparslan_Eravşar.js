(() => {
  if (window.location.pathname !== '/') {
    console.log('wrong page');
    return;
  }
  //sabitler
  const ENDPOINT =
    'https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json';
  const LOCAL_STORAGE_KEY_PRODUCTS = 'products_data';
  const LOCAL_STORAGE_KEY_FAVORITES = 'favorite_products';

  let allProducts = [];
  let currentTabIndex = 0;
  let currentSliderIndex = 0;
  let thumbPage = 0;
  const VISIBLE_CARDS = 4;

  //mavi bar donen cumleler
  const bluBarSentences = [
    'Karne Hediyeleri İçin Tıkla',
    '7 Al 6 Öde Beyaz Bodyler!',
    'Seçili Mobilyalarda Ücretsiz Montaj Hizmeti!',
    'Yeni Üyelere İlk Alışverişte Kargo Bedava!',
    'Peşin Fiyatına 8 Taksit Fırsatı',
  ];

  //slider basliklar
  const sliderTabs = [
    'HAFTA SONU FIRSATI!',
    'PERŞEMBEDEN PAZARA',
    'KARNE HEDİYESİ',
    'KAMPANYALAR',
    'TEKSTİL',
    'ARAÇ GEREÇ',
    'BEBEK BEZİ & ISLAK MENDİL',
    'BAKIM&TEMİZLİK',
    'DUYURU',
  ];

  const sliderTabData = [
    // hafta sonu fırsatı slider
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/super-fiyatlar-en-cok-satan-40-oyuncak-urunde-sepette-40-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/super-fiyatlar-en-cok-satan-40-oyuncak-urunde-sepette-40-indirim-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/48-saatlik-indirim-baby-toys-marka-sallanan-oyuncaklarda-sepette-40-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/48-saatlik-indirim-baby-toys-marka-sallanan-oyuncaklarda-sepette-40-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tekstil2006d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/haftasonufirsatiyenibg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/komili2006d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/haftasonufirsatiyenibg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/bingo2006d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/haftasonufirsatiyenibg.jpg',
          buttonUrl: '#',
        },
      ],
    },
    // persembeden pazara slider
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-lansinoh-urunlerinde-net-30-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-sudocrem-urunlerinde-sepette-net-25-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/devami-olmayan-secili-mobilyalarda-net-40-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-baby-plus-mobilyalarda-net-30-indirim-18062025d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/uni-baby-islak-mendillerde-sepette-net-25-indirim1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-yataklarda-net-30-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-baby-me-markali-islak-mendil-ve-pamuklarda-2urune-sepette-net-50-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-ulker-markali-urunlerde-3-al-2-ode-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-baby-me-ve-feel-nice-dis-macunu-ve-dis-fircalarinda-sepette-net-25-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-baby-me-oda-kokusu-cesitlerinde-3-al-2-ode-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-wee-baby-emzirme-urunleri-ve-beslenme-gereclerinde-sepette-net-30-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/hamile-destek-yastiklarinda-sepette-net-20-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-trixie-urunlerinde-net-25-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-sinek-kovucu-urunlerinde-net-20-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-otomobilde-guvenlik-urunlerinde-net-20-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-braun-urunlerinde-sepette-net-20-indirim-1806-des.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/secili-polygreen-urunlerinde-sepette-net-60-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/persembeden-pazara-bg-290524.jpg',
          buttonUrl: '#',
        },
      ],
    },
    // Karne Hediyesi
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/oyuncaklarda-kampanyalari-karne-hediyesi-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/oyuncaklarda-kampanyalari-karne-hediyesi-bgg.jpg',
          buttonUrl: '#',
        },
      ],
    },
    // Kampanyalar
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/promalt-iceceklerde-12-al-6-ode-internete-ozel1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/promalt-iceceklerde-12-al-6-ode-internete-ozel1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/ceysu-12x200-ml-dogal-kaynak-suyunda-4-al-3-ode1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/ceysu-12x200-ml-dogal-kaynak-suyunda-4-al-3-ode1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/minera-ahsap-ogrenme-kulesinde-sepette-net-50-indirim-dd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/minera-ahsap-ogrenme-kulesinde-sepette-net-50-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-baby-me-mama-onluklerinde-net-30-indirim-1806-des.jpg',
          bg: 'https://www.e-bebek.com/assets/images/back.png',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-tuvalet-egitimi-urunlerinde-sepette-net-20-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-tuvalet-egitimi-urunlerinde-sepette-net-20-indirim-bggggg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-koruyucu-ve-kilitlerde-3-al-2-ode-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-koruyucu-ve-kilitlerde-3-al-2-ode-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/mama2105-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/mama2105-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-hammm-promalt-vitamoms-ve-evde-markali-atistirmalik-cesitlerinde-4-al-3-ode1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-hammm-promalt-vitamoms-ve-evde-markali-atistirmalik-cesitlerinde-4-al-3-ode1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-medisana-urunlerinde-sepette-net-30-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-medisana-urunlerinde-sepette-net-30-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-duracell-pillerde-net-25-indirim-1006-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-duracell-pillerde-net-25-indirim-1006-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-chicco-banyo-saglik-urunlerinde-sepette-net-30-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-chicco-banyo-saglik-urunlerinde-sepette-net-30-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-kategorilerde-4-taksit-arac-gerec-ve-mobilya-kategorisinde-8-taksit-0206-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-kategorilerde-4-taksit-arac-gerec-ve-mobilya-kategorisinde-8-taksit-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-aqara-ve-meross-urunlerinde-net-30-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tekno-bgsi-15haziran.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-philips-avent-bebek-telsizi-ve-kameralari-urunlerinde-net-20-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tekno-bgsi-15haziran.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-vtech-urunlerinde-net-20-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tekno-bgsi-15haziran.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-weewell-telsiz-ve-kamera-urunlerinde-net-20-indirim-ddd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tekno-bgsi-15haziran.jpg',
          buttonUrl: '#',
        },
      ],
    },
    //Tekstil
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/7-al-6-ode-beyaz-bodyler-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/7-al-6-ode-beyaz-bodyler-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tekstilde-yeni-indirime-giren-urunlerde-60a-varan-firsat-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tekstilde-yeni-indirime-giren-urunlerde-60a-varan-firsat-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/yeni-plaj-stilleri-ebebekte-dd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/yeni-plaj-stilleri-ebebekte-bgggg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/basic-giyim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/basic-giyim-bggg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/bebek-tisortleri-11999-tlden-baslayan-fiyatlarla-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/bebek-tisortleri-11999-tlden-baslayan-fiyatlarla-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/bebek-sortlari-13999-tlden-baslayan-fiyatlarla-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/bebek-sortlari-13999-tlden-baslayan-fiyatlarla-bggg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/minikler-icin-gunesli-gunler-basliyor-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/minikler-icin-gunesli-gunler-basliyor-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/yaz-geldi-elbiseler-renklendi-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/yaz-geldi-elbiseler-renklendi-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/15999-tl-den-baslayan-yeni-sezon-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/15999-tl-den-baslayan-yeni-sezon-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/lisansli-giyim-modasi-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/lisansli-giyim-modasi-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/pijamalar-22999-tlden-itibaren-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/pijamalar-22999-tlden-itibaren-2805-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/muslin-tasarmlar-dd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/muslin-tasarmlar-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/emzirmenin-en-sik-ve-rahat-hali-dd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/emzirmenin-en-sik-ve-rahat-hali-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/en-sik-anne-adaylarina-ozeeell-dd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/en-sik-anne-adaylarina-ozeeell-bggg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/muslin-penye-battaniyeler-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/muslin-penye-battaniyeler-bgg.jpg',
          buttonUrl: '#',
        },
      ],
    },
    //Arac Gerec
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/chicco200625d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/chicco200625bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/secili-joie-urunlerinde-sepette-net-25-indirim1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/secili-joie-urunlerinde-sepette-net-25-indirim1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-britax-romer-urunlerinde-sepette-net-20-indirim1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-britax-romer-urunlerinde-sepette-net-20-indirim1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/hamilton-marka-bebek-arabalarinda-sepette-net-40-indirim1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/hamilton-marka-bebek-arabalarinda-sepette-net-40-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/luxus-hamilton-r-bebek-arabalarinda-sepette-net-40-indirim19062025d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/luxus-hamilton-r-bebek-arabalarinda-sepette-net-40-indirim19062025.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/luxus-prime-oto-koltuklarinda-sepette-net-40-indirim1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/luxus-prime-oto-koltuklarinda-sepette-net-40-indirim1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-baby-plus-arac-gerec-urunlerinde-sepette-net-25-indirim-1707-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-baby-plus-arac-gerec-urunlerinde-sepette-net-25-indirim-1707-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-graco-urunlerinde-sepette-net-35-indirim-1606-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-graco-urunlerinde-sepette-net-35-indirim-1606-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/ebaby-arac-gerec-aksesuar-urunlerinde-2urune-sepette-net-50-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/ebaby-arac-gerec-aksesuar-urunlerinde-2urune-sepette-net-50-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/casual-markali-urunlerde-sepette-net-30-indirim1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/casual-markali-urunlerde-sepette-net-30-indirim1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/joie-versatrax-veya-mytrax-pro-bebek-arabasi-alana-apple-airtag-sepette-49900-tl1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/joie-versatrax-veya-mytrax-pro-bebek-arabasi-alana-apple-airtag-sepette-49900-tl1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/maclaren-twin-techno-ikiz-bebek-arabasi-sepette-24999-tl-yerine-7999-tl1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/maclaren-twin-techno-ikiz-bebek-arabasi-sepette-24999-tl-yerine-7999-tl1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/swivel-romerqd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/swivel-romer-n-bggg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-kategorilerde-4-taksit-arac-gerec-ve-mobilya-kategorisinde-8-taksit-0206-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-kategorilerde-4-taksit-arac-gerec-ve-mobilya-kategorisinde-8-taksit-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-nuna-urunlerinde-sepette-net-25-indirim-1606-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-nuna-urunlerinde-sepette-net-25-indirim-1606-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/kraft-chef-mama-sandalyesi-sepette-6499-tl-yerine-4999-tl-1706-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/kraft-chef-mama-sandalyesi-sepette-6499-tl-yerine-4999-tl-1706-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/kraft-denver-63x105-cm-park-yatak-sepette-7999-tl-yerine-6399-tl-1706-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/kraft-denver-63x105-cm-park-yatak-sepette-7999-tl-yerine-6399-tl-1707-bg.jpg',
          buttonUrl: '#',
        },
      ],
    },
    //Bebek Bezi & Islak Mendil
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-molfix-bebek-bezlerinde-net-20-indirim-1606-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-molfix-bebek-bezlerinde-net-20-indirim-1606-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/sleepy-ve-huggies-mayo-bez-cesitleri-sepette-17999-tl-yerine-13999-tl-1606-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/sleepy-ve-huggies-mayo-bez-cesitleri-sepette-17999-tl-yerine-13999-tl-1606-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/sleepy-ve-baby-turco-bebek-bezlerinde-sepette-net-25-indirim-1806-des.jpg',
          bg: 'https://www.e-bebek.com/assets/images/back.png',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/sleepy-islak-mendillerde-net-25-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/sleepy-islak-mendillerde-net-25-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/hipp-ultra-sensitive-yenidogan-3x52-adet-islak-mendilde-1-alana-1-bedava-dd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/hipp-ultra-sensitive-yenidogan-3x52-adet-islak-mendilde-1-alana-1-bedava-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/haftanin-islak-mendili-uni-baby-yenidogan-3x40-adet-islak-mendil-13999-tl-yerine-sepette-8999-tl-1606-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/haftanin-islak-mendili-uni-baby-yenidogan-3x40-adet-islak-mendil-13999-tl-yerine-sepette-8999-tl-1606-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/online-ozel-sleepy-kirec-sokucu-ve-yag-cozucu-yuzey-temizlik-mendilleri-9499-tl-yerine-7999-tl-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/online-ozel-sleepy-kirec-sokucu-ve-yag-cozucu-yuzey-temizlik-mendilleri-9499-tl-yerine-7999-tl-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/pure-wipes-3x90-adet-islak-mendil-8999-tl-yerine-5999-tl1106d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/pure-wipes-3x90-adet-islak-mendil-8999-tl-yerine-5999-tl-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/fairy-yuzey-temizlik-mendili-100-adet-13999-tl-yerine-9999-tl110625-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/fairy-yuzey-temizlik-mendili-100-adet-13999-tl-yerine-9999-tl110625-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/feel-nice-hidrofil-pamuk-100-gr-2999-tl-yerine-sadece-2299-tl-1006-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/feelnicebg1006.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/feel-nice-yuzey-temizleme-mendili-50-adet-sepette-net-25-indirim1006d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/feelniceyuzey-1006bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/baby-me-aloeverali-gunluk-temizleme-mendili-3x50adet-5999-tl-yerine-3499-tld.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/baby-me-aloeverali-gunluk-temizleme-mendili-3x50adet-5999-tl-yerine-3499-tl1006d.jpg',
          buttonUrl: '#',
        },
      ],
    },
    //Bakim & Temizlik
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/gunes-urunlerinde-net-40-indirim19062025d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/gunes-urunlerinde-net-40-indirim19062025.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-duru-granul-sabunlarda-sepette-net-30-indirim2025d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-duru-granul-sabunlarda-sepette-net-30-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-life-by-fakir-urunlerinde-sepette-net-40-indirim1206d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-life-by-fakir-urunlerinde-sepette-net-40-indirimbg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-dalin-bebek-bakim-urunlerinde-sepette-net-25-indirim1106d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-dalin-bebek-bakim-urunlerinde-sepette-net-25-indirimbg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-hipp-bebek-bakim-urunlerinde-sepette-net-40-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-hipp-bebek-bakim-urunlerinde-sepette-net-40-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-emotion-deodorantlarda-net-35-indirim1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-emotion-deodorantlarda-net-35-indirim1906.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/the-humble-co-cilekli-dis-macunu-24999-tl-yerine-sepette-net-12999-tl1906d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/the-humble-co-cilekli-dis-macunu-24999-tl-yerine-sepette-net-12999-tl19062025.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/ecowell-urunlerinde-sepette-net-30-indirim1206d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/ecowell-urunlerinde-sepette-net-30-indirimbg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/humble-co-3-9-yas-cocuk-dis-fircalarinda-sepette-net-50-indirim1206d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/humble-co-3-9-yas-cocuk-dis-fircalarinda-sepette-net-50-indirimbg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-baby-me-deterjan-yumusatici-temizleyici-ve-leke-cikaricilarda-sepette-net-25-indirim1206d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-baby-me-deterjan-yumusatici-temizleyici-ve-leke-cikaricilarda-sepette-net-25-indirim1106bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-baby-me-markali-gunes-kremlerinde-sepette-net-20-indirim-1006-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-baby-me-markali-gunes-kremlerinde-sepette-net-20-indirim-1006-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/siveno-bebek-bakim-urunlerinde-sepette-net-25-indirim1106d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/siveno-bebek-bakim-urunlerinde-sepette-net-25-indirimbg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/sebamed-bakim-urunlerinde-sepette-net-25-indirim1106d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/sebamed-bakim-urunlerinde-sepette-net-25-indirimbg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/baby-me-organik-bebek-sampuani-400-ml-16999-tl-yerine-sadece-11999-tl-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/baby-me-organik-bebek-sampuani-400-ml-16999-tl-yerine-sadece-11999-tl-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-johnsons-baby-urunlerinde-sepette-net-30-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-johnsons-baby-urunlerinde-sepette-net-30-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-uni-baby-bebek-bakim-urunlerinde-sepette-25-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-uni-baby-bebek-bakim-urunlerinde-sepette-25-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/feat-leke-cikarici-sprey-sepette-net-30-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/feat-leke-cikarici-sprey-sepette-net-30-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-chicco-bebek-bakim-urunlerinde-sepette-net-30-indirim-dd.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-chicco-bebek-bakim-urunlerinde-sepette-net-30-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/kotex-hijyenik-pedlerde-sepette-net-30-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/kotex-hijyenik-pedlerde-sepette-net-30-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/depend-emici-kulotlarda-sepette-net-25-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/depend-emici-kulotlarda-sepette-net-25-indirim-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-eyup-sabri-tuncer-markali-bakim-urunlerinde-net-30-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-eyup-sabri-tuncer-markali-bakim-urunlerinde-net-30-indirim-bgg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/tum-rocs-ve-flipper-urunlerinde-sepette-net-25-indirim-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/tum-rocs-ve-flipper-urunlerinde-sepette-net-25-indirim-bgg.jpg',
          buttonUrl: '#',
        },
      ],
    },
    //Duyuru
    {
      slides: [
        {
          img: 'https://cdn05.e-bebek.com/media/c/cekilis-sonuclari-2025-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/cekilis-sonuclari-2025-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/vurun-geri-cagirma-baby-plus-bfl303d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/baby-plus-bfl303bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/geri2003-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/geri2003-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/gericagirma2003-d.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/geri2003-bg.jpg',
          buttonUrl: '#',
        },
        {
          img: 'https://cdn05.e-bebek.com/media/c/geri-cagirma-duyurusuaaad.jpg',
          bg: 'https://cdn05.e-bebek.com/media/c/egericagirmagbbgbg.jpg',
          buttonUrl: '#',
        },
      ],
    },
  ];

  // baslatma
  const init = () => {
    document.title = 'ebebek | Anne ve Bebek Ürünleri - Bebek Mağazaları';
    createProductDetailContainer();
    loadFonts();
    buildHTML();
    buildCSS();
    renderSliderImage();
    setUnhandledClickCatcher();
    fetchAndRenderProducts().then(() => {
      setEvents();
    });
  };

  // data fetching & storage
  const getProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTS);
    return storedProducts ? JSON.parse(storedProducts) : null;
  };
  // Ürün listesini LocalStorage'a kaydeder
  const saveProductsToLocalStorage = (products) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  };
  // Favori ürünleri LocalStorage'dan alır
  const getFavorites = () => {
    const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITES);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };
  // Favori ürünleri LocalStorage'a kaydeder
  const saveFavorites = (favorites) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
  };
  // Ürünleri API'dan çeker ve slider'a ekler
  const fetchAndRenderProducts = async () => {
    let products = getProductsFromLocalStorage();
    if (products) {
      console.log('Ürünler LocalStorage üzerinden yüklendi.');
    } else {
      try {
        console.log('Ürünler API üzerinden çekiliyor...');
        const response = await fetch(ENDPOINT);
        products = await response.json();
        saveProductsToLocalStorage(products);
        console.log('Ürünler başarıyla çekildi ve LocalStorage üzerine kaydedildi.');
      } catch (error) {
        console.error('API üzerinden ürünler çekilirken bir hata oluştu:', error);
        return;
      }
    }
    allProducts = products;
    renderProductSlider(allProducts);
  };
  // Ürün detay container oluşturur
  const createProductDetailContainer = () => {
    const container = document.createElement('div');
    container.className = 'product-detail';
    document.body.appendChild(container);
  };
  // Fonts yükler
  const loadFonts = () => {
    // Add favicon
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/png';
    faviconLink.href =
      'https://play-lh.googleusercontent.com/3bm3KABk8qI5hq_D0feMfd09tCaJ4ojKC9f3EUnd5TWBCHLT956hBCowpsKA6b0Bm3w';
    document.head.appendChild(faviconLink);

    const materialIconsLink = document.createElement('link');
    materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    materialIconsLink.rel = 'stylesheet';
    document.head.appendChild(materialIconsLink);

    const quicksandFontLink = document.createElement('link');
    quicksandFontLink.href =
      'https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap';
    quicksandFontLink.rel = 'stylesheet';
    document.head.appendChild(quicksandFontLink);

    const poppinsFontLink = document.createElement('link');
    poppinsFontLink.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap';
    poppinsFontLink.rel = 'stylesheet';
    document.head.appendChild(poppinsFontLink);
  };
  // Ürünleri slider'a ekler
  const renderProductSlider = (products) => {
    const track = document.querySelector('.product-slider-track');
    if (!track) return;
    const favorites = getFavorites();

    track.innerHTML = products
      .map((p) => {
        const hasDiscount = p.price < p.original_price;
        const discountAmount = hasDiscount
          ? Math.round(((p.original_price - p.price) / p.original_price) * 100)
          : 0;
        const isFavorite = favorites.includes(String(p.id));
        const favoriteIcon = isFavorite ? 'favorite' : 'favorite_border';
        const favoriteClass = isFavorite ? 'favorited' : '';

        const cardContent = `
            <div class="product-image-container">
                <button class="product-favorite-btn ${favoriteClass}" data-id="${p.id}"><span class="material-icons">${favoriteIcon}</span></button>
                <img src="${p.img}" alt="${p.name}" class="product-card-img" />
            </div>
            <div class="product-info">
                <div class="product-brand">${p.brand || ''}</div>
                <div class="product-title">${p.name}</div>
                <div class="product-price-container">
                    ${
                      hasDiscount
                        ? `
                        <div class="price-row">
                            <div class="product-original-price">${p.original_price.toFixed(2)} TL</div>
                            <div class="discount-display">
                                <span class="discount-percentage">%${discountAmount}</span>
                                <div class="discount-arrow-wrapper">
                                    <span class="material-icons discount-arrow">south</span>
                                </div>
                            </div>
                        </div>
                        <div class="product-price discounted">${p.price.toFixed(2)} TL</div>
                    `
                        : `
                        <div class="product-price">${p.price.toFixed(2)} TL</div>
                    `
                    }
                </div>
            </div>
            <button class="product-add-to-cart-btn">Ürüne Git</button>
          `;

        return `<div class="product-card" data-id="${p.id}" data-url="${p.url}">${cardContent}</div>`;
      })
      .join('');

    updateProductSlider(0);
  };
  // Ana slider görselini ve arka planı günceller
  const renderSliderImage = (direction) => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const imagePanel = document.querySelector('.slider-image-panel');
    if (!imagePanel || !sliderWrapper) return;

    const slides = sliderTabData[currentTabIndex].slides;
    const currentSlide = slides[currentSliderIndex] || slides[0];
    if (!currentSlide) return;

    sliderWrapper.style.backgroundImage = `url('${currentSlide.bg}')`;

    const newImgLink = document.createElement('a');
    newImgLink.href = currentSlide.buttonUrl;
    newImgLink.className = 'slider-main-img-link';
    const newImg = document.createElement('img');
    newImg.className = 'slider-main-img';
    newImg.src = currentSlide.img;
    newImgLink.appendChild(newImg);

    if (direction) {
      newImg.classList.add(`slide-in-${direction}`);
    }

    imagePanel.innerHTML = '';
    imagePanel.appendChild(newImgLink);

    renderThumbnails();
  };
  // Slider thumbnails oluşturur
  const renderThumbnails = () => {
    const thumbsContainer = document.querySelector('.slider-thumbs');
    const thumbsArea = document.querySelector('.slider-thumbs-area');
    const slides = sliderTabData[currentTabIndex].slides;
    if (!thumbsContainer || !thumbsArea) return;

    thumbsArea.style.display = 'flex';

    const thumbsPerPage = 10;
    const currentPage = Math.floor(currentSliderIndex / thumbsPerPage);

    const startIndex = currentPage * thumbsPerPage;
    const endIndex = Math.min(startIndex + thumbsPerPage, slides.length);
    const currentPageSlides = slides.slice(startIndex, endIndex);

    thumbsContainer.innerHTML = currentPageSlides
      .map((slide, idx) => {
        const actualIndex = startIndex + idx;
        return `
                <button class="slider-thumb${actualIndex === currentSliderIndex ? ' active' : ''}" data-thumb-index="${actualIndex}">
                    <img src="${slide.img}" alt="Önizleme ${actualIndex + 1}" />
                </button>
            `;
      })
      .join('');

    thumbsContainer.querySelectorAll('.slider-thumb').forEach((btn) => {
      btn.onclick = () => {
        const newIndex = parseInt(btn.dataset.thumbIndex);
        const direction = newIndex > currentSliderIndex ? 'right' : 'left';
        currentSliderIndex = newIndex;
        renderSliderImage(direction);
      };
    });

    if (thumbPage !== currentPage) {
      thumbPage = currentPage;
    }
  };
  // Ürünleri slider'da kaydırma işlemini yönetir
  const updateProductSlider = (index) => {
    const track = document.querySelector('.product-slider-track');
    const prevBtn = document.querySelector('.product-slider-arrow.prev');
    const nextBtn = document.querySelector('.product-slider-arrow.next');

    if (!track || !prevBtn || !nextBtn || track.children.length === 0) return;

    const cardWidth = track.querySelector('.product-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap);
    const totalMove = cardWidth + gap;

    track.style.transform = `translateX(-${index * totalMove}px)`;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= allProducts.length - VISIBLE_CARDS;
  };
  // Slider'da sağ sol kaydırma işlemini yönetir
  const updateSlider = (direction) => {
    const slides = sliderTabData[currentTabIndex].slides;
    let newTabIndex = currentTabIndex;
    let newSliderIndex = currentSliderIndex;

    if (direction === 'right') {
      if (currentSliderIndex >= slides.length - 1) {
        newTabIndex = (currentTabIndex + 1) % sliderTabs.length;
        newSliderIndex = 0;
      } else {
        newSliderIndex = currentSliderIndex + 1;
      }
    } else if (direction === 'left') {
      if (currentSliderIndex <= 0) {
        newTabIndex = (currentTabIndex - 1 + sliderTabs.length) % sliderTabs.length;
        newSliderIndex = 0;
      } else {
        newSliderIndex = currentSliderIndex - 1;
      }
    }

    currentTabIndex = newTabIndex;
    currentSliderIndex = newSliderIndex;

    document.querySelectorAll('.slider-tab-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === currentTabIndex);
    });

    renderSliderImage(direction);
  };
  // Favori ürün ekleme çıkarma işlemini yapar
  const toggleFavorite = (productId, buttonElement) => {
    let favorites = getFavorites();
    const icon = buttonElement.querySelector('.material-icons');
    const productIdStr = String(productId);

    if (favorites.includes(productIdStr)) {
      favorites = favorites.filter((id) => id !== productIdStr);
      buttonElement.classList.remove('favorited');
      icon.textContent = 'favorite_border';
    } else {
      favorites.push(productIdStr);
      buttonElement.classList.add('favorited');
      icon.textContent = 'favorite';
    }
    saveFavorites(favorites);
  };
  //js event
  const setEvents = () => {
    // Logo click to scroll top
    const logo = document.querySelector('.navbar-header .logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
    }

    // Top Bar Carousel
    let blueBarIndex = 0;
    const el = document.getElementById('topbar-carousel');
    if (el) {
      el.textContent = bluBarSentences[blueBarIndex];
      setInterval(() => {
        blueBarIndex = (blueBarIndex + 1) % bluBarSentences.length;
        el.textContent = bluBarSentences[blueBarIndex];
      }, 4000);
    }

    // Top Slider
    document
      .querySelectorAll('.thumb-slider-arrow.prev')
      .forEach((btn) => (btn.onclick = () => updateSlider('left')));
    document
      .querySelectorAll('.thumb-slider-arrow.next')
      .forEach((btn) => (btn.onclick = () => updateSlider('right')));
    document.querySelectorAll('.slider-tab-btn').forEach((btn, i) => {
      btn.addEventListener('click', function () {
        currentTabIndex = i;
        currentSliderIndex = 0;
        thumbPage = 0;
        document.querySelectorAll('.slider-tab-btn').forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
        renderSliderImage();
      });
    });

    // Product Slider
    let productSliderIndex = 0;
    const productPrevBtn = document.querySelector('.products-slider .prev');
    const productNextBtn = document.querySelector('.products-slider .next');

    if (productPrevBtn) {
      productPrevBtn.onclick = () => {
        if (productSliderIndex > 0) {
          productSliderIndex--;
          updateProductSlider(productSliderIndex);
        }
      };
    }

    if (productNextBtn) {
      productNextBtn.onclick = () => {
        if (productSliderIndex < allProducts.length - VISIBLE_CARDS) {
          productSliderIndex++;
          updateProductSlider(productSliderIndex);
        }
      };
    }

    // Product Card
    document.querySelector('.product-slider-track')?.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const favoriteBtn = e.target.closest('.product-favorite-btn');
      if (favoriteBtn) {
        const productId = favoriteBtn.dataset.id;
        toggleFavorite(productId, favoriteBtn);
        return;
      }

      const url = card.dataset.url;
      if (url) {
        window.open(url, '_blank');
      }
    });
  };
  // Sayfa dışı tıklamalar wrong page
  const setUnhandledClickCatcher = () => {
    document.body.addEventListener('click', (e) => {
      const clickableElement = e.target.closest('a, button');
      if (!clickableElement) {
        return;
      }

      const EXEMPTED_SELECTORS = [
        '.logo',
        '#back-to-top-btn',
        '.thumb-slider-arrow',
        '.slider-tab-btn',
        '.slider-thumb',
        '.product-slider-arrow',
        '.product-card',
      ];

      const isExempt = EXEMPTED_SELECTORS.some((selector) => clickableElement.closest(selector));

      if (!isExempt) {
        e.preventDefault();
        console.log('Wrong Page');
      }
    });
  };
  //html
  const buildHTML = () => {
    document.querySelector('.product-detail').innerHTML = `
          <div class="topbar">
            <div class="topbar-content">
              <div class="topbar-center"><span class="topbar-carousel" id="topbar-carousel">${bluBarSentences[0]}</span></div>
              <div class="topbar-links">
                <a href="#" class="topbar-link"><span class="material-icons">help_outline</span>YARDIM</a>
                <a href="#" class="topbar-link"><span class="material-icons">headset_mic</span>İLETİŞİM</a>
              </div>
            </div>
          </div>
          <nav class="navbar">
            <div class="navbar-header">
              <a href="#" class="logo"><img src="https://cdn05.e-bebek.com/y.ebebek/9973673459742.svg" alt="Logo"></a>
              <div class="search-bar"><span class="material-icons search-icon">search</span><input type="text" placeholder="Ürün, kategori veya marka arayın"></div>
              <div class="navbar-actions">
                <a href="#" class="favorite-btn" aria-label="Favoriler"><span class="material-icons">favorite_border</span></a>
                <div class="account-dropdown-wrapper">
                  <a href="#" class="login-btn"><span class="material-icons">person</span><span>Giriş Yap / Üye Ol</span></a>
                  <div class="account-dropdown-menu">
                    <a class="dropdown-login-btn">Giriş Yap / Hesap Oluştur</a>
                    <ul>
                      <li><a><span class="dropdown-icon siparislerim-icon"></span> Siparişlerim</a></li>
                      <li><a><span class="dropdown-icon mesajlarim-icon"></span> Mesajlarım</a></li>
                      <li><a><span class="dropdown-icon degerlendirmelerim-icon"></span> Değerlendirmelerim</a></li>
                      <li><a><span class="dropdown-icon listelerim-icon"></span> Listelerim</a></li>
                      <li><a><span class="dropdown-icon hediyeceklerim-icon"></span> Hediye Çeklerim</a></li>
                    </ul>
                  </div>
                </div>
                <a href="#" class="cart-btn"><span class="material-icons">shopping_cart</span><span>SEPETİM</span></a>
              </div>
            </div>
            <div class="navbar-menu">
              <div class="navbar-menu-left">
                <a href="#" class="nav-category-link">Kategoriler <span class="material-icons navbar-arrow">expand_more</span></a>
                <a href="#" class="nav-category-link">Keşfet <span class="material-icons navbar-arrow">expand_more</span></a>
                <a href="#" class="nav-category-link">Hediye <span class="material-icons navbar-arrow">expand_more</span></a>
                <a href="#" class="blue-link">İnternete Özel Ürünler</a>
                <a href="#" class="orange-link">Kampanyalar</a>
                <a href="#" class="orange-link">Outlet</a>
              </div>
              <div class="navbar-menu-right"><a href="#" class="navbar-link"><span class="material-icons">local_shipping</span>SİPARİŞİM NEREDE</a>
              <a href="#" class="navbar-link"><span class="material-icons">location_on</span>EN YAKIN EBEBEK</a></div>
            </div>
          </nav>
          <div class="slider-wrapper" style="background-image: url('${sliderTabData[0].slides[0].bg}');">
            <div class="slider-tabs-container">
            <ul class="slider-tabs">${sliderTabs
              .map(
                (tab, i) =>
                  `<li><button type="button" class="slider-tab-btn${i === 0 ? ' active' : ''}" data-index="${i}">${tab}</button></li>`,
              )
              .join('')}</ul>
            </div>
            <div class="slider-main-box"><div class="slider-image-panel"></div></div>
            <div class="slider-thumbs-area">
                <button class="thumb-slider-arrow prev"><span class="material-icons">chevron_left</span></button>
                <div class="slider-thumbs-wrapper"><div class="slider-thumbs"></div></div>
                <button class="thumb-slider-arrow next"><span class="material-icons">chevron_right</span></button>
            </div>
          </div>
          <div class="product-div">
            <div class="product-like"><h2>Beğenebileceğinizi Düşündüklerimiz</h2></div>
            <div class="products-slider">
                <button class="product-slider-arrow prev" disabled><span class="material-icons">chevron_left</span></button>
                <div class="product-slider-wrapper"><div class="product-slider-track"></div></div>
                <button class="product-slider-arrow next"><span class="material-icons">chevron_right</span></button>
            </div>
          </div>
          <button id="back-to-top-btn" class="back-to-top-btn">
            <span class="material-icons">north</span>
            <span>Başa Dön</span>
          </button>
        `;
  };
  //css
  const buildCSS = () => {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>
          html, body {
            box-sizing: border-box;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #fff;
          }
          .material-icons {
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
          }
          .slider-wrapper {
            width: 100vw;
            min-height: 600px;
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            position: relative;
            margin: 0 auto;
            padding: 24px 0;
            box-sizing: border-box;
          }
          .slider-tabs-container {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 8px 0;
          }
          .slider-tabs {
            display: inline-flex;
            list-style: none;
            padding: 0 16px;
            margin: 0;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 1rem;
            max-width: 100%;
            box-sizing: border-box;
          }
          .slider-tabs::-webkit-scrollbar {
            height: 4px;
          }
          .slider-tabs::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.2);
          }
          .slider-tabs::-webkit-scrollbar-thumb {
            background: #fff;
            border-radius: 2px;
          }
          .slider-tab-btn {
            border: none;
            outline: none;
            background: transparent;
            color: #fff;
            font-weight: 600;
            font-family: 'Poppins', cursive, Arial, sans-serif;
            padding: 10px 18px;
            border-radius: 2em;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
            white-space: nowrap;
          }
          .slider-tab-btn.active {
            background: #fff;
            color: #f28e00;
          }
          .slider-main-box {
            background: #fff;
            border-radius: 24px;
            width: 100%;
            max-width: 1080px;
            height: 400px;
            margin: 16px auto;
            display: flex;
            align-items: center;
            padding: 16px;
            position: relative;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .slider-image-panel {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 16px;
          }
          .slider-main-img-link {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .slider-main-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: right;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 1;
            z-index: 1;
          }
          .slider-thumbs-area {
            width: 100%;
            max-width: 960px;
            margin: 16px auto 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80px;
            padding: 0 20px;
            box-sizing: border-box;
            gap: 16px;
          }
          .thumb-slider-arrow {
            width: 52px;
            height: 52px;
            border: 2px solid transparent;
            background: #fff;
            color: #F28E00;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            font-size: 32px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            flex-shrink: 0;
            z-index: 2;
          }
          .thumb-slider-arrow:hover {
            background: #f1f8fc;
            color: #F28E00;
            border-color: #F28E00;
            transform: scale(1.05);
          }
          .slider-thumbs-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .slider-thumbs {
            display: flex;
            align-items: center;
            gap: 10px;
            transition: transform 0.3s;
            justify-content: center;
            flex-wrap: nowrap;
            padding: 0 10px;
          }
          .slider-thumb {
            border: none;
            background: #fff;
            border-radius: 14px;
            padding: 4px;
            width: 90px;
            height: 60px;
            flex-shrink: 0;
            cursor: pointer;
            transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s, height 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .slider-thumb img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 10px;
          }
          .slider-thumb.active {
            border-color: #f7931e;
            box-shadow: 0 4px 16px rgba(255, 153, 0, 0.25);
            transform: scale(1.05);
            height: 70px;
          }
          @keyframes slideOutLeft { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(-120px); opacity: 0; } }
          @keyframes slideInRight { 0% { transform: translateX(120px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
          @keyframes slideOutRight { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(120px); opacity: 0; } }
          @keyframes slideInLeft { 0% { transform: translateX(-120px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
          .slider-main-img.slide-in-right {
            animation: slideInRight 0.22s cubic-bezier(0.4,0,0.2,1) forwards;
          }
          .slider-main-img.slide-in-left {
            animation: slideInLeft 0.22s cubic-bezier(0.4,0,0.2,1) forwards;
          }
          .topbar {
            width: 100%;
            background: #0092DB;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 27px 0;
          }
          .topbar-content {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 2px;
          }
          .topbar-center {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          .topbar-carousel {
            font-family: 'Quicksand', sans-serif;
            font-size: 1.6em;
            font-weight: 700;
            color: white;
          }
          .topbar-links {
            display: flex;
            align-items: center;
            gap: 3.5em;
            position: absolute;
            right: 10.5em;
          }
          .topbar-link {
            color: #fff;
            text-decoration: none;
            font-size: 11.2px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 2px;
          }
          .topbar-link:hover {
            color: #fff;
            text-decoration: none;
          }
          .topbar-link .material-icons {
            font-weight: 300;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .navbar {
            width: 100%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.04);
            background: #fff;
            position: relative;
            z-index: 10;
          }
          .navbar-header {
            width: 80%;
            max-width: 1400px;
            margin: 0px auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 0px 15px 28px;
            gap: 14px;
          }
          .navbar-header .logo {
            margin-right: 0;
          }
          .navbar-header .logo img {
            height: 35px;
          }
          .search-bar {
            /* flex: 1; */
            display: flex;
            align-items: center;
            width: 600px;
            border-radius: 28px;
            background: #f1f8fc;
            border: none;
            height: 50px;
            padding: 0 18px;
          }
          .search-bar .search-icon {
            color: #6eb6e6;
          }
          .search-bar input {
            flex: 1;
            padding: 0 10px;
            border: none;
            outline: none;
            background: transparent;
            color: #686868;
          }
          .navbar-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-left: 0;
          }
          .favorite-btn, .login-btn, .cart-btn {
            display: flex;
            align-items: center;
            text-decoration: none;
            height: 50px;
            border-radius: 28px;
            transition: background 0.2s, box-shadow 0.2s;
            box-sizing: border-box;
          }
          .favorite-btn {
            border: 1.2px solid #e3e3e3;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            justify-content: center;
            color: #2196f3;
            background: #fff;
          }
          .favorite-btn:hover {
            background-color: #EBF6FC;
          }
          .login-btn {
            border: 1.2px solid #2196f3;
            background: #fff;
            color: #2196f3;
            font-weight: 400;
            padding: 0 16px;
            font-family: 'Poppins', cursive;
          }
          .login-btn:hover {
            background: #fff;
            color: #2196f3;
          }
          .login-btn span:last-child {
            font-size: 15px;
            font-weight: 400;
          }
          .cart-btn {
            background: #EBF6FC;
            color: #0092DB;
            font-weight: 400;
            border: none;
            padding: 0 22px;
            font-family: 'Poppins', cursive;
          }
          .cart-btn:hover {
            background: #0091D5;
            color: #fff;
          }
          .cart-btn span:last-child {
            font-size: 16px;
          }
          .navbar-menu {
          width: 80%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border-top: 1px solid #e3e3e3;
          padding: 3px 24px 20px 24px;
          min-height: 44px; 
          }
          .navbar-menu-left {
            display: flex;
            align-items: center;
          }
          .navbar-menu-right {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .navbar-menu a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #333;
            font-family: 'Quicksand', sans-serif;
            font-weight: 700;
            font-size: 17.28px;
            padding: 0 12px;
            height: 44px;
            border-radius: 6px;
            transition: background 0.2s;
          }
          .navbar-menu a .navbar-arrow {
            font-size: 16px;
            color: #888;
            transition: transform 0.2s;
          }
          .navbar-menu .nav-category-link {
            color: #686868;
            transition: color 0.2s;
          }
          .navbar-menu .nav-category-link:hover {
            color: #0091D5;
          }
          .navbar-menu .nav-category-link:hover .navbar-arrow {
            transform: rotate(180deg);
          }
          .navbar-menu .blue-link {
            color: #0091d5;
          }
          .navbar-menu .orange-link {
            color: #F28E00;
          }
          .navbar-menu-right .navbar-link {
            color: #686868;
            font-family: 'Poppins', cursive;
            font-weight: 500;
            font-size: 11.52px;
          }
          .navbar-menu-right .navbar-link .material-icons {
            color: #0092DB;
            margin-right: 6px;
          }
          .product-div {
            width: 100%;
            max-width: 1280px;
            margin: 32px auto 0;
            padding: 0 24px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .product-like {
            background-color: #FFF7E6;
            border-radius: 24px;
            padding: 20px 32px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .product-like h2 {
            font-family: 'Quicksand', sans-serif;
            font-size: 2.2em;
            font-weight: 700;
            line-height: 1.1;
            color: #f28e00;
            margin: 0;
          }
          .products-slider {
            position: relative;
          }
          .product-slider-wrapper {
            overflow: hidden;
          }
          .product-slider-track {
            display: flex;
            gap: 16px;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            padding-bottom: 10px;
          }
          .product-card {
            flex: 0 0 calc(25% - 12px);
            background: #fff;
            border: 2px solid #eee;
            border-radius: 16px;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            position: relative;
            transition: all 0.2s;
            cursor: pointer;
            padding: 5px;
            box-sizing: border-box;
          }
          .product-card:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            border-width: 4px;
            border-color: #f28e00;
          }
          .product-image-container {
            position: relative;
            width: 100%;
            padding-top: 100%;
            margin-bottom: 12px;
          }
          .product-card-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .product-favorite-btn {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.8);
            border: 1px solid #eee;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #888;
            transition: all 0.2s;
            z-index: 2;
          }
          .product-favorite-btn:hover {
            background: #fff;
            color: #f44336;
            transform: scale(1.1);
          }
          .product-favorite-btn.favorited {
            color: #f28e00;
          }
          .product-info {
            padding: 0;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
          .product-brand {
            font-size: 13px;
            color: #666;
            margin-bottom: 4px;
          }
          .product-title {
            font-size: 14px;
            color: #333;
            line-height: 1.4;
            margin-bottom: 8px;
            height: 3.9em;
            overflow: hidden;
          }
          .product-price-container {
            margin-bottom: 12px;
            margin-top: auto;
          }
          .product-price {
            font-size: 20px;
            font-weight: bold;
            color: #333;
          }
          .product-price.discounted {
            color: #2E8B57;
          }
          .product-original-price {
            color: #999;
            text-decoration: line-through;
            font-size: 14px;
          }
          .price-row {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
          }
          .discount-display {
            display: flex;
            align-items: center;
            gap: 4px;
            color: #2E8B57;
            font-weight: bold;
          }
          .discount-percentage {
            font-size: 14px;
          }
          .discount-arrow-wrapper {
            background-color: #2E8B57;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .discount-arrow {
            font-size: 14px !important;
          }
          .product-add-to-cart-btn {
            width: 100%;
            background: #fff;
            border: 1px solid #ddd;
            color: #f28e00;
            padding: 12px;
            font-size: 15px;
            font-weight: bold;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
            margin: 0 0 10px 0;
            z-index: 2;
          }
          .product-add-to-cart-btn:hover {
            background: #f28e00;
            color: #fff;
            border-color: #f28e00;
          }
          .product-slider-arrow {
            position: absolute;
            top: 45%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: 1px solid #eee;
            color: #666;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 5;
            transition: all 0.2s;
          }
          .product-slider-arrow:hover {
            background: #f28e00;
            color: #fff;
          }
          .product-slider-arrow.prev {
            left: -30px;
          }
          .product-slider-arrow.next {
            right: -30px;
          }
          .product-slider-arrow:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: #f5f5f5;
          }
          .back-to-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: auto;
            height: 30px;
            background-color: #fff;
            color: #333;
            border: 1px solid #eee;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 0 15px;
            font-size: 11px;
            font-weight: 600;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            cursor: pointer;
            z-index: 100;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
          }
          .back-to-top-btn .material-icons {
            font-size: 17px;
          }
          .back-to-top-btn.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .search-bar .search-icon,
          .login-btn .material-icons {
            font-size: 28px;
          }
          .account-dropdown-wrapper {
            position: relative;
            display: inline-block;
            padding-bottom: 5px;
          }
          .account-dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            background-color: #fff;
            min-width: 280px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.15);
            border-radius: 16px;
            z-index: 100;
            padding: 16px;
            border: 1px solid #eee;
          }
          .account-dropdown-wrapper:hover .account-dropdown-menu {
            display: block;
          }
          .account-dropdown-menu .dropdown-login-btn {
            display: block;
            width: 100%;
            background-color: #F28E00;
            color: #fff;
            border: none;
            border-radius: 24px;
            padding: 14px 0;
            font-family: 'Poppins', cursive;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            text-decoration: none;
            margin-bottom: 16px;
            transition: background-color 0.2s;
            cursor: pointer;
          }
          .account-dropdown-menu .dropdown-login-btn:hover {
            background-color: #d97706;
          }
          .account-dropdown-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .account-dropdown-menu ul li a {
            color: #333;
            padding: 12px 8px;
            text-decoration: none;
            display: flex;
            align-items: center;
            font-family: 'Poppins', cursive;
            font-size: 15px;
            font-weight: 300;
            border-radius: 8px;
            transition: background-color 0.2s;
            position: relative;
            cursor: pointer;
          }
          .account-dropdown-menu ul li a:hover {
            background-color: #f5f5f5;
          }
          .account-dropdown-menu ul li a::after {
            content: '>';
            position: absolute;
            right: 8px;
            color: #ccc;
            font-weight: bold;
          }
          .dropdown-icon {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 12px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }
          .siparislerim-icon { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDkyREIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1bGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTZWOGEyIDIgMCAwIDAtMS0xLjczbC03LTRhMiAyIDAgMCAwLTIgMGwtNyA0QTIgMiAwIDAgMCAzIDh2OGEyIDIgMCAwIDAgMSAxLjczbDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6Ij48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz0iMy4yNyA2Ljk2IDEyIDEyLjAxIDIwLjczIDYuOTYiPjwvcG9seWxpbmU+PGxpbmUgeDE9IjEyIiB5MT0iMjIuMDgiIHgyPSIxMiIgeTI9IjEyIj48L2xpbmU+PC9zdmc+'); }
          .mesajlarim-icon { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDkyREIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1bGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNIDQaSDE2YzEuMSAwIDIgLjkgMiAydjEyYzAgMS4xLS45IDItMiAySDRjLTEuMSAwLTMtLjktMi0yVjZjMC0xLjEuOS0yIDItMnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIyMiw2IDEyLDEzIDIsNiI+PC9wb2xyeWxpbmU+PC9zdmc+'); }
          .degerlendirmelerim-icon { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDkyREIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1bGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMkg0Yy0xLjEgMC0yIC45LTIgMnYxOGw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTIgMnoiPjwvcGF0aD48cGF0aCBkPSJNOCAxMmg4bS04LTRoOCI+PC9wYXRoPjwvc3ZnPg=='); }
          .listelerim-icon { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDkyREIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1bGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAuODQgNC42MWExLjUgMS41IDAgMCAwLTcuNzggMEwxMiA1LjY3bC0xLjA2LTEuMDZhMS41IDEuNSAwIDAgMC03Ljc4IDcuNzlsMS4wNiAxLjA2TDEyIDIxLjIzbDcuNzgtNy43OCAxLjA2LTEuMDZhMS41IDEuNSAwIDAgMCAwLTcuNzh6Ij48L3BhdGg+PC9zdmc+'); }
          .hediyeceklerim-icon { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDkyREIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1bGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCAxMiAyMCAyMiA0IDIyIDQgMTIiPjwvcG9seWxpbmU+PHJlY3QgeD0iMiIgeT0iNyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjUiPjwvcmVjdD48bGluZSB4MT0iMTIiIHkxPSIyMiIgeDI9IjEyIiB5Mj0iNyI+PC9saW5lPjxwYXRoIGQ9Ik0xMiA3SDcuNWExLjUgMS41IDAgMCAxIDAtNEM5LjggMiAxMiA0IDEyIDd6Ij48L3BhdGg+PHBhdGggZD0iTTEyIDdoNC41YTEuNSAxLjUgMCAwIDAgMC01QzE0LjIgMiAxMiA0IDEyIDd6Ij48L3BhdGg+PC9zdmc+'); }
          
          /* Responsive Design */
          @media (max-width: 768px) {
            .topbar-content {
              flex-direction: column;
              gap: 10px;
              padding: 0 20px;
            }
            .topbar-center {
              position: static;
              transform: none;
            }
            .topbar-links {
              position: static;
              justify-content: center;
            }
            .navbar-header {
              flex-direction: column;
              gap: 15px;
              padding: 15px 20px;
            }
            .search-bar {
              width: 100%;
              max-width: 400px;
            }
            .navbar-actions {
              width: 100%;
              justify-content: center;
              gap: 8px;
            }
            .navbar-menu {
              flex-direction: column;
              gap: 10px;
              padding: 10px 20px;
            }
            .navbar-menu-left, .navbar-menu-right {
              flex-wrap: wrap;
              justify-content: center;
              gap: 10px;
            }
            .slider-tabs {
              padding: 0 10px;
              gap: 0.5rem;
            }
            .slider-tab-btn {
              padding: 8px 12px;
              font-size: 12px;
            }
            .slider-main-box {
              margin: 10px 20px;
              height: 300px;
            }
            .slider-thumbs-area {
              padding: 0 10px;
              gap: 8px;
            }
            .thumb-slider-arrow {
              width: 40px;
              height: 40px;
              font-size: 24px;
            }
            .slider-thumb {
              width: 60px;
              height: 40px;
            }
            .slider-thumb.active {
              height: 50px;
            }
            .product-div {
              padding: 0 20px;
            }
            .product-card {
              flex: 0 0 calc(50% - 8px);
            }
            .product-slider-arrow {
              width: 36px;
              height: 36px;
              font-size: 20px;
            }
            .product-slider-arrow.prev {
              left: -20px;
            }
            .product-slider-arrow.next {
              right: -20px;
            }
          }
          
          @media (max-width: 480px) {
            .topbar-carousel {
              font-size: 1.2em;
            }
            .navbar-header .logo img {
              height: 28px;
            }
            .search-bar {
              height: 44px;
            }
            .favorite-btn, .login-btn, .cart-btn {
              height: 44px;
            }
            .slider-main-box {
              height: 250px;
              margin: 10px 15px;
            }
            .slider-thumbs-area {
              min-height: 60px;
            }
            .slider-thumb {
              width: 50px;
              height: 35px;
            }
            .slider-thumb.active {
              height: 45px;
            }
            .product-card {
              flex: 0 0 calc(100% - 8px);
            }
            .product-like h2 {
              font-size: 1.6em;
            }
            .back-to-top-btn {
              bottom: 20px;
              right: 20px;
              padding: 0 12px;
              font-size: 10px;
            }
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .navbar-header {
              padding: 15px 40px;
            }
            .search-bar {
              width: 500px;
            }
            .slider-main-box {
              max-width: 900px;
              height: 350px;
            }
            .slider-thumbs-area {
              max-width: 800px;
            }
            .product-card {
              flex: 0 0 calc(33.333% - 11px);
            }
            .product-div {
              max-width: 1000px;
            }
          }
        </style>`,
    );
  };

  init();
})();
