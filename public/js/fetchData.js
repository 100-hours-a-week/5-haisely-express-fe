// Fetch JSON 파일
function fetchData(address){
    return fetch(address)
    .then((response) => {
    // 응답을 JSON으로 파싱
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch((error) => {
        // 에러 처리
        console.error(
        'There was a problem with your fetch operation:',
        error
        );
    });
}

function formatNumber(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else {
        return number.toString();
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}