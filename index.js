var ethers = require("ethers")
var express = require("express")

const app = express()

const MNEMONIC = process.env.MNEMONIC

// Use your deployed contract address
const CONTRACT_ADDRESS = "0x6ffbd6b41b802550c57d4661d81a1700a502f2ab"

// Choose the network, e.g mainnet, ropsten, rinkeby, kovan, etc
Const NETWORK = "mainnet"

const ABI = [
    "function totalSupply() public view returns (uint256)",
    "function decimals() public view returns (uint8)",
    "function balanceOf(address _address) public view returns (uint256)",
    "function sellPrice() public view returns (uint256)",
    "function buyPrice() public view returns (uint256)",
]

app.set("port", process.env.PORT || 3000)

app.get("/getTotalSupply", async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    const provider = ethers.getDefaultProvider(NETWORK)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    // console.log(contract)
    try {
        const value = await contract.totalSupply()
        res.end(JSON.stringify({ totalSupply: parseInt(value["_hex"], 16) }, null, 3))
        /*
        value is "_hex" : "0x01ae361fc1451c0000"
        
        we return the decimal value as json
        {
            "totalSupply": "31000000000000000000"
        }
        */
    } catch (e) {
        res.send(e)
    }
})

app.get("/getDecimals", async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    const provider = ethers.getDefaultProvider(NETWORK)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    try {
        const value = await contract.decimals()
        res.end(JSON.stringify({ decimals: value }, null, 3))
    } catch (e) {
        res.send(e)
    }
})

app.get("/getBalanceOfContract", async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    const provider = ethers.getDefaultProvider(NETWORK)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    try {
        const value = await contract.balanceOf(CONTRACT_ADDRESS)
        res.end(JSON.stringify({ balance: parseInt(value["_hex"], 16) }, null, 3))
    } catch (e) {
        res.send(e)
    }
})

app.get("/getSellPrice", async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    const provider = ethers.getDefaultProvider(NETWORK)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    try {
        const value = await contract.sellPrice()
        res.end(
            JSON.stringify({ sellPrice : parseInt(value["_hex"], 16) * 1000000000 }, null, 3)
        )
    } catch (e) {
        res.send(e)
    }
})

app.get("/getBuyPrice", async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    const provider = ethers.getDefaultProvider(NETWORK)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    try {
        const value = await contract.buyPrice()
        res.end(JSON.stringify({ buyPrice : parseInt(value["_hex"], 16) * 1000000000 }, null, 3))
    } catch (e) {
        res.send(e)
    }
})

app.get("/getCirculatingSupply", async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    try {
        res.end(JSON.stringify({ circulatingSupply: 15000000003 }, null, 3))
    } catch (e) {
        res.send(e)
    }
})

app.get("/getCirculatingSupplyWithDecimals", async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    try {
        res.end(JSON.stringify({ circulatingSupply: "15,000,000,003.000000000" }, null, 3))
    } catch (e) {
        res.send(e)
    }
})

app.listen(app.get("port"), () => {
    console.log("Server running on port " + app.get("port"))
})
