

async function seeAllDevices(){
    try{ const allDevices = await navigator.bluetooth.requestDevice({acceptAllDevices: true});
    }catch(error){ document.getElementById("displayErrors").innerHTML = "Operation Cancelled"; }
}