import {
  parseSvg as parseSvgClient,
  serializeSvg as serializeSvgBrowser,
} from "./client";
import type { IOConfig } from "./types";

let DOMParserImpl: typeof DOMParser | undefined;
let XMLSerializerImpl: typeof XMLSerializer | undefined;

/**
 * Ensures Node.js DOM APIs are loaded.
 * Lazy-imports @xmldom/xmldom if not already set.
 */
const ensureDomServer = async () => {
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
 * Parse an SVG string into an SVGSVGElement (Node.js, async).
 *
 * @throws Error if the root element is not <svg>.
 */
export const parseSvgServer = async (
  svgString: string,
  config: IOConfig = {},
): Promise<SVGSVGElement> => {
  await ensureDomServer();
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
  return svg as unknown as SVGSVGElement;
};

/**
 * Serialize an SVGSVGElement back to string (Node.js, async).
 */
export const serializeSvgServer = async (
  element: SVGSVGElement,
  config: IOConfig = {},
): Promise<string> => {
  await ensureDomServer();
  // biome-ignore lint/style/noNonNullAssertion: error thrown on previous step
  const Serializer = config.xmlSerializer ?? XMLSerializerImpl!;
  const serializer = new Serializer();
  return serializer.serializeToString(element as unknown as Node);
};

/**
 * Universal parser: auto-chooses browser or Node implementation.
 */
export const parseSvg = (
  svgString: string,
  config: IOConfig = {},
): SVGSVGElement | Promise<SVGSVGElement> => {
  if (typeof window !== "undefined" && "DOMParser" in window) {
    return parseSvgClient(svgString, config);
  }
  return parseSvgServer(svgString, config);
};

/**
 * Universal serializer: auto-chooses browser or Node implementation.
 */
export const serializeSvg = (
  element: SVGSVGElement,
  config: IOConfig = {},
): string | Promise<string> => {
  if (typeof window !== "undefined" && "XMLSerializer" in window) {
    return serializeSvgBrowser(element, config);
  }
  return serializeSvgServer(element, config);
};

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
): Promise<SVGSVGElement> => {
  // string path or raw SVG
  if (typeof input === "string") {
    if (input.trim().startsWith("<svg")) {
      return await parseSvgClient(input, config);
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
    return (await parseSvgClient(text, config)) as SVGSVGElement;
  }

  if (typeof File !== "undefined" && input instanceof File) {
    const text = await input.text();
    return (await parseSvgClient(text, config)) as SVGSVGElement;
  }

  if (typeof Blob !== "undefined" && input instanceof Blob) {
    const text = await input.text();
    return (await parseSvgClient(text, config)) as SVGSVGElement;
  }

  throw new Error("Unsupported input type for loadSvg");
};
