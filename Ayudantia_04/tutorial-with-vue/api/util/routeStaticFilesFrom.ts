import { Next, Context } from "jsr:@oak/oak";

// Configure static site routes so that we can serve
// the Vite build output and the public folder
export default function routeStaticFilesFrom(staticPaths: string[]) {
    return async (context: Context<Record<string, object>>, next: Next) => {
        for (const path of staticPaths) {
            try {
                await context.send({ root: path, index: "index.html" });
                return;
            } catch {
                continue;
            }
        }

        await next();
    };
}
