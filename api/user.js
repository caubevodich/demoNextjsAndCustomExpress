import { host } from './connectApi';



module.exports = {
    getUserInfo,
    
}
/////// FETCH TRÊN CLIENT
async function getUserInfo() {
    return fetch('http://localhost:3006/getUser', {
        method: 'post',
       // body: JSON.stringify({ username: username, email: email }),
        
    }).then(response => response.json()
    ).then(function (data) {
        return data;
    });
}



