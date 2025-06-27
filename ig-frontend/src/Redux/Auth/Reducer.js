import { SIGN_IN, SIGN_UP } from "./ActionTye"

// Giá trị khởi tạo ban đầu cho state trong reduce
const initialValue={
    signin:null,// Dùng để lưu thông tin đăng nhập (JWT token hoặc user info)
    signup: null  // Dùng để lưu thông tin khi người dùng đăng ký
}

// Hàm reducer xử lý các action liên quan đến authentication (đăng nhập / đăng ký)
 export const AuthReducer=(store=initialValue,{type,payload})=>{
       
     // Nếu action là SIGN_IN thì cập nhật trường signin với dữ liệu mới từ payload
    if(type===SIGN_IN){
        return {...store// Giữ nguyên các dữ liệu cũ
            ,signin:payload // Ghi đè dữ liệu đăng nhập
        }
       }
       else if(type===SIGN_UP){
        return {...store// Giữ nguyên các dữ liệu cũ
            ,signup:payload// Ghi đè dữ liệu đăng nhập
        }
       }
       
  // Trường hợp không khớp với action nào thì trả lại state cũ
       return store;
}