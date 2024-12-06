function calculateInitialShift(text) {
    // Count numbers and letters in the text
    const count = text.split("").filter((char) => char.match(/[a-zA-Z0-9]/)).length;
    return count % 26; // Ensure shift is within valid range for letters
}

function applyInitialShift(text, shift) {
    let result = "";
    for (let char of text) {
        if (char.match(/[a-zA-Z0-9]/)) {
            const isNumber = char.match(/[0-9]/);
            const base = isNumber ? 48 : char === char.toUpperCase() ? 65 : 97;
            const range = isNumber ? 10 : 26;
            const shifted = ((char.charCodeAt(0) - base + shift + range) % range) + base;
            result += String.fromCharCode(shifted);
        } else {
            result += char;
        }
    }
    return result;
}

function encrypt() {
    const plaintext = document.getElementById("plaintext").value;
    const initialShift = calculateInitialShift(plaintext);

    // Apply and display the initial shift
    const afterInitialShift = applyInitialShift(plaintext, initialShift);
    document.getElementById("initial-result").innerText = afterInitialShift;

    // Get secondary shifts
    const secondaryShifts = document
        .getElementById("secondary-shifts")
        .value.split(",")
        .map(Number);

    // Apply secondary shift
    let ciphertext = "";
    for (let i = 0, secShiftIndex = 0; i < afterInitialShift.length; i++) {
        const char = afterInitialShift[i];
        if (char.match(/[a-zA-Z0-9]/)) {
            const isNumber = char.match(/[0-9]/);
            const base = isNumber ? 48 : char === char.toUpperCase() ? 65 : 97;
            const range = isNumber ? 10 : 26;
            const secShift =
                secondaryShifts[secShiftIndex % secondaryShifts.length];
            const finalShifted = ((char.charCodeAt(0) - base + secShift + range) % range) + base;
            ciphertext += String.fromCharCode(finalShifted);
            secShiftIndex++;
        } else {
            ciphertext += char;
        }
    }
    document.getElementById("result").innerText = ciphertext;
}

function decrypt() {
    const ciphertext = document.getElementById("plaintext").value;
    const initialShift = calculateInitialShift(ciphertext);
    const secondaryShifts = document
        .getElementById("secondary-shifts")
        .value.split(",")
        .map(Number);

    // Reverse secondary shift
    let afterSecondaryShift = "";
    for (let i = 0, secShiftIndex = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        if (char.match(/[a-zA-Z0-9]/)) {
            const isNumber = char.match(/[0-9]/);
            const base = isNumber ? 48 : char === char.toUpperCase() ? 65 : 97;
            const range = isNumber ? 10 : 26;
            const secShift =
                secondaryShifts[secShiftIndex % secondaryShifts.length];
            const reversedShifted = ((char.charCodeAt(0) - base - secShift + range) % range) + base;
            afterSecondaryShift += String.fromCharCode(reversedShifted);
            secShiftIndex++;
        } else {
            afterSecondaryShift += char;
        }
    }

    // Reverse initial shift and display
    const plaintext = applyInitialShift(afterSecondaryShift, -initialShift);
    document.getElementById("initial-result").innerText = afterSecondaryShift;
    document.getElementById("result").innerText = plaintext;
}
