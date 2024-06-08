'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/sass/_tokenInfoCards.module.scss';
import { getTokenMetadata } from '../../../scripts/solanaAPI/getTokenMetadata';
import { useConnection } from '@solana/wallet-adapter-react';
import { errorToast } from '../../../scripts/ts/myToasts';
import TokenInfoCard from './tokeninfoCard/TokenInfoCard';
import { TokenInfo, TokenInfoType } from '../../../types/TokenInfoType';
import LoadingCircle from '../loadingCircle/LoadingCircle';
const TokenInfoCards = ({ tokenAddress }: { tokenAddress: string }) => {
    const { connection } = useConnection();
    const [tokenInfo, setTokenInfo] = useState({} as TokenInfoType);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getTokenMetadata(connection, tokenAddress).then((data) => {
            data
                ? setTokenInfo({
                      ...tokenInfo,
                      name: data?.metadataInfo.data.name,
                      symbol: data?.metadataInfo.data.name,
                      address: tokenAddress,
                  })
                : errorToast('Not found token metadata');
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <LoadingCircle style={{ height: '50px', width: '50px' }} />
                </div>
            ) : (
                <div className={styles.cardsContainer}>
                    {Object.keys(tokenInfo).map((property) => {
                        return (
                            <TokenInfoCard
                                key={`tokenInfo${property}`}
                                property={property}
                                value={tokenInfo[property as keyof typeof TokenInfo]}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default React.memo(TokenInfoCards);
