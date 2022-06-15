function CameraDragger(spec) {
  const self = CameraController(spec, 'CameraDragger')

  const {
    camera,
    entity,
    screen,
    globalScope,
  } = self

  const clickable = Clickable({
    entity: camera,
    screen,
    space: 'frame',
    camera: self,
    layer: spec.layer,
  })

  const dragOrigin = Vector2()
  const dragOffset = Vector2()
  const dragOffsetFrame = Vector2()

  function dragStart(point) {
  // console.log('Beginning camera drag')
    self.position.set(camera.transform.position)
    dragOrigin.set(self.position)
  }

  function dragMove(point) {
    dragOffset.set(clickable.dragDelta)
    dragOffset.negate()

    camera.frameToWorldDirection(dragOffset)
    dragOrigin.add(dragOffset, self.position)
  }

  function dragEnd(point) {
  // console.log('Ending camera drag')
  }

  function click(point) {
  // console.log('Clicking background')
  }

  function canControl() {
    return clickable.dragging
  }

  return self.mix({
    clickable,

    dragStart,
    dragMove,
    dragEnd,

    click,

    canControl,
  })
}