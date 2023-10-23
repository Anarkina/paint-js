const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext("2d")
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')
canvas.height = 700
canvas.width = 700

const INITIAL__COLOR = '#2c2c2c'

ctx.strokeStyle = INITIAL__COLOR
ctx.fillStyle = 'white'
ctx.lineWidth = 2.5


let painting = false
let filling = false

function stopPainting() {
    painting = false
}
function onMouseMove(e) {
    x = e.offsetX;
    y = e.offsetY;
    if (!painting) {
        // console.log('Создаем контур', x, y)
        ctx.beginPath()
        ctx.moveTo(x, y)
    } else {
        // console.log('рисуем линию', x, y)
        ctx.lineTo(x, y)
        ctx.stroke()
    }
    // console.log(x, y)
}
function onMouseDown(e) {
    painting = true
}

function startPainting() {
    painting = true
}
function handleColorClick(e) {
    const color = e.target.style.backgroundColor
    ctx.strokeStyle = color
    ctx.fillStyle = ctx.strokeStyle
}
if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener('contextmenu',handleCM )
}

Array.from(colors).forEach(color => {
    color.addEventListener('click', handleColorClick)
})

if (range) {
    range.addEventListener('input', handleRangeChange)
}

function handleRangeChange(e) {
    let rangeValue = e.target.value
    ctx.lineWidth = rangeValue
}

mode.addEventListener('click', handleModeClick)


function handleModeClick(e) {
    if (filling === true) {
        filling = false
        mode.innerText = "Заливка"
    } else {
        filling = true
        mode.innerText = 'Рисование'

    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, 700, 700)
    }

}

function handleCM(e){
    e.preventDefault()
}


saveBtn.addEventListener('click', handleSaveClick)

function handleSaveClick(){
    const image = canvas.toDataURL('image,png')
    const link = document.createElement('a')
    link.href = image
    link.download = 'Export'
    link.click() 
}