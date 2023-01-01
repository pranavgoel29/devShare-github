const get = (param) => document.getElementById(`${param}`);
const qcode = get("subcode");

var pdata = JSON.parse(sessionStorage.getItem("pdata"))
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
  var dark = "#ffffff";
  var light = "#000000";
} else {
  var dark = "#000000";
  var light = "#ffffff";
}


console.log(pdata.name)

// Options
var options = {
  text: `${pdata.html_url}`,
  width: 240,
  height: 240,
  quietZone: 0,
  colorDark: dark,
  colorLight: light,

  //   // PI_TL: '#b7d28d', // Position Inner - Top Left 
  //   // PO_TR: '#aa5b71', // Position Outer - Top Right 
  //   // PI_TR: '#c17e61', // Position Inner - Top Right 

  // // === Logo

  logo: pdata.avatar_url, // LOGO
  logoWidth: 50,
  logoHeight: 50,
  PI: '#f55066',

  correctLevel: QRCode.CorrectLevel.H,


  crossOrigin: 'Anonymous',

};


qcode.innerHTML = `Scan the QR Code to Visit ${pdata.name} Github page 🥳`;
// Create QRCode Object
new QRCode(document.getElementById("qrcode"), options);


function myfunc() {
  // if you are using a different 'id' in the div, make sure you replace it here.
  var element = document.getElementById("cardp");
  html2canvas(element).then(function (canvas) {
    canvas.toBlob(function (blob) {
      window.saveAs(blob, `${pdata.login}.png`);
    });
  });
};