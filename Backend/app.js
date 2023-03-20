const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Post=require('./model/model');
const cors=require('cors');
const port=process.env.PORT || 3000;
require('dotenv').config();

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS');
    next();
}
);
app.use(cors());
/* establist mongoose connetion */
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('Connected to database');
}
)
.catch(()=>{
    console.log('Connection failed');
}
);
/* get route */
app.get('/',(req,res,next)=>{
    Post.find().then(documents=>{
        res.status(200).json({
            message:'Posts fetched successfully',
            posts:documents
        });
    });
    }
);
/* post form route */
app.post('/api/posts',(req,res,next)=>{
  try {
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save();
    res.status(201).json({
        message:'Message added successfully'
    });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({
        message:'Creating a post failed'
    });
  }

}
);

/* listen */
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
}
);