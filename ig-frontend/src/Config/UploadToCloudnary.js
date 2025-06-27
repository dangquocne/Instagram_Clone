export const uploadToCloudnary =async(image)=>{
    if(image){
        const data= new FormData();
        data.append("file",image)
        data.append("upload_preset","instagram")
        data.append("cloud_name","dvxkhsfyj")

        const res= await fetch("https://api.cloudinary.com/v1_1/dvxkhsfyj/image/upload",{
            method:"post",
            body:data
        })

        const fileData= await res.json();

        console.log("fileData",fileData)
        return fileData.url.toString()  
    }
}