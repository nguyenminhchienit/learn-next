import React from 'react'
import RegisterForm from './register-form'

const Register = async () => {
  return (
    <div className='my-auto w-full'>
      <h1 className='flex justify-center text-xl font-bold'>Đăng ký</h1>
      <div className='flex justify-center'>
        <RegisterForm/>
      </div>
    </div>
  )
}

export default Register
