
let reader = null;
        let writer = null;
        let port = null;
        let symResponce = "";
        let serialMatch = "";
        let dateMatch = "";
        let decimalMatch = "";
        let currentSettingsMatch = "";
        let levelRageMatch = "";
        let currentLevel = "";
        let screenMessage = "";

        navigator.serial.addEventListener("connect", (e) => {
            showButtons();
        });
        navigator.serial.addEventListener("disconnect", (e) => {
            hideButtons();
            document.getElementById("purgeAndDisconnect").innerHTML = "";
        });

        async function connectSym() {
            try {
                port = await navigator.serial.requestPort();
                await port.open({ baudRate: 9600 });
                const decoder = new TextDecoderStream();
                port.readable.pipeTo(decoder.writable);
                const inputStream = decoder.readable;
                reader = inputStream.getReader();
                writer = port.writable.getWriter();
                showButtons();
                writeToSym('hh');
                readFromSym();
                await delay(2000);
                readHello(symResponce);
                symInfo();
                await delay(3000);
                readSymInfo(symResponce);
                symReadings();
                await delay(4000);
                readSymReadings(symResponce);
            } catch (error) {
                console.log("Error From connectSym()");
                document.getElementById("displayErrors").innerHTML = "" + error;
            }
        }

        async function writeToSym(string) {
            try{ await writer.write(sendMessages(string));
            }catch(error){
                console.log("Error From writeToSym()");
                document.getElementById("displayErrors").innerHTML = "" + error;
            }
        }

        async function readFromSym() {
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
                document.getElementById("displayErrors").innerHTML = "" + error;
                document.getElementById("purgeAndDisconnect").innerHTML = "";
            }
        }

        function readHello(s){
            console.log("readHello()");
            serialMatch = s.match(/[0-9]{6}/g );
            screenMessage = "SYM U - Serial# " + serialMatch + "<br/>";
            document.getElementById("displayInfo").innerHTML = screenMessage;
            symResponce = "";
        }

        function readSymInfo(s){
            console.log("readSymInfo()");
            dateMatch = s.match(/\d{2}\/\d{2}\/\d{4}/g);
            decimalMatch = s.match(/\d{1}\.\d{2}/g);
            currentSettingsMatch = s.slice(0, ((s.search(/[0-9]/))-2));
            levelRageMatch = s.match(/0 -\ [0-9]{2,3}/g);
            screenMessage += "Firmware Version: " + decimalMatch[2] + "<br/>" +
            "Production Date: " + dateMatch + "<br/>" +
            currentSettingsMatch + " " + levelRageMatch + "<br/>" +
            "Output Voltage Range: " + decimalMatch[0] + " - " + decimalMatch[1] + "<br/>";
            document.getElementById("displayInfo").innerHTML = screenMessage;
            symResponce = "";
        }

        function readSymReadings(s){
            console.log("readSymReadings()");
            currentLevel = s.slice(0, (s.search(/vdc/i)));
            screenMessage += "Current Level: " + "<br/>" + currentLevel;
            document.getElementById("displayInfo").innerHTML = screenMessage;
            symResponce = "";
        }

        async function symInfo(){
            console.log("symInfo()");
            try{
                await writeToSym('<sc>');
                await delay(2000);
                await writeToSym('y');
            }catch(error){
                console.log("Error From symInfo()");
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

        async function disconnect(){
            document.getElementById("purgeAndDisconnect").innerHTML = "Rebooting SYM...";
            try{
                await writeToSym('<sr>');
                hideButtons();
            }catch(error){
                document.getElementById("purgeAndDisconnect").innerHTML = "";
                console.log("Error From disconnect()")
                console.log(error);
            }
        }

        function sendMessages(string){
            const encoder = new TextEncoder();
            const encoded = encoder.encode(string);
            return new Int8Array(encoded)
        }

        async function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function symData(){
            try{
                await writeToSym('<si>');
                await delay(2000);
                await writeToSym('n');
                await delay(2000);
                await writeToSym('y');
            }catch(error){
                console.log("Error From disconnect()");
            }
        }

        function showButtons(){
            // document.getElementById("symInfo").style.display = "initial";
            // document.getElementById("symReadings").style.display = "initial";
            document.getElementById("purgeSym").style.display = "initial";
            // document.getElementById("symData").style.display = "initial";
            document.getElementById("disconnect").style.display = "initial";
            document.getElementById("seeAllDevices").style.display = "none";
            document.getElementById("symByBluetooth").style.display = "none";
            document.getElementById("symBySerial").style.display = "none";
            document.getElementById("connectSym").style.display = "none";
            document.getElementById("displayErrors").innerHTML = "";
        }

        function hideButtons(){
            // document.getElementById("symInfo").style.display = "none";
            // document.getElementById("symReadings").style.display = "none";
            document.getElementById("purgeSym").style.display = "none";
            // document.getElementById("symData").style.display = "none";
            document.getElementById("disconnect").style.display = "none";
            document.getElementById("seeAllDevices").style.display = "initial";
            document.getElementById("symByBluetooth").style.display = "initial";
            document.getElementById("symBySerial").style.display = "initial";
            document.getElementById("connectSym").style.display = "initial";
            document.getElementById("displayErrors").innerHTML = "";
            document.getElementById("displayInfo").innerHTML = "";
        }