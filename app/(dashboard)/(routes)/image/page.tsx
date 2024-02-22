"use client"

import { Heading } from '@/components/heading'
import { Download, Image as ImageIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
    amountOptions, 
    imageSchema, 
    resolutionOptions 
} from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
    Form, 
    FormControl, 
    FormField,
    FormItem 
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'

import * as z from "zod";
import axios from 'axios';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import toast from 'react-hot-toast'


const CodePage = () => {
    const upgradeModal = useUpgradeModal();
    const router = useRouter();
    const [photos, setPhotos] = useState<string[]>([])

    const form = useForm<z.infer<typeof imageSchema>>({
        resolver: zodResolver(imageSchema),
        defaultValues: {
            prompt: '',
            amount: "1",
            resolution: "512x512"
        }
    });

    console.log("Photos", photos);
    
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof imageSchema>) => {
        try {
             setPhotos([]);

            const response =  await axios.post("/api/image", values)

            const urls = response.data.map((image: {url:string}) => image.url)

            setPhotos(urls)

            console.log("Upload", urls);
            console.log("Values", values);
            console.log("Response", response.data);
            console.log("Response", response);
            
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
            title='Image Generation'
            description='Chat with your friends and family.'
            icon={ImageIcon}
            iconColor='text-violet-700'
            bgColor='bg-violet-700/10'
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
                                <FormItem className='col-span-12 lg:col-span-6'>
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
                        <FormField 
                            control={form.control}
                            name='amount'
                            render={({field}) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((options) => (
                                                <SelectItem
                                                    key={options.value}
                                                    value={options.value}
                                                >
                                                    {options.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                        
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name='resolution'
                            render={({field}) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((resolution) => (
                                                <SelectItem
                                                    key={resolution.value}
                                                    value={resolution.value}
                                                >
                                                    {resolution.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>        
                                    </Select>
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
                    <div className='p-20'>
                        <Loader />
                    </div>
                )}
                {photos.length === 0 && !isLoading && (
                    <Empty label="No conversations started." /  >
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                    {photos.map((photo) => (
                        <Card
                            key={photo}
                            className='rounded-lg overflow-hidden'
                        >
                            <div className='relative aspect-square'>
                                <Image 
                                    src={photo}
                                    alt="Generated"
                                    fill    
                                />
                            </div>
                                <CardFooter>
                                    <Button 
                                        onClick={() => window.open(photo)}
                                        variant="secondary"
                                        className='w-full'
                                    >
                                        <Download className='h-4 w-4 mr-2'/>
                                        Download
                                    </Button>
                                </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
};

export default CodePage;