/*
CHECKLIST
[x] 글자 표기 관련 내용
[x] board 내용 가져오기
[x] comments 내용 가져오기
[ ] 파일 첨부 null 체크
*/

import { getBackendDomain } from './config.js';
import { fetchData, formatNumber, formatDate, extractIdFromUrl, postData, deleteData } from './fetchData.js';

// 게시글 삭제 모달
const boardDeleteModal = document.getElementById('board-delete');

function processBoardDetailData(data){
    const boardData = data.board;
    const listBox = document.getElementById('post');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const postElement = document.createElement('div');
    postElement.classList.add('post-entity');
    postElement.innerHTML = `
    <article class="head">
        <h2 class="title">
            ${boardData.post_title}
        </h2>
        <article class="detail">
            <article class="text-detail">
            <p>
                <article class="box">
                <img class="logo" src="${getBackendDomain()+boardData.profile_image_path}" alt="profile-img">
                </article>
                <h3 class="writer-detail">${boardData.nickname}</h3>
            </p>
            <h4 class="time-detail">
            ${formatDate(boardData.created_at)}
            </h4>
            </article>

            <article class = "small-buttons">
                <a class="sbutton" >수정</a>
                <a class="sbutton" id="board-delete-btn" >삭제</a>
            </article>
        </article>
    </article>

    <hr class="horizontal-rule"/>

    <article class = "main">
        <img class="board-image" src="${getBackendDomain() + boardData.file_path}" alt="board-img">
        <p class = "content">${boardData.post_content}</article>

    <article class = "infos">
        <article class = "info">
            <p class="num">${formatNumber(boardData.hits)}</p>
            <h3>조회수</h3>
        </article>
        <article class = "info">
            <p class="num">${formatNumber(boardData.comment_count)}</p>
            <h3>댓글</h3>
        </article>
    </article>
    `;


    listBox.appendChild(postElement);

    const boardDeleteBtn = postElement.querySelector('#board-delete-btn');
    if(boardDeleteBtn) {
        boardDeleteBtn.addEventListener('click', function() {
            boardDeleteModal.style.display = 'flex';
            freeze(overlay);
        });
    }
}

function processCommentData(data){
    const commentData = data.comments;
    const listBox = document.getElementById('comments');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    commentData.forEach((comment) => {

        const unit  = document.createElement('div');
        unit.classList.add('unit');
        unit.innerHTML = 
            `<article class="detail">
                    <article class="text-detail">
                    <p>
                        <article class="box">
                        <img class="logo" src="${getBackendDomain()+comment.profile_image_path}" alt="profile-img">
                        </article>
                        <h3 class="writer-detail"> ${comment.nickname}</h3>
                    </p>
                    <h4 class="time-detail">${formatDate(comment.created_at)}</h4>
                    </article>
                    <article class = "small-buttons">
                        <a class="sbutton" href="#" target="_blank">수정</a>
                        <a class="sbutton" href="#" id = "comment-delete-btn">삭제</a>
                    </article>
            </article>
                <h4 class = "content">${comment.comment_content}</h4>`;
        fragment.appendChild(unit);

    });

    listBox.appendChild(fragment);
}



const extractedId = extractIdFromUrl();
console.log("Extracted ID from URL:", extractedId);


fetchData('/boards/'+extractedId)
    .then((res)=>{
        console.log(res.data);
        processBoardDetailData(res.data);
        processCommentData(res.data);
    });

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    let jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    postData(jsonData,'/boards/'+extractedId+'/comments')
    .then((res)=>{
        console.log(res);
        window.location.href = '/boards/detail/'+extractedId;
    });
});






// fetchData('/data/comments.json')
//     .then((data)=>{
//         processCommentData(data);
//     });
