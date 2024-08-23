import { ErrorDescription, ethers, EthersError } from 'ethers';
import { gameContractConfig } from '../app/web3/contracts';

export default function parseError(err: any): string {
    let errorMessage = "An unknown error occurred";

    if (err == null) return "";
    if (err instanceof Error) return err.message; 
    // if ('data' in err) {
    //     const gameInterface = new ethers.Interface(gameContractConfig.abi);
    // try {
    //     const parsedError = gameInterface.parseError(err as any);
    //         console.log("parsedError: ", parsedError);
    //     } catch {};
    // }
    return errorMessage;
}


// switch (parsedError != null && parsedError instanceof ErrorDescription) {
//     case ("name" in parsedError!):
//         errorMessage = parsedError!.name;
//         break;
//     case ("args" in parsedError!):
//         errorMessage = parsedError!.args[0];
//         break;
//     default:
//         // Handle all other errors
//         console.log("An unknown error occurred");
//         break;
// };
// .data);
// parsedError instanceof ErrorDescription ? parsedError.name : parsedError!.args[0]
