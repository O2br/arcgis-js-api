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

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"Nėra",notComplete:"Nebaigtas",other:"Kita",present:"Yra",unknown:"Nežinomas",unpublishedMaterial:"Nepublikuota medžiaga"},hints:{integerGreaterThanOne:"(įveskite sveikąjį skaičių > 1)",integer0To100:"(įveskite sveikąjį skaičių  0...100)"},citeinfo:{caption:"Citavimo informacija",origin:"Kūrėjas",pubdate:"Publikavimo data",pubtime:"Publikavimo laikas",title:"Pavadinimas",edition:"Redagavimas",geoform:{caption:"Erdvinės informacijos duomenų pristatymo forma",atlas:"Atlasas",audio:"Garsas",diagram:"Diagrama",sDocument:"Dokumentas",globe:"Gaublys",map:"Žemėlapis",model:"Modelis",multiMediaPresentation:"Įvairialypės terpės pristatymas",profile:"Profilis",rasterDigitalData:"Rastriniai skaitmeniniai duomenys",remoteSensingImage:"Nuotolinio fiksavimo paveikslėlis",section:"Skiltis",spreadsheet:"Skaičiuoklė",tabularDigitalData:"Lentelių skaitmeniniai duomenys",vectorDigitalData:"Vektorių skaitmeniniai duomenys",video:"Vaizdas",view:"Peržiūrėti"},serinfo:{caption:"Serijų informacija",sername:"Serijų pavadinimai",issue:"Leidimo identifikavimas"},pubinfo:{caption:"Publikavimo informacija",pubplace:"Publikavimo vieta",publish:"Publikuotojas"},othercit:"Kita išsami citavimo informacija",onlink:"Internetinis adresas (URL)"},cntinfo:{caption:"Kontaktinė informacija",section:{primary:"Pirminė",phoneAndEmail:"Telefonas ir el. paštas",hoursAndInstructions:"Valandos ir instrukcijos"},cntorgp:{caption:"Pagal organizaciją",cntorg:"Organizacija",cntper:"Asmuo"},cntperp:{caption:"Pagal asmenį",cntper:"Asmuo",cntorg:"Organizacija"},cntpos:"Padėtis",cntaddr:{caption:"Adresas",addrtype:{caption:"Adreso tipas",mailing:"Paštas",physical:"Fizinis",mailingAndPhysical:"Paštas ir fiziniai duomenys"},address:"Adresas",city:"Miestas",state:"Valstija",postal:"Pašto kodas",country:"Šalis"},cntvoice:"Balso paštas",cnttdd:"TDD / TTY telefonas (turintiems klausos negalią)",cntfax:"Faksas",cntemail:"El. pašto adresas",hours:"Valandos",cntinst:"Instrukcijos"},dataqual:{caption:"Duomenų kokybės informacija",section:{attributeAccuracy:"Atributų tikslumas",logicalConsistency:"Loginis nuoseklumas",completeness:"Išsamumas",positionalAccuracy:"Pozicijos tikslumas",lineage:"Kilmė",cloudCover:"Debesies padengimas"},attracc:{caption:"Atributų tikslumas",attraccr:"Atributų tikslumo ataskaita",qattracc:{caption:"Kiekybinis atributų tikslumo įvertinimas",attraccv:"Atributų tikslumo reikšmė",attracce:"Atributų tikslumo paaiškinimas"}},logic:"Loginio nuoseklumo ataskaita",complete:"Išsamumo ataskaita",posacc:"Pozicijos tikslumas",horizpa:{caption:"Horizontalios pozicijos tikslumas",horizpar:"Horizontalios pozicijos tikslumo ataskaita",qhorizpa:{caption:"Kiekybinis horizontalios pozicijos tikslumo įvertinimas",horizpav:"Horizontalios pozicijos tikslumo reikšmė",horizpae:"Horizontalios pozicijos tikslumo paaiškinimas"}},vertacc:{caption:"Vertikalios pozicijos tikslumas",vertaccr:"Vertikalios pozicijos tikslumo ataskaita",qvertpa:{caption:"Kiekybinis vertikalios pozicijos tikslumo įvertinimas",vertaccv:"Vertikalios pozicijos tikslumo reikšmė",vertacce:"Vertikalios pozicijos tikslumo paaiškinimas"}},lineage:{caption:"Kilmė"},srcinfo:{caption:"Šaltinio informacija",srccite:"Šaltinio citavimas",srcscale:"Šaltinio mastelio daliklis",typesrc:{caption:"Šaltinio laikmenos tipas",paper:"Popierius",stableBaseMaterial:"Stabilaus pagrindo medžiaga",microfiche:"Mikrofiša",microfilm:"Mikrofilmas",audiocassette:"Garso kasetė",chart:"Diagrama",filmstrip:"Filmo juosta",transparency:"Permatomumas",videocassette:"Vaizdo kasetė",videodisc:"Vaizdo diskas",videotape:"Vaizdo juosta",physicalModel:"Fizinis modelis",computerProgram:"Kompiuterinė programa",disc:"Diskas",cartridgeTape:"Kasetės juosta",magneticTape:"Magnetinė juosta",online:"Prisijungta",cdrom:"CD-ROM",electronicBulletinBoard:"Elektroninė skelbimų lenta",electronicMailSystem:"Elektroninio pašto sistema"},srctime:"Šaltinio turinio laikotarpis",srccurr:"Šaltinio dabartinės vietos nuoroda",srccitea:"Šaltinio citavimo sutrumpinimas",srccontr:"Šaltinio veikla"},procstep:{caption:"Proceso žingsnis",procdesc:"Proceso aprašas",srcused:"Šaltinis, naudojamas citavimo sutrumpinimui",procdate:"Proceso data",proctime:"Proceso laikas",srcprod:"Šaltinio pateiktas citavimo sutrumpinimas",proccont:"Proceso kontaktas"},cloud:"Debesies padengimas"},distinfo:{caption:"Platinimo informacija",section:{distributor:"Platintojas",description:"Aprašas",orderProcess:"Užsakymo procesas",prerequisites:"Reikalingi komponentai",availability:"Prieinamumas"},distrib:"Platintojas",resdesc:{caption:"Išteklių aprašas",liveData:"Tiesioginiai duomenys ir žemėlapiai",downloadableData:"Atsisiunčiami duomenys",offlineData:"Duomenys neprisijungus",staticMapImages:"Statiniai žemėlapio vaizdai",sDocument:"Kiti dokumentai",application:"Aplikacijos",geographicService:"Geografinės paslaugos",clearingHouse:"Atsiskaitymų rūmai",mapFiles:"Žemėlapių failai",geographicActivies:"Geografinė veikla"},distliab:"Platinimo atsakomybės tvirtinimas",custom:"Adaptuotas užsakymo procesas",techpreq:"Techniniai reikalingi komponentai",availabl:"Prieinamumas"},eainfo:{caption:"Subjektas ir atributinė informacija",overview:"Apžvalgos aprašas",eaover:"Subjektas ir atributų apžvalga",eadetcit:"Subjektas ir išsamus atributų citavimas"},idinfo:{caption:"Identifikavimo informacija",section:{timeAndStatus:"Laikas ir būsena",constraints:"Apribojimai",contact:"Kontaktas",additional:"Papildoma"},citeinfo:"Citavimas",descript:{caption:"Aprašas",sAbstract:"Abstraktus",purpose:"Paskirtis",supplinf:"Papildoma informacija"},timeperd:{caption:"Turinio laikotarpis",current:{caption:"Dabartinės vietos nuoroda",groundCondition:"Žemės sąlyga",publicationDate:"Publikavimo data"}},status:{caption:"Būsena",progress:{caption:"Eiga",complete:"Pilnas",inWork:"Veikia",planned:"Suplanuota"},update:{caption:"Priežiūros ir atnaujinimų dažnis",continual:"Nuolatinis",daily:"Kasdien",weekly:"Kas savaitę",monthly:"Kas mėnesį",annually:"Kasmet",unknown:"Nežinomas",asNeeded:"Kai reikia",irregular:"Nereguliarus",nonePlanned:"Neplanuotas"}},spdom:{caption:"Aprėptis",bounding:{caption:"Ribų koordinatės",westbc:"Ilgumos vakarinė riba",eastbc:"Ilgumos rytinė riba",northbc:"Platumos šiaurinė riba",southbc:"Platumos pietinė riba"}},keywords:{caption:"Raktažodžiai",theme:"Apipavidalinimas",place:"Padėtis",stratum:"Sluoksnis",temporal:"Laiko",thesaursus:"Susijęs žodynas",delimited:"Raktažodžiai",themektIsoTopicCategory:"ISO tema...",themektIsoTopicDialog:"ISO tema",placektGnis:"Geografinių pavadinimų informacijos sistema"},accconst:"Prieigos apribojimai",useconst:"Naudojimo apribojimai",ptcontac:"Ištekliaus kontakto taškas",browse:{caption:"Naršymo grafika",browsen:"Naršymo grafikos URL",browsed:"Naršymo grafikos failo aprašas",browset:"Naršymo grafikos failo tipas"},datacred:"Duomenų rinkinio kreditas",secinfo:{caption:"Saugos informacija",secsys:"Saugos klasifikavimo sistema",secclass:{caption:"Saugos klasifikavimas",topSecret:"Ypač slapta",secret:"Slapta",confidential:"Konfidencialu",restricted:"Apribota",unclassified:"Neklasifikuota",sensitive:"Įslaptinta"},sechandl:"Saugaus apdorojimo aprašas"},sNative:"Savų duomenų rinkinio aplinka",crossref:"Kryžminė nuoroda"},metadata:{idinfo:"Identifikavimas",dataqual:"Kokybė",spdoinfo:"Erdvinių duomenų struktūra",spref:"Koordinačių sistema",eainfo:"Subjektas ir atributas",distinfo:"Platinimas",metainfo:"Metaduomenys"},metainfo:{caption:"Metaduomenų informacija",section:{dates:"Metaduomenų datos",contact:"Metaduomenų kontaktas",standard:"Metaduomenų standartas",additional:"Papildoma"},metd:"Metaduomenų data",metrd:"Metaduomenų peržiūros data",metfrd:"Metaduomenų būsimos peržiūros data",metstdn:"Metaduomenų standarto pavadinimas",metstdv:"Metaduomenų standarto versija",metac:"Metaduomenų prieigos apribojimai",metuc:"Metaduomenų naudojimo apribojimai",metsi:{caption:"Metaduomenų saugos informacija",metscs:"Metaduomenų saugos klasifikavimo sistema",metsc:"Metaduomenų saugos klasifikavimas",metshd:"Metaduomenų saugaus apdorojimo aprašas"}},spref:{caption:"Erdvinių charakteristikų aprašas",horizsys:{caption:"Horizontali koordinačių sistema",geograph:{caption:"Geografinis",latres:"Platumos raiška",longres:"Ilgumos raiška",geogunit:{caption:"Geografinių koordinačių vienetai",decimalDegrees:"Dešimtainiai laipsniai",decimalMinutes:"Dešimtainės minutės",decimalSeconds:"Dešimtainės sekundės",degreesAndDecimalMinutes:"Laipsniai ir dešimtainės minutės",degreesMinutesAndDecimalSeconds:"Laipsniai, minutės ir dešimtainės sekundės",radians:"Radianai",grads:"Laipsniai"}},planar:{caption:"Plokščiasis"},local:{caption:"Vietinis",localdes:"Vietos aprašas",localgeo:"Vietos geografinė informacija"},geodetic:{caption:"Geodezinis modelis",horizdn:{caption:"Horizontalės duomenų pavadinimas",nad83:"Šiaurės Amerikos duomenys nuo 1983 m.",nad27:"Šiaurės Amerikos duomenys nuo 1927 m."},ellips:{caption:"Elipsoido pavadinimas",grs80:"Geodezinių nuorodų sistema 80",clarke1866:"Klarkas 1866"},semiaxis:"Vidutinio dydžio ašis",denflat:"Plokštumos proporcijos daliklis"}},vertdef:{caption:"Vertikali koordinačių sistema",altsys:{caption:"Aukščio sistema",altdatum:{caption:"Aukščio duomenų pavadinimas",navd88:"Šiaurės Amerikos vertikalės duomenys nuo 1988 m.",ngvd29:"Nacionaliniai geodeziniai vertikalės duomenys nuo 1929 m."},altres:"Aukščio raiška",altunits:{caption:"Aukščio atstumo vienetai",meters:"Metrai",feet:"Pėdos"},altenc:{caption:"Aukščio kodavimo metodas",explicit:"Aiški aukščio koordinatė įtraukta į horizontalias koordinates",implicit:"Numanoma koordinatė",attribute:"Atributų reikšmės"}},depthsys:{caption:"Gylio sistema",depthdn:{caption:"Gylio duomenų pavadinimas",option1:"Vietos paviršius",option2:"Diagramos duomenys; garso sumažinimo duomenys",option3:"Žemiausias astronominio potvynio lygis",option4:"Aukščiausias astronominio potvynio lygis",option5:"Vidutinis vandens atoslūgis",option6:"Vidutinis vandens potvynis",option7:"Vidutinis jūros lygis",option8:"Žemės tyrimo duomenys",option9:"Vidutinis siziginis vandens atoslūgis",option10:"Vidutinis siziginis vandens potvynis",option11:"Vidutinis kvadratūrinis vandens atoslūgis",option12:"Vidutinis kvadratūrinis vandens potvynis",option13:"Vidutinis žemiausias vandens atoslūgio lygis",option14:"Vidutinis žemiausias siziginio vandens atoslūgio lygis",option15:"Vidutinis aukščiausias vandens potvynio lygis",option16:"Vidutinis aukščiausias vandens atoslūgio lygis",option17:"Vidutinis žemiausias vandens potvynio lygis",option18:"Siziginis potvynis ir atoslūgis",option19:"Žemiausias tropinio atoslūgio vandens lygis",option20:"Kvadratūrinis potvynis ir atoslūgis",option21:"Vandens potvynis",option22:"Aukščiausias vandens potvynio lygis",option23:"Vandens atoslūgis",option24:"Vandens atoslūgio duomenys",option25:"Žemiausias vandens atoslūgio lygis",option26:"Žemesnis vandens atoslūgio lygis",option27:"Žemiausias įprastas vandens atoslūgio lygis",option28:"Vidutinis potvynio ir atoslūgio lygis",option29:"Indijos vandenyno siziginis vandens atoslūgis",option30:"Vandens potvynis – visas ir augantis",option31:"Vandens atoslūgis – visas ir krintantis",option32:"Kolumbijos upės duomenys",option33:"Įlankos pakrantės vandens atoslūgio duomenys",option34:"Pusiaujo siziginis vandens atoslūgis",option35:"Vidutinis žemiausio lygio astronominis potvynis ir atoslūgis",option36:"Be pataisymų"},depthres:"Gylio raiška",depthdu:{caption:"Gylio atstumo vienetai",meters:"Metrai",feet:"Pėdos"},depthem:{caption:"Gylio kodavimo metodas",explicit:"Aiški gylio koordinatė įtraukta į horizontalias koordinates",implicit:"Numanoma koordinatė",attribute:"Atributų reikšmės"}}}},timeinfo:{caption:"Laikotarpio informacija",sngdate:"Viena data",mdattim:"Kelios datos",rngdates:"Datų intervalas",caldate:"Data",time:"Laikas",begdate:"Pradžios data",begtime:"Pradžios laikas",enddate:"Pabaigos data",endtime:"Pabaigos laikas"}});