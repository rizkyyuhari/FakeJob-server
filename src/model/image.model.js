// const conn = require("../config/dbConnection");

// const { Storage } = require("@google-cloud/storage");


// const storage = new Storage({
//     projectId : process.env.GCLOUD_PROJECT,
//     credentials : {
//         client_email :process.env.GCLOUD_CLIENT_EMAIL,
//         private_key : process.env.GCLOUD_PRIVATE
//     }
// })


// const bucket = storage.bucket(process.env.GCS_BUCKET)

// exports.uploadImage = (req, res) => {
//     console.log(req.file.originalname)
//    const blob = bucket.file(req.file.originalname.replace(/ /g, "_"))
//    const blobStream = blob.createWriteStream()

//    blobStream.on('error', err=> console.log(err))

//    blobStream.on('finish', ()=>{
//        const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`
//        conn.query('UPDATE users SET ProfilePhoto = ? WHERE id = ?',[publicUrl,1],(err,result) =>{
//            if(err) throw err
//            return res.send({message : 'berhasil'})
//        })
//    })

//    blobStream.end(req.file.buffer)
// };
