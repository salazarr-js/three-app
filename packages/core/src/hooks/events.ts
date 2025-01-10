import type { ThreeAppEvent, ThreeAppEventHandler, ThreeAppEventHandlerId, ThreeAppEventHandlerParams, ThreeAppPointerEvent } from '@/types'
import type { Intersection, Object3D } from 'three'

const _objectsToIntersect: Object3D[] = []
const _UUIDsToIntersect = new Set<string>()

const _intersectedObjects = new Map<string, { intersection: Intersection, object: Object3D }>()
const _intersectionEventHandlers = new Map<ThreeAppEventHandlerId, ThreeAppEventHandler<any>>()

/** Adds object to the raycaster check list. */
function addObjectToIntercept(object: Object3D) {
  if (!_UUIDsToIntersect.has(object.uuid)) {
    _UUIDsToIntersect.add(object.uuid)
    _objectsToIntersect.push(object)
  }

  // TODO: remove objects
}

/** Returns the list of objects that will be intersected by the raycaster. */
export function getObjectsToIntersect(): Object3D[] {
  return _objectsToIntersect
}

/** Returns the map of intersected objects by raycaster, keyed by UUID. */
export function getIntersectedObjects() {
  return _intersectedObjects
}

/** Search and executes a raycaster event handler with given params. Return true if the event handler was found and executed. */
export function executeThreeAppEventHandler(eventType: ThreeAppEvent, { event, intersection, object }: ThreeAppEventHandlerParams) {
  const iCbs = _intersectionEventHandlers
  const callbackId: ThreeAppEventHandlerId = `@${eventType}:${object.uuid}`
  if (iCbs.has(callbackId)) {
    iCbs.get(callbackId)!({ event, intersection, object })

    return true
  }

  return false
}

/** Registers a `click` event handler for the given object. */
export function onClick(obj: Object3D, cb: ThreeAppEventHandler) {
  addObjectToIntercept(obj)

  _intersectionEventHandlers.set(`@click:${obj.uuid}`, cb)
}

/** Registers a `pointerenter` event handler for the given object. */
export function onPointerEnter(obj: Object3D, cb: ThreeAppEventHandler<ThreeAppPointerEvent>) {
  addObjectToIntercept(obj)

  _intersectionEventHandlers.set(`@pointerenter:${obj.uuid}`, cb)
}

/** Registers a `pointerleave` event handler for the given object. */
export function onPointerLeave(obj: Object3D, cb: ThreeAppEventHandler<ThreeAppPointerEvent>) {
  addObjectToIntercept(obj)

  _intersectionEventHandlers.set(`@pointerleave:${obj.uuid}`, cb)
}

/** Registers a `pointermove` event handler for the given object. */
export function onPointerMove(obj: Object3D, cb: ThreeAppEventHandler<ThreeAppPointerEvent>) {
  addObjectToIntercept(obj)

  _intersectionEventHandlers.set(`@pointermove:${obj.uuid}`, cb)
}
