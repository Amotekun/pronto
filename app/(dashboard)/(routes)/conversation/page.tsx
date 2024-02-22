"use client"

import { Heading } from '@/components/heading'
import { MessagesSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { conversationSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChatCompletionMessage } from 'openai/resources/index.mjs'
import axios from 'axios'
import { cn } from '@/lib/utils'
import { UserAvatar } from '@/components/user-avatar'
import { BotAvatar } from '@/components/bot-avatar'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import toast from 'react-hot-toast'

const ConversationPage = () => {
    const upgradeModal = useUpgradeModal();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

    console.log("Messages", messages)

    const form = useForm<z.infer<typeof conversationSchema>>({
        resolver: zodResolver(conversationSchema),
        defaultValues: {
            prompt: ''
        }
    });
    
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof conversationSchema>) => {
        try {
            const userMessage = {
                role: "user",
                content: values.prompt
            };

            const newMessages = [...messages, userMessage];

            const response =  await axios.post("/api/conversations", {messages: newMessages})

            setMessages((current) => [...current, userMessage, response.data].reverse())

            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                upgradeModal.onOpen()
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            router.refresh();
        }
    };

  return (
    <div>
        <Heading 
            title='Conversation'
            description='Chat with your friends and family.'
            icon={MessagesSquare}
            iconColor='text-violet-500'
            bgColor='bg-violet-500/10'
        />
        <div className='px-4 lg:px-8'>
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                    >
                        <FormField 
                            name='prompt'
                            render={({field}) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder='Type a message...'
                                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            size="icon"
                            disabled={isLoading}
                            className='w-full col-span-12 lg:col-span-2'
                        >
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='space-y-4 mt-10 '>
                {isLoading && (
                    <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                        <Loader />
                    </div>
                )}
                {messages.length === 0 && !isLoading && (
                    <Empty label="No conversations started." /  >
                )}
                {messages.map((message) => (
                    <div 
                        key={message.content}
                        className={cn(
                            "p-8 w-full flex items-start gap-x-8 rounded-lg",
                            message.role === "assistant" ? "bg-muted" : "bg-white border border-black/10",
                        )}
                    >
                        {message.role === "assistant" ?  <BotAvatar /> : <UserAvatar />}
                        <p className='text-sm'>
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ConversationPage;