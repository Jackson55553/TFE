"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();
    return (
        <div>
            <h1>{`can't find page on path ${pathname}`}</h1>
        </div>
    );
}
