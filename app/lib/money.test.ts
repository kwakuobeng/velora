import { describe,expect,it } from "vitest";
describe("money convention",()=>{it("uses integer cents",()=>{const cents=125000;expect(Number.isInteger(cents)).toBe(true);expect(cents/100).toBe(1250);});});
