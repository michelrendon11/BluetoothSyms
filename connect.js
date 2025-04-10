
let server = null;
let device = null;
const disconnectBluetooth = document.getElementById("disconnectBluetooth");
const disconnectBluetoothDisplay = disconnectBluetooth.style.display;

let port = null;
let reader = null;
let writer = null;
let symResponce = "";
let serialMatch = "";
let dateMatch = "";
let decimalMatch = "";
let currentSettingsMatch = "";
let levelRageMatch = "";
let currentLevel = "";
let screenMessage = "";
let settingsMessage = "";
const findButtons = document.getElementById("findButtons");
const buttonsDisplay = findButtons.style.display;
const convertCalibrate = document.getElementById("convertCalibrate");
const convertCalibrateDisplay = convertCalibrate.style.display;
const purgeDisconnect = document.getElementById("purgeDisconnect");
const purgeDisconnectDisplay = purgeDisconnect.style.display;
const conversion = document.getElementById("conversion");
const conversionDisplay = conversion.style.display;
const calibration = document.getElementById("calibration");
const calibrationDisplay = calibration.style.display;
const tHeigth = document.getElementById("tHeigth");
const ePoint = document.getElementById("ePoint");
let water = document.getElementById("water");
let fuel = document.getElementById("fuel");

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
}

function refreshPage(){
    findButtons.style.display = buttonsDisplay;
    convertCalibrate.style.display = "none";
    purgeDisconnect.style.display = "none";
    conversion.style.display = "none";
    calibration.style.display = "none";
    calibration.style.display = "none";
    disconnectBluetooth.style.display = "none";
}

async function connectSym(){ 
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        const decoder = new TextDecoderStream();
        port.readable.pipeTo(decoder.writable);
        const inputStream = decoder.readable;
        reader = inputStream.getReader();
        writer = port.writable.getWriter();
        findButtons.style.display = "none";
        document.getElementById("displayErrors").innerHTML = "";
        document.getElementById("displayInfo").innerHTML = "";
        initialize();
        document.getElementById("displayErrors").innerHTML = "";
        convertCalibrate.style.display = convertCalibrateDisplay;
        purgeDisconnect.style.display = purgeDisconnectDisplay;
    } catch (error) { console.log(error); document.getElementById("displayErrors").innerHTML = "" + error;}
}

async function initialize() {
    try{
        await writeToSym('hh');
        readFromSym();
        await delay(2000);
        readHello();
        symInfo();
        await delay(3000);
        readSymInfo();
        symReadings();
        await delay(4000);
        readSymReadings();
    }catch(error){ console.log(error); }
}

async function writeToSym(string){
    try{ await writer.write(sendMessages(string));
    }catch(error){ console.log(error); document.getElementById("displayErrors").innerHTML = "" + error; }
}

async function readFromSym(){
    try{
        while (true) { const { value, done } = await reader.read();
            if (value) { console.log(value + '\n'); symResponce += value; }
            if (done) { reader.releaseLock(); break; }
        }
    }catch (error) {
        console.log(error);
        document.getElementById("displayErrors").innerHTML = "" + error;
        document.getElementById("purgeAndDisconnect").innerHTML = "";
    }
}

function readHello(){
    try{
        serialMatch = symResponce.match(/[0-9]{6}/g );
        screenMessage = "SYM U - Serial# " + serialMatch + "<br/>";
        document.getElementById("displayInfo").innerHTML = screenMessage;
        symResponce = "";
    }catch(error){ console.log(error); }
}

function readSymInfo(){
    try{
        dateMatch = symResponce.match(/\d{2}\/\d{2}\/\d{4}/g);
        decimalMatch = symResponce.match(/\d{1}\.\d{2}/g);
        levelRageMatch = symResponce.match(/0 -\ [0-9]{2,3}/g);
        currentSettingsMatch = symResponce.slice(0, ((symResponce.search(/[0-9]/))-2));
        screenMessage += "Firmware Version: " + decimalMatch[2] + "<br/>" + "Production Date: " + dateMatch + "<br/>" + currentSettingsMatch + " " + levelRageMatch + "<br/>" + "Output Voltage Range: " + decimalMatch[0] + " - " + decimalMatch[1] + "<br/>";
        document.getElementById("displayInfo").innerHTML = screenMessage;
        symResponce = "";
    }catch(error){ console.log(error); }
}

