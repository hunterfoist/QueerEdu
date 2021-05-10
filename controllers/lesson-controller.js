const { Router } = require("express");
const Lesson = require('../db').import('../models/lesson-model');
const validateSession = require("../middleware/validate-session");
const router = Router();


router.post('/createlesson', validateSession, (req, res) => {
    // if (req.user.teacherOrStudent != 'Teacher'){
    //     res.json({message: "You are not an teacher and therefore ineligible to create a lesson"})
    //   }
    
    const createLesson = {
      lessonName: req.body.lesson.lessonName,
      lessonDescription: req.body.lesson.lessonDescription,
      fileUpload: req.body.lesson.fileUpload,
      userId: req.user.id

  } 
  Lesson.create(createLesson)
  .then(lesson => res.status(200).json(lesson))

  .catch(err => res.status(500).json({error: err}))
  
});



router.get("/getmylessons", validateSession, (req, res) => {
    // if (req.user.teacherOrStudent != 'Teacher'){
    //     res.json({message: "You are not an teacher and therefore ineligible to view user lessons"})
    //   }
    let userId = req.user.id
  Lesson.findAll({
    where: {userId: userId}
})
  .then(lessons => res.status(200).json(lessons))
  .catch(err => res.status(500).json({error: err}))
});

router.get("/getalllessons",  (req, res) => {
  // if (req.user.teacherOrStudent != 'Teacher'){
  //     res.json({message: "You are not an teacher and therefore ineligible to view user posts"})
  //   }
  
Lesson.findAll({
  
})
.then(lessons => res.status(200).json(lessons))
.catch(err => res.status(500).json({error: err}))
});

router.put('/updatelesson/:id', validateSession, function(req, res) {
    // if (req.user.teacherOrStudent != 'Teacher'){
    //     res.json({message: "You are not an teacher and therefore ineligible to update a lesson"})
    //   }
    const updateLessons = {
        lessonName: req.body.lesson.lessonName,
        lessonDescription: req.body.lesson.lessonDescription,
        fileUpload: req.body.lesson.fileUpload,
        userId: req.user.id
  };
  const query = { where: {id: req.params.id}};

  Lesson.update(updateLessons, query)
  .then((lessons) => res.status(200).json(lessons))
  .catch((err) => res.status(500).json({error: err}));
})


router.delete('/deletelesson/:id', validateSession, function(req, res) {
    // if (req.user.teacherOrStudent != 'Teacher'){
    //     res.json({message: "You are not an teacher and therefore ineligible to delete a lesson"})
    //   }

    const query = { where: { id: req.params.id, userId: req.user.id}};
Lesson.destroy(query)
.then((response) =>
res.status(200).json({
  message: "Lesson Has Been Deleted",
})
)
.catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;