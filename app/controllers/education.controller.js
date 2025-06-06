const Year = require('../models/education.model');


const createKeyStage = async (req, res) => {
    try {
        const newYear = new Year({
           ...req.body
        });
        await newYear.save();
        res.status(201).json({
            
            message: "Key Stage created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating Key Stage",
            error: error.message
        });
    }
}
const getKeyStages = async (req, res)=>{
    try {
        const keyStages = await Year.find();
        res.status(200).json({
            keyStages,
            message: "Key Stages fetched successfully"  
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching Key Stages",
            error: error.message    
        })
    }
}


const getYearsByKeyStage = async (req, res)=>{
    try {
        const {name} = req.params;
        const keyStage = await Year.findOne({name});
        if(!keyStage){
            return res.status(404).json({
                message: "Key Stage not found"
            });
        }

        res.status(200).json(keyStage.years.map(year => year.year),);
        
    } catch (error) {
        res.status(500).json({
            message: "Error fetching Years by Key Stage",
            error: error.message    
        })
    }
}

const getSubjectByKeyStageAndYear = async (req, res)=>{
    try {
        const {name, year} = req.params;
        const keyStage = await Year.findOne({name});
        if(!keyStage){
            return res.status(404).json({
                message: "Key Stage not found"
            });
        }
        const yearObj = keyStage.years.find(y => y.year === year);
        if(!yearObj){
            return res.status(404).json({
                message: "Year not found in the specified Key Stage"
            });
        }

        res.status(200).json(yearObj.subjects.map(subject => subject.name));

        
    } catch (error) {
        res.status(500).json({
            message: "Error fetching Subjects by Key Stage and Year",
            error: error.message    
        })
    }
}

module.exports = { createKeyStage, getKeyStages, getYearsByKeyStage, getSubjectByKeyStageAndYear };
