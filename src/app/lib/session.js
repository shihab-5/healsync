import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    return session?.user || null;
}


export const requireRole = async (role) => {
    const user = await getUserSession()
    if (!user) {
        redirect('/auth/login')
    }
    if (user?.role !== role) {
        redirect('/unauthorized')
    }
    return user;
}