import getCurrentUser from "../actions/getCurrentUser"

import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import SettingsClient from "./SettingsClient"

const SettingsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Something went wrong"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <SettingsClient />
    </ClientOnly>
  )
}

export default SettingsPage