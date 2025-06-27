import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPhotoVideo } from 'react-icons/fa'
import { GrEmoji} from  'react-icons/gr'
import { GoLocation} from  'react-icons/go'
import "./CreatePostModal.css"
import { useDispatch, useSelector } from 'react-redux'
import { createPostAction } from '../../Redux/Post/Action'

import { uploadToCloudnary } from '../../Config/UploadToCloudnary'

const CreatePostModal = ({ onClose, isOpen }) => {

  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
 const dispatch= useDispatch();

const [imageUrl,setImageUrl ]=useState("");
const [location,setLocation ]=useState("");
 const token = localStorage.getItem("token");

 const {user}= useSelector(store=>store);




  // Hàm xử lý khi thả file vào vùng drop 
  const handleDrop = (event) => {

    // Ngăn hành vi mặc định của trình duyệt (ví dụ: mở ảnh trong tab mới)
    event.preventDefault();

    // Lấy file đầu tiên trong danh sách file được thả
    const droppedFile = event.dataTransfer.files[0];

      // Nếu file là ảnh hoặc video
    if (droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/")) {
      // Lưu file vào state
      setFile(droppedFile)
    }
  }

// Hàm xử lý khi kéo file vào vùng drop
  const handleDragOver = (event) => {
    event.preventDefault();

    // Hiển thị hiệu ứng 'copy' khi kéo file vào
    event.dataTransfer.dropEffect = "copy";

     // Cập nhật state để giao diện biết đang trong trạng thái kéo file vào
    setIsDragOver(true);

  }


  const handleDragLeave = (event) => {

    // Cập nhật trạng thái không còn kéo file vào nữa
    setIsDragOver(false);
  }


  // Hàm xử lý khi người dùng chọn file từ input 
  const handleOnchange = async(e) => {

    // Lấy file đầu tiên người dùng chọn
    const file = e.target.files[0];

      // Nếu là ảnh hoặc video
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      
      const imgUrl= await uploadToCloudnary(file)
      setImageUrl(imgUrl);
      //luu vao state
      setFile(file);

      // In ra console để kiểm tra
      console.log("file :", file)

    } else {
      // Không hợp lệ thì reset file
      setFile(null);
      //canh bao nguoi dung
      alert("Please select an image or video")
    }
  }

  	// Hàm xử lý khi người dùng nhập caption
  const handleCaptionChange = (e) => {
    setCaption(e.target.value)
  }


  //hàm này để tạo bài đăng mới
  //nó sẽ gửi dữ liệu lên server để lưu bài đăng mới
  const handleCreatePost=()=>{
    const data={
              jwt:token,
              data:{
                caption,
                location,
                image:imageUrl,
              }
    };

    // console.log(data)
       dispatch(createPostAction(data));
       onClose();
  };

  return (
    <div>
      <Modal size={"4xl"}
        isCentered
        onClose={onClose}
        isOpen={isOpen}>

        <ModalOverlay />
        <ModalContent>
          <div className='flex justify-between py-1 px-10 items-center'>
            <p> Create New Post</p>
            <Button  onClick={handleCreatePost} variant={"ghost"} size="sm" colorScheme={'blue'}>
              Share
            </Button>
          </div>
          <hr />
          <ModalBody>

            <div className='h-[70vh] justify-between pb-5 flex'>

              {/* phan nay la them file hinh anh or video */}
              <div className='w-[50%]'>

                {/* file chua co thi hien thi yeu cau nhap file  */}
                {!file && <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className='drag-drop h-full'
                 
                >
                  <div>
                    <FaPhotoVideo className='text-3xl'></FaPhotoVideo>
                    <p>Drag Photos or videos here</p>
                  </div>
                  <label htmlFor="file-upload" className="custom-file-upload"> Select From Computer</label>

                  <input className='fileInput' type="file" id="file-upload" accept="image/*, video/*" onChange={handleOnchange} />
                </div>}

                {/* co file da nhap vao thi hien thi ra file hinh anh or video */}
                {file && <img className='max-h-full' src={URL.createObjectURL(file)} alt="" />}


              </div>

              <div className='w-[1px] border h-full'></div>

              {/* phan nay la de viet  status  */}
              <div className='w-[50%]'>


                  {/* phan nay la de viet caption  */}
                <div className='flex items-center px-2'>
                  <img className='h-7 w-7 rounded-full'
                   src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
                  <p className='font-semibold ml-4'>{user.reqUser?.username}</p>  
                </div>
                <div className='px-2'>
                  <textarea
                    placeholder='Write a caption'
                    className='captionInput' name="caption" rows="8"
                    onChange={handleCaptionChange}></textarea>
                </div>

                  
                <div class="flex justify-between px-2">
                  <GrEmoji />
                  <p className="opacity-70">{caption?.length} /2,200</p>
                </div>
                <hr />

                <div className='p-2 flex justify-between border-b '>
                  <input onChange={(e)=>setLocation(e.target.value)} className="locationInput" type="text" placeholder="location" name="location" />
                  <GoLocation/>
                </div>
              </div>
            </div>
          </ModalBody>

        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreatePostModal