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

define({documentTypes:{arcgis:{caption:"ArcGIS मेटाडेटा",editorCaption:"मेटाडेटा",description:""}},emptyOption:"रिक्त",conditionals:{ISO19139A1_ROW4:"यदि मेटाडेटा पदक्रम स्तर डेटासेट है, तो एक भूगोलिक सीमक बॉक्स या भूगोलिक विवरण की आवश्यकता है.",ISO19139A1_ROW6:"एक डेटासेट पहचानकर्ता या डेटासेट नाम की आवश्यकता है.",ISO19139A1_ROW7:"यदि अन्य प्रतिबन्ध चुने गए हैं, तो बाध्यताओं की आवश्यकता है.",ISO19139A1_ROW9:"यदि स्कोप डेटासेट या क्रम नहीं है, तो एक स्तर विवरण की आवश्यकता है.",ISO19139A1_ROW10_11_12:"यदि स्कोप डेटासेट या क्रम है; कथन, प्रक्रिया चरण, या डेटा स्रोत में से एक की आवश्यकता है.",ISO19139A1_ROW15:"यदि जाँच बिंदु उपलब्धता चुनी जाती है, तो जाँच बिंदु विवरण की आवश्यकता है.",ISO19139A1_ROW18:"यदि वितरण को डॉक्यूमेंट किया गया है, तो एक फॉर्मेट या वितरक/फॉर्मेट की आवश्यकता है.",INSPIRE_AccessLimitation:" कम से कम एक कानूनी पहुँच बाध्यता कोड या सुरक्षा वर्गीकरण कोड की आवश्यकता है. (INSPIRE)",INSPIRE_UseLimitation:" कम से कम एक उपयोग प्रतिबन्ध की आवश्यकता है. (INSPIRE)",INSPIRE_ConformanceResult:"एक डोमेन समानता रिपोर्ट को अनुरूपता परिणाम की आवश्यकता है. (INSPIRE)",INSPIRE_DomainConsistency:"एक डोमेन समानता रिपोर्ट की आवश्यकता है. (INSPIRE)",INSPIRE_LineageStatement:"यदि स्कोप डेटासेट या क्रम है, तो एक वंशावली कथन की आवश्यकता है (INSPIRE).",FGDC_DescIfTemporal:"अस्थायी एक्सटेंट के लिए एक विवरण की आवश्यकता है. (FGDC)",FGDC_Keywords:"एक विषय, टैग या शैली कीवर्ड की आवश्यकता है. (FGDC)",FGDC_Reports:"पूर्णता हटाना और वैचारिक समानता रिपोर्ट्स की आवश्यकता है. (FGDC)",FGDC_Temporal:"कम से कम एक अस्थायी एक्सटेंट की आवश्यकता है. (FGDC)",NAP_Contact:"एक पता/प्रतिपादन बिंदु, फ़ोन/वॉयस नंबर या ऑनलाइन संसाधन/URL की आवश्यकता है. (NAP)",GEN_BoundingBox:"कम से कम एक भूगोलिक सीमक बॉक्स की आवश्यकता है.",GEN_ReportResult:"एक अनुरूपता या मात्रात्मक परिणाम की आवश्यकता है.",minLessThanMax:"न्यूनतम मान को अधिकतम मान से कम होना चाहिए."},hints:{integerGreaterThanZero:"(0 से बड़ा कोई पूर्णांक डालें)",integerGreaterThanOne:"(1 से बड़ा कोई पूर्णांक डालें)",integer0To100:"(0..100 कोई पूर्णांक डालें)",maxScale:"(0 से बड़ा कोई पूर्णांक डालें, जैसे कि 50000)",minScale:"(0 से बड़ा कोई पूर्णांक डालें, जैसे कि 150000000)",number0To100:"(0..100 कोई संख्या डालें)",number0To360:"(0..360 कोई संख्या डालें)",number90To90:"(-90..90 कोई संख्या डालें)",listOfDoubles:"(संख्याओं की एक सूची डालें, अलग करने के लिए स्पेस का उपयोग करें)"},htmlEditor:{button:"संपादित करें..."},sections:{overview:"रूपरेखा",esri:"Esri",resource:"संसाधन",reference:"संदर्भ",content:"सामग्री",distribution:"वितरण",quality:"गुणवत्ता के लिए",eainfo:"क्षेत्र",representation:"निरूपण",metadata:"मेटाडेटा"},metadataStyle:{caption:"ArcGIS मेटाडेटा शैली",changeButton:"बदलें...",dialogTitle:"एक मेटाडेटा शैली चुनें",updating:"डॉक्यूमेंट अपडेट किया जा रहा है...","Item Description":"आइटम विवरण","FGDC CSDGM Metadata":"FGDC CSDGM मेटाडेटा","ISO 19139 Metadata Implementation Specification":"ISO 19139 मेटाडेटा कार्यान्वयन विनिर्देश","ISO 19139 Metadata Implementation Specification GML3.2":"ISO 19139 मेटाडेटा कार्यान्वयन विनिर्देश GML3.2","INSPIRE Metadata Directive":"INSPIRE मेटाडेटा आदेश","North American Profile of ISO19115 2003":"ISO19115 2003 का उत्तर अमेरिकी प्रोफाइल"},aggrInfo:{caption:"पूर्णयोग जानकारी",datasetHint:"एक डेटासेट पहचानकर्ता या डेटासेट नाम की आवश्यकता है.",aggrDSIdent:"डेटासेट पहचानकर्ता",aggrDSName:"डेटासेट नाम"},appSchInfo:{caption:"एप्लीकेशन रूपरेखा",asName:"रूपरेखा नाम",asSchLang:"रूपरेखा भाषा",asCstLang:"बाध्यता भाषा",asAscii:"ASCII",asGraFile:"ग्राफ़िक्स फाइल",asGraFile_src:"ग्राफ़िक्स फाइल स्रोत",asSwDevFile:"सॉफ्टवेर डेवलपमेंट फाइल",asSwDevFile_src:"सॉफ्टवेर डेवलपमेंट फाइल स्रोत",asSwDevFiFt:"सॉफ्टवेर डेवलपमेंट फाइल प्रारूप"},citation:{caption:"उद्धरण",section:{titlesAndDates:"शीर्षक और तिथियाँ",links:"URLs",identifiers:"पहचानकर्ता",presentation:"फॉर्म",other:"अन्य",edition:"संस्करण",series:"क्रम"},conditionalDate:{caption:"उद्धरण तिथि",msg:"निर्माण तिथि, प्रकाशन तिथि या पुनरीक्षण तिथि में से एक की आवश्यकता है.",msg_nap:"एक उद्धरण तिथि की आवश्यकता है."},resTitle:"शीर्षक",resAltTitle:"वैकल्पिक शीर्षक",collTitle:"सामूहिक शीर्षक",date:{createDate:"निर्माण तिथि",pubDate:"प्रकाशन तिथि",reviseDate:"पुनरीक्षण तिथि",notavailDate:"उपलब्ध नहीं तिथि",inforceDate:"लागू की तिथि",adoptDate:"अंगीकृत तिथि",deprecDate:"अवमानित किए जाने की तिथि",supersDate:"प्रतिस्थापित तिथि"},isbn:"ISBN",issn:"ISSN",citId:{caption:"पहचानकर्ता",identCode:"कोड",identAuth:"प्राधिकरण उद्धरण"},resEd:"संस्करण",resEdDate:"संस्करण तिथि",datasetSeries:{seriesName:"नाम",issId:"इशू",artPage:"पृष्ठ"},otherCitDet:"अन्य विवरण",contactCaption:"उद्धरण संपर्क"},cntAddress:{caption:"पता",delPoint:"प्रतिपादन बिंदु",city:"शहर",adminArea:"प्रशासकीय क्षेत्र",postCode:"डाक कोड",country:"देश",eMailAdd:"ईमेल",addressType:{caption:"पता प्रकार",postal:"डाक-संबंधी",physical:"भौतिक",both:"दोनों"}},cntOnlineRes:{caption:"ऑनलाइन संसाधन",linkage:"URL",protocol:"प्रोटोकॉल",appProfile:"ऐप्लिकेशन प्रोफाइल",orName:"नाम",orDesc:"विवरण"},cntPhone:{caption:"फ़ोन",voiceNum:"वॉयस",faxNum:"फैक्स",tddtty:"TDD/TTY?"},codeRef:{caption:"पहचानकर्ता",identCode:"कोड",idCodeSpace:"कोड स्पेस",idVersion:"संस्करण",identAuth:"प्राधिकरण उद्धरण"},constraints:{caption:"बाध्यताएँ",useLimit:"सीमाओं का उपयोग करें",general:{caption:"सामान्य"},legal:{caption:"कानूनी",accessConsts:"पहुँच बाध्यताएँ",useConsts:"उपयोग बाध्यताएँ",othConsts:"अन्य बाध्यताएँ"},security:{caption:"सुरक्षा",classSys:"वर्गीकरण प्रणाली",userNote:"उपयोगकर्ता टिप्पणी",handDesc:"संभलाई विवरण"}},contInfo:{caption:"सामग्री जानकारी",section:{CovDesc:"कवरेज विवरण",ImgDesc:"चित्र विवरण",FetCatDesc:"फीचर कैटलॉग"},attDesc:"विशेषता विवरण",covDim:{caption:"सीमा या बैंड",seqID:"अनुक्रम पहचानकर्ता",seqIDType:"अनुक्रम पहचानकर्ता प्रकार",dimDescrp:"वर्णनकर्ता"},RangeDim:{caption:"सीमा आयाम"},Band:{caption:"बैंड",minVal:"न्यूनतम मान",maxVal:"अधिकतम मान",valUnit:"मान इकाइयाँ",pkResp:"चरम प्रतिक्रिया",bitsPerVal:"बिट्स प्रति मान",toneGrad:"टोन वर्गीकरण",sclFac:"स्केल कारक",offset:"ऑफसेट"},CovDesc:{caption:"कवरेज विवरण",section:{description:"विवरण",rangesAndBands:"सीमा और बैंड"}},ImgDesc:{caption:"चित्र विवरण",section:{description:"विवरण",rangesAndBands:"सीमा और बैंड"},illElevAng:"इल्यूमिनेशन उन्नयन कोण",illAziAng:"इल्यूमिनेशन दिगंश कोण",cloudCovPer:"क्लाउड कवर प्रतिशत",cmpGenQuan:"संकुचन गुणवत्ता",trianInd:"ट्रायंगुलेशन संकेतक?",radCalDatAv:"रेडियोमेट्रिक कैलिब्रेशन डेटा उपलब्धता?",camCalInAv:"कैमरा कैलिब्रेशन जानकारी उपलब्धता?",filmDistInAv:"फिल्म विरूपण जानकारी उपलब्धता?",lensDistInAv:"लेंस विरूपण जानकारी उपलब्धता?",imagQuCode:"गुणवत्ता कोड",prcTypCde:"प्रोसेसिंग स्तर कोड"},FetCatDesc:{caption:"फीचर कैटलॉग",section:{description:"विवरण",featureTypes:"फ़ीचर प्रकार",citation:"उद्धरण"},compCode:"ISO 19110 का अनुपालन करता है?",incWithDS:"Included With Dataset?",catCitation:"फीचर कैटलॉग उद्धरण",catFetTyps:{caption:"फ़ीचर प्रकार",genericName:"नाम",codeSpace:"कोड स्पेस"}}},contact:{caption:"संपर्क",section:{name:"संपर्क नाम",info:"संपर्क सूचना",hoursAndInstructions:"घंटे और निर्देश"},conditionalName:{caption:"संपर्क नाम",msg:"व्यक्ति नाम, संगठन नाम, या पद नाम में से एक की आवश्यकता है.",msg_fgdc:"व्यक्ति नाम या संगठन नाम में से एक की आवश्यकता है."},rpIndName:"व्यक्ति का नाम",rpOrgName:"संगठन का नाम",rpPosName:"पद नाम",rpCntInfo:"संपर्क सूचना",cntHours:"सेवा घंटे",cntInstr:"संपर्क दिशानिर्देश"},distInfo:{caption:"वितरण जानकारी",section:{format:"फॉर्मेट",distributor:"वितरक",transfer:"स्थानांतरण विकल्प"},distFormat:{caption:"वितरण फॉर्मेट",formatName:"फॉर्मेट नाम",formatVer:"फॉर्मेट संस्करण",formatAmdNum:"संशोधन संख्या",formatSpec:"विनिर्देश",fileDecmTech:"असंपीडन तकनीक",formatInfo:"जानकारी सामग्री"},distributor:{caption:"वितरक"},distTranOps:{caption:"डिजिटल स्थानांतरण विकल्प",section:{unitsAndSize:"इकाइयाँ"},unitsODist:"वितरण की इकाइयाँ",transSize:"स्थानांतरण आकार",offLineMed:{caption:"ऑफलाइन माध्यम",medDensity:"घनत्व",medDenUnits:"घनत्व इकाइयाँ",medVol:"मात्रा",medNote:"माध्यम नोट"}},distorOrdPrc:{caption:"आदेश देने की प्रक्रिया",resFees:"शुल्क",planAvDtTm:"उपलब्ध तिथि",planAvTmPd:{caption:"उपलब्ध तिथि अवधि",tmBegin:"आरंभ तिथि/समय",tmEnd:"समाप्ति तिथि/समय"},ordInstr:"आदेश देने के निर्देश",ordTurn:"टर्नअराउंड"}},dqInfo:{caption:"डेटा गुणवत्ता",section:{scope:"विस्तार",report:"रिपोर्ट",lineage:"वंशावली"},dqScope:{section:{level:"स्तर",extent:"एक्सटेंट"},scpLvl:"विस्तार स्तर",scpLvlDesc:"स्तर विवरण",scpExt:"विस्तार एक्सटेंट"},report:{section:{measure:"माप",evaluation:"मूल्यांकन",result:"परिणाम",conformance:"अनुरूपता"},measDesc:"माप विवरण",measName:"माप नाम",measDateTm:"माप तिथि",measId:"माप पहचानकर्ता",evalMethDesc:"मूल्यांकन विधि",evalProc:"कार्यपद्धति उद्धरण",ConResult:{caption:"अनुरूपता परिणाम",conExpl:"स्पष्टीकरण",conSpec:"विनिर्देश",conPass:{caption:"डिग्री",_1:"अनुरूप",_0:"गैर अनुरूप"}},QuanResult:{caption:"मात्रात्मक परिणाम",quanVal:"मान",quanValType:"मान प्रकार",quanValUnit:"मान इकाइयाँ",errStat:"त्रुटि सांख्यिकी"}},dataLineage:{section:{statement:"कथन",dataSource:"डेटा स्रोत",prcStep:"प्रक्रिया चरण"},statement:"वंशावली कथन",dataSource:{caption:"डेटा स्रोत",section:{description:"विवरण",srcRefSys:"संदर्भ प्रणाली",srcExt:"एक्सटेंट",srcCitatn:"उद्धरण"},srcDesc:"स्रोत विवरण",srcScale:{rfDenom:"स्केल हर"},srcRefSys:"स्रोत संदर्भ प्रणाली",srcExt:"स्रोत एक्सटेंट",srcCitatn:"स्रोत उद्धरण"},prcStep:{caption:"प्रक्रिया चरण",section:{description:"विवरण",stepProc:"प्रोसेसर",stepSrc:"डेटा स्रोत"},stepDesc:"प्रक्रिया विवरण",stepRat:"औचित्य",stepDateTm:"प्रक्रिया चरण तिथि",stepProc:"प्रोसेसर",stepSrc:"डेटा स्रोत"}}},eainfo:{caption:"वस्तु और विशेषता जानकारी",section:{detailed:"विवरण",overview:"रूपरेखा"},detailed:{caption:"वस्तु और विशेषता विवरण",section:{enttyp:"वस्तु",attr:"विशेषताएँ"},enttyp:{caption:"वस्तु प्रकार",enttypl:"लेबल",enttypt:"वस्तु",enttypc:"संख्या",enttypd:"परिभाषा",enttypds:"परिभाषा स्रोत"},attr:{caption:"विशेषता",section:{description:"विवरण",value:"मान",domain:"डोमेन"},attrlabl:"लेबल",attalias:"उपनाम",attrdef:"परिभाषा",attrdefs:"परिभाषा स्रोत",attrtype:"प्रकार",attwidth:"चौड़ाई",atprecis:"सटीकता",attscale:"स्केल",atindex:"इंडेक्स किया हुआ",attrvai:{attrva:"मान स्पष्टीकरण",attrvae:"मान सटीकता"},attrmfrq:"मान माप आवृति",begdatea:"मानों की आरंभ तिथि",enddatea:"मानों की समाप्ति तिथि",attrdomv:{caption:"डोमेन",edom:{caption:"गिने गए",edomv:"मान",edomvd:"परिभाषा",edomvds:"परिभाषा स्रोत"},rdom:{caption:"सीमा",rdommin:"न्यूनतम मान",rdommax:"अधिकतम मान",rdommean:"माध्य",rdomstdv:"मानक विचलन",attrunit:"इकाइयाँ",attrmres:"माप रिजल्यूशन"},codesetd:{caption:"कोडसेट",codesetn:"नाम",codesets:"स्रोत"},udom:{caption:"निरूपण के अयोग्य"}}}},overview:{caption:"रूपरेखा",eaover:"सार",eadetcit:"उद्धरण"}},extent:{caption:"एक्सटेंट",section:{description:"विवरण",geographic:"भूगोलिक",temporal:"अस्थायी",vertical:"लंबवत"},exDesc:"एक्सटेंट विवरण",geoEle:{caption:"भूगोलिक एक्सटेंट",GeoBndBox:{caption:"सीमक बॉक्स",esriExtentType:"एक्सटेंट खोज के लिए है?",exTypeCode:"एक्सटेंट में संसाधन शामिल है?",westBL:"पश्चिम सीमक देशांतर",eastBL:"पूर्व सीमक देशांतर",southBL:"दक्षिण सीमक अक्षांश",northBL:"उत्तर सीमक अक्षांश"},GeoDesc:{caption:"भूगोलिक विवरण",exTypeCode:"विवरण में संसाधन शामिल है?",identCode:"कोड"}},tempEle:{caption:"अस्थायी एक्सटेंट",TM_Period:"समय अवधि",TM_Instant:"समय घटना",tmPosition:"तिथि",tmBegin:"आरंभ तिथि",tmEnd:"समाप्ति तिथि"},vertEle:{caption:"लंबवत एक्सटेंट",vertMinVal:"न्यूनतम मान",vertMaxVal:"अधिकतम मान"}},graphOver:{caption:"ग्राफ़िक ब्राउज़ करें",bgFileName:"ग्राफ़िक URL ब्राउज़ करें",bgFileDesc:"ग्राफ़िक विवरण ब्राउज़ करें",bgFileType:"ग्राफ़िक फाइल प्रकार ब्राउज़ करें"},keywords:{caption:"कीवर्ड्स",section:{topicCategory:"विषय",searchKeys:"टैग्स",themeKeys:"शैली",placeKeys:"स्थान",tempKeys:"अस्थायी",discKeys:"अनुशासन",stratKeys:"परत",productKeys:"उत्पाद",subTopicCatKeys:"उपविषय",otherKeys:"अन्य"},delimited:"कीवर्ड्स",searchKeys:"टैग्स",themeKeys:"थीम कीवर्ड्स",placeKeys:"स्थान कीवर्ड्स",tempKeys:"अस्थायी कीवर्ड्स",discKeys:"अनुशासन कीवर्ड्स",stratKeys:"परत कीवर्ड्स",productKeys:"उत्पाद कीवर्ड्स",subTopicCatKeys:"उपविषय कीवर्ड्स",otherKeys:"अन्य कीवर्ड्स",thesaName:"ज्ञानकोष उद्धरण",thesaLang:"ज्ञानकोष भाषा"},locales:{caption:"स्थान",locale:"स्थान",resTitle:"शीर्षक",idAbs:"सार"},maintenance:{caption:"रखरखाव",section:{frequency:"आवृति",scope:"विस्तार",note:"नोट"},usrDefFreq:"कस्टम आवृति",dateNext:"अगला अपडेट",maintScp:"विस्तार अपडेट करें",upScpDesc:{caption:"विस्तार विवरण",attribSet:"विशेषताएँ",attribIntSet:"विशेषता उदाहरण",featSet:"फ़ीचर्स",featIntSet:"फ़ीचर्स उदाहरण",datasetSet:"डेटासेट",other:"अन्य उदाहरण"},maintNote:"देखरेख नोट",maintCont:"देखरेख संपर्क"},metadata:{section:{profile:"प्रोफ़ाइल",details:"विस्तार"},mdFileID:"फाइल पहचानकर्ता",mdParentID:"मूल पहचानकर्ता",datasetURI:"डेटासेट URI",dataSetFn:"डेटासेट फंक्शन",mdDateSt:"मेटाडेटा तिथि",mdLang:"मेटाडेटा भाषा",mdChar:"वर्ण समूह",mdHrLv:"पदक्रम स्तर",mdHrLvName:"पदक्रम स्तर नाम",mdContact:"मेटाडेटा संपर्क",mdMaint:"मेटाडेटा देखरेख",mdConst:"मेटाडेटा बाध्यताएँ"},porCatInfo:{caption:"पोर्ट्रयल उद्धरण"},refSysInfo:{caption:"स्थानिक संदर्भ"},resource:{section:{citation:"उद्धरण",details:"विवरण",description:"विवरण",keywords:"कीवर्ड्स",status:"स्थिति",resolution:"रिजल्यूशन",representation:"निरूपण",browse:"ग्राफ़िक ब्राउज़ करें",format:"फॉर्मेट",usage:"उपयोग",aggregateInfo:"एकत्रीकरण",additional:"अतिरिक्त"},idAbs:"विवरण (सार)",idPurp:"सारांश (उद्देश्य)",suppInfo:"पूरक जानकारी",idCredit:"क्रेडिट्स",envirDesc:"प्रस‌ंस्करण परिवेश",dataLang:"संसाधन भाषा",dataExt:"संसाधन एक्सटेंट",idPoC:"संपर्क बिंदु",resMaint:"संसाधन देखरेख",resConst:"संसाधन बाध्यताएँ",dsFormat:"संसाधन फॉर्मेट",dataScale:{caption:"डेटा स्केल",equScale:"स्केल रिजल्यूशन",scaleDist:"दूरी रिजल्यूशन",scaleDist_value:"दूरी"},idSpecUse:{caption:"संसाधन उपयोग",specUsage:"विशिष्ट उपयोग",usageDate:"उपयोग तिथि",usrDetLim:"प्रतिबन्ध",usrCntInfo:"उपयोग संपर्क"}},service:{caption:"सेवा",svType:"सेवा प्रकार",svType_Name:"नाम",svAccProps:"पहुँच गुण",svCouplRes:{caption:"युग्मित संसाधन",svOpName:"परिचालन नाम",svResCitId:"संसाधन पहचानकर्ता"},svCoupleType:"युग्मन प्रकार"},scaleRange:{caption:"स्केल सीमा",maxScale:"अधिकतम स्केल",minScale:"न्यूनतम स्केल"},spatRepInfo:{caption:"स्थानिक प्रस्तुतीकरण",section:{dimension:"आयाम",parameters:"प्राचल"},numDims:"आयामों की संख्या",tranParaAv:"रूपांतरण प्राचल उपलब्धता?",axisDimension:{caption:"आयाम",dimSize:"आकार",dimResol:{caption:"रिजल्यूशन",_value:"रिजल्यूशन मान",uom:"रिजल्यूशन इकाइयाँ"}},VectSpatRep:{caption:"वेक्टर",geometObjs:"ज्यामितीय ऑब्जेक्ट्स",geoObjCnt:"ऑब्जेक्ट संख्या"},GridSpatRep:{caption:"ग्रिड"},Georect:{caption:"जियोरेक्टीफाइड",section:{centerPoint:"केंद्र बिंदु",cornerPts:"कोने के बिंदु"},chkPtAv:"जाँच बिंदु उपलब्धता?",chkPtDesc:"जाँच बिंदु विवरण",ptInPixel:"पिक्सेल में बिंदु",transDimDesc:"रूपांतरण आयाम विवरण",transDimMap:"रूपांतरण आयाम मैपिंग",cornerPts:{caption:"कोने का बिंदु",pos:"पद",gmlDesc:"विवरण",gmlDescRef:"संदर्भ",gmlIdent:"पहचानकर्ता",codeSpace:"पहचानकर्ता कोडस्पेस"}},Georef:{caption:"Georeferenceable",ctrlPtAv:"नियंत्रण बिंदु उपलब्धता?",orieParaAv:"अभिविन्यास प्राचल उपलब्धता?",orieParaDs:"अभिविन्यास प्राचल विवरण",georefPars:"Georeferenced प्राचल",paraCit:"प्राचल उद्धरण"},Indref:{caption:"परोक्ष"}},booleanOptions:{_false:"नहीं",_true:"हाँ"},codelist:{CountryCode:"देश",LanguageCode:"भाषा",MonetaryUnits:"आर्थिक इकाइयाँ",MonetaryUnits_empty:"कोई सार्वभौमिक मुद्रा नहीं",PresentationForm:"FGDC जियोस्पेसियल डेटा प्रस्तुतिकरण फॉर्म",CI_PresentationFormCode:"प्रस्तुतिकरण फॉर्म",CI_RoleCode:"भूमिका",CI_OnLineFunctionCode:"फंक्शन",IMS_ContentType:"सामग्री प्रकार",DQ_ElementDimension:"आयाम",DQ_ElementType:"रिपोर्ट प्रकार",DQ_EvaluationMethodTypeCode:"मूल्यांकन प्रकार",DS_AssociationTypeCode:"संबद्ध प्रकार",DS_InitiativeTypeCode:"पहल प्रकार",LI_SourceType:"स्रोत प्रकार",MD_CellGeometryCode:"सेल ज्यामिति",MD_CharacterSetCode:"वर्ण समूह",MD_ClassificationCode:"वर्गीकरण",MD_CoverageContentTypeCode:"सामग्री प्रकार",MD_DimensionNameTypeCode:"आयाम प्रकार",MD_GeometricObjectTypeCode:"ज्यामितीय ऑब्जेक्ट प्रकार",MD_ImagingConditionCode:"चित्रण स्थिति",MD_MaintenanceFrequenceCode:"अपडेट की आवृति",MD_MediumFormatCode:"फॉर्मेट कोड",MD_MediumNameCode:"माध्यम नाम",MD_PixelOrientationCode:"पिक्सेल अभिविन्यास",MD_ProgressCode:"स्थिति",MD_RestrictionCode:"प्रतिबंध कोड",MD_ScopeCode:"विस्तार",MD_SpatialRepresentationTypeCode:"स्थानिक निरूपण प्रकार",MD_TopicCategoryCode:"विषय वर्ग",MD_TopologyLevelCode:"सांस्थिति स्तर",RS_Dimension:"आयाम",SV_CouplingType:"युग्मन प्रकार",UCUM:"इकाइयाँ",UCUM_Length:"दूरी इकाइयाँ"}});