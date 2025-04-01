
let server = null;
        let device = null;
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
            }catch(error){
                console.log(error);
                document.getElementById("displayErrors").innerHTML = error;
            }
            server = await device.gatt.connect();
            displaySymName(device);
            hideButtonsByBluetooth();
            document.getElementById("disconnectSymByBluetooth").style.display = "initial";
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
        
        function disconnectSymByBluetooth() {
            document.getElementById("disconnectSymByBluetooth").style.display = "none";
            device.gatt.disconnect();
            document.getElementById("name").innerHTML = "";
            document.getElementById("info").innerHTML = "";
            document.getElementById("displayErrors").innerHTML = "";
            document.getElementById("displayInfo").innerHTML = "";
            showButtonsByBluetooth();
            console.log(server); 
        }

        function hideButtonsByBluetooth(){
            document.getElementById("seeAllDevices").style.display = "none";
            document.getElementById("symByBluetooth").style.display = "none";
            document.getElementById("symBySerial").style.display = "none";
            document.getElementById("connectSym").style.display = "none";
            document.getElementById("disconnectSymByBluetooth").style.display = "initial";
            document.getElementById("displayErrors").innerHTML = "";
        }

        function showButtonsByBluetooth(){
            document.getElementById("seeAllDevices").style.display = "initial";
            document.getElementById("symByBluetooth").style.display = "initial";
            document.getElementById("symBySerial").style.display = "initial";
            document.getElementById("connectSym").style.display = "initial";
            document.getElementById("disconnectSymByBluetooth").style.display = "none";
            document.getElementById("displayErrors").innerHTML = "";
        }

            //        // Unique UUID for this application
            // let MY_UUID_SECURE = UUID.fromString("7A9C3B55-78D0-44A7-A94E-A93E3FE118CE");
            // let MY_UUID_INSECURE = UUID.fromString("23F18142-B389-4772-93BD-52BDBB2C03E9");
            // // Well known SPP UUID
            // let UUID_SPP = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
