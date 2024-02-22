"use client"

import { Heading } from '@/components/heading'
import { Music } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { musicSchema } from './constants'
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
import axios from 'axios'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import toast from 'react-hot-toast'

const MusicPage = () => {
    const upgradeModal = useUpgradeModal();
    const router = useRouter();
    const [music, setMusic] = useState<string>()

    console.log("Music", music)

    const form = useForm<z.infer<typeof musicSchema>>({
        resolver: zodResolver(musicSchema),
        defaultValues: {
            prompt: ''
        }
    });
    
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof musicSchema>) => {
        try {
            setMusic(undefined)

            const response =  await axios.post("/api/music", values)

            console.log("Response", response)
            setMusic(response.data.audio)
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
            title='Music'
            description='Create your own music.'
            icon={Music}
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
                {!music && !isLoading && (
                    <Empty label="No Music generated." />
                )}
                {music && (
                    <audio
                        controls
                        className='w-full mt-8'
                    >
                        <source src={music} />
                    </audio>
                )}
            </div>
        </div>
    </div>
  )
}

export default MusicPage;