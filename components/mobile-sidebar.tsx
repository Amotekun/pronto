"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Sidebar } from './sidebar'

interface MobileSidebarProps {
  userLimitApi: number
  upgrade: boolean
}
export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  userLimitApi = 0,
  upgrade = false
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return null;
  }
  return (
    <Sheet>
        <SheetTrigger>
            <Button 
              variant="ghost"
              size="icon" 
              className='md:hidden'
            >
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar
              upgrade={upgrade}
              userApiLimit={userLimitApi}
            />
        </SheetContent>
    </Sheet>
  )
}
