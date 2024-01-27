import React from 'react'
import Heading from '../components/Heading'
import Sub_Heading from '../components/Sub_Heading'
import Input_box from '../components/Input_box'
import Button from '../components/Button'
import Bottom_warning from '../components/Bottom_warning'

function Signup() {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"} />
          <Sub_Heading label={"Enter your infromation to create an account"} />
          <Input_box placeholder="Ex: John" label={"First Name"} />
          <Input_box placeholder="Ex: Doe" label={"Last Name"} />
          <Input_box placeholder="Ex: john@gmail.com" label={"Email"} />
          <Input_box placeholder="Ex: John@123#" label={"Password"} />
          <div className='py-4'>
            <Button label={"Sign up"} />
          </div>
          <Bottom_warning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
        </div>
      </div>
    </div>
  )
}

export default Signup