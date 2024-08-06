import { cookies } from 'next/headers'

export async function GET(request) {
    const cookieStore = cookies()
    const token = cookieStore.get('session')

    console.log(cookieStore.getAll())

    return Response.json({ token })
}