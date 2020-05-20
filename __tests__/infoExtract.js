import { infoExtract } from "../utils/infoExtract";

describe("utils/infoExtract", () => {
  describe("infoExtract", () => {
    //An example where the month is double digits
    it("converts tomasvera@ucsb.edu122020 to tomasvera@ucsb.edu122020", () => {
      expect(infoExtract("tomasvera@ucsb.edu122020")).toBe(
        "tomasvera@ucsb.edu122020"
      );
    });

    //An example where the month is single digit, should be returning the same string again
    it("converts tomasvera@ucsb.edu122020 to tomasvera@ucsb.edu122020", () => {
      expect(infoExtract("tomasvera@ucsb.edu012020")).toBe(
        "tomasvera@ucsb.edu012020"
      );
    });

    //An example of when the endpoint is not of string type
    it("throws an error when parameter is not of type string", () => {
      expect(() => {
        infoExtract(42);
      }).toThrow("endpoint should be of type string");
    });

    //An example of when the parameter is an invalid string
    it("throws an error when parameter is an empty string", () => {
      expect(() => {
        infoExtract("");
      }).toThrow("id should not be empty or less than 7 characters");
    });
  });
});
