export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {
  const deductions: Deductions = new Map()
  const monthlySalary = salary.gross
  const day = salary.payday

  const deductionStart = new Date(salary.born.getFullYear() + 17, 0, 1)

  if (day >= deductionStart) {
    deductions.set("AHV", salary.gross * (DEDUCTION_RATES.get("AHV") / 100))
    deductions.set("IV", salary.gross * (DEDUCTION_RATES.get("IV") / 100))
    deductions.set("EO", salary.gross * (DEDUCTION_RATES.get("EO") / 100))
  }

  if (monthlySalary * 12 >= 2500) {
    deductions.set("ALV", salary.gross * (DEDUCTION_RATES.get("ALV") / 100))
    deductions.set("NBU", salary.gross * (DEDUCTION_RATES.get("NBU") / 100))
  }

  if (monthlySalary * 12 >= 22680) {
    deductions.set("PK", salary.gross * (DEDUCTION_RATES.get("PK") / 100))
  }

  let totalDeductions = 0
  deductions.forEach(value => totalDeductions+=value)

  const net = salary.gross - totalDeductions

  return {
    salary: salary,
    deductions: deductions,
    totalDeductions: totalDeductions,
    net: net,
  };
}
