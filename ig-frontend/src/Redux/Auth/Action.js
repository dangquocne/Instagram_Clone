import { SIGN_IN, SIGN_UP } from "./ActionTye";

// Định nghĩa action đăng nhập (Redux Thunk) — nhận dữ liệu đăng nhập từ form
export const signinAction=(data)=>async (dispatch)=>{

    try {

        // Gửi request GET tới API đăng nhập
        const res= await fetch('http://localhost:8080/api/users/signin',{
            //  mode: 'cors',
            method:"GET",
            headers:{
                "Content-Type":"application/json",// Kiểu dữ liệu gửi đi (dù GET thường không cần)

                 // Thêm header Authorization kiểu Basic Auth: base64(email:password)
                Authorization: "Basic "+btoa(data.email + ":" + data.password),
                
            }

        })

         // Lấy token từ header của phản hồi (Authorization header từ server trả về)
        const token = res.headers.get("Authorization");

         // Lưu token vào localStorage để sử dụng cho các request tiếp theo
        localStorage.setItem("token",token);

          // Gửi action Redux để cập nhật state đăng nhập thành công
        dispatch({type:SIGN_IN, payload:token})

         // In token ra console để kiểm tra
          console.log("signin token: ",token)
    } catch (error) {
        console.log(error)
    }
}



// Định nghĩa action đăng ký người dùng mới (sử dụng Redux Thunk)
export const signupAction=(data)=>async (dispatch)=>{

    try {
                // Gửi HTTP POST request đến API signup
        const res= await fetch("http://localhost:8080/api/users/signup",{

            // Gửi dữ liệu đăng ký với POST
            method:"POST",
            headers:{
                "Content-Type":"application/json",// Định dạng body là JSON
               
            },

            //bắt buột khi dùng method POST 
             body:JSON.stringify(data)

        })

        // Đọc dữ liệu JSON từ response (thông tin người dùng mới tạo)
        const user = await res.json();

           // In dữ liệu người dùng ra console để kiểm tra
        console.log("signup user: ",user)
       
          // Gửi action đến Redux store để cập nhật state người dùng sau khi đăng ký thành công
        dispatch({type:SIGN_UP,payload:user})
    } catch (error) {
        console.log(error)
    }
}