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
