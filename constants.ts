import { 
  Code, 
  ImageIcon, 
  MessageSquare, 
  Music,
  VideoIcon 
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

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