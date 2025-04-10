
// "Hello"->
let s1 = "HELLO SYM U Serial# 104309 Please choose an inquire: For SYM info: . . . . . <sc> To purge SYM: . . . . <sp> Put SYM on HOLD:  <sh> For SYM readings: . <sd> To calibrate: . . . . . . <C,> To Replace old SYM:  <ZS>  <ZM>  <ZR>  <23QS>  <23QR>  SYM U Ori ginal  <ZU> For fluid type Water <UW> or Diesel  <UD> To finish . . . . . . . . . <SR></SR>";

// "Sym Info"->
let s2 = "SYM 23QS P range: "

"(0 - 132) in H2O) V output: (0.30 - 4.67) VDC) Firmware Version: 3.10 Production Date: 06/01/2025 DONE More inquires ? Send 'Y' or 'N' Please choose an inquire: For SYM info: . . . . . <sc> To purge SYM: . . . . <sp> Put SYM on HOLD:  <sh> For SYM readings: . <sd> To calibrate: . . . . . . <C,> To Replace old SYM: <ZS>  <ZM>  <ZR>  <23QS>  <23QR>  SYM U Original  <ZU> For fluid type Water <UW> or Diesel  <UD> To finish . . . . . . . . . <SR></SR>";

// "Sym Readings"->
let s3 = "ADC pointer = 132 001,0 Inches of Water Voltage Output = 0.3 VDC Send 'Y' or 'N'DONE More inquires ? Send 'Y' or 'N' Please choose an inquire: For SYM info: . . . . . <sc> To purge SYM: . . . . <sp> Put SYM on HOLD:  <sh> For SYM readings: . <sd> To calibrate: . . . . . . <C,> To Replace old SYM:  <ZS>  <ZM>  <ZR> index.html:146  <23QS>  <23QR> SYM U Original  <ZU> For fluid type Water <UW> or Diesel  <UD> To finish . . . . . . . . . <SR></SR>";

// "Sym Data"->
let s4 = "Inches = 1.0   Water Voltage Output = 0.3 More data? y/n DONE More inquires ? Send 'Y' or 'N' Please choose an inquire: For SYM in fo: . . . . . <sc> To purge SYM: . . . . <sp> Put SYM on HOLD:  <sh> For SYM readings: . <sd> To calibrate: . . . . . . <C,> To Replace old SYM:  <ZS>  <ZM>  <ZR>  <23QS>  <23QR> SYM U Original  <ZU> For fluid type Water <UW> or Diesel  <UD> To finish .  . . . . . . . . <SR></SR>";

// "Sym Purge"->
let s5 = "PUMP RUNS/n FOR 5 seconds DONE More inquires ? Send 'Y' or 'N' Please choose an inquire: For SYM info: . . . . . <sc> To purge SYM: . . . . <sp> Put SYM on HOLD:  <sh> For SYM readings: . <sd> To calibrate: . . . . . . <C,> To Replace old SYM: <ZS>  <ZM>  <ZR> <23QS>  <23QR> SYM U Original  <ZU>For fluid type Water <UW> or Diesel  <UD>To finish . . . . . . . . . <SR></SR>";

// "Disconect"->
let s6 = "DONE... REBOOTING... Do not remove Power from the SYM ";

let serialMatch = s1.match(/[0-9]{6}/g );
let dateMatch = s2.match(/\d{2}\/\d{2}\/\d{4}/g);
let decimalMatch = s2.match(/\d{1}\.\d{2}/g);
let currentSettingsMatch = s2.slice(0, ((s2.search(/[0-9]/))-2));
let levelRageMatch = s2.match(/0 -\ [0-9]{2,3}/g);
let currentLevel = s3.slice(0, (s3.search(/vdc/i)));


let symPrintOut = "SYM U - Serial# " + serialMatch + "\n" +
"Firmware Version: " + decimalMatch[2] + "\n" +
"Production Date: " + dateMatch + "\n" +
currentSettingsMatch + " " + levelRageMatch + "\n" +
"Output Voltage Range: " + decimalMatch[0] + " - " + decimalMatch[1] + "\n" +
"Current Level: " + "\n" +
 currentLevel;

console.log(symPrintOut);


/*
// Using the RegExp constructor
const regex1 = new RegExp('pattern', 'flags');

// Using literal notation
const regex2 = /pattern/flags;

Methods
The pattern defines the search criteria, while flags modify the search behavior (e.g., case-insensitive, global search).

test(): Checks if a string matches the pattern, returning true or false.
exec(): Searches for a match in a string and returns an array with information about the match or null if no match is found.
match(): Returns an array containing the results of matching a string against a regex.
replace(): Returns a new string with some or all matches of a pattern replaced by a replacement.
search(): Tests for a match in a string and returns the index of the match, or -1 if not found.
split(): Uses a regex or a fixed string to break a string into an array of substrings.

Special Characters

^: Matches the beginning of a string.
$: Matches the end of a string.
.: Matches any single character except newline.
*: Matches zero or more occurrences of the preceding character or group.
+: Matches one or more occurrences of the preceding character or group.
?: Matches zero or one occurrence of the preceding character or group.
[]: Defines a character set (e.g., [a-z] matches any lowercase letter).
(): Groups characters or expressions.
|: Acts as an "or" operator.
`\`: Escapes special characters or introduces special sequences (e.g., \d for digits, \s for whitespace).
{}: Specifies the number of occurrences (e.g. {n} exactly n times, {n,m} between n and m times). 

Flags

i: Case-insensitive matching.
g: Global matching (find all matches, not just the first).
m: Multiline matching (treats each line as separate).
u: Unicode matching
s: "dotAll", allows . to match newline characters



const text = "The quick brown fox jumps over the lazy dog.";

// Check if the text contains the word "fox"
const hasFox = /fox/.test(text); // true

// Find all occurrences of the letter "o"
const allOs = text.match(/o/g); // ["o", "o", "o"]

// Replace "dog" with "cat"
const newText = text.replace(/dog/, "cat"); // "The quick brown fox jumps over the lazy cat."

//Extract numbers from a string
const numbers = "There are 123 apples and 456 oranges.";
const extractedNumbers = numbers.match(/\d+/g); // ["123", "456"]
*/
