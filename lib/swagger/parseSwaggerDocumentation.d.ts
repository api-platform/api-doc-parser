import { OpenAPIV2 } from "openapi-types";
import { Api } from "../Api";
export interface ParsedSwaggerDocumentation {
    api: Api;
    response: OpenAPIV2.Document;
    status: string;
}
export default function parseSwaggerDocumentation(entrypointUrl: string): Promise<ParsedSwaggerDocumentation>;
//# sourceMappingURL=parseSwaggerDocumentation.d.ts.map