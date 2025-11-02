export interface IOConfig {
  /** Optional custom DOMParser implementation */
  domParser?: typeof DOMParser;
  /** Optional custom XMLSerializer implementation */
  xmlSerializer?: typeof XMLSerializer;
  /** Browser only: use innerHTML for speed (default: false, safe DOMParser used) */
  unsafe?: boolean;
  /** Remove <script> elements (default: true in unsafe mode) */
  removeScripts?: boolean;
  /** Strip `on*` event handler attributes (default: true in unsafe mode) */
  removeEventHandlers?: boolean;
  /** Remove <foreignObject> elements (default: false) */
  removeForeignObject?: boolean;
  /** Enforce root <svg> validation (default: true) */
  strict?: boolean;
}
