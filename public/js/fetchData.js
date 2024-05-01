// fetchData.js

// const backendDomain ='https://rooster-comic-mackerel.ngrok-free.app'
const backendDomain = 'http://localhost:3001'

async function fetchData(path) {
    const address = backendDomain + path;
    try {
        const response = await fetch(address);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 데이터 반환
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 에러 처리
    }
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

export { fetchData, formatNumber, formatDate };
