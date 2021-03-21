import { Foo } from "./foo";

export declare const initialState : FooState;

export declare interface FooState
{
    modelsById : Record<Foo["id"], Foo>;
}
