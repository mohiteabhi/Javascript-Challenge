// let output = document.getElementById('output');
// let buttons = document.getElementsByClassName('tool-btn');

// for(let btn of buttons){
//     btn.addEventListener('click', () => {
//         let cmd = btn.dataset['command'];
//         if (cmd === 'createlink'){
//             let url = prompt("Enter the link here: ", "http:\/\/");
//             document.execCommand(cmd, false, url);
//         }
//         else{
//             document.execCommand(cmd, false, null);
//         }
//     })
// }

let output = document.getElementById('output');
let buttons = document.getElementsByClassName('tool-btn');
let copyBtn = document.getElementById('copy-btn');

for (let btn of buttons) {
    btn.addEventListener('click', () => {
        let cmd = btn.dataset['command'];
        if (cmd === 'createlink') {
            let url = prompt("Enter the link here: ", "http://");
            document.execCommand(cmd, false, url);
        } else {
            document.execCommand(cmd, false, null);
        }
    });
}

// Function to convert content to RTF format and copy to clipboard
function copyToClipboard() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(output);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    alert("Content copied with styles!");
}

copyBtn.addEventListener('click', copyToClipboard);
