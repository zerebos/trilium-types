import dayjs from "dayjs";
declare const foo: typeof dayjs;
interface Window {
    dapi: typeof foo;
}
declare const test: Window;
export default test;
