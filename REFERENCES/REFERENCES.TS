// CREATE TOKEN TRANSACTION ON CLICK
// const onclick = useCallback(async () => {

// CHECK CONNECTION WALLET
//     if (!publicKey) throw new WalletNotConnectedError();

//     GENERATE NEW KEYPAIR FOR TOKEN
//     const mintKeypair = await web3.Keypair.generate();

//     GET SOME LAMPORTS FOR RENT
//     const lamports = await token.getMinimumBalanceForRentExemptMint(
//         connection
//     );

//     REQURIED CONSTANTS
//     const programId = token.TOKEN_PROGRAM_ID;
//     const tokenDecimals = 9;

//     FORM TRANSACTION
//     const transaction = new web3.Transaction().add(
//         web3.SystemProgram.createAccount({
//             fromPubkey: publicKey,
//             newAccountPubkey: mintKeypair.publicKey,
//             space: token.MINT_SIZE,
//             lamports: lamports,
//             programId: token.TOKEN_PROGRAM_ID,
//         }),
//         token.createInitializeMint2Instruction(
//             mintKeypair.publicKey,
//             tokenDecimals,
//             publicKey,
//             publicKey,
//             token.TOKEN_PROGRAM_ID
//         )
//     );

//     ADD IN TRANSACTION REQUIRED VALUES
//     const {
//         context: { slot: minContextSlot },
//         value: { blockhash, lastValidBlockHeight },
//     } = await connection.getLatestBlockhashAndContext();
//     transaction.recentBlockhash = blockhash;
//     transaction.feePayer = publicKey;

//     SIGNATURE FROM MINT KEYPAIR
//     transaction.partialSign(mintKeypair);

//     console.log("simple transaction");
//     console.log(transaction);

//     WAY OF SIGN FROM ADAPTER
//     // const signedTransaction = await signTransaction(transaction);
//     // console.log("signed transaction");
//     // console.log(signedTransaction);

//     SEND TRANSACTION
//     const signature = await sendTransaction(transaction, connection, {
//         minContextSlot,
//     });
//     console.log("after send " + signature);

//     LAST STAGE CONFIRMING
//     await connection
//         .confirmTransaction({
//             blockhash,
//             lastValidBlockHeight,
//             signature,
//         })
//         .then(() => {
//             setSign(signature);
//             setLoaded(true);
//         })
//         .catch((e) => {
//             e.message;
//         });
// }, [publicKey, sendTransaction, connection]);
//getting token metadata
// const address = new web3.PublicKey('A1Lirq6gU3AgjDowg9m9LavBU9o7h3xzVYCdnqkHJ3nQ');
// const connection = new web3.Connection('https://api.devnet.solana.com');
// const metaplex = Metaplex.make(connection);
// const metadataPda = metaplex.nfts().pdas().metadata({ mint: address });
// console.log(metadataPda);
// Metadata.fromAccountAddress(connection, metadataPda)
//     .then((data) => console.log(data.data.name))
//     .catch((e) => console.log(e));

//?????????????????????????
// const programId = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
// if (typeof mint === 'string') {
//     mint = new web3.PublicKey(mint);
// }
// const metadataPDAAndBump = web3.PublicKey.findProgramAddressSync(
//     [Buffer.from('metadata'), programId.toBuffer(), mint.toBuffer()],
//     programId,
// );
// const metadataPDA = metadataPDAAndBump[0];

// const Ix = token.createUpdateAuthorityInstruction({
//     programId,
//     metadata: metadataPDA,
//     oldAuthority: publicKey,
//     newAuthority: null,
// });
// console.log(Ix);
// return Ix;
