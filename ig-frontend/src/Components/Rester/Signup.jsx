import React, { useEffect } from 'react'
import * as Yup from "yup"
import { Field, Form, Formik } from 'formik'
import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signupAction } from '../../Redux/Auth/Action'

const validationShema = Yup.object().shape({
  email: Yup.string().email("Invalid email adress").required("Required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Required")
})
const Signup = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const toast =useToast();

  const initialValues = { email: "", password: "", username: "", name: "" };

  const handleSubmit = (values,actions) => {
    console.log("values:", values)
    dispatch(signupAction(values));
    actions.setSubmitting(false);

  }


  //KHi đăng kí thành công sẽ chuyển sang trang login và thông báo
  useEffect(()=>{
    if(auth.signup?.username){
      navigator("/login");
      toast({
          title: `Account created. ${auth.signup?.username}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
    }
    

  },[auth.signup])

  const handleSignIn = () => navigator("/login")
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

                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="username"
                        placeholder="UserName"
                      />
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="name"
                        placeholder="Full Name"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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

                <Button className="w-full mt-2" colorScheme="blue" type="submit" isLoading={formikProps.isSubmitting}>
                  Signup
                </Button>
              </Form>

            }
          </Formik>
        </Box>
      </div>

      <div>
        <p className='text-center py-2'>If you  have account <span onClick={handleSignIn} className='ml-2 text-blue-700 cursor-pointer'>Sign In</span></p>
      </div>
    </div>
  )
}

export default Signup