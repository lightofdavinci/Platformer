export const onKeyDown = (e, context) => {
  switch (e.keyCode) {
    case 38: // up
      context.moveForward = true;
      break;
    case 37: // left
      context.moveLeft = true;
      break;
    case 40: // down
      context.moveBackward = true;
      break;
    case 39: // right
      context.moveRight = true;
      break;
    default:
      break;
  }
}

export const onKeyUp = (e, context) => {
  switch (e.keyCode) {
    case 38: // up
      context.moveForward = false;
      break;
    case 37: // left
      context.moveLeft = false;
      break;
    case 40: // down
      context.moveBackward = false;
      break;
    case 39: // right
      context.moveRight = false;
      break;
    default:
      break;
  }
}
