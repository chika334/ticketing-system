const { Image } = require('../model/Image')
const User = require('../model/user')
const _ = require('lodash')
const multer = require('multer');
const errorHandler = require('../helpers/dbErrorHandler')

let Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    //console.log(ext)
    if (!(ext == '.jpg' || ext == '.png' || ext == '.jpeg')) {
      return cb(new Error('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true)
  }
})

const uploads = multer({ storage: Storage }).single('imageUpload');

const createEvent = async (req, res, next) => {
    const image = new Image({
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
        description: req.body.description,
        number: req.body.number,
        uuid: req.body.uuid
    })
    image.save()
    res.status(200).json({
        msg: "Event successfully created"
    })
}

/**
 * Load events and append to req.
 */
const eventByID = (req, res, next, id) => {
  Image.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  })
}

const readEvents = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const ListEvents = (req, res) => {
  Image.find((err, images) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(images)
  })
}


module.exports = { createEvent, fileUpload: uploads, ListEvents, readEvents, eventByID }
