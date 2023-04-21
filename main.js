const dqs = document.querySelector.bind(document)
const svg = dqs("svg")


function render(N) {
    svg.innerHTML = ""
    const add = (el) => svg.insertAdjacentHTML("beforeend", el)
    for(let i = 0; i < N; i++) {
        const phi = i / N * 2 * Math.PI
        const x = 80 * Math.sin(phi)
        const y = -80 * Math.cos(phi)
        const R = 250 / (N + 12)
        add(`<circle data-i="${i}" cx=${x} cy=${y} r=${R} fill="#ddd"></circle>`)
        add(`<text x=${x} y=${y} style="font-size: ${1.2 * R}px">${i}</text>`)
    }
    document.querySelectorAll("circle").forEach(i=>{
        console.log(i.dataset.i);
        i.addEventListener("click", ()=>highlight(i.dataset.i))
    })
}

update()

function update() {
    const N = +dqs("[name=N]").value
    render(N)
}

function highlight(i) {
    clear()
    dqs(`[data-i='${i}']`).classList.add("highlight");
}

document.querySelectorAll("input").forEach(i=>{
    i.addEventListener("change", update)
})

function clear() {
    dqs(".highlight")?.classList.remove("highlight")
}

async function run() {
    reset()
    const maxsteps =  +dqs("[name=f]").value
    for(let steps = 1; steps <= maxsteps; steps++) {
        step()
        await new Promise(r=>setTimeout(r, 600 / maxsteps))
    }  
}

async function step() {
    let result = +(dqs(".result").textContent || 1)
    let steps = +(dqs(".steps").textContent || 0)
    let m = +dqs("[name=m]").value
    let N = +dqs("[name=N]").value
    result = result * m % N
    dqs(".steps").textContent = steps + 1
    dqs(".operation").textContent = ` % ${N} =`
    dqs(".result").textContent = result
    highlight(result)
}

async function reset() {
    clear()
    dqs(".steps").textContent = ""
    dqs(".operation").textContent = ""
    dqs(".result").textContent = ""
}


