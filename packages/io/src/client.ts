import type { IOConfig } from "./types";

/**
 * @svg-fns/io
 *
 * Feather-light I/O utilities for working with SVG.
 *
 * 📐 Principles
 *  - No dependencies (uses @xmldom/xmldom only if needed in server, lazy-loaded).
 *  - Works in both Client + server.
 *  - Client: sync API; optional `unsafe` mode uses innerHTML for speed.
 *      ⚠️ Security note: In unsafe mode, script execution is only a risk
 *         once the parsed element is attached to the DOM.
 *  - Node: async API; loads @xmldom/xmldom at runtime.
 *  - Dev-friendly errors on invalid input.
 */

let DOMParserImpl: typeof DOMParser | undefined;
let XMLSerializerImpl: typeof XMLSerializer | undefined;

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
 * Parse an SVG string into an SVGElement (client side).
 *
 * @remarks
 * - Safe mode (default): uses DOMParser.
 * - Unsafe mode: uses a temporary <div>. Faster, but requires sanitization
 *   since malicious SVGs can contain scripts or handlers.
 *
 * @throws Error if the root element is not <svg> (for `Safe` mode).
 */
export const parseSvg = (
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
 * consistent, standards-compliant output across browsers and Server.
 * outerHTML is simpler but may drop namespaces or produce inconsistent markup.
 */
export const serializeSvg = (
  element: SVGElement,
  config: IOConfig = {},
): string => {
  const Serializer =
    config.xmlSerializer ?? XMLSerializerImpl ?? window.XMLSerializer;
  const serializer = new Serializer();
  return serializer.serializeToString(element as unknown as Node);
};
