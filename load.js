
window.onload = function(){
    refreshPage();
    console.log(navigator.platform);
    console.log(navigator.appVersion);
    console.log(window.navigator.userAgent);
    console.log(navigator.userAgentData.brands);
    const br = navigator.userAgentData.brands;
    let platformInfo = navigator.platform + "<br/>";
    for(let i = 0; i < br.length; i++){
        if((br[i].brand).includes("Not")){ continue; }
        console.log(br[i].brand + ": " + br[i].version);
        platformInfo += br[i].brand + ": " + br[i].version + "<br/>"
    }
    document.getElementById("deviceInfo").innerHTML = platformInfo;
    // showButtons();
    function refreshPage(){
        document.getElementById("seeAllDevices").style.display = "initial";
        document.getElementById("symByBluetooth").style.display = "initial";
        document.getElementById("symBySerial").style.display = "initial";
        document.getElementById("connectSym").style.display = "initial";
        // document.getElementById("symInfo").style.display = "none";
        // document.getElementById("symReadings").style.display = "none";
        document.getElementById("purgeSym").style.display = "none";
        // document.getElementById("symData").style.display = "none";
        document.getElementById("disconnect").style.display = "none";
        document.getElementById("disconnectSymByBluetooth").style.display = "none";
        document.getElementById("disconnectSymBySerial").style.display = "none";
        document.getElementById("displayErrors").innerHTML = "";
    }
}