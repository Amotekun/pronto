"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrisptChat = () => {
     useEffect(() => {
        Crisp.configure("edd62338-0f91-4c2a-bb53-3a6cdaf048d0")
    }, [])

    return null
}