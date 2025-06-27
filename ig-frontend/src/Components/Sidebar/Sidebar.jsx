import React, {  useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { mainu } from './SidebarConfig';
import { useNavigate } from 'react-router-dom';
import CreatePostModal from '../../Components/Post/CreatePostModal'
import { useDisclosure } from '@chakra-ui/react';
import SearchComponents from '../SearchComponents/SearchComponents';
import { useSelector } from 'react-redux';

const Sidebar = () => {

  
     const {user}= useSelector(store=>store);
  // khai báo state để lưu tab đang hoạt động
   const [activeTab, setActiveTab] = useState();

   const navigate = useNavigate();


    const { isOpen, onOpen, onClose } = useDisclosure()

    const[isSearchVisible,setIsSearchVisible]=useState(false);


   // hàm xử lý khi người dùng click vào tab
      const handleTabClick = (title) => {

          setActiveTab(title);
          if(title === "Profile"){
            navigate(`/${user.reqUser?.username}`);
          }else if(title === "Home"){
            navigate("/");
          }else if(title === "Create"){
            onOpen();
          }
          if(title === "Search"){
            setIsSearchVisible(true);
          }else{
            setIsSearchVisible(false);
          }
      }
  return (
    <div className='sticky top-0 h-[100vh] flex'>
          <div className={`flex flex-col justify-between h-full ${activeTab==="Search"?"px-2":"px-10"}`}>
            {<div>
              
              {activeTab!=="Search" && <div className='pt-10'> 
                
                 <img className='w-40' src="https://i.imgur.com/zqpwkLQ.png" alt="" />
              </div>}

                <div className='mt-10'>

                  {mainu.map((item) => <div onClick={() => {handleTabClick(item.title)}} className='flex items-center cursor-pointer mb-5 text-lg'>  
                      
                      {/* //neu tab đang hoạt động thì hiển thị icon active, ngược lại hiển thị icon bình thường */}
                          { activeTab === item.title ? item.activeIcon : item.icon}

                          {/* // nếu tab đang hoạt động thì hiển thị font chữ đậm, ngược lại hiển thị font chữ bình thường */}
                       {activeTab!=="Search" && <p  className={`${activeTab === item.title ? 'font-bold' : 'font-normal'}`}>{item.title}</p>}

                    </div>)}
                    
                </div>

            </div>}

                <div className='flex items-center cursor-pointer pb-10 '>
                  <IoReorderThreeOutline className='text-2xl' />
                  {activeTab!=="Search" &&  <p className='ml-5'>More</p>}
                </div>
              </div>

              {/* phan nay de hien thi noi dung de dang hinh anh va status */}
            <CreatePostModal onClose={onClose} isOpen={isOpen}/>
            {isSearchVisible && <SearchComponents/>}
          
    </div>
  )
}

export default Sidebar