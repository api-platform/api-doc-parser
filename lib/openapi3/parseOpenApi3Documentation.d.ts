import { OpenAPIV3 } from "openapi-types";
import { Api } from "../Api";
export interface ParsedOpenApi3Documentation {
    api: Api;
    response: OpenAPIV3.Document;
    status: string;
}
export default function parseOpenApi3Documentation(entrypointUrl: string): Promise<ParsedOpenApi3Documentation>;
//# sourceMappingURL=parseOpenApi3Documentation.d.ts.map