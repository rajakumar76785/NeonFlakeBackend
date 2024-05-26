const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    thumbnailUrl: { 
        type: String, 
        required: true,
    },
    videoUrl: { 
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model("File",fileSchema);