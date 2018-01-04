If you need to test the modal this is how you can have it run as soon as the app loads up:

```js
import modalActions from './state/modal/actions'
import modalContentComponents from './containers/Modal/modalComponentsMap'
store.dispatch(
   modalActions.modalOpen(modalContentComponents.IMAGE_COMPONENT_WIZARD_KEY, { new: true }))
```

Put it in `app.js` after `createStore`. This opens up the primary image one.
