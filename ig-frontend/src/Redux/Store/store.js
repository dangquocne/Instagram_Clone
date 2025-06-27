import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { AuthReducer } from "../Auth/Reducer";
import {thunk} from "redux-thunk"
import { UserReducer } from "../User/Reducer";
import { PostReducer } from "../Post/Reducer";
import { CommentReducer } from "../Comment/Reducer";
import { StoryReducer } from "../Story/Reducer";


// Kết hợp nhiều reducer thành một reducer gốc (root reducer)
const rootReducers=combineReducers({
    // Gắn reducer tên "auth" với reducer xử lý logic đăng nhập/đăng ký
       auth:AuthReducer,

       // Gắn reducer tên "user" với reducer xử lý tra ve use hien tai
       user:UserReducer,

       post: PostReducer ,

       comment: CommentReducer,
       story: StoryReducer,
})

// Tạo Redux store với middleware hỗ trợ async (thunk)
// legacy_createStore: phiên bản tạo store cũ, dùng thay vì configureStore của Redux Toolkit
export const store= legacy_createStore(rootReducers,applyMiddleware(thunk));