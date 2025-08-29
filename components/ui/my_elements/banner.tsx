import {cn} from "@/lib/utils";
import Image from "next/image";

export default function Banner({className, label, imgUrl}: { className?: string, label?: string, imgUrl: string }) {
    return (
        <div className={cn('relative w-full h-[120px] flex justify-center items-center overflow-hidden', className)}>
            <Image src={imgUrl} alt={'banner img'} style={{objectFit: "cover"}} width = {1400} height = {800}/>
            <div className={'px-4 text-center w-full absolute top-0 left-0 h-full flex justify-center items-center font-light text-[24px] text-secondary-foreground'}>{label}</div>
        </div>
    )
}