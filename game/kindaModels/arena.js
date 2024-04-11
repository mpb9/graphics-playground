const arenaContainer = document.getElementById("#gameDisplay");

// MARK: Arena class
class Arena {
  constructor(container) {
    Object.assign(this, {
      container,
      style: container.style,
    });
  }
}
