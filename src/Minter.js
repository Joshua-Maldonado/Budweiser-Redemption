import { useEffect, useState } from "react";
// import { connectWallet,
//   getCurrentWalletConnected
//  } from "./utils/interact.js";
 import { createAlchemyWeb3 } from "@alch/alchemy-web3";
 import env from "react-dotenv";
 import { isMobile } from 'react-device-detect';
 import CheckoutForm from './checkout-form';

 //import Shopify, { DataType } from '@shopify/shopify-api';

 //require('dotenv').config();



 const apiKey = env.REACT_APP_TOKEN_APIKEY;
 const endpointKey = env.ENDPOINT_KEY;
console.log("Key: "+apiKey);
const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [validWallet, setValidWallet] = useState("");

  var ageMonth = "";
  var ageDay = "";
  var ageYear = "";

  var browser = "";
  if(isMobile){
    var browser = "TRUE";
  }
  else{
    var browser = "FALSE";
  }
  
  //https://eth-mainnet.alchemyapi.io/v2/${apiKey}
  const web3 = createAlchemyWeb3(
    `https://eth-goerli.alchemyapi.io/v2/${apiKey}`,
  );

  

  useEffect(() => {
    // wrap your async call here
    const loadData = async () => { 

      buildAgeForm();


      
        // const {address, status} = await getCurrentWalletConnected();
        // setWallet(address)
        // setStatus(status); 
    
       
        // addWalletListener();
      };

    // then call it here
    loadData();
  }, []);



  

  const connectWalletPressed = async () => { 
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);

    verifyWallet();

  };

  

  const tryGetJson = async (resp) => {
    return new Promise((resolve) => {
      if (resp) {
        resp.json().then(json => resolve(json)).catch(() => resolve(null))
      } else {
        resolve(null)
      }
    })
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Verifying...</h1>,
          address: addressArray[0],
        };
        
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + JSON.stringify(err.message),
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" style="color: white !important;" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {

         
          return {
            address: addressArray[0],
            status: <div className="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">CONNECT</h1>
              <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect italic">WALLET</h1>
            <p className="paragraph">Click the button below to connect your MetaMask wallet.</p>
            <button id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                  "Connected: " +
                  String(walletAddress).substring(0, 6) +
                  "..." +
                  String(walletAddress).substring(38)
                ) : (
                  <span>Connect Wallet</span>
                )}
              </button>
          </div>,
          };
          
          

        } else {
          return {
            address: "",
            status: <div className="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">CONNECT</h1>
              <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect italic">WALLET</h1>
            <p className="paragraph">Click the button below to connect your MetaMask wallet.</p>
            <button id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                  "Connected: " +
                  String(walletAddress).substring(0, 6) +
                  "..." +
                  String(walletAddress).substring(38)
                ) : (
                  <span>Connect Wallet</span>
                )}
              </button>
          </div>,
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + JSON.stringify(err.message),
        };
      }
    } else {
        if(isMobile){
          return {
            address: "",
            status: (
              <div className="redirect-section">
                <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Browsing on mobile?</h1>
                <p className="paragraph">Click the button below to open this webpage in the Metamask Browser</p>
                <a id="walletButton" href="https://metamask.app.link/dapp/world-of-women-token-gate.herokuapp.com/" >
                    Open in Metamask
                  </a>
              </div>
            ),
          };
        }
        else{
          return {
            address: "",
            status: (
              <div className="redirect-section">
                <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">No Metamask extension found</h1>
                <p className="paragraph">Click the button below to download Metamask to supporting browsers</p>
                <a id="walletButton" href="https://metamask.io/download.html" >
                    Download Metamask
                  </a>
              </div>
            ),
          };
        }
      }
  };

  const onMintPressed = async () => { //TODO: implement
    
  };

  const verifyWallet = async () => {
    const {address, status} = await getCurrentWalletConnected();

    console.log(" Address: "+address.length);

    if ( address.length == 0 ){
      console.log("TRUE SHOW HOME");
      setWallet("");
          setStatus(
            <div className="redirect-section">
              <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">CONNECT</h1>
              <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect italic">WALLET</h1>
              <p className="paragraph">Click the button below to connect your MetaMask wallet.</p>

              <button id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                  "Connected: " +
                  String(walletAddress).substring(0, 6) +
                  "..." +
                  String(walletAddress).substring(38)
                ) : (
                  <span>Connect Wallet</span>
                )}
              </button>

            </div>
        );
        return false;
    }
    
    else{
    //const nfts = await web3.alchemy.getNfts({owner: address});
    const nfts = await web3.alchemy.getNfts({owner: address, contractAddresses: ["0xde747bb0a3d351c243073b56e117b7b5605913f8"]});

    var foundNFT = false;
    // var retString = "";
    // Print owner's wallet address:
    // retString = retString + "fetching NFTs for address: ";
    // retString = retString + address;
    // retString = retString + "\n...\n";

    // Print total NFT count returned in the response:
    // retString = retString + "number of NFTs found:";
    // retString = retString + nfts.totalCount;
    // retString = retString + "...";


    if ( address == "0x2231b0188dad7349695dc84b8fe5d1bee5e79cfe" || address == "0x282672eda77623459c49066c1531dde8edb5bd75" || address == "0x9072831edb5d98c49a8358045b19249002a0286a" || address == "0xfe3e57a3c93c2adbb22dd23cb30a31e06c055eb9" ){

      foundNFT = true;
    }

    var tokens = [];

    // Print contract address and tokenId for each NFT:
    for (const nft of nfts.ownedNfts) {
      // retString = retString + "===";
      // retString = retString + "contract address:";
      // retString = retString + nft.contract.address;
      // retString = retString + "token ID:";
      // retString = retString + nft.id.tokenId;

      
      
      if ( nft.contract.address == "0x4353e0Cb53Aa6e99455e4a3E801A8Ee9Ef113Dc8" || nft.contract.address == "0x72600b8ac7abe622611D408dAa80E5F3AE171BFb" ){
        
        //retString = retString + "FOUND NFT";
        foundNFT = true;
        tokens.push(nft);
      }
      
     

      // const response = await web3.alchemy.getNftMetadata({
      //   contractAddress: "0xfb61bd914d4cd5509ecbd4b16a0f96349e52db3d",
      //   tokenId: nft.id.tokenId
      // });
      // var resString = JSON.stringify(response)
      // retString = retString + resString;
    }
    // const response = await web3.alchemy.getNftMetadata({
    //     contractAddress: "0xfb61bd914d4cd5509ecbd4b16a0f96349e52db3d"
    //   });
    //   var resString = JSON.stringify(response);
    
    // console.log(resString);

  

    if(foundNFT == true){

      allowWallet();

      const list = document.createElement("div");
      list.classList.add('nfts-parent');
      const nfts = await web3.alchemy.getNfts({owner: address, contractAddresses: ["0xde747bb0a3d351c243073b56e117b7b5605913f8"]});
      for(const nft of nfts.ownedNfts){
        console.log("URI: " + JSON.stringify(nft.tokenUri.gateway));
        fetch("https://vbfq.s3.amazonaws.com/metadata/7", {
            method: "GET",
            headers: { 'Content-Type': 'application/json',}
          })
            .then((response) => response.json())
            .then((data) => {
                console.log("Res: "+JSON.stringify(data));
                // Handle data
                //this.props.buttonFunction();
            })
            .catch((err) => {
                //console.log(err.message);
                console.log("ERROR! "+ JSON.stringify(err.message));
                
            });
        let tokenName = nft;
        console.log("This NFT: ++ " + JSON.stringify(nft));
        
        if (tokenName.title != ''){
          let child = document.createElement("div");
          child.classList.add('nft-child');
          let imageParent = document.createElement("div");
          imageParent.classList.add('imageParent');
          let image = document.createElement("img");
          image.src = "nftImg.jpeg";//nft.media[0].thumbnail
          image.classList.add('nft-image');
          imageParent.appendChild(image);
          let title = document.createElement("h3");
          title.classList.add('nft-title');
          title.innerText = tokenName.title;
          let buttonParent = document.createElement("div");
          buttonParent.classList.add('buttonParent');
          let button = document.createElement("button");
          button.classList.add('nft-button');
          
          if(tokenName.metadata.is_claimed == false){
            button.innerText = "REDEEM";
          button.addEventListener("click", function() {
              doAction(tokenName);
            });
            
          }
          else{
            button.innerText = "REDEEMED";
            button.disabled = true; 
          }
          buttonParent.appendChild(button);
          child.appendChild(imageParent);
          child.appendChild(title);
          child.appendChild(buttonParent);
          list.appendChild(child);
        }
      }
      let parent = document.getElementById("nfts-container");
      parent.innerHTML = "";
      parent.appendChild(list);
     


    }
    else{
      denyWallet();

    }

    return foundNFT;
  }
  }


  // const createHTML = async () => {
  //   const list = document.createElement("div");
  //   list.classList.add('nfts-parent');
  //   const nfts = await web3.alchemy.getNfts({owner: address});
  //   for(const nft of nfts.ownedNfts){
  //     let child = document.createElement("div");
  //     child.classList.add('nft-child');
  //     let imageParent = document.createElement("div");
  //     imageParent.classList.add('imageParent');
  //     let image = document.createElemet("img");
  //     image.src = nft.media[0].thumbnail;
  //     image.classList.add('nft-image');
  //     imageParent.appendChild(image);
  //     let title = document.createElement("h3");
  //     title.classList.add('nft-title');
  //     title.textContent = nft.title;
  //     child.appendChild(imageParent);
  //     child.appendChild(title);
  //     list.appendChild(child);
  //   }
  //   setStatus(
  //     <div>
  //       <div class="redirect-section">
  //           <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" class="heading mobile">Verified!</h1>
  //           <p class="paragraph">Congratulations! You're eligible to enter the shop. Click the button below to enter.</p>
            
  //       </div>
  //       list
        
  //     </div>
  //   );
  // }
  

  function handleAgeChange(event){
    console.log("EVENT HERE: "+event.target.value);
    setMonth("09");
    ageMonth = "09";
    (console.log("New Month: "+month + "THis Month: " + ageMonth));
  }
  const handleAgeSubmit = async (event) => {
    event.preventDefault();
    var date = new Date();
    
    var old = "false";

    console.log(event.target[0].value + " Today Date: "+ date);
    if( Number(event.target[2].value) >= 2001){
      if (Number(event.target[2].value) == 2001){
        if(Number(event.target[0].value)-1 >= date.getMonth()){
          if(Number(event.target[0].value)-1 == date.getMonth()){
            if(Number(event.target[1].value) >= date.getDate()){
              if(Number(event.target[1].value) == date.getDate()){
                old = "true";
              }
            }
            else{
              old = "true";
            }
          }
        }
        else{
          old = "true";
        }
      }
    }
    else{
        old = "true";
    }
    if (event.target[2].value == "" || event.target[1].value == "" || event.target[0].value == ""){
      old = "false";
    }

    if(old == "true"){
        const {address, status} = await getCurrentWalletConnected();
        setWallet(address)
        setStatus(status); 
    
       
        addWalletListener();
    }
  }

  function buildAgeForm(){
    
    setStatus(
      <div>
          <h1 className="age-form">YOU MUST BE OF LEGAL DRINKING<br></br>AGE TO ENTER THIS SITE</h1>
          
          <form className="age-form" onSubmit={handleAgeSubmit}>
          
              <div className='age-form-imput-parent'>
                  <input 
                  type="number"
                  className='month-input'
                  name={"month"}
                  placeholder={"MM"}

                  />
                  <input 
                  type="number"
                  className='day-input'
                  name={"day"}
                  placeholder={"DD"}

                  />
                  <input 
                  type="number"
                  className='year-input'
                  name={"year"}
                  placeholder={"YY"}

                  />
                  <button className="age-button" type="submit" >ENTER</button>
              </div>
              
              
          </form>
      </div>
  ); 
  }





  function doAction(nftID){
  console.log("DOING THE EVENT: "+ nftID);
  setStatus(
    <div className="redirect-section">
          <div className="product-container">
            <div className="split-parent">
              <div className="split-child">
                <img src="product-img.png" loading="lazy" sizes=""  alt="" className="product-img"></img>
              </div>
              <div className="split-child">
                <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product">THE BUDWEISER<br></br>WORLD CUP<br></br>STARTER KIT</h1>
                <p className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis eros.<br></br> • Quisque quis euismod lorem<br></br>• Etiam sodales ac felis id interdum<br></br>• Lorem ipsum dolor sit amet<br></br>• Quisque quis euismod lorem</p>
              </div>
            </div> 
        </div>
          <CheckoutForm tokenid={nftID.id.tokenId} url={nftID.tokenUri.gateway} key={endpointKey} buttonFunction={successFunction} errorFunction={errorFunction}></CheckoutForm>
      </div>
  );
}
  function printRetString (walletString){
    setStatus(JSON.stringify(walletString));
 
  }

  function errorFunction(){
    setStatus(
      <div className="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Error!</h1>
            <p className="paragraph">We experienced an error when processing your claim, please refresh the page and try again.</p>
            
        </div>
    );
  }
  function successFunction(){
    setStatus(
      <div className="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">REDEEM</h1>
              <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect italic">SUCCESS</h1>
            <p className="paragraph">Thanks for redeeming your Budweiser World Cup Starter Kit! You will receive a confirmation email shortly with details.</p>
            
        </div>
    );
  }


