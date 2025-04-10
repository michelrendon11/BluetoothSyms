
let server = null;
let device = null;
const findButtonsBluetooth = document.getElementById("findButtons");
const disconnectBluetooth = document.getElementById("disconnectBluetooth");
const buttonsDisplay = findButtons.style.display;
const disconnectDisplay = disconnectBluetooth.style.display;

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
    // hideButtonsByBluetooth();
    if(server.connected){
        console.log("Is Connected");
    }
    const service = await server.getPrimaryService('49535343-fe7d-4ae5-8fa9-9fafd205e455');
    const service2 = await server.getPrimaryService('0000180a-0000-1000-8000-00805f9b34fb');
    const service3 = await server.getPrimaryService('00001800-0000-1000-8000-00805f9b34fb');
    getBluetoothService(service, service2, service3);
}
        
async function getBluetoothService(service, service2, service3){
    let str = "hh";
    const hh = new TextEncoder();
    const hhDecoder = new TextDecoder();
    const array = new Int8Array(hh.encode(str));
    writeValue2(service, service2, service3);
    // await characteristic.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    // console.log(characteristic);
    // const descriptor = await characteristic.getDescriptor('00002902-0000-1000-8000-00805f9b34fb');
    // console.log(descriptor);
    // console.log(await characteristic.readValue(new DataView(new ArrayBuffer(new Int8Array()))));
    // console.log(await descriptor.readValue(new DataView(new ArrayBuffer(new Int8Array()))));
    // console.log("Done");
}

