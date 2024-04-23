function validPassword(){
    var passwordInput = document.getElementById('password');
    var passwordMessage = document.getElementById('password-help');

    // 값이 비어있을 때
    if(!isValue(passwordInput.value)){
        passwordMessage.innerHTML = "*비밀번호를 입력해주세요."
        return false;
    }
    
    // 비밀번호 유효성 검사
    if(!pwValidChk(passwordInput.value)){
        passwordMessage.innerHTML = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
        return false;
    }
    
    // 올바른 비밀번호
    passwordMessage.innerHTML = "&nbsp"
    return true;
}

function validConfirmPassword(){
    var passwordInput = document.getElementById('password');
    var passwordMessage = document.getElementById('password-help');
    var rePasswordInput = document.getElementById('confirm-password');
    var rePasswordMessage = document.getElementById('confirm-password-help');

     // 값이 비어있을 때
    if(!isValue(rePasswordInput.value)){
        rePasswordMessage.innerHTML = "*비밀번호를 한번더 입력해주세요."
        return false;
    }

    // 비밀번호 확인과 같은지 검사
    if(!pwSameChk(passwordInput.value, rePasswordInput.value)){
        rePasswordMessage.innerHTML = "*비밀번호가 다릅니다.";
        passwordMessage.innerHTML = "*비밀번호가 다릅니다.";
        return false;
    }

    // 유효한 비밀번호인지 검사
    if(!validPassword(passwordInput.value)){
        rePasswordMessage.innerHTML = "&nbsp";
        return false;
    }

    passwordMessage.innerHTML = "&nbsp"
    rePasswordMessage.innerHTML = "&nbsp"
    return true;
}

let passwordValid = false;
let confirmPasswordValid = false;

function validButton(){
    var saveButton = document.getElementById('save');
    if (passwordValid&&confirmPasswordValid){
        saveButton.style.backgroundColor = 'var(--btn-purple-possible)';
        saveButton.disabled = false;
        saveButton.style.cursor = 'pointer';
    }else {
        saveButton.style.backgroundColor = 'var(--btn-purple)';
        saveButton.disabled = true;
        saveButton.style.cursor = 'not-allowed';
    }
}

document.getElementById('password').addEventListener('change', function() {
    passwordValid = validPassword();
    validButton();
});
document.getElementById('confirm-password').addEventListener('input', function() {
    confirmPasswordValid = validConfirmPassword();
    validButton();
});