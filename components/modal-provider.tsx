"use client"

import { UpgradeModal } from "@/components/upgrade-modal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }
    return (
        <>
            <UpgradeModal />
        </>
    )
}