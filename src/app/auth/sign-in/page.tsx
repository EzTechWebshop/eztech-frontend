import SignInForm from '@/components/forms/auth/sign-in-form'
import { Link, Strong, Text } from '@radix-ui/themes'

export type SignInPageProps = {
    searchParams: {
        message: string
    }
}

export default function SignInPage({ ...props }: SignInPageProps) {
    const { message } = props.searchParams

    return (
        <div className="flex flex-1">
            <div className="flex flex-col mx-auto mt-4 border-2 rounded-md shadow-md p-8 space-y-4 w-fit">
                {message && <div>{message}</div>}
                <SignInForm />
                <div>
                    <Text>
                        Dont have an account?{' '}
                        <Text className="hover:cursor-pointer hover:opacity-75">
                            <Link href={'/auth/sign-up'}>
                                <Strong>Sign up</Strong>
                            </Link>
                        </Text>
                    </Text>
                </div>
            </div>
        </div>
    )
}
