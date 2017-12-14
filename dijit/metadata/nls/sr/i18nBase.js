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

define({general:{cancel:"Otkaži",close:"Zatvori",none:"Ništa",ok:"U redu",other:"Ostalo",stamp:"Oznaka",now:"Sada",choose:"Odaberite jedno:"},editor:{noMetadata:"Za ovu stavku nema metapodataka.",xmlViewOnly:"Uređivač ne podržava ovaj tip metapodataka povezanih sa ovom stavkom. Metapodaci moraju da budu u ArcGIS formatu.",editorDialog:{caption:"Metapodaci",captionPattern:"Metapodaci za {title}"},primaryToolbar:{view:"Prikaži",viewXml:"Prikaži XML",edit:"Izmeni",initializing:"Učitavanje...",startingEditor:"Pokretanje uređivača...",loadingDocument:"Učitavanje dokumenta...",updatingDocument:"Ažuriranje dokumenta...",generatingView:"Kreiranje prikaza...",errors:{errorGeneratingView:"Došlo je do greške prilikom uvoženja prikaza.",errorLoadingDocument:"Došlo je do greške prilikom učitavanja dokumenta."}},changesNotSaved:{prompt:"Dokument sadrži promene koje nisu sačuvane.",dialogTitle:"Zatvori uređivač metapodataka",closeButton:"Zatvori"},download:{caption:"Preuzmi",dialogTitle:"Preuzmi",prompt:"Kliknite ovde da biste preuzeli datoteku."},load:{caption:"Otvori",dialogTitle:"Otvori",typeTab:"Novi dokument",fileTab:"Otvori datoteku",templateTab:"Šablon",itemTab:"Vaša stavka",filePrompt:"Izaberite lokalnu XML datoteku sa ArcGIS metapodacima. Metapodaci moraju da budu u ArcGIS formatu.",templatePrompt:"Kreiraj metapodatke",pullItem:"Popunite metapodatke detaljima stavke.",importWarning:"Izabrana datoteka izgleda da nije u ArcGIS formatu. Otpremljeni metapodaci moraju da budu u ArcGIS formatu.",loading:"Učitavanje...",noMetadata:"Metapodaci mogu da se kreiraju za ovu stavku biranjem jedne od sledećih opcija.",unrecognizedMetadata:"Uređivač ne podržava ovaj tip metapodataka povezanih sa ovom stavkom. Podržani metapodaci mogu da se kreiraju biranjem jedne od sledećih opcija.",errorLoading:"Došlo je do greške prilikom učitavanja.",warnings:{badFile:"Izabranu datoteku nije moguće učitati.",notAnXml:"Izabrana datoteka nije XML datoteka.",notSupported:"Ovaj tip datoteke nije podržan."}},save:{caption:"Sačuvaj",dialogTitle:"Sačuvaj metapodatke",working:"Čuvanje metapodataka...",errorSaving:"Došlo je do greške, metapodaci nisu sačuvani.",saveDialog:{pushCaption:"Primenite promene na stavku"}},saveAndClose:{caption:"Sačuvaj i zatvori"},saveDraft:{caption:"Sačuvaj lokalnu kopiju",dialogTitle:"Sačuvaj lokalnu kopiju"},validate:{caption:"Proveri validnosti",dialogTitle:"Proveri validnosti",docIsValid:"Dokument je validan."},del:{caption:"Izbriši",dialogTitle:"Izbriši metapodatke",prompt:"Želite li zaista da izbrišete ove metapodatke?",working:"Brisanje metapodataka...",errorDeleting:"Došlo je do greške, metapodaci nisu izbrisani."},transform:{caption:"Transformiši",dialogTitle:"Transformiši u",prompt:"",working:"Transformisanje...",errorTransforming:"Došlo je do greške prilikom transformisanja dokumenta."},errorDialog:{dialogTitle:"Došlo je do greške"}},arcgis:{portal:{metadataButton:{caption:"Metapodaci"}}},calendar:{button:"Kalendar...",title:"Kalendar"},geoExtent:{button:"Postavi geografski obuhvat...",title:"Geografski obuhvat",navigate:"Pronađi",draw:"Nacrtaj pravougaonik",drawHint:"Pritisnite nadole za pokretanje, i otpustite za završetak."},hints:{date:"(gggg ili gggg-mm ili gggg-mm-dd)",dateTime:"(gggg-mm-ddThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(gggg ili gggg-mm ili gggg-mm-dd ili gggg-mm-ddThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(koristite zapetu ili novi red za razdvajanje)",fgdcDate:"(gggg ili gggg-mm ili gggg-mm-dd)",fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(unesite ceo broj)",latitude:"(decimalni stepeni)",longitude:"(decimalni stepeni)",number:"(unesite broj)",numberGreaterThanZero:"(unesite broj > 0)"},isoTopicCategoryCode:{caption:"Kategorija teme",boundaries:"Administrativne i političke granice",farming:"Poljoprivreda i zemljoradnja",climatologyMeteorologyAtmosphere:"Atmosfera i klima",biota:"Biologija i ekologija",economy:"Poslovanje i ekonomija",planningCadastre:"Katastar",society:"Kultura, društvo i demografija",elevation:"Elevacija i izvedeni proizvodi",environment:"Okruženje i konzervacija",structure:"Objekti i strukture",geoscientificInformation:"Geologija i geofizika",health:"Zdravlje i bolesti ljudi",imageryBaseMapsEarthCover:"Snimci i pozadinske mape",inlandWaters:"Vodeni resursi na kopnu",location:"Lokacije i geodetske mreže",intelligenceMilitary:"Vojska",oceans:"Okeani i ušća",transportation:"Transportne mreže",utilitiesCommunication:"Infrastrukturni sistemi i komunikacija"},multiplicity:{moveElementDown:"Premesti odeljak nadole",moveElementUp:"Premesti odeljak nagore",removeElement:"Ukloni odeljak",repeatElement:"Ponovi odeljak"},optionalNode:{switchTip:"Obuhvatite ili izostavite ovaj odeljak."},serviceTypes:{featureService:"Servis geoobjekata",mapService:"Servis mape",imageService:"Servis slike",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} – {message}",patternWithHint:"{label} – {message} {hint}",ok:"U redu",empty:"Vrednost je obavezna.",date:"Vrednost mora da bude datum.",integer:"Vrednost mora da bude ceo broj.",number:"Vrednost mora da bude broj.",other:"Nevažeća vrednost."},validationPane:{clearMessages:"Obriši poruke",prompt:"(kliknite na svaku poruku ispod i unesite potrebne informacije u navedeno polje)"}});