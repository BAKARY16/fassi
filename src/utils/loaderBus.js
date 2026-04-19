// Bus de communication entre PageLoader et les pages
// Évite les problèmes de batching React 18 avec les contextes

let _handler = null

export const loaderBus = {
  /** PageLoader appelle ça pour s'abonner à l'événement "page prête" */
  onStop(fn) {
    _handler = fn
  },
  /** usePageReady appelle ça quand la page est montée et peinte */
  stop() {
    if (_handler) {
      _handler()
      _handler = null
    }
  },
}
