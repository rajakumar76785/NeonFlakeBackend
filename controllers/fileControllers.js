const File = require('../models/File');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

exports.uploadFile = async( req, res) => {
    try{ 
        const{ title, description} = req.body;
        const thumbnail = req.files.thumbnail;
        const video = req.files.video;
        if (!title || !description || !thumbnail || !video) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }
        const imageSupportedTypes = ["jpg","png"];
        const videoSupportedTypes = ["mp4","avi","mpg"];
        const imageFileType = thumbnail.name.split('.')[1].toLowerCase();
        const videoFileType = video.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(imageFileType,imageSupportedTypes)){
           return res.status(400).json({
            success:false,
            message:"This image file type is not supported",
           });
        } 
        if(!isFileTypeSupported(videoFileType,videoSupportedTypes)){
            return res.status(400).json({
                success:false,
                message:"video format is not supported",
            });
        }
        
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        console.log(thumbnailImage);
        const videoFile = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );
        console.log(videoFile);

        const newfile =  await File.create({
            title,
            description,
            thumbnailUrl:thumbnailImage.secure_url,
            videoUrl:videoFile.secure_url,
        });
        console.log("file is here", newfile);
        return res.status(200).json({
            success:true,
            message:"File created successfully",
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"File not able to create",
            error,
        });
    }
}
exports.getAllFile = async( req, res) => {
    try{
        const files = await File.find();
        return res.status(200).json(//files);
        {
            success:true,
            message:"fetched all files successfully",
            files,
        }
        );
        
    }catch(error){
        return res.status(400).json({
            success:true,
            message:"error while fetching files",
        })
    }
}

exports.getFileById = async( req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
          return res.status(404).json({ message: 'File not found' });
        }
        return res.status(200).json(file);
        /*{
            success:true,
            message:"File fetched successfully",
            file,
        });
        */
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch media', error });
      }
}