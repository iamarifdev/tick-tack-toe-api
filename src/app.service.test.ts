import * as app_service from "./app.service"
// @ponicode
describe("getHello", () => {
    let inst: any

    beforeEach(() => {
        inst = new app_service.AppService()
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.getHello()
        }
    
        expect(callFunction).not.toThrow()
    })
})
