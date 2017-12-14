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

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"Không có",notComplete:"Chưa hoàn thành",other:"Khác",present:"Hiện tại",unknown:"Không xác định",unpublishedMaterial:"Tài liệu chưa được xuất bản"},hints:{integerGreaterThanOne:"(nhập số nguyên > 1)",integer0To100:"(nhập số nguyên 0..100)"},citeinfo:{caption:"Thông tin Trích dẫn",origin:"Người tạo",pubdate:"Ngày Xuất bản",pubtime:"Giờ Xuất bản",title:"Tiêu đề",edition:"Ấn bản",geoform:{caption:"Biểu mẫu Trình bày Dữ liệu Không gian địa lý",atlas:"Tập bản đồ",audio:"Âm thanh",diagram:"Biểu đồ",sDocument:"Tài liệu",globe:"toàn cầu",map:"Bản đồ",model:"Mô hình",multiMediaPresentation:"Thuyết trình đa phương tiện",profile:"Hồ sơ",rasterDigitalData:"Dữ liệu kỹ thuật số dạng vạch quét",remoteSensingImage:"Hình ảnh cảm biến từ xa",section:"Phần",spreadsheet:"Bảng tính",tabularDigitalData:"Dữ liệu kỹ thuật số dạng bảng",vectorDigitalData:"Dữ liệu kỹ thuật số dạng véc tơ",video:"Video",view:"Xem"},serinfo:{caption:"Thông tin Chuỗi",sername:"Tên Chuỗi",issue:"Nhận dạng Sự cố"},pubinfo:{caption:"Thông tin Công bố",pubplace:"Địa điểm Công bố",publish:"Người xuất bản"},othercit:"Thông tin chi tiết Trích dẫn Khác",onlink:"Liên kết Trực tuyến (URL)"},cntinfo:{caption:"Thông tin Liên hệ",section:{primary:"Chính",phoneAndEmail:"Số điện thoại và E-Mail",hoursAndInstructions:"Số giờ và Hướng dẫn"},cntorgp:{caption:"Bởi tổ chức",cntorg:"Tổ chức",cntper:"Cá nhân"},cntperp:{caption:"Bởi cá nhân",cntper:"Cá nhân",cntorg:"Tổ chức"},cntpos:"Vị trí",cntaddr:{caption:"Địa chỉ",addrtype:{caption:"Loại địa chỉ",mailing:"Địa chỉ gửi thư",physical:"Địa chỉ thực",mailingAndPhysical:"Địa chỉ Gửi thư và Địa chỉ Thực"},address:"Địa chỉ",city:"Thành phố",state:"Tiểu bang",postal:"Mã Bưu điện",country:"Quốc gia"},cntvoice:"Hòm thư thoại",cnttdd:"Số điện thoại TDD/TTY (cho người khiếm thính)",cntfax:"Fax",cntemail:"Địa chỉ Email",hours:"Giờ",cntinst:"Hướng dẫn"},dataqual:{caption:"Thông tin Chất lượng Dữ liệu",section:{attributeAccuracy:"Độ chính xác của Thuộc tính",logicalConsistency:"Thống nhất Logic",completeness:"Dữ liệu hoàn chỉnh",positionalAccuracy:"Độ chính xác Vị trí",lineage:"Dòng in",cloudCover:"Mức độ Mây Che phủ"},attracc:{caption:"Độ chính xác của Thuộc tính",attraccr:"Báo cáo Độ chính xác của Thuộc tính",qattracc:{caption:"Đánh giá Độ chính xác của Thuộc tính Định lượng",attraccv:"Giá trị Độ chính xác của Thuộc tính",attracce:"Giải thích Độ chính xác của Thuộc tính"}},logic:"Báo cáo Thống nhất Logic",complete:"Báo cáo Dữ liệu hoàn chỉnh",posacc:"Độ chính xác Vị trí",horizpa:{caption:"Độ chính xác Vị trí Ngang",horizpar:"Báo cáo Độ chính xác Vị trí Ngang",qhorizpa:{caption:"Đánh giá Độ chính xác Vị trí Ngang Định lượng",horizpav:"Giá trị Độ chính xác Vị trí Ngang",horizpae:"Giải thích Độ chính xác Vị trí Ngang"}},vertacc:{caption:"Độ chính xác Vị trí Dọc",vertaccr:"Báo cáo Độ chính xác Vị trí Dọc",qvertpa:{caption:"Đánh giá Độ chính xác Định lượng của Vị trí Dọc",vertaccv:"Giá trị Độ chính xác Vị trí Dọc",vertacce:"Giải thích Độ chính xác Vị trí Dọc"}},lineage:{caption:"Dòng in"},srcinfo:{caption:"Thông tin Nguồn",srccite:"Trích dẫn Nguồn",srcscale:"Mẫu số Tỷ lệ Nguồn",typesrc:{caption:"Loại Phương tiện Nguồn",paper:"Giấy",stableBaseMaterial:"Vật liệu nền ổn định",microfiche:"Microfiche",microfilm:"Microfilm",audiocassette:"Cát-xét âm thanh",chart:"Biểu đồ",filmstrip:"Dải phim",transparency:"Độ trong suốt",videocassette:"Cát-xét video",videodisc:"Đĩa video",videotape:"Băng video",physicalModel:"Mô hình thực",computerProgram:"Chương trình máy tính",disc:"Đĩa",cartridgeTape:"Băng từ",magneticTape:"Băng từ",online:"Trực tuyến",cdrom:"CD-ROM",electronicBulletinBoard:"Bảng tin điện tử",electronicMailSystem:"Hệ thống thư điện tử"},srctime:"Khoảng Thời gian Nội dung của Nguồn",srccurr:"Tham chiếu Tính hiện tại của Nguồn",srccitea:"Viết tắt Trích dẫn Nguồn",srccontr:"Đóng góp Nguồn"},procstep:{caption:"Bước Quy trình",procdesc:"Mô tả Quy trình",srcused:"Viết tắt Trích dẫn được Sử dụng ở Nguồn",procdate:"Ngày Quy trình",proctime:"Giờ Quy trình",srcprod:"Viết tắt Trích dẫn do Nguồn Tạo ra",proccont:"Quy trình Liên hệ"},cloud:"Mức độ Bao phủ Đám mây"},distinfo:{caption:"Thông tin Phân phối",section:{distributor:"Nhà phân phối",description:"Mô tả",orderProcess:"Quy trình Yêu cầu",prerequisites:"Điều kiện tiên quyết",availability:"Mức độ khả dụng"},distrib:"Nhà phân phối",resdesc:{caption:"Mô tả Tài nguyên",liveData:"Dữ liệu và Bản đồ về Đời sống",downloadableData:"Dữ liệu có thể Tải về",offlineData:"Dữ liệu Ngoại tuyến",staticMapImages:"Hình ảnh Bản đồ Tĩnh",sDocument:"Tài liệu Khác",application:"Ứng dụng",geographicService:"Dịch vụ Địa lý",clearingHouse:"Cổng thông tin",mapFiles:"Tệp Bản đồ",geographicActivies:"Hoạt động Địa lý"},distliab:"Tuyên bố Trách nhiệm Phân phối",custom:"Quy trình Yêu cầu Tùy chỉnh",techpreq:"Điều kiện tiên quyết về Kỹ thuật",availabl:"Mức độ khả dụng"},eainfo:{caption:"Thông tin Thực thể và Thuộc tính",overview:"Mô tả Tổng quan",eaover:"Tổng quan về Thực thể và Thuộc tính",eadetcit:"Trích dẫn Chi tiết về Thực thể và Thuộc tính"},idinfo:{caption:"Thông tin Nhận dạng",section:{timeAndStatus:"Thời gian và Trạng thái",constraints:"Ràng buộc",contact:"Liên hệ",additional:"Bổ sung"},citeinfo:"Trích dẫn",descript:{caption:"Mô tả",sAbstract:"Tóm tắt",purpose:"Mục đích",supplinf:"Thông tin Bổ sung"},timeperd:{caption:"Khoảng Thời gian của Nội dung",current:{caption:"Tham chiếu Tính hiện hành",groundCondition:"Điều kiện Cơ sở",publicationDate:"Ngày Xuất bản"}},status:{caption:"Trạng thái",progress:{caption:"Tiến trình",complete:"Hoàn tất",inWork:"Đang làm",planned:"Đã lập kế hoạch"},update:{caption:"Tần suất Bảo trì và Cập nhật",continual:"Liên tục",daily:"Hàng ngày",weekly:"Hàng tuần",monthly:"Hàng tháng",annually:"Hàng năm",unknown:"Không xác định",asNeeded:"Khi cần",irregular:"Không đều",nonePlanned:"Không lập kế hoạch"}},spdom:{caption:"Phạm vi",bounding:{caption:"Hệ tọa độ Bao",westbc:"Kinh độ Bao phía Tây",eastbc:"Kinh độ Bao phía Đông",northbc:"Vĩ độ Bao phía Bắc",southbc:"Vĩ độ Bao phía Nam"}},keywords:{caption:"Từ khóa",theme:"Chủ đề",place:"Địa điểm",stratum:"Địa tầng",temporal:"Thời gian",thesaursus:"Từ điển chuyên đề Liên quan",delimited:"Từ khóa",themektIsoTopicCategory:"Chủ đề ISO...",themektIsoTopicDialog:"Chủ đề ISO",placektGnis:"Hệ thống Thông tin Tên Địa lý"},accconst:"Ràng buộc Truy cập",useconst:"Ràng buộc về sử dụng",ptcontac:"Đầu mối Liên hệ về Tài nguyên",browse:{caption:"Duyệt Đồ họa",browsen:"URL Duyệt Đồ họa",browsed:"Mô tả Tệp Duyệt Đồ họa",browset:"Loại Tệp Duyệt Đồ họa"},datacred:"Tín dụng Tập Dữ liệu",secinfo:{caption:"Thông tin Bảo mật",secsys:"Hệ thống Phân loại Bảo mật",secclass:{caption:"Phân loại Bảo mật",topSecret:"Tối mật",secret:"Bí mật",confidential:"Bí mật",restricted:"Hạn chế",unclassified:"Chưa phân loại",sensitive:"Nhạy cảm"},sechandl:"Mô tả việc Xử lý Bảo mật"},sNative:"Môi trường Tập Dữ liệu Bản địa",crossref:"Tham chiếu Chéo"},metadata:{idinfo:"Nhận dạng",dataqual:"Chất lượng",spdoinfo:"Tổ chức Dữ liệu Không gian",spref:"Tham chiếu Không gian",eainfo:"Thực thể và Thuộc tính",distinfo:"Phân phối",metainfo:"Siêu dữ liệu"},metainfo:{caption:"Thông tin Siêu dữ liệu",section:{dates:"Ngày Siêu dữ liệu",contact:"Liên hệ Siêu dữ liệu",standard:"Tiêu chuẩn Siêu dữ liệu",additional:"Bổ sung"},metd:"Ngày Siêu dữ liệu",metrd:"Ngày Xem xét Siêu dữ liệu",metfrd:"Ngày Xem xét Siêu dữ liệu trong Tương lai",metstdn:"Tên Tiêu chuẩn Siêu dữ liệu",metstdv:"Phiên bản Tiêu chuẩn Siêu dữ liệu",metac:"Ràng buộc Truy cập Siêu dữ liệu",metuc:"Ràng buộc Sử dụng Siêu dữ liệu",metsi:{caption:"Thông tin Bảo mật Siêu dữ liệu",metscs:"Hệ thống Phân loại Bảo mật Siêu dữ liệu",metsc:"Phân loại Bảo mật Siêu dữ liệu",metshd:"Mô tả việc Xử lý Bảo mật Siêu dữ liệu"}},spref:{caption:"Thông tin Tham chiếu Không gian",horizsys:{caption:"Hệ Tọa độ Ngang",geograph:{caption:"Địa lý",latres:"Độ phân giải Vĩ độ",longres:"Độ phân giải Kinh độ",geogunit:{caption:"Đơn vị Tọa độ Địa lý",decimalDegrees:"Độ thập phân",decimalMinutes:"Phút thập phân",decimalSeconds:"Giây thập phân",degreesAndDecimalMinutes:"Độ và phút thập phân",degreesMinutesAndDecimalSeconds:"Độ, phút, và giây thập phân",radians:"Ra-đi-ăng",grads:"Gra-đi-ăng"}},planar:{caption:"Phẳng"},local:{caption:"Địa phương",localdes:"Mô tả Địa phương",localgeo:"Thông tin Tham chiếu địa lý Địa phương"},geodetic:{caption:"Mô hình Trắc địa học",horizdn:{caption:"Tên Hệ tham chiếu Ngang",nad83:"Hệ tham chiếu Bắc Mỹ 1983",nad27:"Hệ tham chiếu Bắc Mỹ 1927"},ellips:{caption:"Tên Ellipsoid",grs80:"Hệ Tham chiếu Trắc địa 80",clarke1866:"Clarke 1866"},semiaxis:"Bán trục lớn",denflat:"Mẫu số của Tỷ lệ Làm phẳng"}},vertdef:{caption:"Hệ Tọa độ Dọc",altsys:{caption:"Hệ Cao độ",altdatum:{caption:"Tên Hệ tham chiếu Độ cao",navd88:"Hệ tham chiếu Dọc Bắc Mỹ 1988",ngvd29:"Hệ tham chiếu Dọc Trắc địa Quốc gia 1929"},altres:"Độ phân giải Độ cao",altunits:{caption:"Đơn vị Khoảng cách Độ cao",meters:"Mét",feet:"Bộ"},altenc:{caption:"Phương pháp Mã hóa Độ cao",explicit:"Tọa độ độ cao rõ ràng bao gồm hệ tọa độ ngang",implicit:"Tọa độ tuyệt đối",attribute:"Giá trị thuộc tính"}},depthsys:{caption:"Hệ Độ sâu",depthdn:{caption:"Tên Hệ tham chiếu Độ sâu",option1:"Bề mặt cục bộ",option2:"Hệ tham chiếu đồ thị; hệ tham chiếu để giảm độ sâu đo được",option3:"Mực thủy triều thấp nhất",option4:"Mực thủy triều cao nhất",option5:"Mực nước thấp trung bình",option6:"Mực nước cao trung bình",option7:"Mực nước biển trung bình",option8:"Hệ tham chiếu lục địa",option9:"Mực nước suối lên thấp trung bình",option10:"Mực nước suối lên cao Trung bình",option11:"Mực thủy triều xuống thấp trung bình",option12:"Mực thủy triều xuống cao trung bình",option13:"Mực nước thấp dưới mức trung bình",option14:"Mực thủy triều lên thấp dưới mức trung bình",option15:"Mực nước cao trên mức trung bình",option16:"Mực nước thấp trên mức trung bình",option17:"Mực nước cao dưới mức trung bình",option18:"Triều lên",option19:"Mực nước thấp dưới chí tuyến",option20:"Triều xuống",option21:"Mực nước cao",option22:"Mực nước cao trên",option23:"Mực nước thấp",option24:"Hệ tham chiếu mực nước thấp",option25:"Mực nước thấp thấp nhất",option26:"Mực nước thấp dưới",option27:"Mực nước thấp thông thường thấp nhất",option28:"Mực thủy triều trung bình",option29:"Mực nước thấp của triều lên khu vực Ấn độ",option30:"Đỉnh mực nước cao",option31:"Đỉnh mực nước thấp",option32:"Hệ tham chiếu khu vực Sông Columbia",option33:"Hệ tham chiếu mực nước thấp khu vực Bờ Vịnh",option34:"Mực nước thấp của triều lên khu vực xích đạo",option35:"Mực thủy triều thấp nhất xấp xỉ",option36:"Không hiệu chỉnh"},depthres:"Độ phân giải Độ sâu",depthdu:{caption:"Đơn vị Khoảng cách Độ sâu",meters:"Mét",feet:"Bộ"},depthem:{caption:"Phương pháp Mã hóa Độ sâu",explicit:"Tọa độ độ sâu rõ ràng bao gồm hệ tọa độ ngang",implicit:"Tọa độ tuyệt đối",attribute:"Giá trị thuộc tính"}}}},timeinfo:{caption:"Thông tin Khoảng Thời gian",sngdate:"Một ngày",mdattim:"Nhiều ngày",rngdates:"Phạm vi Ngày",caldate:"Ngày",time:"Thời gian",begdate:"Ngày Bắt đầu",begtime:"Giờ Bắt đầu",enddate:"Ngày Kết thúc",endtime:"Giờ Kết thúc"}});