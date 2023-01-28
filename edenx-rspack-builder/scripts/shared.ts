import { join } from "path";
import { createBuilder as primaryCreateBuilder } from "@modern-js/builder";
import { builderRspackProvider } from "@modern-js/builder-rspack-provider";
import svgLoader from './svg-loader';

export const createBuilder = async () => {
  const provider = builderRspackProvider({
    builderConfig: {
      tools: {
        rspack: (config, { addRules }) => {
          addRules({
            test: /\.svg$/,
            use: [{ loader: svgLoader }],
            type: 'jsx',
          });
        },
      },
    },
  });

  const builder = await primaryCreateBuilder(provider, {
    entry: {
      index: join(process.cwd(), "src", "index.tsx"),
    },
    configPath: __filename,
  });

  return builder;
};
