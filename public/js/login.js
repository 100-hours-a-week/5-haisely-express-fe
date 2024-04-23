/*
TODO 
[ ] button에 disable 넣어두기
*/

function validateInput() {
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var helpMessage = document.getElementById('login-help');
    var loginButton = document.getElementById('login-btn');

    if (emailValidChk(emailInput.value) && pwValidChk(passwordInput.value)) {
        helpMessage.innerHTML = '&nbsp';
        loginButton.style.backgroundColor = 'var(--btn-purple-possible)';
        loginButton.disabled = false;
        loginButton.style.cursor = 'pointer';
    } else {
        loginButton.style.backgroundColor = 'var(--btn-purple)';
        helpMessage.innerHTML = '*입력하신 계정 정보가 정확하지 않습니다.';
        loginButton.disabled = true;
        loginButton.style.cursor = 'not-allowed';
    }
}


document.getElementById('email').addEventListener('input', validateInput);
document.getElementById('password').addEventListener('input', validateInput);
