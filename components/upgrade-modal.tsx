"use client"
import { 
    Check,
    Code, 
    ImageIcon, 
    MessageSquare, 
    Music,
    VideoIcon, 
    Zap
  } from "lucide-react";

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { Badge } from "@/components/ui/badge"
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";

export const tools = [
    {
        label: 'Conversations',
        icon: MessageSquare,
        href: '/conversation',
        color: "text-violet-500",
        bgColor: "bg-violet-500/10"
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/music',
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      },
      {
        label: 'Image Generation',
        icon: ImageIcon,
        href: '/image',
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
      },
      {
        label: 'Video Generation',
        icon: VideoIcon,
        href: '/video',
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
      },
      {
        label: 'Code Generation',
        icon: Code,
        color: "text-green-700",
        href: '/code',
        bgColor: "bg-green-700/10",
      },
]

export const UpgradeModal = () => {
    const upgradeModal = useUpgradeModal()
    const [loading, setLoading] = useState(false);
    
    const onSubscribe = async () => {
        try {
            const response = axios.get("/api/stripe");

            window.location.href = (await response).data.url;
        } catch (error) {
            console.log(error, "STRIPE_CLIENT_ERROR")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog 
            open={upgradeModal.isOpen} 
            onOpenChange={upgradeModal.onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold text-xl">
                            Upgrade your account to continue
                            <Badge
                                variant="premium"
                                className="uppercase text-sm py-1"
                            >
                                Pro Version
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className='flex p-3 border-black/5 items-center justify-between'
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5" />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={onSubscribe}
                        disabled={loading}
                        size="lg"
                        variant="premium"
                        className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent> 
        </Dialog>
    )
}