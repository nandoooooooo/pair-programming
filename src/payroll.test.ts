import {calculatePayslip, Salary} from "./payroll";

describe("a 16 year old apprentice with a monthly salary of 700 should not have any payslip deducations", () => {
    test("no deducations", () => {
        // Arrange

        const today = new Date()
        const salary: Salary = {
            born: new Date(today.getFullYear()-16, today.getMonth(), today.getDate()),
            payday: new Date(),
            gross: 700,
        }

        // Act
        const alv = salary.gross * (1.1 / 100)
        const nbu = salary.gross * (0.73 / 100)
        const payslip = calculatePayslip(salary)

        // Assert
        expect(payslip.deductions.size).toBe(2)
        expect(payslip.totalDeductions).toBe(alv + nbu)
        expect(payslip.net).toBe(salary.gross - (alv + nbu))
    })
})