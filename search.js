var axios=require('axios');

axios({
    method: 'post',
    url: 'http://localhost:3000/search',
    data: {
        data: 5
    }
})
.then(data=>console.log(data))
.catch(err=>console.log(err))