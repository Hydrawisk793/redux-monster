import { MayBeArray } from "kaphein-ts-type-utils";

import { Foo } from "./foo";

export declare const actionCreatorFactories : {
    "Foo.create" : (context : any) => (
        properties : MayBeArray<Foo>
    ) => {
        type : "Foo.onCreated";

        properties : MayBeArray<Foo>;
    };

    "Foo.update" : (context : any) => (
        properties : MayBeArray<Foo>
    ) => {
        type : "Foo.onUpdated";

        properties : MayBeArray<Foo>;
    };

    "Foo.remove" : (context : any) => (
        ids : MayBeArray<Foo["id"]>
    ) => {
        type : "Foo.onRemoved";

        ids : MayBeArray<Foo["id"]>;
    };
};
