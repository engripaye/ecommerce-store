import { getCurrentSession, loginUser, registerUser } from '@/actions/auth';
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import { redirect } from 'next/navigation';
import React from 'react';
import zod from 'zod';

const SignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
});

const SignInPage = async () => {
    const { user } = await getCurrentSession();

    if (user) {
        return redirect('/');
    }

    const action = async (prevState: any, formData: FormData) => {
        "use server";
        const parsed = SignInSchema.safeParse(Object.fromEntries(formData));
        if (!parsed.success) {
            return {
                message: "Invalid form data",
            };
        }

        const { email, password } = parsed.data;
        const { user, error } = await loginUser(email, password);
        if (error) {
            return { message: error };
        } 

        if (user) {
            
            return { success: true };  // Indicate successful signup
        }

        return { message: "Something went wrong" };
    };

    return <SignIn action={action} />;
};

export default SignInPage;
