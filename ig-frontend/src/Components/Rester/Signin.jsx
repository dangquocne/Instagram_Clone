import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { signinAction } from '../../Redux/Auth/Action'
import { getUserProfile } from '../../Redux/User/Action'


const validationShema = Yup.object().shape({
  email: Yup.string().email("Invalid email adress").required("Required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Required")
})
const Signin = () => {

  const initialValues = { email: "", password: "" };
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store);
  const jwt = localStorage.getItem("token");



  //hàm sử dụng để đăng nhập 
  const handleSubmit = (values, actions) => {
    // console.log("values:", values)

    // Gửi action đăng nhập lên Redux (giả sử trả về Promise)
    dispatch(signinAction(values))

    // Sau khi xử lý xong (thành công hoặc thất bại), tắt trạng thái loading của form
    actions.setSubmitting(false);

  }

    // useEffect này sẽ được gọi mỗi khi giá trị của jwt thay đổi
    useEffect(() => {
      
      if(jwt) dispatch(getUserProfile(jwt));


    }, [jwt]);// Chạy lại effect này mỗi khi jwt thay đổi



  // useEffect này dùng để điều hướng sau khi đã lấy được thông tin người dùng
    useEffect(() => {

      // Kiểm tra nếu user.reqUser có username (tức là đã lấy được profile)
      if (user.reqUser?.username) {

            // Điều hướng người dùng sang trang cá nhân, ví dụ: /tuan123
        navigator(`/${user.reqUser?.username}`)
      }

    }, [jwt,user.reqUser]);// Chạy lại khi user.reqUser thay đổi



//hàm bấm Sign Up để chuyển trang đăng ký
  const handleSignUp = () => navigator("/signup");

  return (
    <div>
      <div >
        <Box p={8} display={"flex"} flexDirection={"column"} alignItems={"center"}>

          <img className='w-40 mb-5 ' src="https://i.imgur.com/zqpwkLQ.png" alt="" />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationShema}
          >

            {(formikProps) =>
              <Form className='space-y-5'>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="email"
                        placeholder="Mobile Number Or Email"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="password"
                        placeholder="Password"
                      />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <p className="text-center text-sm">People who use our service may have uploaded your contact information to Instagram. Learn More</p>
                <br />
                <p className="text-center text-sm">By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>

                <Button className="w-full" mt={4} colorScheme="blue" type="submit" isLoading={formikProps.isSubmitting}>
                  Signin
                </Button>
              </Form>

            }
          </Formik>
        </Box>
      </div>

      <div>
        <p className='text-center py-2'>If you don't have account <span onClick={handleSignUp} className='ml-2 text-blue-700 cursor-pointer'>Sign Up</span></p>
      </div>
    </div>
  )
}

export default Signin