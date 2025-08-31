// funções do better-auth: 
import { createAuthClient } from "better-auth/react"

// plugins:
import { emailOTPClient, passkeyClient, twoFactorClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    plugins: [
        emailOTPClient(),
        passkeyClient(),
        twoFactorClient()
    ]
})

export const { signIn, signUp, useSession } = createAuthClient()