import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {
    const upgrade = await checkSubscription()
    return (
        <div>
            <Heading 
                title="Settings"
                description="Manage your account settings"
                icon={Settings}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {upgrade ? "You are currenty on an upgraded plan" : " you are currently on a free plan"}
                </div>
                <SubscriptionButton 
                    upgrade={upgrade}
                />
            </div>
        </div>
    )
}

export default SettingsPage;