
async function symBySerial() {
    let port = null;
    document.getElementById("disconnectSymBySerial").style.display = "initial";
    document.getElementById("displayErrors").innerHTML = "";
    const myBluetoothServiceUuid = [
        '01234567-89ab-cdef-0123-456789abcdef',
        '00001800-0000-1000-8000-00805f9b34fb',
        '0000180a-0000-1000-8000-00805f9b34fb',
        '01234567-89ab-cdef-0123-456789abcdef',
        '49535343-fe7d-4ae5-8fa9-9fafd205e455'
    ];
    try{
        port = await navigator.serial.requestPort({
        // allowedBluetoothServiceClassIds: [myBluetoothServiceUuid],
    });
    hideButtonsBySerial();
    document.getElementById("displayInfo").innerHTML = "Port Connected: " + port.connected;
    }catch(error){
        console.log(error);
        document.getElementById("displayErrors").innerHTML = error;
        document.getElementById("disconnectSymBySerial").style.display = "none";
    }
    console.log(port);
    // const textEncoder = new TextEncoderStream();
    // const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
    // const writer = textEncoder.writable.getWriter();
    // await writer.write("hh");
    // await port.close();
}

async function disconnectSymBySerial() {
    document.getElementById("displayErrors").innerHTML = "";
    document.getElementById("displayInfo").innerHTML = "";
    showButtonsBySerial();
    try{
        port.close();
    }catch(error){
        console.log(error);
        document.getElementById("displayErrors").innerHTML = error;
    }
}

function hideButtonsBySerial(){
    document.getElementById("seeAllDevices").style.display = "none";
    document.getElementById("symByBluetooth").style.display = "none";
    document.getElementById("symBySerial").style.display = "none";
    document.getElementById("connectSym").style.display = "none";
    document.getElementById("disconnectSymBySerial").style.display = "initial";
    document.getElementById("displayErrors").innerHTML = "";
}

function showButtonsBySerial(){
    document.getElementById("seeAllDevices").style.display = "initial";
    document.getElementById("symByBluetooth").style.display = "initial";
    document.getElementById("symBySerial").style.display = "initial";
    document.getElementById("connectSym").style.display = "initial";
    document.getElementById("disconnectSymBySerial").style.display = "none";
    document.getElementById("displayErrors").innerHTML = "";
}


