import Container from '@mui/material/Container';
import {Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { BrowserProvider, utils } from "zksync-ethers";
// import { useAccount } from "wagmi";

export default function GuessCard() {
    
    // const {connector} = useAccount();
    // console.log(connector);

    // async function testFunc() {
    //     const wagmiProvider = await connector?.getProvider();
    //     console.log(wagmiProvider);
    //     // @ts-ignore
    //     const provider = new BrowserProvider(window.ethereum);
    //     console.log(provider);
    //     const signer = await provider.getSigner();
    //     console.log(signer);
    //     const balance = await signer.getBalance();
    //     console.log(balance);
    //     const tx = await signer.signTransaction({
    //         type: utils.EIP712_TX_TYPE,
    //         to: '0x12642c2d22b9B148a941f124BDb7B6BcB78C89FE',
    //         value: '19',
        //   };
    // }
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Card>
                <CardContent style={{ marginLeft: '20px', marginRight: '20px' }}>
                    <Typography color="primary" variant="h3" component="div">
                        Guess the number
                    </Typography>
                    <Typography color="primary" variant="body1" component="div">
                        Try to guess a number in the range of 1 to 5
                    </Typography>
                    <Typography color="primary" variant='body2'>
                        You need to pay 0.001 ETH
                    </Typography>
                    <TextField 
                        id="outlined-number"
                        label="Number"
                        type="number"
                        
                        style={{ marginTop: '16px', width: '100%', backgroundColor: "secondary" }}
                    />
                    <Button color="inherit" variant="contained" style={{ marginTop: '16px', backgroundColor: 'secondary.main' }}>
                        Let's go!
                    </Button>
                </CardContent>
            </Card>
        </Grid> 
    )
}