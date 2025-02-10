'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function SignIn() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    return (
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-lg border border-neutral-200 bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Use your Google account to sign in
                    </p>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => signIn('google', { callbackUrl })}
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                    >
                        <Image
                            src="/google.svg"
                            alt="Google logo"
                            width={18}
                            height={18}
                        />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    )
} 