import { Api } from "../Api";
export declare function getDocumentationUrlFromHeaders(headers: Headers): string;
/**
 * Parses Hydra documentation and converts it to an intermediate representation.
 */
export default function parseHydraDocumentation(entrypointUrl: string, options?: RequestInit): Promise<{
    api: Api;
    response: Response;
    status: number;
}>;
//# sourceMappingURL=parseHydraDocumentation.d.ts.map