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

define({general:{cancel:"Abbrechen",close:"Schließen",none:"Kein",ok:"OK",other:"Andere",stamp:"Stempel",now:"Jetzt",choose:"Ein Element auswählen:"},editor:{noMetadata:"Für dieses Element sind keine Metadaten vorhanden.",xmlViewOnly:"Der mit diesem Element verknüpfte Metadatentyp wird vom Editor nicht unterstützt. Metadaten müssen im ArcGIS-Format vorliegen.",editorDialog:{caption:"Metadaten",captionPattern:"Metadaten für {title}"},primaryToolbar:{view:"Ansicht",viewXml:"XML anzeigen",edit:"Bearbeiten",initializing:"Wird geladen...",startingEditor:"Editor wird gestartet...",loadingDocument:"Dokument wird geladen...",updatingDocument:"Dokument wird aktualisiert...",generatingView:"Ansicht wird erstellt...",errors:{errorGeneratingView:"Beim Erstellen der Ansicht ist ein Fehler aufgetreten.",errorLoadingDocument:"Beim Laden des Dokuments ist ein Fehler aufgetreten."}},changesNotSaved:{prompt:"Ihr Dokument enthält Änderungen, die nicht gespeichert wurden.",dialogTitle:"Metadateneditor schließen",closeButton:"Schließen"},download:{caption:"Herunterladen",dialogTitle:"Herunterladen",prompt:"Klicken Sie hier, um die Datei herunterladen."},load:{caption:"Öffnen",dialogTitle:"Öffnen",typeTab:"Neues Dokument",fileTab:"Datei öffnen",templateTab:"Eine Vorlage",itemTab:"Ihr Element",filePrompt:"Wählen Sie eine lokale ArcGIS-Metadaten-XML-Datei aus. Metadaten müssen im ArcGIS-Format vorliegen.",templatePrompt:"Metadaten erstellen",pullItem:"Metadaten mit Elementdetails füllen.",importWarning:"Die ausgewählte Datei liegt offenbar nicht im ArcGIS-Format vor. Hochgeladene Metadaten müssen im ArcGIS-Format vorliegen.",loading:"Wird geladen...",noMetadata:"Für dieses Element können Metadaten erstellt werden, indem eine der folgenden Optionen ausgewählt wird.",unrecognizedMetadata:"Der mit diesem Element verknüpfte Metadatentyp wird vom Editor nicht unterstützt. Unterstützte Metadaten können für dieses Element durch Auswahl einer der folgenden Optionen erstellt werden.",errorLoading:"Beim Laden ist ein Fehler aufgetreten.",warnings:{badFile:"Die ausgewählte Datei konnte nicht geladen werden.",notAnXml:"Die ausgewählte Datei ist keine XML-Datei.",notSupported:"Dieser Dateityp wird nicht unterstützt."}},save:{caption:"Speichern",dialogTitle:"Metadaten speichern",working:"Metadaten werden gespeichert...",errorSaving:"Es ist ein Fehler aufgetreten. Ihre Metadaten wurden nicht gespeichert.",saveDialog:{pushCaption:"Änderungen auf das Element anwenden"}},saveAndClose:{caption:"Speichern & schließen"},saveDraft:{caption:"Lokale Kopie speichern",dialogTitle:"Lokale Kopie speichern"},validate:{caption:"Überprüfen",dialogTitle:"Validierung",docIsValid:"Ihr Dokument ist gültig."},del:{caption:"Löschen",dialogTitle:"Metadaten löschen",prompt:"Möchten Sie diese Metadaten wirklich löschen?",working:"Metadaten werden gelöscht...",errorDeleting:"Es ist ein Fehler aufgetreten. Ihre Metadaten wurden nicht gelöscht."},transform:{caption:"Transformieren",dialogTitle:"Transformieren in",prompt:"",working:"Wird transformiert...",errorTransforming:"Beim Transformieren des Dokuments ist ein Fehler aufgetreten."},errorDialog:{dialogTitle:"Es ist ein Fehler aufgetreten."}},arcgis:{portal:{metadataButton:{caption:"Metadaten"}}},calendar:{button:"Kalender...",title:"Kalender"},geoExtent:{button:"Geographische Ausdehnung festlegen...",title:"Geographische Ausdehnung",navigate:"Navigieren",draw:"Ein Rechteck aufziehen",drawHint:"Zum Starten drücken und zum Beenden loslassen."},hints:{date:"(jjjj oder jjjj-mm oder jjjj-mm-tt)",dateTime:"(jjjj-mm-ttThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(jjjj oder jjjj-mm oder jjjj-mm-tt oder jjjj-mm-ttThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(zum Trennen Komma oder neue Zeile verwenden)",fgdcDate:"(jjjj oder jjjj-mm oder jjjj-mm-tt)",fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(eine ganze Zahl eingeben)",latitude:"(Dezimalgrad)",longitude:"(Dezimalgrad)",number:"(eine Zahl eingeben)",numberGreaterThanZero:"(eine Zahl > 0 eingeben)"},isoTopicCategoryCode:{caption:"Themenkategorie",boundaries:"Administrative und politische Grenzen",farming:"Landwirtschaft",climatologyMeteorologyAtmosphere:"Atmosphäre und Klima",biota:"Biologie und Ökologie",economy:"Wirtschaft",planningCadastre:"Kataster",society:"Kultur, Gesellschaft und Demografie",elevation:"Höhe und abgeleitete Produkte",environment:"Umwelt und Naturschutz",structure:"Einrichtungen und Strukturen",geoscientificInformation:"Geologie und Geophysik",health:"Gesundheitswesen",imageryBaseMapsEarthCover:"Bilddaten und Grundkarten",inlandWaters:"Binnengewässerressourcen",location:"Orte und geodätische Netze",intelligenceMilitary:"Militär",oceans:"Meere und Flussmündungen",transportation:"Verkehrsnetzwerke",utilitiesCommunication:"Versorgung und Kommunikation"},multiplicity:{moveElementDown:"Abschnitt nach unten verschieben",moveElementUp:"Abschnitt nach oben verschieben",removeElement:"Abschnitt entfernen",repeatElement:"Abschnitt wiederholen"},optionalNode:{switchTip:"Diesen Abschnitt ein- oder ausschließen."},serviceTypes:{featureService:"Feature-Service",mapService:"Kartenservice",imageService:"Image-Service",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {message}",patternWithHint:"{label} - {message} {hint}",ok:"OK",empty:"Es muss ein Wert angegeben werden.",date:"Der Wert muss ein Datum sein.",integer:"Der Wert muss eine ganze Zahl sein.",number:"Der Wert muss eine Zahl sein.",other:"Ungültiger Wert."},validationPane:{clearMessages:"Meldungen löschen",prompt:"(klicken Sie auf die einzelnen Meldungen unten, und geben Sie die erforderlichen Informationen in das angegebene Feld ein)"}});