// 마커를 담을 배열입니다
var markers = [];
 // 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();
 // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합
니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});
 // 키워드로 장소를 검색합니다
searchPlaces();
 // 생략…
 
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
center: new kakao.maps.LatLng(37.380855, 126.927691), //지도의 중심좌표.
 level: 3 //지도의 레벨(확대, 축소 정도)
 };
 var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

 // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();
 // 지도 타입 컨트롤을 지도에 표시합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
 // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
 map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
 // 지도에 지형정보를 표시하도록 지도타입을 추가합니다
 
map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});
// 지도에 마커를 표시합니다
marker.setMap(map);
 // 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
 // 클릭한 위도, 경도 정보를 가져옵니다 
var latlng = mouseEvent.latLng;
 // 마커 위치를 클릭한 위치로 옮깁니다
marker.setPosition(latlng);
 var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
 message += '경도는 ' + latlng.getLng() + ' 입니다';
 var resultDiv = document.getElementById('clickLatlng');
 resultDiv.innerHTML = message;
 });