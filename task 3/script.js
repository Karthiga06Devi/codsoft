const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () => handleInput(button.textContent));
});

function handleInput(value) {
    if (value === "C") {
        display.value = "";
    }
    else if (value === "⌫") {
        display.value = display.value.slice(0, -1);
    }
    else if (value === "=") {
        calculate();
    }
    else {
        display.value += convertSymbol(value);
    }
}

function convertSymbol(symbol) {
    if (symbol === "÷") return "/";
    if (symbol === "×") return "*";
    if (symbol === "−") return "-";
    return symbol;
}

function calculate() {
    try {
        display.value = Function("return " + display.value)();
    } catch {
        display.value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (
        (e.key >= 0 && e.key <= 9) ||
        ["+", "-", "*", "/", "."].includes(e.key)
    ) {
        display.value += e.key;
    }

    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") display.value = display.value.slice(0, -1);
    if (e.key === "Escape") display.value = "";
});
