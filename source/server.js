const express=require("express");
const mongoose=require('mongoose')
const Article=require('./models/articles')
const articleRouter=require('./routes/article')
const mehtodOverride=require('method-override')
const app=express()
const path=require('path')
mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex:true
})
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(mehtodOverride('_method'))
app.use('/assets',express.static(path.join(__dirname,'./public/assets')));
app.get('/',async(req,res)=>{
   const article=await Article.find().sort({createdat:'desc'})
    res.render('article/home',{article:article})
})
app.get('/job',async(req,res)=>{
   const article=await Article.find().sort({createdat:'desc'})
    res.render('article/job',{article:article})
})
app.get('/learn',(req,res)=>{
    res.render('article/learn');
})
app.get('/contact',(req,res)=>{
    res.render('article/contact');
})
app.use('/article',articleRouter)
app.listen(5000)