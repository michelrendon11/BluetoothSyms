
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
    platformInfo += "<br/>" + navigator.appVersion;
    document.getElementById("deviceInfo").innerHTML = platformInfo;
    function refreshPage(){
        document.getElementById("findButtons").style.display = "inline-flexbox";
        document.getElementById("convertCalibrate").style.display = "none";
        document.getElementById("calibration").style.display = "none";
        document.getElementById("conversion").style.display = "none";
        document.getElementById("purgeDisconnect").style.display = "none";
        document.getElementById("disconnectBluetooth").style.display = "none";
        document.getElementById("displayErrors").innerHTML = "";
    }
}
