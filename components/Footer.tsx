'use client'

import Link from "next/link";

import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Instagram, } from "@tailgrids/icons";


export default function Footer() {
    return (
        // footer container
        <div className="mt-5 text-center">
            {/* student */}
        <Badge className="text-2xl text-black rounded-lg">68066986 บุลากร หอมพันธุ์</Badge>
        {/* contacts */}
        <div className="mt-4 flex justify-center gap-4">
            <Link href={'https://www.facebook.com/LayZ.2550'} target='_blank'>
            <Facebook className="text-blue-700" />
            </Link>
            <div className="border-l-1"></div>
            <Link href={'https://www.instagram.com/kannn__bh/'} target='_blank'>
            <Instagram />
            </Link>
        </div>
        </div>
    )
}