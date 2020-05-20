import { infoExtract } from "../utils/infoExtract";

describe("utils/infoExtract", () => {
  describe("infoExtract", () => {
    it("converts tomasvera@ucsb.edu122020 to tomasvera@ucsb.edu122020", () => {
      expect(infoExtract("tomasvera@ucsb.edu122020")).toBe(
        "tomasvera@ucsb.edu122020"
      );
    });

    it("throws an error when parameter is not of type string", () => {
      expect(() => {
        infoExtract(42);
      }).toThrow("endpoint should be of type string");
    });

    it("throws an error when parameter is an empty string", () => {
      expect(() => {
        infoExtract("");
      }).toThrow("id should not be empty or less than 7 characters");
    });
  });
});
