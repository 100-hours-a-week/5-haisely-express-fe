import { postData } from './fetchData.js';
import { getBackendDomain } from './config.js';

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    let jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    postData(jsonData,'/boards')
    .then((res)=>{
        console.log(res);
        if (res.status === 201){
            window.location.href = '/boards/detail/'+res.data.post_id;
        }else{
            window.location.href = '/boards'
        }
    });
});