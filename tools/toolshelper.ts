import { DiscordBridgeConfig } from "../src/config";
import { Appservice, IAppserviceRegistration } from "matrix-bot-sdk";
import { DiscordStore } from "../src/store";
import * as yaml from "js-yaml";
import * as fs from "fs";

export class ToolsHelper {
    public static getToolDependencies(
        configFile: string, regFile: string = "./discord-registration.yaml", needsStore: boolean = true): {
        store: DiscordStore|null,
        appservice: Appservice,
        config: DiscordBridgeConfig,
    } {
        const registration = yaml.load(fs.readFileSync(regFile, "utf8"));
        const config: DiscordBridgeConfig = Object.assign(
            new DiscordBridgeConfig(), yaml.load(fs.readFileSync(configFile, "utf8")));
        config.applyEnvironmentOverrides(process.env);
        if (registration === null || typeof registration !== "object") {
            throw Error("Failed to parse registration file");
        }

        const appservice = new Appservice({
            bindAddress: "notathing",
            homeserverName: config.bridge.domain,
            homeserverUrl: config.bridge.homeserverUrl,
            port: 0,
            // We assume the registration is well formed
            registration: registration as IAppserviceRegistration,
        });

        const store = needsStore ? new DiscordStore(config.database) : null;
        return {
            appservice,
            config,
            store,
        };
    }
}
