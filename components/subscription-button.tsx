"use client"

import { Button } from "@/components/ui/button"
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react"
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
    upgrade?: boolean;
}
export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
    upgrade = false
}) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url
        } catch (error) {
            toast.error("Something went wrong")
            console.log("BILLING_ERROR", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button
            onClick={onClick}
            disabled={loading}  
            variant={upgrade ? "default" : "premium"}   
        >
            {upgrade ? "Manage Subscription" : "Upgrade to Pronto Pro"}
            {!upgrade && <Zap className="w-4 h-4 ml-2 fill-white"/>}
        </Button>
    )
}