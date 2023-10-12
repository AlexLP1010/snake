const gameCanvas = document.getElementById('game')
const ctx = gameCanvas.getContext('2d')

const GRID = 40
const CANVAS_SIZE = gameCanvas.width
const PIXEL = CANVAS_SIZE / GRID

const snake = {
  body: [
    {x: 0 * PIXEL, y: 0 * PIXEL},
    {x: 0 * PIXEL, y: 0 * PIXEL}
  ]
}

const food = {
  x: 5 * PIXEL, 
  y: 2 * PIXEL
}

let direction = {x: 1, y: 0}
function move() {
  let beginPosition = {x: snake.body[0].x, y: snake.body[0].y}
  snake.body[0].x += direction.x * PIXEL
  snake.body[0].y += direction.y * PIXEL
  for(let i = 1; i < snake.body.length; i++) {
    const oldPosition = snake.body[i]
    snake.body[i] = beginPosition
    beginPosition = oldPosition
  }
}

function changeDirection(newDirection) {
  switch(newDirection) {
    case 'ArrowUp':
      if(direction.y !== 1) direction = {x: 0, y: -1}
      break
    case 'ArrowDown':
      if(direction.y !== -1) direction = {x: 0, y: 1}
      break
    case 'ArrowRight':
      if(direction.x !== -1) direction = {x: 1, y: 0}
      break
    case 'ArrowLeft':
      if(direction.x !== 1) direction = {x: -1, y: 0}
      break
    default: 
      break
  }
}
addEventListener('keydown', evt => {changeDirection(evt.key)})

function checkCollitionFood() {
  if(food.y === snake.body[0].y && snake.body[0].x === food.x) {
    const tall = snake.body[snake.body.length - 1]
    snake.body.push({x: tall.x, y: tall.y})
    food.x = Math.floor(Math.random() * 39) * PIXEL
    food.y = Math.floor(Math.random() * 39) * PIXEL
  }
}

function checkEdgeCollition() {
  const head = snake.body[0]
  if(head.y < 0) {
    snake.body[0].y = 39 * PIXEL
  } else if(head.y > 40 * PIXEL) {
    snake.body[0].y = 0
  }

  if(head.x < 0) {
    snake.body[0].x = 39 * PIXEL
  } else if(head.x > 40 * PIXEL) {
    snake.body[0].x = 0
  }
}

function shefCollition() {
  snake.body.forEach((part, idx) => {
    if(idx === 0) return
    if(snake.body[0].x === part.x &&
      snake.body[0].y === part.y
    ) {
      alert('Game Over')
      snake.body = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
      direction = {x: 1, y: 0}
      sloness = 700
      food.x = Math.floor(Math.random() * 39) * PIXEL
      food.y = Math.floor(Math.random() * 39) * PIXEL
    }
  })
}

function draw() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  ctx.fillStyle = '#0a0'
  snake.body.forEach(part => {
    ctx.fillRect(part.x, part.y, PIXEL, PIXEL)
  })
  ctx.fillRect(food.x, food.y, PIXEL, PIXEL)
}

function update() {
  move()
  shefCollition()
  checkCollitionFood()
  checkEdgeCollition()
}

let start = 0
let sloness = 700
function main(timestamp) {
  if(timestamp - start > sloness) {
    update()
    if(!sloness < 400)
      sloness--
    start = timestamp
  }
  draw()
  requestAnimationFrame(main)
}

main()

