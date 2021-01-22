var axios=require('axios');

axios({
    method: 'post',
    url: 'http://localhost:3000/print',
    data: {
        //1: forward, 2: reverse
        order: 2
    }
})
.then(data=>console.log(data))
.catch(err=>console.log(err))