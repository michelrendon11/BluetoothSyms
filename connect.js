
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
const findButtons = document.getElementById("findButtons");
const buttonsDisplay = findButtons.style.display;
const convertCalibrate = document.getElementById("convertCalibrate");
const convertCalibrateDisplay = findButtons.style.display;
const purgeDisconnect = document.getElementById("purgeDisconnect");
const purgeDisconnectDisplay = findButtons.style.display;

async function connectSym(){ 
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        const decoder = new TextDecoderStream();
        port.readable.pipeTo(decoder.writable);
        const inputStream = decoder.readable;
        reader = inputStream.getReader();
        writer = port.writable.getWriter();
        hideButtons(findButtons, convertCalibrate, convertCalibrateDisplay, purgeDisconnect, purgeDisconnectDisplay);
        writeToSym('hh');
        readFromSym();
        await delay(2000);
        readHello();
        symInfo();
        await delay(3000);
        readSymInfo();
        symReadings();
        await delay(4000);
        readSymReadings();
    } catch (error) {
        console.log("Error From connectSym()");
        console.log(error);
        document.getElementById("displayErrors").innerHTML = "" + error;
    }
}

async function writeToSym(string){
    console.log("writeToSym()");
    try{ await writer.write(sendMessages(string));
    }catch(error){
        console.log("Error From writeToSym()");
        console.log(error);
        document.getElementById("displayErrors").innerHTML = "" + error;
    }
}

async function readFromSym(){
    console.log("readFromSym()");
    try{
        while (true) {
            const { value, done } = await reader.read();
            if (value) {
                    console.log(value + '\n');
                    symResponce += value;
                }
            if (done) {
                reader.releaseLock();
                break;
            }
        }
    }catch (error) {
        console.log("Error From readFromSym()");
        console.log(error);
        document.getElementById("displayErrors").innerHTML = "" + error;
        document.getElementById("purgeAndDisconnect").innerHTML = "";
    }
}

function readHello(){
    console.log("readHello()");
    try{
        serialMatch = symResponce.match(/[0-9]{6}/g );
        screenMessage = "SYM U - Serial# " + serialMatch + "<br/>";
        document.getElementById("displayInfo").innerHTML = screenMessage;
        symResponce = "";
    }catch(error){
        console.log("Error From readHello()");
        console.log(error);
    }
}

function readSymInfo(){
    console.log("readSymInfo()");
    try{
        dateMatch = symResponce.match(/\d{2}\/\d{2}\/\d{4}/g);
        decimalMatch = symResponce.match(/\d{1}\.\d{2}/g);
        levelRageMatch = symResponce.match(/0 -\ [0-9]{2,3}/g);
        currentSettingsMatch = symResponce.slice(0, ((symResponce.search(/[0-9]/))-2));
        screenMessage += "Firmware Version: " + decimalMatch[2] + "<br/>" + "Production Date: " + dateMatch + "<br/>" + currentSettingsMatch + " " + levelRageMatch + "<br/>" + "Output Voltage Range: " + decimalMatch[0] + " - " + decimalMatch[1] + "<br/>";
        document.getElementById("displayInfo").innerHTML = screenMessage;
        symResponce = "";
    }catch(error){
        console.log("Error From readSymInfo()");
        console.log(error);
    }
}

function readSymReadings(){
    console.log("readSymReadings()");
    try{
        currentLevel = symResponce.slice(0, (symResponce.search(/vdc/i)));
        screenMessage += "Current Level: " + currentLevel;
        document.getElementById("displayInfo").innerHTML = screenMessage;
        symResponce = "";
    }catch(error){
        console.log("Error From readSymReadings()");
        console.log(error);
    }
}

async function symInfo(){
    console.log("symInfo()");
    try{
        await writeToSym('<sc>');
        await delay(2000);
        await writeToSym('y');
    }catch(error){
        console.log("Error From symInfo()");
        console.log(error);
    }
}

async function symReadings(){
    console.log("symReadings()");
    try{
        await writeToSym('<sd>');
        await delay(2000);
        await writeToSym('n');
        await delay(2000);
        await writeToSym('y');
    }catch(error){
        console.log("Error From symReadings()");
        console.log(error);
    }
}

async function purgeSym(){
    document.getElementById("purgeAndDisconnect").innerHTML = "Pump Runs for 5 Seconds...";
    console.log("purgeSym()");
    try{
        await writeToSym('<sp>');
        await delay(8000);
        await writeToSym('y');
    }catch(error){
        console.log("Error From purgeSym()");
        console.log(error);
    }
    document.getElementById("purgeAndDisconnect").innerHTML = "";
}

async function disconnectSym(){
    console.log("disconnectSym()");
    document.getElementById("purgeAndDisconnect").innerHTML = "Rebooting SYM...";
    try{
        await writeToSym('<sr>');
    }catch(error){
        document.getElementById("purgeAndDisconnect").innerHTML = "";
        console.log("Error From disconnect()")
        console.log(error);
    }
}

function sendMessages(string){
    console.log("sendMessages()");
    try{
        const encoder = new TextEncoder();
        const encoded = encoder.encode(string);
        return new Int8Array(encoded)
    }catch(error){
        console.log("Error from sendMessages()");
        console.log(error);
    }
}

async function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function symData(){
    console.log("symData()");
    try{
        await writeToSym('<si>');
        await delay(2000);
        await writeToSym('n');
        await delay(2000);
        await writeToSym('y');
    }catch(error){
        console.log("Error From disconnect()");
        console.log(error);
    }
}

function showButtons(){
    document.getElementById("displayErrors").innerHTML = "";
}

function hideButtons(){
    findButtons.style.display = "none";
    convertCalibrate.style.display = convertCalibrateDisplay;
    purgeDisconnect.style.display = purgeDisconnectDisplay;
    document.getElementById("displayErrors").innerHTML = "";
    document.getElementById("displayInfo").innerHTML = "";
}

navigator.serial.addEventListener("connect", (e) => {
    // showButtons();
});
navigator.serial.addEventListener("disconnect", (e) => {
    // hideButtons();
    document.getElementById("purgeAndDisconnect").innerHTML = "";
});


