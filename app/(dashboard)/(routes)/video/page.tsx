"use client"

import { Heading } from '@/components/heading'
import { Video } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { videoSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import toast from 'react-hot-toast'

const VideoPage = () => {
    const upgradeModal = useUpgradeModal();
    const router = useRouter();
    const [video, setVideo] = useState<string>()

    console.log("Music", video)

    const form = useForm<z.infer<typeof videoSchema>>({
        resolver: zodResolver(videoSchema),
        defaultValues: {
            prompt: ''
        }
    });
    
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof videoSchema>) => {
        try {
            setVideo(undefined)

            const response =  await axios.post("/api/video", values)

            console.log("Response", response)
            setVideo(response.data[0])
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
            title='Video'
            description='Create your own video.'
            icon={Video}
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
                                            placeholder='Type a music prompt...'
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
                {!video && !isLoading && (
                    <Empty label="No Video generated." />
                )}
                {video && (
                    <video
                        controls
                        className='w-full mt-8'
                    >
                        <source src={video} />
                    </video>
                )}
            </div>
        </div>
    </div>
  )
}

export default VideoPage;