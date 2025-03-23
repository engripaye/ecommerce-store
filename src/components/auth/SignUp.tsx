"use client";
import React, { useActionState } from 'react'
import Form  from 'next/form';
const initialState = {

    message:'',
}

type SignUpProps = {
    action: (prevState : any, formData: FormData) => Promise<{message: string} | undefined>
}

const SignUp = ({action}: SignUpProps) => {

    const [state, formAction, isPending] = useActionState(action, initialState);


  return (
   <Form action={formAction} className='max-w-md mx-auto my-16 p-8 bg-white rounded-lg shadow-md'>
    <h1 className='text-2xl font-bold text-center mb-2'>
        Join the DEAL Revolution!
    </h1>

   </Form>
    
  )
}

export default SignUp;
