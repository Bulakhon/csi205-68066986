'use client'
import { Badge } from "@/components/tailgrids/core/badge";


export default function Header() {
    return (
        // header container
        <div className="mt-4 text-center">
            {/* code */}
            <div className='flex justify-center gap-4'>
                <Badge className='text-3xl rounded-lg pl-1 px-3 bg-[#d31c27] text-[#f9fafb] rotate-10'>C</Badge>
                <Badge className='text-3xl rounded-lg pl-1 px-3 bg-[#097038] text-[#f9fafb] -rotate-10'>S</Badge>
                <Badge className='text-3xl rounded-lg pl-1 px-3 bg-[#094af4] text-[#f9fafb] rotate-10'>I</Badge>
                <Badge className='text-3xl rounded-lg pl-1 px-3 bg-[#0bb7e8] text-[#f9fafb] -rotate-5'>2</Badge>
                <Badge className='text-3xl rounded-lg pl-1 px-3 bg-[#faa709] text-[#f9fafb] rotate-10'>0</Badge>
                <Badge className='text-3xl rounded-lg pl-1 px-3 bg-[#586062] text-[#f9fafb] -rotate-5'>5</Badge>
            </div>

            {/* name */}
            <div className="mt-4">
                <Badge size="lg">FRONT END SOFEWARE DEVELOPMENT</Badge>
            </div>

        </div>
    )
}