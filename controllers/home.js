const BlogPost = require('../models/BlogPost')
module.exports = async(req, res) => {
    const blogpost  = await BlogPost.find({}).populate('userid')
    res.render('index', {
        blogpost
    });
}