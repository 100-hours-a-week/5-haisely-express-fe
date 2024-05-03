// fetchData.js

// const backendDomain ='https://rooster-comic-mackerel.ngrok-free.app'
// const backendDomain = 'http://localhost:3001'

import { getBackendDomain } from './config.js';

async function fetchData(path) {
    const address = getBackendDomain() + path;
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

async function postData(jsonData, path){
    const address = getBackendDomain() + path;
    try{
        const response = await fetch(address, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        return response.json();
        }catch(error) {
        console.error('Error:', error);
    }
}

async function deleteData(path){
    const address = getBackendDomain() + path;
    try{
        const response = await fetch(address, {
            method: 'DELETE'
        });
        console.log("hihi");
        return response.json();
        }catch(error) {
        console.error('Error:', error);
    }
}

async function patchData(jsonData, path){
    const address = getBackendDomain() + path;
    try{
        const response = await fetch(address, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        return response.json();
        }catch(error) {
        console.error('Error:', error);
    }
}

function extractIdFromUrl() {
    var href = window.location.href;
    var regex = /\/(\d+)(?:\/)?$/; // 맨 뒤에 있는 숫자를 추출
    var match = regex.exec(href);
    if (match && match.length > 1) {
        return match[1]; // 첫 번째 그룹에 해당하는 부분 반환 (즉, 숫자)
    } else {
        return null; // 일치하는 것이 없으면 null 반환
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
    // 날짜 문자열에서 연, 월, 일, 시, 분, 초를 추출
    var parts = dateString.match(/(\d{4})\. (\d{1,2})\. (\d{1,2})\. (오전|오후) (\d{1,2}):(\d{1,2}):(\d{1,2})/);

    // 추출한 정보로 날짜 객체 생성
    var year = parseInt(parts[1]);
    var month = parseInt(parts[2]) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
    var day = parseInt(parts[3]);
    var hour = parseInt(parts[5]) + (parts[4] === "오후" ? 12 : 0); // 오후일 경우 시에 12를 더합니다.
    var minute = parseInt(parts[6]);
    var second = parseInt(parts[7]);

    var dateObj = new Date(year, month, day, hour, minute, second);

    // 새로운 형식의 날짜 문자열 생성
    var newDateString = dateObj.getFullYear() + "-" + 
                        ('0' + (dateObj.getMonth() + 1)).slice(-2) + "-" + 
                        ('0' + dateObj.getDate()).slice(-2) + " " + 
                        ('0' + dateObj.getHours()).slice(-2) + ":" + 
                        ('0' + dateObj.getMinutes()).slice(-2) + ":" + 
                        ('0' + dateObj.getSeconds()).slice(-2);
    return newDateString;
}

export { fetchData, formatNumber, formatDate, postData, extractIdFromUrl, deleteData, patchData };
