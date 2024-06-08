import Link from 'next/link';
import React from 'react';

const ToastLink = ({ signature, endpoint }: { signature: string; endpoint: string }) => {
    return (
        <Link
            href={`https://explorer.solana.com/tx/${signature}${endpoint === 'devnet' ? '?cluster=devnet' : ''}`}
            target="_blank"
            style={{ textDecoration: 'none' }}
        >{`Signature: ${signature}`}</Link>
    );
};

export default ToastLink;
