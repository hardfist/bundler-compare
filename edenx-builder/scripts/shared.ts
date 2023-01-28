import { join } from "path";
import { createBuilder as primaryCreateBuilder } from "@modern-js/builder";
import { builderWebpackProvider } from "@modern-js/builder-webpack-provider";
import { PluginSwc } from "@modern-js/builder-plugin-swc";

export const createBuilder = async () => {
  const provider = builderWebpackProvider({
    builderConfig: {
      output: {
        disableTsChecker: true,
      },
    },
  });

  const builder = await primaryCreateBuilder(provider, {
    entry: {
      index: join(process.cwd(), "src", "index.tsx"),
    },
    configPath: __filename,
  });

  if (!process.env.BABEL) {
    builder.addPlugins([PluginSwc()]);
  }

  return builder;
};
