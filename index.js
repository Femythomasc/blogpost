const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const newPostController = require('./controllers/newPost')
const expressSession = require('express-session')
const flash = require('connect-flash')
const homePageController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const validateController = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticationMiddleware = require('./middleware/redirectIfAuthenticationMiddleware')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
mongoose.connect('mongodb+srv://femythomasc:test@cluster0.bwmclel.mongodb.net/myFirstDatabase1?retryWrites=true&w=majority',{useNewUrlParser: true})
const app = new express()
global.loggedIn = null;

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(expressSession({
    secret: 'App is running'

}))
app.use('*' , (req,res,next) =>{
    loggedIn = req.session.userId;
    next()
});
app.use(flash());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/posts/store',validateController)
app.listen(3500, () => {
    console.log('App listening on port 3500')
})


app.get('/', homePageController)
app.post('/posts/store',authMiddleware,storePostController)
app.get('/post/new',authMiddleware,newPostController)
app.get('/post/:id',getPostController)
app.get('/auth/register',redirectIfAuthenticationMiddleware,newUserController)
app.post('/user/register',redirectIfAuthenticationMiddleware,storeUserController)
app.get('/auth/login',redirectIfAuthenticationMiddleware,loginController)
app.post('/user/login',redirectIfAuthenticationMiddleware,loginUserController)
app.get('/auth/logout',logoutController)