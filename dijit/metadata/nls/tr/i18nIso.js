// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define({documentTypes:{data:{caption:"ISO 19115 (Veri)",description:""},service:{caption:"ISO 19119 (Hizmet)",description:""},gmi:{caption:"ISO 19115-2 (Görüntülü ve Kılavuzlu Veriler)",description:""}},general:{reference:"Referans"},sections:{metadata:"Meta veriler",identification:"Kimlik",distribution:"Dağılım",quality:"Kalite",acquisition:"Satın Alma"},metadataSection:{identifier:"Belirteç",contact:"Kişi",date:"Tarih",standard:"Standart",reference:"Referans"},identificationSection:{citation:"Alıntı",description:"Tanım",contact:"Kişi",thumbnail:"Küçük Resim",keywords:"Anahtar Kelimeler",constraints:"Kısıtlamalar",resource:"Kaynak",resourceTab:{representation:"Gösterim",language:"Dil",classification:"Sınıflandırma",extent:"Yayılım"},serviceResourceTab:{serviceType:"Hizmet Türü",extent:"Yayılım",couplingType:"Bağlaşım türü",operation:"İşlem",operatesOn:"İşletim Sistemi"}},distributionSection:{},qualitySection:{scope:"Kapsam",conformance:"Uyumluluk",lineage:"Geçmiş"},acquisitionSection:{requirement:"Gereksinimler",objective:"Hedef",instrument:"Araç",plan:"Plan",operation:"İşlem",platform:"Platform",environment:"Çevre"},AbstractMD_Identification:{sAbstract:"Özet",purpose:"Amaç",credit:"Katkı Yapanlar",pointOfContact:"İletişim noktası",resourceMaintenance:"Bakım",graphicOverview:"Grafiğe Genel Bakış",descriptiveKeywords:"Anahtar Kelime Koleksiyonu",resourceConstraints:"Kısıtlamalar"},CI_Address:{deliveryPoint:"Teslim Noktası",city:"Şehir",administrativeArea:"İdari Alan",postalCode:"Posta kodu",country:"Ülke",electronicMailAddress:"E-posta Adresi"},CI_Citation:{title:"Başlık",alternateTitle:"Alternatif Başlık",identifier:"Benzersiz Kaynak Tanımlayıcı",resource:{title:"Kaynak Başlığı",date:"Kaynak Tarihi"},specification:{title:"Spesifikasyon Başlığı",date:"Spesifikasyon Tarihi"}},CI_Contact:{phone:"Telefon",address:"Adres",onlineResource:"Çevrimiçi kaynak",hoursOfService:"Hizmet saati",contactInstructions:"İletişim Talimatları"},CI_Date:{date:"Tarih",dateType:"Tarih Türü"},CI_DateTypeCode:{caption:"Tarih Türü",creation:"Oluşturma Tarihi",publication:"Yayımlanma Tarihi",revision:"Revizyon Tarihi"},CI_OnLineFunctionCode:{caption:"Fonksiyon",download:"Yükle",information:"Bilgi",offlineAccess:"çevrimdışı erişim",order:"Sırala",search:"Ara"},CI_OnlineResource:{caption:"Çevrimiçi kaynak",linkage:"URL",protocol:"İletişim Kuralları",applicationProfile:"Başvuru Profili",name:"Adı",description:"Tanım",sFunction:"Fonksiyon"},CI_ResponsibleParty:{caption:"İletişim noktası",individualName:"Birey Adı",organisationName:"Kuruluş Adı",positionName:"Pozisyon Adı",contactInfo:"İlgili Kişi Bilgileri",role:"Rol"},CI_RoleCode:{caption:"Rol",resourceProvider:"Kaynak Sağlayıcı",custodian:"Emanetçi",owner:"Sahibi",user:"Kullanıcı",distributor:"Distribütör",originator:"Düzenleyen",pointOfContact:"İletişim noktası",principalInvestigator:"Baş Müfettiş",processor:"İşlemci",publisher:"Yayımcı",author:"Yazar"},CI_Telephone:{voice:"Ses",facsimile:"Faks"},DCPList:{caption:"DCP",XML:"XML",CORBA:"CORBA",JAVA:"JAVA",COM:"COM",SQL:"SQL",WebServices:"WebServices"},DQ_ConformanceResult:{caption:"Uyumluluk Sonucu",explanation:"Açıklama",degree:{caption:"Derece",validationPerformed:"Doğrulama Gerçekleştirildi",conformant:"Uyumlu",nonConformant:"Uyumlu Değil"}},DQ_DataQuality:{report:"Rapor"},DQ_Scope:{level:"Kapsam (kalite bilgilerinin geçerliliği)",levelDescription:"Düzey Betimlemesi"},EX_Extent:{caption:"Yayılım",description:"Tanım",geographicElement:"Mekansal Yayılım",temporalElement:"Geçici Yayılım",verticalElement:"Dikey yayılım"},EX_GeographicBoundingBox:{westBoundLongitude:"Meridyen Batı Sınırı",eastBoundLongitude:"Meridyen Doğu Sınırı",southBoundLatitude:"Paralel Güney Sınırı",northBoundLatitude:"Paralel Kuzey Sınırı"},EX_GeographicDescription:{caption:"Coğrafi Açıklama"},EX_TemporalExtent:{TimePeriod:{beginPosition:"Başlangıç Tarihi",endPosition:"Bitiş Tarihi"}},EX_VerticalExtent:{minimumValue:"Minimum Değer",maximumValue:"Maksimum Değer",verticalCRS:"Dikey CRS"},Length:{caption:"Uzunluk",uom:"Ölçü Birimleri",km:"Kilometre",m:"Metre",mi:"Mil",ft:"Fit"},LI_Lineage:{statement:"Geçmiş Bildirimi"},MD_BrowseGraphic:{fileName:"Grafik URL'sine Gözat",fileDescription:"Grafik Yazısına Gözat",fileType:"Grafik Türüne Gözat"},MD_ClassificationCode:{unclassified:"sınıflandırılmamış",restricted:"Yönlendirilmiş",confidential:"gizli",secret:"Gizli",topSecret:"Çok Gizli"},MD_Constraints:{caption:"Kullanım Kısıtlamaları",useLimitation:"Kullanım Sınırlaması"},MD_DataIdentification:{spatialRepresentationType:"Mekansal gösterim tipi",spatialResolution:"Mekansal Çözünürlük",language:"Kaynak Dil",supplementalInformation:"Destekleyici"},MD_DigitalTransferOptions:{onLine:"Çevrimiçi"},MD_Distribution:{distributionFormat:"Dağıtım formatı",transferOptions:"Aktarım Seçenekleri"},MD_Format:{name:"Format Adı",version:"Format Sürümü"},MD_Identifier:{caption:"URI",identifierCaption:"Belirteç",code:"Kod"},MD_Keywords:{delimitedCaption:"Anahtar Kelimeler",thesaurusName:"İlişkili Eşanlamlı Sözlüğü"},MD_KeywordTypeCode:{caption:"Anahtar Kelime Türü",discipline:"Disiplin",place:"Yer",stratum:"Katman",temporal:"Zamansal",theme:"Tema"},MD_LegalConstraints:{caption:"Yasal kısıtlamalar",accessConstraints:"Erişim Kısıtlamaları",useConstraints:"Kısıtlama Kullan",otherConstraints:"Diğer kısıtlamalar"},MD_MaintenanceFrequencyCode:{caption:"Frekans",continual:"Sürekli",daily:"Günlük",weekly:"Haftalık",fortnightly:"İki haftada bir",monthly:"Aylık",quarterly:"çeyreklik",biannually:"İki yılda bir",annually:"Yıllık",asNeeded:"Gerektiğinde",irregular:"Düzensiz",notPlanned:"Planlanmadı",unknown:"Bilinmiyor"},MD_Metadata:{caption:"Meta veriler",fileIdentifier:"Dosya Tanıtıcısı",language:"Meta Veri Dili",hierarchyLevel:"Hiyerarşi Düzeyi",hierarchyLevelName:"Hiyerarşi Düzeyi Adı",contact:"Meta veri iletişimi",dateStamp:"Meta veri Tarihi",metadataStandardName:"Meta veri Standart Adı",metadataStandardVersion:"Meta veri Standart Sürümü",referenceSystemInfo:"Referans Sistemi",identificationInfo:"Kimlik",distributionInfo:"Dağılım",dataQualityInfo:"Kalite"},MD_ProgressCode:{caption:"İlerleme Kodu",completed:"Tamamlandı",historicalArchive:"Tarihsel Arşiv",obsolete:"Eski",onGoing:"Süren",planned:"Planlı",required:"Gerekli",underDevelopment:"geliştiriliyor"},MD_RepresentativeFraction:{denominator:"Payda"},MD_Resolution:{equivalentScale:"Eşlenik Ölçek",distance:"Mesafe"},MD_RestrictionCode:{copyright:"Telif Hakkı",patent:"Patent",patentPending:"patent başvurusu yapılmıştır",trademark:"Ticari Marka",license:"Lisans",intellectualPropertyRights:"fikri mülkiyet hakları",restricted:"Yönlendirilmiş",otherRestrictions:"Diğer Kısıtlamalar"},MD_ScopeCode:{attribute:"Öznitelik",attributeType:"Öznitelik türü",collectionHardware:"Koleksiyon donanımı",collectionSession:"Koleksiyon oturumu",dataset:"Veri Kümesi",series:"Seriler",nonGeographicDataset:"Coğrafi olmayan veri kümesi",dimensionGroup:"Boyut grubu",feature:"Özellik",featureType:"Detay tipi",propertyType:"Özellik tipi",fieldSession:"Alan oturumu",software:"Yazılım",service:"Servis",model:"Model",tile:"Sıra"},MD_ScopeDescription:{attributes:"Öznitelikler",features:"Özellikler",featureInstances:"Detay örnekleri",attributeInstances:"Öznitelik örnekleri",dataset:"Veri Kümesi",other:"Diğer"},MD_SecurityConstraints:{caption:"Güvenlik kısıtlamaları",classification:"Sınıflandırma",userNote:"Kullanıcı notu",classificationSystem:"Sınıflandırma sistemi",handlingDescription:"Yürütme Açıklaması"},MD_SpatialRepresentationTypeCode:{caption:"Mekansal gösterim tipi",vector:"Vektör",grid:"Kılavuz",textTable:"Metin Tablosu",tin:"TIN",stereoModel:"Stereo Model",video:"Video"},MD_TopicCategoryCode:{caption:"Başlık Kategorisi",boundaries:"Yönetsel ve Siyasi Sınırlar",farming:"Tarım ve Çiftçilik",climatologyMeteorologyAtmosphere:"Atmosfer ve İklimbilim",biota:"Biyoloji ve Ekoloji",economy:"İş ve Ekonomi",planningCadastre:"Kadastro",society:"Kültür, Toplum ve Demografi",elevation:"Yükselti Ürünleri ve Türetilmiş Ürünler",environment:"Çevre ve Koruma",structure:"Tesisler ve Yapılar",geoscientificInformation:"Jeolojik ve Jeofiziksel",health:"İnsan Sağlığı ve Hastalık",imageryBaseMapsEarthCover:"Görüntülü ve Altlık Haritalar",inlandWaters:"İç Arazi Su Kaynakları",location:"Konumlar ve Jeodezik Ağlar",intelligenceMilitary:"Askeri",oceans:"Okyanuslar ve Haliçler",transportation:"Taşımacılık Ağı",utilitiesCommunication:"Altyapı ve İletişim"},MI_ContextCode:{caption:"İçerik",acquisition:"Satın Alma",pass:"Başarılı",wayPoint:"Ara Nokta"},MI_EnvironmentalRecord:{caption:"Çevre Koşulları",averageAirTemperature:"Ortalama Hava Sıcaklığı",maxRelativeHumidity:"Maksimum Bağıl Nem",maxAltitude:"Maksimum İrtifa",meterologicalConditions:"Meteorolojik Koşullar"},MI_Event:{identifier:"Olay Tanımlayıcısı",time:"Zaman",expectedObjectiveReference:"Beklenen Hedef (Hedef Tanımlayıcısı)",relatedSensorReference:"İlgili Sensör (Araç Tanımlayıcısı)",relatedPassReference:"İlgili Parola (Platform Parola Tanımlayıcısı)"},MI_GeometryTypeCode:{point:"Nokta",linear:"Çizgisel",areal:"Alanla İlgili",strip:"Şerit"},MI_Instrument:{citation:"Araç Açıklaması",identifier:"Araç Tanımlayıcısı",sType:"Araç Türü",description:"Araç Açıklaması",mountedOn:"Yerleşim Yeri",mountedOnPlatformReference:"Yerleşim Yeri (Platform Tanımlayıcısı)"},MI_Metadata:{acquisitionInformation:"Satın Alma"},MI_Objective:{caption:"Hedef",identifier:"Hedef Tanımlayıcısı",priority:"Hedef Önceliği",sFunction:"Hedef İşlevi",extent:"Yayılım",pass:"Platform Parolası",sensingInstrumentReference:"Algılama Aracı (Araç Tanımlayıcısı)",objectiveOccurrence:"Olaylar",sections:{identification:"Kimlik",extent:"Yayılım",pass:"Başarılı",sensingInstrument:"Algılama Aracı",objectiveOccurrence:"Olaylar"}},MI_ObjectiveTypeCode:{caption:"Tür (Hedef için Koleksiyon Tekniği)",instantaneousCollection:"Anlık Koleksiyon",persistentView:"Kalıcı Görünüm",survey:"Araştırma"},MI_Operation:{caption:"İşlem",description:"İşlem Açıklaması",citation:"İşlem Açıklaması",identifier:"İşlem Tanımlayıcısı",status:"İşlem Durumu",objectiveReference:"İlgili Hedef (Hedef Tanımlayıcısı)",planReference:"İlgili Plan (Plan Tanımlayıcısı)",significantEventReference:"İlgili Olay (Olay Tanımlayıcısı)",platformReference:"İlgili Platform (Platform Tanımlayıcısı)",sections:{identification:"Kimlik",related:"İlgili"}},MI_OperationTypeCode:{caption:"İşlem Tipi",real:"Gerçek",simulated:"Simüle Edilmiş",synthesized:"Birleştirilmiş"},MI_Plan:{sType:"Veri Toplama için Örnekleme Geometrisi",status:"Plan Durumu",citation:"Toplama Talep Eden Yetkili Açıklaması",satisfiedRequirementReference:"Karşılanan Gereklilik (Gereklilik Tanımlayıcısı)",operationReference:"İlgili İşlem (İşlem Tanımlayıcısı)"},MI_Platform:{citation:"Platform Açıklaması",identifier:"Platform Tanımlayıcısı",description:"Aracı Destekleyen Platformun Açıklayıcısı",sponsor:"Platform Sponsor Kuruluşu",instrument:"Platformda yerleşik araçlar",instrumentReference:"Araç Tanımlayıcısı",sections:{identification:"Kimlik",sponsor:"Sponsor",instruments:"Araçlar"}},MI_PlatformPass:{identifier:"Platform Parola Tanımlayıcısı",extent:"Platform Parola Kapsamı",relatedEventReference:"İlgili Olay (Olay Tanımlayıcısı)"},MI_PriorityCode:{critical:"Kritik",highImportance:"Yüksek Önem Derecesi",mediumImportance:"Orta Önem Derecesi",lowImportance:"Düşük Önem Derecesi"},MI_RequestedDate:{requestedDateOfCollection:"İstenen Toplama Tarihi",latestAcceptableDate:"En Son Kabul Edilebilir Tarih"},MI_Requirement:{caption:"Gereksinimler",citation:"Kılavuz Malzeme Gereksinimi Açıklaması",identifier:"Gereksinim Tanımlayıcısı",requestor:"Gereksinim İstek Sahibi",recipient:"Sonuç İstek Sahibi",priority:"Gereksinim Önceliği",requestedDate:"İstenen Tarih",expiryDate:"Geçerlilik Sonu Tarihi",satisifiedPlanReference:"Karşılanan Plan (Plan Tanımlayıcısı)",sections:{identification:"Kimlik",requestor:"İstek Sahibi",recipient:"Alıcı",priorityAndDates:"Öncelik ve Tarihler",satisifiedPlan:"Karşılanan Plan"}},MI_SequenceCode:{caption:"Dizi",start:"Başlangıç",end:"Bitiş",instantaneous:"Anlık"},MI_TriggerCode:{caption:"Tetikleyici",automatic:"Otomatik",manual:"El ile",preProgrammed:"Önceden Programlanmış"},ObjectReference:{uuidref:"UUID Başvurusu",xlinkref:"URL Başvurusu"},RS_Identifier:{caption:"ID Plus Kod Alanı",code:"Kod",codeSpace:"Kod Alanı"},SV_CouplingType:{loose:"Gevşek",mixed:"Karışık",tight:"Sıkı"},SV_OperationMetadata:{operationName:"İşlem adı",DCP:"DCP",connectPoint:"Bağlantı Noktası"},SV_ServiceIdentification:{serviceType:"Hizmet Türü",couplingType:"Bağlaşım türü",containsOperations:"İşlem Meta Veri",operatesOn:"İşletim Sistemi"},TM_Primitive:{indeterminatePosition:"Belirsiz Konum",indeterminates:{before:"Önce",after:"Sonra",now:"Şimdi",unknown:"Bilinmiyor"}},gemet:{concept:{gemetConceptKeyword:"GEMET Kavramı Anahtar Kelimesi",tool:"Ara...",dialogTitle:"GEMET - Kavram Anahtar Kelimesi",searchLabel:"Ara:",searchTip:"GEMET Ara"},theme:{tool:"Ara...",dialogTitle:"GEMET - Inspire Veri Teması"},ioerror:"GEMET hizmeti ile iletişimde hata oluştu: {url}",searching:"GEMET aranıyor...",noMatch:"Eşleşen sonuç bulunamadı.",languages:{bg:"Bulgarca",cs:"Çekçe",da:"Danca",nl:"Felemenkçe",en:"İngilizce",et:"Estonyaca",fi:"Fince",fr:"Fransızca",de:"Almanca",el:"Yunanca",hu:"Macarca",ga:"Gaelic (İrlanda lehçesi)",it:"İtalyanca",lv:"Letonca",lt:"Litvanyaca",mt:"Maltaca",pl:"Lehçe",pt:"Portekizce",ro:"Romence",sk:"Slovakça",sl:"Slovence",es:"İspanyolca",sv:"İsveççe"}}});