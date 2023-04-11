import { VersioningOptions, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const cofigService = new ConfigService();
export const CURRENT_VERSION = cofigService.get<string>(`CURRENT_VERSION`);
export const VERSION_HEADER = cofigService.get<string>(`VERSION_HEADER`);

export const versioningOptions: VersioningOptions = {
    defaultVersion: CURRENT_VERSION,
    type: VersioningType.HEADER,
    header: VERSION_HEADER
}