function readSymReadings(){
    try{
        currentLevel = symResponce.slice(0, (symResponce.search(/vdc/i)));
        screenMessage += "Current Level: <br/>" + currentLevel;
        document.getElementById("displayInfo").innerHTML = screenMessage;
        symResponce = "";
    }catch(error){ console.log(error); }
}

async function symInfo(){
    try{
        await writeToSym('<sc>');
        await delay(2000);
        await writeToSym('y');
    }catch(error){ console.log(error); }
}

async function symReadings(){
    try{
        await writeToSym('<sd>');
        await delay(2000);
        await writeToSym('n');
        await delay(2000);
        await writeToSym('y');
    }catch(error){ console.log(error); }
}

async function purgeSym(){
    document.getElementById("purgeAndDisconnect").innerHTML = "Pump Runs for 5 Seconds...";
    try{
        await writeToSym('<sp>');
        await delay(8000);
        await writeToSym('y');
    }catch(error){ console.log(error); }
    document.getElementById("purgeAndDisconnect").innerHTML = "";
}

async function disconnectSym(){
    document.getElementById("purgeAndDisconnect").innerHTML = "Rebooting SYM...";
    convertCalibrate.style.display = "none";
    purgeDisconnect.style.display = "none";
    findButtons.style.display = buttonsDisplay;
    document.getElementById("displayInfo").innerHTML = "";
    try{
        await writeToSym('<sr>');
        document.getElementById("purgeAndDisconnect").innerHTML = "Rebooting SYM...";
    }catch(error){
        document.getElementById("purgeAndDisconnect").innerHTML = "";
        console.log(error);
    }
}

function sendMessages(string){
    try{
        const encoder = new TextEncoder();
        const encoded = encoder.encode(string);
        return new Int8Array(encoded)
    }catch(error){ console.log(error); }
}

async function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function convertSym(){
    convertCalibrate.style.display = "none";
    purgeDisconnect.style.display = "none";
    conversion.style.display = conversionDisplay;
}

function calibrateSym(){
    convertCalibrate.style.display = "none";
    purgeDisconnect.style.display = "none";
    calibration.style.display = calibrationDisplay;
}

function baclConvert(){
    convertCalibrate.style.display = convertCalibrateDisplay;
    purgeDisconnect.style.display = purgeDisconnectDisplay;
    conversion.style.display = "none";
}

function backCalibrate(){
    convertCalibrate.style.display = convertCalibrateDisplay;
    purgeDisconnect.style.display = purgeDisconnectDisplay;
    calibration.style.display = "none";
}

async function submitCalibration() {
    // while(true){
    //     if(tHeigth.value < 10 || tHeigth.value > 80){
    //         document.getElementById("displayErrors").innerHTML = "Tank Heigth must be between 10 & 80 inches";
    //     }
    //     if(ePoint.value > 20){
    //         document.getElementById("displayErrors").innerHTML = "Empty point must be no greater than 20 inches"
    //     }
    //     if(tHeigth.value >= 10 && tHeigth.value <= 80 && ePoint.value <= 20){
    //         break;
    //     }
    // }
    let tankHeigth = tHeigth.value;
    let emptyPoint = ePoint.value;
    let waterFuel = water.checked ? water.value : fuel.value;
    let text = '<' + tankHeigth + ',' + emptyPoint + ',' + waterFuel + '>';
    console.log(text);
    await writeToSym('<C,>');
    await delay(1000);
    await writeToSym(text);
    await delay(1000);
    await writeToSym('y');
    backCalibrate();
    // findButtons.style.display = buttonsDisplay;
    // calibration.style.display = "none";
    // document.getElementById("displayInfo").innerHTML = "";
    // document.getElementById("displayErrors").innerHTML = "";

}

