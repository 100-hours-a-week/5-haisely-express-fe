/*
CHECKLIST
[x] 모달 창 띄우기
[x] 댓글 버튼
*/


import { getBackendDomain } from './config.js';
import { fetchData, formatNumber, formatDate, extractIdFromUrl } from './fetchData.js';


function validateComment() {
    var commentInput = document.getElementById('comment');
    var commentBtn = document.getElementById('post-comment');
    
    if (isValue(commentInput.value)) {
        commentBtn.style.backgroundColor = 'var(--btn-purple-possible)';
        commentBtn.disabled = false;
        commentBtn.style.cursor = 'pointer';
    } else {
        commentBtn.style.backgroundColor = 'var(--btn-purple)'
        commentBtn.disabled = true;
        commentBtn.style.cursor = 'not-allowed';
    }
}


// 댓글 삭제 버튼
var commentDeleteBtn = document.getElementById('comment-delete-btn')
// 댓글 삭제 모달
var commentDeleteModal = document.getElementById('comment-delete');


document.getElementById('comment').addEventListener('input', validateComment);

var overlay = document.getElementById('overlay');

commentDeleteBtn.addEventListener('click', function() {
    commentDeleteModal.style.display = 'flex';
    freeze(overlay);
});

