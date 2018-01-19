export default context => {
  const ready = setInterval(() => {
    if (context.scene.getObjectByName('shipMesh') && context.shipBody) {
      clearInterval(ready);
      context.animate();
      // Start the timer
      context.setState({
        startTimer: true,
        preloader: false
      });
    }
  }, 1000);
};
