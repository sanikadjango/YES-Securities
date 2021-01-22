var axios=require('axios');

axios({
    method: 'post',
    url: 'http://localhost:3000/add',
    data: {
        //1: at the start, 2: at the end, 3: after a certain node
        where: 3,
        data: 3.2,
        after: 3
    }
})
.then(data=>console.log(data))
.catch(err=>console.log(err))