const get = (param) => document.getElementById(`${param}`);
const qcode = get("subcode");

var pdata = JSON.parse(sessionStorage.getItem("pdata"))

console.log(pdata.name)

// Options
var options = {
  text: `${pdata.html_url}`,
//   width: 240,
//   height: 240,
//   quietZone: 0,
//   colorDark: "#ffffff",
//   colorLight: "#000000",

//   // PI_TL: '#b7d28d', // Position Inner - Top Left 
//   // PO_TR: '#aa5b71', // Position Outer - Top Right 
//   // PI_TR: '#c17e61', // Position Inner - Top Right 

// // === Logo

//   logo: pdata.avatar_url, // LOGO
//    					logoWidth:50, 
//   					logoHeight:50,  
//   PI: '#f55066',

//   correctLevel: QRCode.CorrectLevel.H


  width: 240, // Widht
  height: 240, // Height
  colorDark: "#ffffff", // Dark color
  colorLight: "#00030c", // Light color

  // === Logo
  logo: pdata.avatar_url, // LOGO
  //					logo:"http://127.0.0.1:8020/easy-qrcodejs/demo/logo.png",  
  					logoWidth:50, 
  					logoHeight:50,
  logoBackgroundColor: '#fffdf6', // Logo backgroud color, Invalid when `logBgTransparent` is true; default is '#ffffff'
  logoBackgroundTransparent: false, // Whether use transparent image, default is false

  // === Posotion Pattern(Eye) Color
  PO: '#e1622f', // Global Position Outer color. if not set, the defaut is `colorDark`
  PI: '#aa5b71', // Global Position Inner color. if not set, the defaut is `colorDark`
  //					PO_TL:'', // Position Outer - Top Left 
  PI_TL: '#b7d28d', // Position Inner - Top Left 
  PO_TR: '#aa5b71', // Position Outer - Top Right 
  PI_TR: '#c17e61', // Position Inner - Top Right 
  //					PO_BL:'', // Position Outer - Bottom Left 
  //					PI_BL:'' // Position Inner - Bottom Left 

  // === Timing Pattern Color
  //	timing: '#e1622f', // Global Timing color. if not set, the defaut is `colorDark`
  timing_H: '#ff6600', // Horizontal timing color
  timing_V: '#cc0033', // Vertical timing color


  correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H


  // width: 240,
  // height: 240,
  // colorDark: "#000000",
  // colorLight: "#ffffff",

  // PI: '#f55066',
  // PI_TL: '#b7d28d', // Position Inner - Top Left 
  // PO_TL: '#aa5b71', // Position Outer - Top Right


  // correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H


  // dotScale: 0.5

  // width: 240,
  // height: 240,
  // colorDark: "#473C8B",
  // colorLight: "#FFFACD",

  // //PI: '#f55066',

  // correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
  // version: 5
  // width: 240,
  // 				height: 240,
  // 				quietZone: 0,
  // 				colorDark: "#000000",
  // 				colorLight: "#ffffff",

  // 				//PI: '#f55066',

  // 				correctLevel: QRCode.CorrectLevel.H // L, M, Q, H

};

qcode.innerHTML = `Scan the QR Code to Visit ${pdata.name} Github page 🥳`;
// Create QRCode Object
new QRCode(document.getElementById("qrcode"), options);


  

