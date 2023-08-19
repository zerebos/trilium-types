import dayjs from "dayjs";

// import dayjs from "dayjs";

class MyClass {
    constructor() {}

    func(fn: (this: MyClass) => any) {
        const bound = fn.bind(this);
        bound();
    }
}

const instance: MyClass = new MyClass();

const foo = dayjs;

interface Window {
    dapi: typeof dayjs;
}

const test: Window = {
    dapi: dayjs
}

export default test;