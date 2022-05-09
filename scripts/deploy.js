
async function main(){
    [signer1, signer2] = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("Bank",signer1);
    const bankContract  = await Bank.deploy();

    const Piro = await ethers.getContractFactory("Piro",signer2);
    const piroContract  = await Piro.deploy();

    const Shib = await ethers.getContractFactory("Shib",signer2);
    const shibContract  = await Shib.deploy();

    const Doge = await ethers.getContractFactory("Doge",signer2);
    const dogeContract  = await Doge.deploy();
 
    await bankContract.whitelistToken(
        ethers.utils.formatBytes32String('Piro'),
        piroContract.address
    );

    await bankContract.whitelistToken(
        ethers.utils.formatBytes32String('Shib'),
        shibContract.address
    );

    await bankContract.whitelistToken(
        ethers.utils.formatBytes32String('Doge'),
        dogeContract.address
    );
    
    await bankContract.whitelistToken(
        ethers.utils.formatBytes32String('Eth'),
        '0xc41DE9F340F2165Ae91BfF3b346EEC5793141496'
    );

    console.log("Bank deployed to:", bankContract.address, "by", signer1.address);
    console.log("Piro deployed to:", piroContract.address, "by", signer2.address);
    console.log("Shib deployed to:", shibContract.address, "by", signer2.address);
    console.log("Doge deployed to:", dogeContract.address, "by", signer2.address);
}

main()
.then(() => process.exit(0))
.catch((err) =>{
    console.error(err.message);
    process.exit(1);
});

// 0x5FbDB2315678afecb367f032d93F642f64180aa3 by Signer 1:0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x8464135c8F25Da09e49BC8782676a84730C318bC by Signer 2:0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x71C95911E9a5D330f4D621842EC243EE1343292e by Signer 2:0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x948B3c65b89DF0B4894ABE91E6D02FE579834F8F by Signer 2:0x70997970C51812dc3A010C7d01b50e0d17dc79C8

// 0x5FbDB2315678afecb367f032d93F642f64180aa3 by Signer:1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x8464135c8F25Da09e49BC8782676a84730C318bC by Signer:2 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x71C95911E9a5D330f4D621842EC243EE1343292e by Signer:2 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x948B3c65b89DF0B4894ABE91E6D02FE579834F8F by Signer:2 0x70997970C51812dc3A010C7d01b50e0d17dc79C8