//   const sendOrder = async () => {
//     const client = new Shopify.Clients.Rest('ef-testing.myshopify.com', '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');
//     const data = await client.post({
//       path: 'orders',
//       data: {"order":{"line_items":[{"variant_id":39986963742884,"quantity":1}],"customer":{"first_name":"Josh","last_name":"Maldonado","email":"joshm@topdrawermerch.com"},"billing_address":{"first_name":"Josh","last_name":"Maldonado","address1":"6613 Warbler Ln","phone":"555-555-5555","city":"Colorado Springs","country":"United States","zip":"80919"},"shipping_address":{"first_name":"Josh","last_name":"Maldonado","address1":"6613 Warbler Ln","phone":"777-777-7777","city":"Colorado Springs","country":"United States","zip":"80919"},"email":"joshm@topdrawermerch.com"}},
//       type: DataType.JSON,
//     });

//     console.log(JSON.stringify(data));
//   }

const sendOrder = async () => {
    fetch('https://hooks.zapier.com/hooks/catch/5494090/beccz65/', {
        method: 'POST',
        body: JSON.stringify({
            "order":{"line_items":[{"variant_id":39986963742884,"product_id":6729147187364,"name":"Test Tee 1","quantity":1}],"customer":{"first_name":"Josh","last_name":"Maldonado","email":"joshm@topdrawermerch.com"},"billing_address":{"first_name":"Josh","last_name":"Maldonado","address1":"6613 Warbler Ln","phone":"555-555-5555","state":"Colorado","city":"Colorado Springs","country":"United States","zip":"80919"},"shipping_address":{"first_name":"Josh","last_name":"Maldonado","address1":"6613 Warbler Ln","phone":"777-777-7777","city":"Colorado Springs","state":"Colorado","country":"United States","zip":"80919"},"email":"joshm@topdrawermerch.com"},
        }),
       
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            // Handle data
         })
         .catch((err) => {
            console.log(err.message);
         });
        
       }

  function clearScreen(){
    setStatus(
      <div className="verified-parent">
        <div className="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">SELECT TOKEN</h1>
            <p className="paragraph token-select-p">Select a claimable token below to begin the claim process for your free Budweiser World Cup Starter Kit.</p>
            
        </div>
        <div id="nfts-container"></div>
        
        

      </div>
    );

  }

  function allowWallet(){

     //sendOrder();
    //  const script = document.createElement('script');

    //  script.src = "https://form.jotform.com/jsform/222568031828155";
    //  script.async = true;
    //  script.type = "text/javascript"
    //  document.body.appendChild(script);

    setStatus(
      <div className="verified-parent">
        <div className="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">SELECT TOKEN</h1>
            <p className="paragraph token-select-p">Select a claimable token below to begin the claim process for your free Budweiser World Cup Starter Kit.</p>
            
        </div>
        <div id="nfts-container"></div>
        
        

      </div>
    );

    
    
  }
 
  function denyWallet(){
    setStatus(
      <div className="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Denied!</h1>
            <p className="paragraph">This wallet is not eligible for this drop. Open MetaMask and connect to a different wallet.</p>
            
        </div>
    );
  }
  
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus(<h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Verifying...</h1>);
          
          verifyWallet();
          
          
        } else {
          setWallet("");
          setStatus(
            <div className="redirect-section">
              <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">CONNECT</h1>
              <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect italic">WALLET</h1>
              <p className="paragraph">Click the button below to connect your MetaMask wallet. Please note that we are only verifying your wallet contains the required token(s) needed to be granted access to the shop. We do not store any wallet information or pass it through to the shop.</p>

              <button id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                  "Connected: " +
                  String(walletAddress).substring(0, 6) +
                  "..." +
                  String(walletAddress).substring(38)
                ) : (
                  <span>Connect Wallet</span>
                )}
              </button>

            </div>
        );
        }
      });
    } else {
      if(isMobile){
        setStatus(
          <div className="redirect-section">
                <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Browsing on mobile?</h1>
                <p className="paragraph">Click the button below to open this webpage in the Metamask Browser</p>
                <a id="walletButton" href="https://metamask.app.link/dapp/world-of-women-token-gate.herokuapp.com/" >
                    Open in Metamask
                  </a>
              </div>
        );
      }
      else{
        setStatus(
          <div className="redirect-section">
                <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">No Metamask extension found</h1>
                <p className="paragraph">Click the button below to download Metamask to supporting browsers</p>
                <a id="walletButton" href="https://metamask.io/download.html" >
                    Download Metamask
                  </a>
              </div>
        );
      }
    }
  }

  return (
    <div className="Minter">
      

      
      <div id="status">
        {status}
      </div>

      

    </div>
  );
};

export default Minter;
