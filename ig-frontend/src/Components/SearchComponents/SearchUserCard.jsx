import React from 'react'
import { useNavigate } from 'react-router-dom';

const SearchUserCard = ({user}) => {
    const navigate = useNavigate();
    return (
        <div className='px-3 py-3 cursor-pointer' onClick={() => navigate(`/${user?.username}`)}>
            <div className='flex items-center' >
                <img className="w-10 h-10 rounded-full" 
                src={user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />

            <div className="ml-3">
                <p>{user?.name}</p>
                <p className="opacity-70">{user?.username}</p>
            </div>
            </div>
        </div>
    );
};

export default SearchUserCard;