

# Notes
 - When an entity is removed from the scene and it had components register event listeners on the entity, the component does not have to unregister those events, the entity will do that

- You can get the world coordinate of an entity by calling Entity.getWorldCoords(v). but before doing so, you must zero out the v if you're re-using the vector.

Rendering
 - Order of layer rendering is in 'layerRenderOrder' in Renderer.js


Entities
 - 'user'
 - 'mouse'
 - 'bee'
 - 'hummingbird'
 - 'emitter'
 - 'background'

Events
 - entityadded
 - collision
 - hurt 
 - killed
 - death <- rename to entityremoved?
 - increasescore
 - payload
 
 - GAME_MOUSE_DOWN
 - GAME_MOUSE_UP

