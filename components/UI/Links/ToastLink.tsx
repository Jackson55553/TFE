import Link from 'next/link';
import React from 'react';

const ToastLink = ({ signature }: { signature: string }) => {
    return (
        <Link
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            style={{ textDecoration: 'none' }}
        >{`Signature: ${signature}`}</Link>
    );
};

export default ToastLink;
