var axios=require('axios');

axios({
    method: 'post',
    url: 'http://localhost:3000/delete',
    data: {
        //1: start node, 2: last node, 3: certain node
        which: 3,
        data: 3
    }
})
.then(data=>console.log(data))
.catch(err=>console.log(err))