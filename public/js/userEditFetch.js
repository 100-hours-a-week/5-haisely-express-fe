
import { getBackendDomain } from './config.js';
import { tostOn } from './tostMessage.js';
import { fetchData, deleteData, patchData } from './fetchData.js';

// user_id 바꾸기!!
const extractedId = 1;
console.log(extractedId);

function processBoardEditData(data){
    console.log(data);
    const userData = data.user;
    const listBox = document.getElementById('form-div');
    listBox.innerHTML = '';

    const userElement = document.createElement('div');
    userElement.classList.add('user-element');
    userElement.innerHTML = `
    <form>
        <article class="profile-img">
            <h3>프로필 사진*</h3>
            <div class="profile-box">
                <img id="upload-img" src="${getBackendDomain()+userData.profile_image}" alt="profile-img">
            </div>
            <div class="edit">
                <a class="sbutton" href="#" target="_blank">변경</a>
            </div>
        </article>
        <h3>이메일</h3>
        <h4 class="content">${userData.email}</h4>
        <label for="nickname"><h3>닉네임</h3></label>
        <input id="nickname" type="text" name="nickname" placeholder="새 닉네임을 입력하세요" value="${userData.nickname}">
        <p id="nickname-help" class = "help-text">&nbsp</p>
        <button id="save" class="purple-btn" type="submit">수정하기</button>
    </form>
    `;


    listBox.appendChild(userElement);
    // --------
    const boardEditBtn = userElement.querySelector('#save');

    console.log(boardEditBtn);
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        let jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        console.log(jsonData);

        fetchData('/users/nickname/check?nickname='+jsonData.nickname)
        .then((res)=>{
            console.log(res);
            if (res.status !== 200){
                alert('중복된 닉네임입니다!');
                return;
            }
        });

        patchData(jsonData,'/users/'+extractedId)
        .then((res)=>{
            console.log(res);
            if (res.status !== 200){
                alert("변경 중 오류가 발생했습니다!");
            }
        });
        tostOn();
    });

}

fetchData('/users/'+extractedId)
    .then((res)=>{
        console.log(res);
        processBoardEditData(res.data);
    });

const deleteCancelBtn = document.getElementById('user-delete-cancel');
const deleteConfirmBtn = document.getElementById('user-delete-confirm');
const userDeleteModal = document.getElementById('user-delete');
console.log(deleteConfirmBtn);


var overlay = document.getElementById('overlay');

deleteCancelBtn.addEventListener('click', function(){
    userDeleteModal.style.display = 'none';
    ddang(overlay);
});

deleteConfirmBtn.addEventListener('click', function(){
    deleteData('/users/'+extractedId)
    .then((res)=>{
        console.log(res);
        window.location.href = '/login'
    })
});


const userDeleteBtn = postElement.querySelector('#user-delete-btn');
if(userDeleteBtn) {
    userDeleteBtn.addEventListener('click', function() {
        userDeleteModal.style.display = 'flex';
        freeze(overlay);
    });
}


