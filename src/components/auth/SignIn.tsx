"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';

const initialState = {
    message: '',
};

type SignInProps = {
    action: (prevState: any, formData: FormData) => Promise<{ success?: boolean; message?: string }>;
};

const SignIn = ({ action }: SignInProps) => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(action, initialState);

    // Redirect user to home page when sign-up is successful
    React.useEffect(() => {
        if (state?.success) {
            router.push("/");
        }
    }, [state, router]);

    return (
        <form action={formAction} className='max-w-md mx-auto my-16 p-8 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold text-center mb-2'>
               Welcome Back!
            </h1>
            <p className='text-center text-sm text-rose-600 font-semibold mb-2'>
                🔥 MEMBER EXCLUSIVE 🔥
            </p>
            <p className='text-center text-sm text-gray-600 mb-2'>
                Sign in to access your exclusive member deals.
            </p>

            <div className='space-y-6'>
                {/* Email */}
                <div className='space-y-2'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                        Email Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        autoComplete='email'
                        required
                        className='w-full px-4 py-3 border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors'
                        placeholder='Enter your email'
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        autoComplete='new-password'
                        required
                        className='w-full px-4 py-3 border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors'
                        placeholder='Enter your password'
                    />
                </div>

                {/* Copywriting */}
                <div className='text-center'>
                    <p className='text-xs text-gray-500 mb-2'>⚡ Members save an extra 15% on all orders!</p>
                    <p className='text-xs text-gray-500 mb-2'>🛍️ Plus get free shipping on orders over $15.00</p>
                </div>

                {/* Submit button */}
                <button type='submit'
                    disabled={isPending}
                    className={`w-full bg-rose-600 text-white py-3 rounded-md hover:bg-rose-700 transition-colors font-medium flex items-center justify-center gap-2 ${isPending ? 'cursor-not-allowed' : ''}`}>

                    {isPending ? (
                        <>
                            <Loader2 className='h-4 w-4 animate-spin' />
                            SIGNING IN...
                        </>
                    ) : (
                        'SIGN IN'
                    )}
                </button>

                {/* Error Message */}
                {state?.message && state.message.length > 0 && (
                    <p className='text-center text-sm text-red-600'>
                        {state.message}

                    </p>
                )}

            </div>
        </form>
    );
};

export default SignIn;
