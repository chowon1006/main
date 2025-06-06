import { session_set, session_get, session_check } from './session.js';
import { encrypt_text, decrypt_text } from './crypto.js';
import { generateJWT, checkAuth } from './jwt_token.js';

function init() { // 로그인 폼에 쿠키에서 가져온 아이디 입력
  const emailInput = document.getElementById('typeEmailX');
  const idsave_check = document.getElementById('idSaveCheck');
  let get_id = getCookie("id");

  if (get_id) {
    emailInput.value = get_id;
    idsave_check.checked = true;
  }

  session_check(); // 세션 유무 검사
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});

const check_xss = (input) => {
  const DOMPurify = window.DOMPurify; // DOMPurify 라이브러리 로드
  const sanitizedInput = DOMPurify.sanitize(input); // 입력 값을 sanitize

  if (sanitizedInput !== input) {
    alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;
  }

  return sanitizedInput;
};

function setCookie(name, value, expiredays) {
  var date = new Date();
  date.setDate(date.getDate() + expiredays);
  document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}

function getCookie(name) {
  var cookie = document.cookie;
  console.log("쿠키를 요청합니다.");

  if (cookie != "") {
    var cookie_array = cookie.split("; ");
    for (var index in cookie_array) {
      var cookie_name = cookie_array[index].split("=");
      if (cookie_name[0] == "id") {
        return cookie_name[1];
      }
    }
  }
  return;
}

const check_input = () => {
  const loginForm = document.getElementById('login_form');
  const loginBtn = document.getElementById('login_btn');
  const emailInput = document.getElementById('typeEmailX');
  const passwordInput = document.getElementById('typePasswordX');
  const c = '아이디, 패스워드를체크합니다';
  alert(c);

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const sanitizedPassword = check_xss(passwordValue);
  const sanitizedEmail = check_xss(emailValue);

  const idsave_check = document.getElementById('idSaveCheck');
  const payload = {
    id: emailValue,
    exp: Math.floor(Date.now() / 1000) + 3600 // 1시간 (3600초)
  };
  const jwtToken = generateJWT(payload);

  if (emailValue === '') {
    alert('이메일을입력하세요.');
    return false;
  }

  if (passwordValue === '') {
    alert('비밀번호를입력하세요.');
    return false;
  }

  if (emailValue.length < 5) {
    alert('아이디는최소5글자이상입력해야합니다.');
    return false;
  }

  if (passwordValue.length < 12) {
    alert('비밀번호는반드시12글자이상입력해야합니다.');
    return false;
  }

  const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/) !== null;
  if (!hasSpecialChar) {
    alert('패스워드는특수문자를1개이상포함해야합니다.');
    return false;
  }

  const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
  const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
  if (!hasUpperCase || !hasLowerCase) {
    alert('패스워드는대소문자를1개이상포함해야합니다.');
    return false;
  }

  if (!sanitizedEmail) {
    return false;
  }

  if (!sanitizedPassword) {
    return false;
  }

  if (idsave_check.checked == true) {
    alert("쿠키를 저장합니다.", emailValue);
    setCookie("id", emailValue, 1); // 1일 저장
    alert("쿠키 값 :" + emailValue);
  } else {
    setCookie("id", emailValue.value, 0); // 날짜를 0 - 쿠키 삭제
  }

  console.log('이메일:', emailValue);
  console.log('비밀번호:', passwordValue);

  session_set(); // 세션 생성
  localStorage.setItem('jwt_token', jwtToken);
  loginForm.submit();
};

document.getElementById("login_btn").addEventListener('click', check_input);


document.addEventListener('DOMContentLoaded', () => {
 checkAuth();
 init_logined();
 });