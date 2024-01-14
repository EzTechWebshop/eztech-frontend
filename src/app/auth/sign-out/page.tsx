'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOutPage() {
    const router = useRouter()
    if (typeof window === 'undefined') return null
    const signout = async () => {
        await signOut({ redirect: false })
        router.push('/')
        router.refresh()
    }
    signout()
    return <div>Signing Out...</div>
}
