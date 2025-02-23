const contracts = {
  31337: [
    {
      name: "MaskAuthentication",
      chainId: "31337",
      contracts: {
        MaskAuthentication: {
          address: "0xbcdd5cc1cd0fa804ae1ea14e05922a6222a5bc9f",
          abi: [
            {
              inputs: [
                { internalType: "uint256", name: "maskId", type: "uint256" },
                { internalType: "bool", name: "isAuthentic", type: "bool" },
                { internalType: "string", name: "comments", type: "string" }
              ],
              name: "validateMask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAllMasks",
              outputs: [
                {
                  components: [
                    { internalType: "uint256", name: "id", type: "uint256" },
                    { internalType: "string", name: "ipfsHash", type: "string" },
                    { internalType: "address", name: "owner", type: "address" },
                    { internalType: "bool", name: "isValidated", type: "bool" },
                    { internalType: "uint256", name: "validationCount", type: "uint256" }
                  ],
                  internalType: "struct MaskAuthentication.Mask[]",
                  name: "",
                  type: "tuple[]"
                }
              ],
              stateMutability: "view",
              type: "function"
            }
          ],
        },
      },
    },
  ],
  11155111: [
    {
      name: "sepolia",
      chainId: "11155111",
      contracts: {
        MaskAuthentication: {
          address: "0xbcdd5cc1cd0fa804ae1ea14e05922a6222a5bc9f",
          abi: [
            {
              inputs: [
                { internalType: "uint256", name: "maskId", type: "uint256" },
                { internalType: "bool", name: "isAuthentic", type: "bool" },
                { internalType: "string", name: "comments", type: "string" }
              ],
              name: "validateMask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAllMasks",
              outputs: [
                {
                  components: [
                    { internalType: "uint256", name: "id", type: "uint256" },
                    { internalType: "string", name: "ipfsHash", type: "string" },
                    { internalType: "address", name: "owner", type: "address" },
                    { internalType: "bool", name: "isValidated", type: "bool" },
                    { internalType: "uint256", name: "validationCount", type: "uint256" }
                  ],
                  internalType: "struct MaskAuthentication.Mask[]",
                  name: "",
                  type: "tuple[]"
                }
              ],
              stateMutability: "view",
              type: "function"
            }
          ],
        },
      },
    },
  ],
} as const;

export default contracts; 