async function writeValue2(service, service2, service3){
    const characteristic = await service.getCharacteristic('49535343-026e-3a9b-954c-97daef17e26e');
    const descriptor = await characteristic.getDescriptor('00002902-0000-1000-8000-00805f9b34fb');
    const characteristic2 = await service.getCharacteristic('49535343-1e4d-4bd9-ba61-23c647249616');
    const descriptor2 = await characteristic.getDescriptor('00002902-0000-1000-8000-00805f9b34fb');
    const characteristic3 = await service.getCharacteristic('49535343-4c8a-39b3-2f49-511cff073b7e');
    const descriptor3 = await characteristic.getDescriptor('00002902-0000-1000-8000-00805f9b34fb');
    const characteristic4 = await service.getCharacteristic('49535343-6daa-4d02-abf6-19569aca69fe');
    const characteristic5 = await service.getCharacteristic('49535343-8841-43f4-a8d4-ecbe34729bb3');
    const characteristic6 = await service.getCharacteristic('49535343-aca3-481c-91ec-d85e28a60318');
    const descriptor6 = await characteristic.getDescriptor('00002902-0000-1000-8000-00805f9b34fb');
    // const characteristic7 = await service2.getCharacteristic('00002a23-0000-1000-8000-00805f9b34fb');
    // const characteristic8 = await service2.getCharacteristic('00002a24-0000-1000-8000-00805f9b34fb');
    // const characteristic9 = await service2.getCharacteristic('00002a25-0000-1000-8000-00805f9b34fb');
    // const characteristic10 = await service2.getCharacteristic('00002a26-0000-1000-8000-00805f9b34fb');
    // const characteristic11 = await service2.getCharacteristic('00002a27-0000-1000-8000-00805f9b34fb');
    // const characteristic12 = await service2.getCharacteristic('00002a28-0000-1000-8000-00805f9b34fb');
    // const characteristic13 = await service2.getCharacteristic('00002a29-0000-1000-8000-00805f9b34fb');
    // const characteristic14 = await service2.getCharacteristic('00002a2a-0000-1000-8000-00805f9b34fb');
    // const characteristic15 = await service3.getCharacteristic('00002a00-0000-1000-8000-00805f9b34fb');
    // const characteristic16 = await service3.getCharacteristic('00002a01-0000-1000-8000-00805f9b34fb');
    // const characteristic17 = await service3.getCharacteristic('00002a04-0000-1000-8000-00805f9b34fb');
    console.log(characteristic);
    console.log(descriptor);
    console.log(characteristic2);
    console.log(descriptor2);
    console.log(characteristic3);
    console.log(descriptor3);
    console.log(characteristic4);
    console.log(characteristic5);
    console.log(characteristic6);
    console.log(descriptor6);
    // console.log(characteristic7);
    // console.log(characteristic8);
    // console.log(characteristic9);
    // console.log(characteristic10);
    // console.log(characteristic11);
    // console.log(characteristic12);
    // console.log(characteristic13);
    // console.log(characteristic14);
    // console.log(characteristic15);
    // console.log(characteristic16);
    // console.log(characteristic17);

    try{
        await characteristic.writeValue(new ArrayBuffer('hh'));
        console.log("1" + characteristic);
    }catch(error){
        console.log(error);
    }
    try{
        await characteristic2.writeValue(new ArrayBuffer('hh'));
        console.log("2" + characteristic2);
    }catch(error){
        console.log(error);
    }
    try{
        await characteristic3.writeValue(new ArrayBuffer('hh'));
        console.log("3" + characteristic3);
    }catch(error){
        console.log(error);
    }
    try{
        await characteristic4.writeValue(new ArrayBuffer('hh'));
        console.log("4" + characteristic4);
    }catch(error){
        console.log(error);
    }
    try{
        await characteristic5.writeValue(new ArrayBuffer('hh'));
        console.log("5" + characteristic5);
    }catch(error){
        console.log(error);
    }
    try{
        await characteristic6.writeValue(new ArrayBuffer('hh'));
        console.log("6" + characteristic6);
    }catch(error){
        console.log(error);
    }
    console.log(characteristic.readValue());
    console.log(characteristic2.readValue());
    console.log(characteristic3.readValue());
    console.log(characteristic4.readValue());
    console.log(characteristic5.readValue());
    console.log(characteristic6.readValue());
    // try{
    //     await characteristic7.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("7" + characteristic7);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic8.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("8" + characteristic8);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic9.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("9" + characteristic9);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic10.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("10" + characteristic10);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic11.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("11" + characteristic11);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic12.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("12" + characteristic12);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic13.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("13" + characteristic13);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic14.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("14" + characteristic14);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic15.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("15" + characteristic15);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic16.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("16" + characteristic16);
    // }catch{error}{
    //     console.log(error);
    // }
    // try{
    //     await characteristic17.writeValue(new Int8Array(new TextEncoder('hh', 'utf-8')));
    //     console.log("17" + characteristic17);
    // }catch{error}{
    //     console.log(error);
    // }
}
      
function displaySymName(name){
    document.getElementById("name").innerHTML = "Name: " + name.name;
    document.getElementById("info").innerHTML = "ID: " + name.id; 
    document.getElementById("displayInfo").innerHTML = "Server Connected: " + name.gatt;

}
        
function disByBluetooth(){
    // showButtonsByBluetooth();
    device.gatt.disconnect();
    document.getElementById("name").innerHTML = "";
    document.getElementById("info").innerHTML = "";
    document.getElementById("displayErrors").innerHTML = "";
    document.getElementById("displayInfo").innerHTML = "";
    console.log(server); 
}

// function hideButtonsByBluetooth(){
//     findButtons.style.display = "none";
//     disconnectBluetooth.style.display = disconnectDisplay;   
//     document.getElementById("displayErrors").innerHTML = "";
// }

// function showButtonsByBluetooth(){
//     findButtons.style.display = buttonsDisplay;
//     disconnectBluetooth.style.display = "none";
//     document.getElementById("displayErrors").innerHTML = "";
// }

//        // Unique UUID for this application
// let MY_UUID_SECURE = UUID.fromString("7A9C3B55-78D0-44A7-A94E-A93E3FE118CE");
// let MY_UUID_INSECURE = UUID.fromString("23F18142-B389-4772-93BD-52BDBB2C03E9");
// // Well known SPP UUID
// let UUID_SPP = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
