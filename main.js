const svg = document.querySelector("svg")

const add = (el) => svg.insertAdjacentHTML("beforeend", el)

function render(N) {
    svg.innerHTML = ""
    for(let i = 0; i < N; i++) {
        const phi = i / N * 2 * Math.PI
        const x = 80 * Math.sin(phi)
        const y = -80 * Math.cos(phi)
        const R = 250 / (N + 12)
        add(`<circle cx=${x} cy=${y} r=${R} fill="#ddd"></circle>`)
        add(`<text x=${x} y=${y} style="font-size: ${1.2*R}">${i}</text>`)
    }
    document.querySelectorAll("circle").forEach(i=>{
        i.addEventListener("click", highlight)
    })
}

update()

function update() {
    const N = +document.querySelector("[name=N]").value
    render(N)
}

function highlight(e) {
    document.querySelector(".highlight")?.classList.remove("highlight")
    e.target.classList.add("highlight");
}

document.querySelectorAll("input").forEach(i=>{
    i.addEventListener("change", update)
})


