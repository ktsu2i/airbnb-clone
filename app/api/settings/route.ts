import prisma from "@/app/libs/prismadb"

import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser()
  const body = await request.json()
  const { image } = body

  if (!currentUser?.id) {
    return new Error("Something went wrong")
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      image: image
    }
  })

  return NextResponse.json(updatedUser)
}