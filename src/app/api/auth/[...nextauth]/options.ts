import api from '@/utils/api'
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from 'next'
import {
    DefaultSession,
    DefaultUser,
    NextAuthOptions,
    User,
    getServerSession,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AxiosError } from 'axios'
import jwt from 'jsonwebtoken'

// https://authjs.dev/getting-started/typescrit

declare module 'next-auth' {
    interface Session {
        user: User & DefaultSession['user']
        nbf: number
        exp: number
        iat: number
        iss: string
        aud: string
    }
    interface User extends DefaultUser {
        id: string
        firstName: string
        lastName: string
        email: string
        role: 'User' | 'Admin'
        accessToken: string
    }
}

export const authOptions: NextAuthOptions = {
    callbacks: {
        async jwt({ token, user, account, trigger, session }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token as unknown as typeof session.user
            return session
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    value: 'user@example.com',
                    placeholder: 'email@example.com',
                },
                password: {
                    label: 'Password',
                    value: 'password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                const payload = {
                    email: credentials?.email,
                    password: credentials?.password,
                }
                try {
                    if (!payload.email || !payload.password) return null
                    const res = await api.unprotectedApi.post<{
                        accessToken: string
                    }>('/api/auth/sign-in', JSON.stringify(payload), {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    // An interface that shows all the values given after login
                    interface Token {
                        nameid: string
                        given_name: string
                        family_name: string
                        email: string
                        role: 'User' | 'Admin'
                        nbf: number
                        exp: number
                        iat: number
                        iss: string
                        aud: string
                    }
                    const token = res.data.accessToken
                    const decodedToken = jwt.decode(token) as Token
                    const user: User = {
                        id: decodedToken.nameid,
                        firstName: decodedToken.given_name,
                        lastName: decodedToken.family_name,
                        email: decodedToken.email,
                        role: decodedToken.role,
                        accessToken: token,
                    }
                    if (res.status === 200 || user) {
                        return user
                    }
                    return null
                } catch (error: unknown) {
                    if (error instanceof AxiosError) {
                        throw new Error(error.response?.data)
                    }
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/sign-in',
        signOut: '/auth/sign-out',
    },
}

export function auth(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions)
}
