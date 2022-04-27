import { utils } from "near-api-js";
import React from "react";
import "regenerator-runtime/runtime";
import { v4 as uuid4 } from "uuid";
import "./global.css";
import { login, logout } from "./utils";

const GAS = 300000000000000;
const ONE_NEAR = utils.format.parseNearAmount("1");

export default function App() {
  const [nfts, setNfts] = React.useState([]);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      window.contract
        .nft_tokens_for_owner({ account_id: window.accountId })
        .then((res) => {
          console.log(res);
          setNfts(res);
        });
    }
  }, []);

  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>NEAR NFT Mint</h1>
        <p style={{ textAlign: "center", marginTop: "2.5em" }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    );
  }

  const mint = async () => {
    const token_owner_id = window.walletConnection.account().accountId;
    const token_id = uuid4();
    const token_metadata = {
      title: "NEAR NFT",
      description: "NEAR NFT",
      media:
        "https://bafybeiavvdipmtob4v3ot2zdtrhn5isk56emnmg554ndcdmochywrwq7b4.ipfs.nftstorage.link/",
      copies: 1,
    };
    setButtonDisabled(true);

    try {
      await window.contract.nft_mint(
        {
          token_id,
          token_owner_id,
          token_metadata,
        },
        GAS,
        ONE_NEAR
      );
    } catch (e) {
      alert(
        "Something went wrong! " +
          "Maybe you need to sign out and back in? " +
          "Check your browser console for more info."
      );
      throw e;
    } finally {
      setButtonDisabled(false);
    }

    set_greeting([...nfts, { token_id, token_owner_id, token_metadata }]);
  };

  return (
    <>
      <button className="link" style={{ float: "right" }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>{"NEAR NFT Mint"}</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "100%",
          }}
        >
          {nfts.map((nft) => (
            <div
              key={nft.token_id}
              style={{
                marginRight: 5,
                flexGrow: 1,
                flexBasis: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                {nft.metadata.title}
              </div>
              <img style={{ width: "100%" }} src={nft.metadata.media} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ textAlign: "center", marginTop: "2.5em" }}>
            <button disabled={buttonDisabled} onClick={mint}>
              Mint
            </button>
          </p>
        </div>
      </main>
    </>
  );
}