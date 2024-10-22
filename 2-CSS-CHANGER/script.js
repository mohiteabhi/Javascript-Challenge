const inputs = document.querySelectorAll(".css-controller input");

inputs.forEach((input) => input.addEventListener("change", update));
inputs.forEach((input) => input.addEventListener("mousemove", update)); 

function update() {
    const suffixData = this.dataset.sizing || "";
    document.documentElement.style.setProperty(
        `--${this.name}`,
        this.value + suffixData
    );

    if (this.name === "base-color") {
        document.documentElement.style.setProperty("--base", this.value);
        document.documentElement.style.setProperty("--border-color", this.value);
    }
}
