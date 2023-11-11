'use client'

import { SafeUser } from "../types"

import { CldUploadButton } from "next-cloudinary"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Button from "../components/Button"
import Container from "../components/Container"
import Heading from "../components/Heading"
import toast from "react-hot-toast"
import Image from "next/image"


interface SettingsClientProps {
  currentUser?: SafeUser | null
}

const SettingsClient: React.FC<SettingsClientProps> = ({
  currentUser
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    setValue,
    watch
  } = useForm<FieldValues>({
    defaultValues: {
      image: currentUser?.image
    }
  })

  const image = watch('image')

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/settings', data)
      .then(() => {
        router.refresh()
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        toast.success("Updated!")
        router.push('/')
        setIsLoading(false)
      })
  }

  return (
    <Container>
      <Heading title="Settings" subtitle="Set up your icon image" />
      <div className="mt-10">
        <div className="font-semibold text-lg">Photo</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 flex gap-x-3 p-4">
            <Image
              width="100"
              height="100"
              className="rounded-full"
              src={image || currentUser?.image || "/images/placeholder.jpg"}
              alt="Avatar"
            />
            <div className="mt-5 ml-5">
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="yxjwxtro"
              >
                <Button
                  outline
                  label="Change"
                  disabled={isLoading}
                  onClick={() => {}}
                />
              </CldUploadButton>
            </div>
          </div>

          <div className="flex flex-row gap-8 mt-8 w-1/2">
            <Button
              outline
              label="Cancel"
              disabled={isLoading}
              onClick={() => router.push("/")}
            />
            <Button label="Save" disabled={isLoading} onClick={() => {}} />
          </div>
        </form>
      </div>
    </Container>
  );
}

export default SettingsClient