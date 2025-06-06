// function session_set() { //세션 저장
//     let session_id = document.querySelector("#typeEmailX");
//     if (sessionStorage) {
//         sessionStorage.setItem("Session_Storage_test", session_id.value);    
//     } else {
//         alert("로컬 스토리지 지원 x");
//     }
// }

import { encrypt_text, decrypt_text } from './crypto.js';

export function session_set() { // 세션 저장(객체)
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");

    // 다음 페이지 계속 작성하기
    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_id", id.value);
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }
}

export function session_set2() { // 세션 저장(객체)
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let random = new Date(); // 랜덤 타임스탬프

    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_set() { // 세션 저장
    let session_id = document.querySelector("#typeEmailX"); // DOM 트리에서 ID 검색
    let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색
    if (sessionStorage) {
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    } else {
        alert("로컬 스토리지 지원 x");
    }
}

function session_get() { // 세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_test");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function init_logined() {
    if (sessionStorage) {
        decrypt_text(); // 복호화 함수
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() { // 세션 검사
    if (sessionStorage.getItem("Session_Storage")) {
        alert("이미 로그인 되었습니다.");
        location.href = ('../login/login.html'); // 로그인된 페이지로 이동
    }
}
