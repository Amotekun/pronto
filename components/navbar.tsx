import { UserButton } from "@clerk/nextjs"
import { MobileSidebar } from "./mobile-sidebar"
import { getUserApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

export const Navbar = async () => {
  const userApiLimit = await getUserApiLimit();
  const upgrade = await checkSubscription();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar 
        upgrade={upgrade}
        userLimitApi={userApiLimit}
      />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
