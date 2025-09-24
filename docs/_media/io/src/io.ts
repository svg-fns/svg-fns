/**
 * @svg-fns/io
 *
 * Feather-light I/O utilities for working with SVG.
 *
 * 📐 Principles
 *  - No dependencies (uses @xmldom/xmldom only if needed in Node.js, lazy-loaded).
 *  - Works in both Browser + Node.js.
 *  - Browser: sync API; optional `unsafe` mode uses innerHTML for speed.
 *      ⚠️ Security note: In unsafe mode, script execution is only a risk
 *         once the parsed element is attached to the DOM.
 *  - Node: async API; loads @xmldom/xmldom at runtime.
 *  - Dev-friendly errors on invalid input.
 */

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

let DOMParserImpl: typeof DOMParser | undefined;
let XMLSerializerImpl: typeof XMLSerializer | undefined;

//
// -------------------- Browser implementations --------------------
//

/**
 * Parses an SVG string into an `SVGElement` using an *unsafe* but faster DOM method.
 *
 * @remarks
 * - Parsing itself does **not** execute scripts or handlers, since the element
 *   is never mounted to the live DOM during this step.
 * - ⚠️ Security risk arises if the returned element is later attached to the DOM:
 *   embedded scripts, event handlers, or external references could execute.
 * - Implementation detail: uses a temporary `<div>` to convert raw SVG markup.
 * - Recommended only for trusted or pre-sanitized SVG sources.
 */
export const unsafeParseSvg = (
  svgString: string,
  config: Pick<
    IOConfig,
    "removeScripts" | "removeEventHandlers" | "removeForeignObject"
  >,
) => {
  const {
    removeScripts = true,
    removeEventHandlers = true,
    removeForeignObject = false,
  } = config;

  const div = document.createElement("div");
  div.innerHTML = svgString.trim();
  const svg = div.getElementsByTagName("svg")[0];
  if (!svg) {
    throw new Error("Invalid SVG: root element is not <svg>");
  }

  if (removeScripts) {
    svg.querySelectorAll("script").forEach((el) => {
      el.remove();
    });
  }
  if (removeEventHandlers) {
    svg.querySelectorAll("*").forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith("on")) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }
  if (removeForeignObject) {
    svg.querySelectorAll("foreignObject").forEach((el) => {
      el.remove();
    });
  }

  return svg as SVGElement;
};

/**
 * Parse an SVG string into an SVGElement (browser).
 *
 * @remarks
 * - Safe mode (default): uses DOMParser.
 * - Unsafe mode: uses a temporary <div>. Faster, but requires sanitization
 *   since malicious SVGs can contain scripts or handlers.
 *
 * @throws Error if the root element is not <svg> (for `Safe` mode).
 */
export const parseSvgBrowser = (
  svgString: string,
  config: IOConfig = {},
): SVGElement => {
  const { domParser, unsafe = false, strict = true } = config;

  if (unsafe) {
    return unsafeParseSvg(svgString, config);
  }

  const Parser = domParser ?? DOMParserImpl ?? window.DOMParser;
  const parser = new Parser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;
  if (strict && (!svg || svg.nodeName.toUpperCase() !== "SVG")) {
    throw new Error("Invalid SVG: root element is not <svg>");
  }
  return svg as unknown as SVGElement;
};

/**
 * Serialize an SVGElement back to string (browser, sync).
 *
 * @remarks
 * Uses XMLSerializer instead of element.outerHTML to ensure
 * consistent, standards-compliant output across browsers and Node.js.
 * outerHTML is simpler but may drop namespaces or produce inconsistent markup.
 */
export const serializeSvgBrowser = (
  element: SVGElement,
  config: IOConfig = {},
): string => {
  const Serializer =
    config.xmlSerializer ?? XMLSerializerImpl ?? window.XMLSerializer;
  const serializer = new Serializer();
  return serializer.serializeToString(element as unknown as Node);
};

//
// -------------------- Node implementations --------------------
//

