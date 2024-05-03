/*
CHECKLIST
[x] 글자 표기 관련 내용
[x] board 내용 가져오기
[x] comments 내용 가져오기
[ ] 파일 첨부 null 체크
[ ] edit할 때 파일 불러오기?
*/

import { getBackendDomain } from './config.js';
import { fetchData, formatNumber, formatDate, extractIdFromUrl, postData, deleteData, patchData } from './fetchData.js';

var href = window.location.href;
const extractedId = href.match(/\/boards\/(\d+)/)[1];
console.log(extractedId);

function processBoardEditData(data){
    const boardData = data.board;
    const listBox = document.getElementById('main');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const postElement = document.createElement('div');
    postElement.classList.add('post-entity');
    postElement.innerHTML = `
    <form method="patch">
    <label for="postTitle"><h3>제목 * </h3></label>
    <hr class="horizontal-rule"/> 
    <input type="text" name="postTitle" id = "title" placeholder="제목을 입력해주세요. (최대 26글자)" value="${boardData.post_title}">  
    <hr class="horizontal-rule"/> 
    <label for="postContent"><h3>내용 * </h3></label>
    <hr class="horizontal-rule"/> 
    <textarea name="postContent" id="content" cols="30" rows="11" placeholder="내용을 입력해주세요." >${boardData.post_content}</textarea>
    <hr class="horizontal-rule"/> 
    <p class="help-text left-margin">*helper text</p>
    <div class="board-image">
        <label for="attachFilePath"><h3>이미지</h3></label>
        <input class = "left-margin"type="file" name="attachFilePath">
    </div>
    <button type="submit" class="purple-btn" id="write-button"">수정하기</button>
</form>
    `;


    listBox.appendChild(postElement);
    const boardEditBtn = postElement.querySelector('#write-button');

    console.log(boardEditBtn);
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        let jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        console.log(jsonData);
        patchData(jsonData,'/boards/'+extractedId)
        .then((res)=>{
            console.log(res);
            if (res.status === 201){
                window.location.href = '/boards/detail/'+extractedId;
            }else{
                window.location.href = '/boards'
            }
        });
    });

}

fetchData('/boards/'+extractedId)
    .then((res)=>{
        console.log(res);
        processBoardEditData(res.data);
    });



