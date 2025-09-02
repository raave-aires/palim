// funções do better-auth: 
import { createAuthClient } from "better-auth/react"
import type { auth } from "@/lib/auth"

// plugins:
import { customSessionClient, emailOTPClient, passkeyClient, twoFactorClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    plugins: [
        customSessionClient<typeof auth>(),
        emailOTPClient(),
        passkeyClient(),
        twoFactorClient(),
    ]
})

export const { signIn, signUp, useSession } = createAuthClient()