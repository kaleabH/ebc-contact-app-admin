import React, { useState } from "react";
import ReactDOM from "react-dom";
const CryptoJS = require("crypto-js");

function CryptoGraph() {
  const [generate, setGenerate] = useState("");
  const [verify, setVerify] = useState("");
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(false);
  const [showValidity, setShowValidity] = useState(false);

  //   const salt = "ebc contact app";
  const token = "ebc contact token";

  const encryptWithAES = (text) => {
    const passphrase = "@312*#";
    return CryptoJS.AES.encrypt(text, passphrase, {
      keySize: 128 / 32,
    }).toString();
  };
  //The Function Below To Decrypt Text
  const decryptWithAES = (ciphertext) => {
    const passphrase = "@312*#";
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    console.warn("the byte is ", bytes);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  //   const cipher = (salt) => {
  //     const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  //     const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  //     const applySaltToChar = (code) =>
  //       textToChars(salt).reduce((a, b) => a ^ b, code);

  //     return (text) =>
  //       text
  //         .split("")
  //         .map(textToChars)
  //         .map(applySaltToChar)
  //         .map(byteHex)
  //         .join("");
  //   };

  //   const decipher = (salt) => {
  //     const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  //     const applySaltToChar = (code) =>
  //       textToChars(salt).reduce((a, b) => a ^ b, code);
  //     return (encoded) =>
  //       encoded
  //         .match(/.{1,2}/g)
  //         .map((hex) => parseInt(hex, 16))
  //         .map(applySaltToChar)
  //         .map((charCode) => String.fromCharCode(charCode))
  //         .join("");
  //   };

  //   useEffect(() => {

  //     // To create a cipher
  //     const myCipher = cipher("mySecretSalt");

  //     //Then cipher any text:
  //     console.log(myCipher("the secret string"));

  //     //To decipher, you need to create a decipher and use it:
  //     const myDecipher = decipher("mySecretSalt");
  //     console.log(myDecipher("7c606d287b6d6b7a6d7c287b7c7a61666f"));
  //   });
  return ReactDOM.createPortal(
    <div>
      <button
        onClick={() => {
          setShow((prevShow) => !prevShow);
        }}
        type="button"
        className="btn btn-labeled btn-warning"
      >
        <span
          style={{
            height: "100%",
            width: "20%",
            padding: "9px 12px",
            marginLeft: "-14px",
            background: "yellow",
          }}
        >
          <i className="fa fa-user-circle"></i>
        </span>
        Authorizate
      </button>
      {show && (
        <div
          className="rounded bg-light border border-info d-flex 
       row justify-content-center align-items-center"
        >
          <div>
            <div className="form-group mb-2">
              <label htmlFor="inputPassword2" className="sr-only">
                Generate
              </label>
              <input
                className="form-control"
                id="inputPassword2"
                placeholder="generate"
                value={generate}
                readOnly
                onChange={(e) => {
                  setGenerate(e.target.value);
                }}
              />
            </div>
            <button
              onClick={() => {
                // const theCipher = cipher(salt);
                // setGenerate(theCipher(token));
                setGenerate(encryptWithAES(token));
              }}
              className="btn btn-primary mb-2"
            >
              generate
            </button>
          </div>
          <div>
            <div className="form-group mb-2">
              <input
                className="form-control"
                id="inputPassword2"
                placeholder="Verify"
                value={verify}
                onChange={(e) => {
                  setVerify(e.target.value);
                  setShowValidity(false);
                }}
                onFocus={() => {
                  setShowValidity(false);
                }}
              />
            </div>
            {showValidity && (
              <div>
                {valid ? (
                  <h6 className="text-success">valid token</h6>
                ) : (
                  <h6 className="text-danger">incorrect token</h6>
                )}
              </div>
            )}
            <button
              onClick={() => {
                // const theDecipher = decipher(salt);
                // setValid(theDecipher(verify) === token);
                try {
                  setValid(decryptWithAES(verify) === token);
                } catch (err) {
                  setValid(false);
                }
                setShowValidity(true);
              }}
              className="btn btn-primary mb-2"
            >
              verify
            </button>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("authentication")
  );
}

export default CryptoGraph;
