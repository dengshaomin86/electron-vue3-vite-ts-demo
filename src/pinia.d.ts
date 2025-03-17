import "pinia";

declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * 永久存储到本地
     */
    persist?: boolean;
  }
}
