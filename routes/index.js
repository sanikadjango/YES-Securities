var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//schemas
var Schema=mongoose.Schema;

let nodeSchema= new Schema({
	data: {type: Number},
	next: {type: Schema.Types.ObjectId, ref: 'Node'}
});

var Node=mongoose.model('Node', nodeSchema);


let LLSchema= new Schema({
	head: {type: Schema.Types.ObjectId, ref: 'Node'},
	size: Number
});

var LinkedList=mongoose.model('LinkedList', LLSchema);


//classes
class cNode{
  constructor(data,next=null){
    this.data=data,
    this.next=next
  }
}

class cLinkedList{
  constructor(){
    this.head=null;
    this.size=0;
  }
}

var linked_list= new cLinkedList();
var N;
var data_list;


/* create linked list*/
router.post('/', function(req, res) {
  N= req.body.n;
  data_list= req.body.list;
  var prevNode=null;

  linked_list.size=N;
  
  data_list.forEach(element => {
    var node;
    node= new cNode(element);

    if(linked_list.head==null){
      linked_list.head=node;    
    }
    else{
      prevNode.next=node;
    }
    prevNode=node;
  });

  
  // //print linked list
  var temp;
  temp=linked_list.head;
  do{
    console.log(temp.data);
    temp=temp.next;
  }while(temp!=null);
  
  
});

router.post('/add', function(req, res) {
  var choice=req.body.where;
  var data=req.body.data;

  var node=new Node(data);

  var temp;
  if(choice==1){
    temp=linked_list.head;
    linked_list.head=node;
    node.next=temp;
  }
  else if(choice==2){
    temp=linked_list.head;
    do{
      temp=temp.next;
    }while(temp.next!=null);

    temp.next=node;
  }
  else{
    var after=req.body.after;
    //find the mentioned node
    temp=linked_list.head;
    do{
      if(temp.data==after){
        break;
      }
      temp=temp.next;
    }while(temp!=null);

    //insert new node after the mentioned node
    node.next=temp.next;
    temp.next=node;
    
  }

  linked_list.size=linked_list.size+1;
  //print linked list
  temp=linked_list.head;
  do{
    console.log(temp.data);
    temp=temp.next;
  }while(temp!=null);

});

router.post('/delete', function(req, res) {
  var choice=req.body.which;
  var temp;
  if(choice==1){
    linked_list.head=linked_list.head.next;
  }
  else if(choice==2){
    temp=linked_list.head;
    do{
      temp=temp.next;
    }while(temp.next.next!=null);

    temp.next=null;
  }
  else{
    var data=req.body.data;
    var prevNode=null;
    //find the mentioned node
    temp=linked_list.head;
    do{
      if(temp.data==data){
        break;
      }
      prevNode=temp;
      temp=temp.next;
    }while(temp!=null);

    if(prevNode==null){
      linked_list.head=linked_list.head.next;
    }
    else{
      prevNode.next=temp.next;
    }
  }

  linked_list.size=linked_list.size-1;
  //print linked list
  temp=linked_list.head;
  do{
    console.log(temp.data);
    temp=temp.next;
  }while(temp!=null);

});

router.post('/search', function(req, res) {
  var data=req.body.data;
  var temp;
  var flag=0;
  //find the mentioned node
  temp=linked_list.head;
  do{
    if(temp.data==data){
      flag=1;
      console.log("Node found");
      break;
    }
    temp=temp.next;
  }while(temp!=null);

  if(flag==0) console.log("Node not found");

});

router.post('/print', function(req, res) {
  var order=req.body.order;
  var temp;
  if(order==1){
    temp=linked_list.head;
    do{
      console.log(temp.data);
      temp=temp.next;
    }while(temp!=null);
  }
  else{
    var list=[];
    temp=linked_list.head;
    do{
      list.push(temp.data);
      temp=temp.next;
    }while(temp!=null);

    var i=linked_list.size;
    while(i>0){
      console.log(list.pop());
      i=i-1;
    }
  }
});

router.get('/size', function(req, res) {
  console.log(linked_list.size);
});



//saving nodes and linked list in Mongodb
router.get('/save', function(req, res) {

//creating empty LL
var lList= new LinkedList({head: null, size: linked_list.size});

var prevNode=null;

data_list.forEach(element => {

    var node=new Node({data: element, next: null});

    node.save(function (err) {
      if (err) { console.log(err); }

      if(lList.head==null){
        lList.head=node._id;    
      }
      else{
        Node.findOne({_id: prevNode})
        .exec(function (err, prevnode) {
          if (err) { return next(err); }
          prevnode.next=node._id;
          prevnode.save(function (err) {
            if (err) { console.log(err) }});
            
        });
        
      }
      prevNode=node._id;


    }); 
});
  

  lList.save(function (err) {
    if (err) { console.log(err); }
    console.log('linked list created: ' +lList);
  });
});

router.get('/getNodes', function(req, res) {
  Node.find({})
    .exec(function (err, nodes) {
      if (err) { return next(err); }
      //Successful, so render
      console.log(nodes);
    });
});

// router.get('/deleteNodes', function(req, res) {
//   Node.deleteMany({})
//     .exec(function (err) {
//       if (err) { return next(err); }
//       //Successful, so render
//     });
// });

module.exports = router;
