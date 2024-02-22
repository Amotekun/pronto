import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getUserApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const userApiLimit = await getUserApiLimit();
    const upgrade = await checkSubscription();
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 bg-gray-900 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <Sidebar  
                    upgrade={upgrade}
                    userApiLimit={userApiLimit}
                />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;