const { Router } = require("express");
const Post = require('../db').import('../models/post-model');
const validateSession = require("../middleware/validate-session");
const router = Router();


router.post('/createpost', validateSession, (req, res) => {
    if (req.user.teacherOrStudent != 'Teacher'){
        res.json({message: "You are not an teacher and therefore ineligible to create a post"})
      }
    
    const createPost = {
      postTitle: req.body.post.postTitle,
      postDescription: req.body.post.postDescription,
      imageUpload: req.body.post.imageUpload

  } 
  Post.create(createPost)
  .then(post => res.status(200).json(post))

  .catch(err => res.status(500).json({error: err}))
  
});


router.get("/getmyposts", validateSession, (req, res) => {
    if (req.user.teacherOrStudent != 'Teacher'){
        res.json({message: "You are not an teacher and therefore ineligible to view user posts"})
      }
    let owner_id = req.user.id
  Post.findAll({
    where: {owner_id: owner_id}
})
  .then(posts => res.status(200).json(posts))
  .catch(err => res.status(500).json({error: err}))
});

router.put('/updatepost/:id', validateSession, function(req, res) {
    if (req.user.teacherOrStudent != 'Teacher'){
        res.json({message: "You are not an teacher and therefore ineligible to update a post"})
      }
    const updatePosts = {
        postTitle: req.body.post.postTitle,
        postDescription: req.body.post.postDescription,
        imageUpload: req.body.post.imageUpload
  };
  const query = { where: {id: req.params.id}};

  Post.update(updatePosts, query)
  .then((posts) => res.status(200).json(posts))
  .catch((err) => res.status(500).json({error: err}));
})


router.delete('/deletepost/:id', validateSession, function(req, res) {
    if (req.user.teacherOrStudent != 'Teacher'){
        res.json({message: "You are not an teacher and therefore ineligible to delete a post"})
      }

    const query = { where: { id: req.params.id, owner_id: req.user.id}};
Post.destroy(query)
.then((response) =>
res.status(200).json({
  message: "Post Has Been Deleted",
})
)
.catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;