/*
CHECKLIST
[x] 아이콘 클릭시 드롭 다운
[x] hover 시 메뉴 색 변경
*/

function dropDown() {
    let dropDownContent = document.getElementById("dropdown-content");
    if (dropDownContent.style.display === 'block') {
        dropDownContent.style.display = 'none';
    } else {
        dropDownContent.style.display = 'block';
    }
}


const dropBtn = document.getElementById("drop-btn");

dropBtn.addEventListener('click',dropDown);
