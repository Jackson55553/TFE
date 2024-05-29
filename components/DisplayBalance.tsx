'use client';
import { FC } from 'react';

import React from 'react';

const DisplayBalance: FC = () => {
    return <div>balance:</div>;
};

export default DisplayBalance;

// const [balance, setBalance] = useState(0);
// const { connection } = useConnection();
// const { publicKey } = useWallet();

// useEffect(() => {
//     if (!connection || !publicKey) {
//         return;
//     }

//     connection.onAccountChange(
//         publicKey,
//         (accInfo) => {
//             setBalance(accInfo.lamports / LAMPORTS_PER_SOL);
//         },
//         'confirmed',
//     );

//     connection.getAccountInfo(publicKey).then((info) => {
//         setBalance(info ? info.lamports / LAMPORTS_PER_SOL : 0);
//     });
// }, [connection, publicKey]);