/**
 * Ensures Node.js DOM APIs are loaded.
 * Lazy-imports @xmldom/xmldom if not already set.
 */
const ensureDomNode = async () => {
  if (!DOMParserImpl || !XMLSerializerImpl) {
    try {
      const xmldom = await import("@xmldom/xmldom");
      DOMParserImpl = xmldom.DOMParser;
      XMLSerializerImpl = xmldom.XMLSerializer;
    } catch {
      throw new Error(
        "No DOM APIs found. Install @xmldom/xmldom for Node.js support.",
      );
    }
  }
};

/**
 * Parse an SVG string into an SVGElement (Node.js, async).
 *
 * @throws Error if the root element is not <svg>.
 */
export const parseSvgNode = async (
  svgString: string,
  config: IOConfig = {},
): Promise<SVGElement> => {
  await ensureDomNode();
  // biome-ignore lint/style/noNonNullAssertion: error thrown on previous step
  const Parser = config.domParser ?? DOMParserImpl!;
  const parser = new Parser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;
  if (
    config.strict !== false &&
    (!svg || svg.nodeName.toUpperCase() !== "SVG")
  ) {
    throw new Error("Invalid SVG: root element is not <svg>");
  }
  return svg as unknown as SVGElement;
};

/**
 * Serialize an SVGElement back to string (Node.js, async).
 */
export const serializeSvgNode = async (
  element: SVGElement,
  config: IOConfig = {},
): Promise<string> => {
  await ensureDomNode();
  // biome-ignore lint/style/noNonNullAssertion: error thrown on previous step
  const Serializer = config.xmlSerializer ?? XMLSerializerImpl!;
  const serializer = new Serializer();
  return serializer.serializeToString(element as unknown as Node);
};

//
// -------------------- Universal wrappers --------------------
//

/**
 * Universal parser: auto-chooses browser or Node implementation.
 */
export const parseSvg = (
  svgString: string,
  config: IOConfig = {},
): SVGElement | Promise<SVGElement> => {
  if (typeof window !== "undefined" && "DOMParser" in window) {
    return parseSvgBrowser(svgString, config);
  }
  return parseSvgNode(svgString, config);
};

/**
 * Universal serializer: auto-chooses browser or Node implementation.
 */
export const serializeSvg = (
  element: SVGElement,
  config: IOConfig = {},
): string | Promise<string> => {
  if (typeof window !== "undefined" && "XMLSerializer" in window) {
    return serializeSvgBrowser(element, config);
  }
  return serializeSvgNode(element, config);
};

//
// -------------------- Extra: loadSvg --------------------
//

/**
 * Load an SVG from a string, File, Blob, or URL.
 *
 * @remarks
 * - Browser: supports string, File, Blob, and URL.
 * - Node.js: supports string and URL (via fetch).
 * - Does **not** handle fs/path directly — keeps API universal.
 *
 * @throws Error if input is invalid or root element is not <svg>.
 */
export const loadSvg = async (
  input: string | File | Blob | URL,
  config: IOConfig = {},
): Promise<SVGElement> => {
  // string path or raw SVG
  if (typeof input === "string") {
    if (input.trim().startsWith("<svg")) {
      return await parseSvg(input, config);
    }
    // treat as URL string
    input = new URL(
      input,
      typeof window !== "undefined" ? window.location.href : undefined,
    );
  }

  if (input instanceof URL) {
    const res = await fetch(input.toString());
    if (!res.ok) {
      throw new Error(`Failed to load SVG: ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    return (await parseSvg(text, config)) as SVGElement;
  }

  if (typeof File !== "undefined" && input instanceof File) {
    const text = await input.text();
    return (await parseSvg(text, config)) as SVGElement;
  }

  if (typeof Blob !== "undefined" && input instanceof Blob) {
    const text = await input.text();
    return (await parseSvg(text, config)) as SVGElement;
  }

  throw new Error("Unsupported input type for loadSvg");
};
