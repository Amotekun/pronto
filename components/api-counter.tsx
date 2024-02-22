import { Card, CardContent } from "@/components/ui/card"
import { MAX_FREE_COUNTS } from "@/constants"
import { Button } from "./ui/button"
import { Zap } from "lucide-react"
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"

export const ApiCounter = ({
    userApiLimit = 0,
    upgrade = false
}) => {
    const upgradeModal = useUpgradeModal()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    };

    if (upgrade) {
        return null
    }
    
    return (
        <div className="px-3">
            <Card className=" bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {userApiLimit} /{MAX_FREE_COUNTS} Free Generations
                        </p>
                        <Progress 
                            value={userApiLimit / MAX_FREE_COUNTS * 100}
                            className="h-3"
                        />
                    </div>
                    <Button 
                        onClick={upgradeModal.onOpen}
                        variant="premium"
                        className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}