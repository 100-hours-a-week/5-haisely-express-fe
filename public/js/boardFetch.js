// boardFetch.js

import { fetchData, formatNumber, formatDate } from './fetchData.js';

function processBoardData(data) {
    const boardData = data.boards;
    const listBox = document.getElementById('list');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    boardData.forEach((post) => {

        const postElement = document.createElement('div');
        postElement.classList.add('unit');
        postElement.setAttribute('onclick', `window.location.href='/boards/detail/${post.post_id}';`);
        postElement.innerHTML = `
            <article class="content">
                <h2 class="title">${post.post_title}</h2>
                <article class="detail">
                    <h4 class="board-detail">좋아요 ${formatNumber(post.like)} 댓글 ${formatNumber(post.comment_count)}  조회수 ${formatNumber(post.hits)} </h4>
                    <h4 class="time-detail">${formatDate(post.created_at)} </h4>
                </article>
            </article>
            <hr class="horizontal-rule"/>   
            <article class="writer">
                <div class="box">
                <img class="logo" src="${post.profile_image_path} " alt="profile-img">
                </div>
                <h3>${post.nickname}</h3>
            </article>
        `;

        fragment.appendChild(postElement);

    });

    listBox.appendChild(fragment);
}

fetchData('/boards')
    .then((res) => {
        console.log(res.data);
        processBoardData(res.data);
    })
    .catch(error => console.error('Error in boardFetch:', error.message));
