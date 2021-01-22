var axios=require('axios');

axios({
    method: 'post',
    url: 'http://localhost:3000',
    data: {
        n: 3,
        list: [1,2,3]
    }
})
.then(data=>console.log(data))
.catch(err=>console.log(err))