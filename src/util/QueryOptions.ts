import { DbUsage as DbUsage } from "./DbUsage";
import { VisibilityOptions } from "./VisibilityOptions";

export type QueryOptions = {
    readonly ImageUrl: string
    readonly DatabaseUsed: DbUsage
    readonly VisibilityOptions: VisibilityOptions
};
