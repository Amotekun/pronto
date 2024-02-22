import Image from "next/image"

interface EmptyProps {
    label: string
};

export const Empty: React.FC<EmptyProps> = ({
    label   
}) => {
    return (
        <div className="h-full p-20 flex items-center justify-center flex-col">
            <div className="relative h-72 w-72">
                <Image 
                    src="/empty.png"
                    alt="Empty"
                    fill
                />
            </div>
            <p className="text-muted-foreground text-sm text-center ">
                {label}
            </p>
        </div>
    )
}