async function zsSym(){
    baclConvert();
    await writeToSym('<zs>');
    await delay(1000);
    await writeToSym('y');
}

async function zmSym(){
    baclConvert();
    await writeToSym('<zm>');
    await delay(1000);
    await writeToSym('y');
}

async function zrSym(){
    baclConvert();
    await writeToSym('<zr>');
    await delay(1000);
    await writeToSym('y');
}

async function sym23qs(){
    baclConvert();
    await writeToSym('<23qs>');
    await delay(1000);
    await writeToSym('y');
}

async function sym23qr(){
    baclConvert();
    await writeToSym('<23qr>');
    await delay(1000);
    await writeToSym('y');
}

async function uSym(){
    baclConvert();
    await writeToSym('<zu>');
    await delay(1000);
    await writeToSym('y');
}



// navigator.serial.addEventListener("connect", (e) => {
//     // showButtons();
// });
// navigator.serial.addEventListener("disconnect", (e) => {
//     // hideButtons();
//     // document.getElementById("purgeAndDisconnect").innerHTML = "";
// });

// async function symData(){
//     try{
//         await writeToSym('<si>');
//         await delay(2000);
//         await writeToSym('n');
//         await delay(2000);
//         await writeToSym('y');
//     }catch(error){ console.log(error); }
// }


async function symByBluetooth(){
    document.getElementById("displayErrors").innerHTML = "";
    const symName = ' SYMU';
    const options = {
        filters: [
                {namePrefix: symName,},
                {services: ['00001800-0000-1000-8000-00805f9b34fb']},
                {services: ['0000180a-0000-1000-8000-00805f9b34fb']},
                {services: ['01234567-89ab-cdef-0123-456789abcdef']},
                {services: ['49535343-fe7d-4ae5-8fa9-9fafd205e455']}]};
    try{
        device = await navigator.bluetooth.requestDevice(options);
        console.log(device);
        connect(device);
    }catch(error){
        console.log(error);
        document.getElementById("displayErrors").innerHTML = error;
    }
}

async function connect(device){
    server = await device.gatt.connect();
    displaySymName(device);
    findButtons.style.display = "none";
    disconnectBluetooth.style.display = disconnectBluetoothDisplay;
    if(server.connected){
        console.log("Is Connected");
    }
    const service = await server.getPrimaryService('49535343-fe7d-4ae5-8fa9-9fafd205e455');
    getBluetoothService(service);
}

async function getBluetoothService(service){
    let str = "hh";
    const hh = new TextEncoder();
    const hhDecoder = new TextDecoder();
    const array = new Int16Array(hh.encode(str));
    const characteristic = await service.getCharacteristic('49535343-1e4d-4bd9-ba61-23c647249616');
    await characteristic.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    const descriptor = await characteristic.getDescriptor('00002902-0000-1000-8000-00805f9b34fb');
    console.log(await characteristic.readValue(new DataView(new ArrayBuffer(new Int8Array()))));
    console.log(await descriptor.readValue(new DataView(new ArrayBuffer(new Int8Array()))));
    console.log("Done");
}

function displaySymName(name){
    document.getElementById("name").innerHTML = "Name: " + name.name;
    document.getElementById("info").innerHTML = "ID: " + name.id; 
    document.getElementById("displayInfo").innerHTML = "Server Connected: " + name.gatt;
}

function disByBluetooth(){
    findButtons.style.display = buttonsDisplay;
    disconnectBluetooth.style.display = "none";
    device.gatt.disconnect();
    document.getElementById("name").innerHTML = "";
    document.getElementById("info").innerHTML = "";
    document.getElementById("displayErrors").innerHTML = "";
    document.getElementById("displayInfo").innerHTML = "";
    console.log(server); 
}


async function seeAllDevices(){
    try{ const allDevices = await navigator.bluetooth.requestDevice({acceptAllDevices: true});
    }catch(error){ document.getElementById("displayErrors").innerHTML = "Operation Cancelled"; }
}
