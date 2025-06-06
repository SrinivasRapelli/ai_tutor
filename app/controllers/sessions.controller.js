const Session = require('../models/session.model');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.upload = upload.array('files', 2);


exports.createSession = async (req, res) => {
    try {
        const {keystage, year, subject} = req.body;
        const files = req.files ? req.files.map(file => file.path) : [];
        const session = new Session({
            keystage, 
            year,
            subject,
            files
        })
        await session.save();
    res.status(201).json({
      session,
      message: "Session created successfully",
      files: files.length > 0 ? files : "No files uploaded",
    }
    );
    } catch (error) {
       res.status(500).json({
        message: "Error creating session",
        error: error.message
       }) 
    }
    
}

exports.getSessions = async (req, res) => {
  try{
    const sessions = await Session.find();
    const count = await Session.countDocuments();

    res.status(200).json({
      count: count,
      message: "Sessions fetched successfully",
      sessions
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching sessions",
      error: error.message
    });
  }
}

// exports.getSessionsByFields =async (req, res)=>{
//     try{
//         const { keystage, year, subject} =req.query;
//         if (!keystage || !year || !subject) {
//             return res.status(400).json({
//                 message: "Please provide keystage, year, and subject"
//             });
//         }
//         const session = await Session.findOne({
//             keystage: keystage,
//             year: year,
//             subject: subject
//         });
//             res.status(200).json(session);

//     }
//     catch(error){
//         res.status(500).json({
//             message: "error fetching session by fields",
//             error: error.message
//         })
//     }
// }


exports.getFilesBySessionFields = async (req, res) => {
  try {
    const { keystage, year, subject } = req.query;
    const sessions = await Session.find({ keystage, year, subject });
    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: "No sessions found for the selected fields" });
    }
    const files = sessions.reduce((acc, session) => {
      if (session.files && Array.isArray(session.files)) {
        acc.push(...session.files);
      }
      return acc;
    },[],);

    res.status(200).json({
      message: "Files fetched successfully",
      keystage,
      year,
      subject,
      files
      
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Error fetching files by session fields",
      error: error.message
    });
  }
};


exports.deleteSession = async (req, res) => {
  try{
    const {keystage, year, subject} = req.body || req.query;
    
    const session = await Session.findOneAndDelete({
      keystage: keystage,
      year: year,
      subject: subject
    })
    if (!session) {
      return res.status(404).json({
        message: "Session not found for the given fields",
        keystage,
        year,
        subject
      })
    }
    res.status(200).json({
      message: "Session deleted successfully",
      session: session
    })
  }catch(error){
    res.status(500).json({
      message: "error deleting session",
      error: error.message
    })
  }
}
