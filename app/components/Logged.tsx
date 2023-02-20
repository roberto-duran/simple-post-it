'use client'
import {signOut} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

type Props = {
    image: string
}

export default function Logged({image}: Props) {
    return (
        <>
            <li className="flex gap-8 items-center">
                <button onClick={() => signOut()}
                        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-md">
                    Sign Out
                </button>
            </li>
            <Link href={"/dashboard"}>
                <Image src={image} alt={"user image"} width={64} height={64} className={"rounded-full"}/>
            </Link>
        </>
    );
};
