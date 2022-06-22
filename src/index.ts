import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import axios from "axios";
import { bytes2String } from "./convert";

const MAINNET_RPC = "https://rpc.mainnet.near.org";

yargs(hideBin(process.argv))
  .command(
    "view [contract-id] [func] [arg]",
    "call a contract query",
    (yargs) => {
      return yargs
        .positional("contract-id", {
          describe: "contract's id",
        })
        .positional("func", {
          describe: "Function's name",
        })
        .positional("arg", {
          describe: "Function's arg",
        });
    },
    async (argv: any) => {
      let resp = await axios.post(argv.url, {
        jsonrpc: "2.0",
        id: "dontcare",
        method: "query",
        params: {
          request_type: "call_function",
          block_id: argv.blockId,
          account_id: argv.contractId,
          method_name: argv.func,
          args_base64: Buffer.from(argv.arg).toString("base64"),
        },
      });

      let respData = bytes2String(resp.data.result.result);
      console.log(JSON.parse(respData));
    }
  )
  .option("block-id", {
    type: "number",
    description: "Query state at block",
  })
  .option("url", {
    type: "string",
    description: "RPC URL",
    default: MAINNET_RPC,
  })
  .parse();
