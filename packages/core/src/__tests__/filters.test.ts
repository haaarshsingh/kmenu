import { describe, it, expect } from "vitest";
import {
  simpleFilter,
  startsWithFilter,
  fuzzyFilter,
  createRegexFilter,
} from "../filters";
import type { CommandOption } from "../core";

describe("Filters", () => {
  const options: CommandOption[] = [
    { id: "1", label: "Home Page", keywords: ["main", "dashboard"] },
    { id: "2", label: "Search Results", keywords: ["find", "query"] },
    { id: "3", label: "User Settings", keywords: ["preferences", "config"] },
    { id: "4", label: "Help Documentation", keywords: ["support", "docs"] },
    { id: "5", label: "Disabled Option", disabled: true },
  ];

  describe("simpleFilter", () => {
    it("should return all options when query is empty", () => {
      const result = simpleFilter(options, "");
      expect(result).toEqual(options);
    });

    it("should filter by label containing query", () => {
      const result = simpleFilter(options, "home");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should filter by keywords", () => {
      const result = simpleFilter(options, "dashboard");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should be case insensitive", () => {
      const result = simpleFilter(options, "HOME");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should exclude disabled options", () => {
      const result = simpleFilter(options, "option");
      expect(result.find((opt) => opt.disabled)).toBeUndefined();
    });
  });

  describe("startsWithFilter", () => {
    it("should filter by label starting with query", () => {
      const result = startsWithFilter(options, "user");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3");
    });

    it("should filter by keywords starting with query", () => {
      const result = startsWithFilter(options, "main");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should not match partial words", () => {
      const result = startsWithFilter(options, "age");
      expect(result).toHaveLength(0);
    });
  });

  describe("fuzzyFilter", () => {
    it("should match characters in sequence", () => {
      const result = fuzzyFilter(options, "hp");
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].label).toContain("H");
    });

    it("should score consecutive matches higher", () => {
      const result = fuzzyFilter(options, "home");
      expect(result[0].id).toBe("1");
    });

    it("should match across label and keywords", () => {
      const result = fuzzyFilter(options, "cfg");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should return empty array for non-matching query", () => {
      const result = fuzzyFilter(options, "xyz");
      expect(result).toHaveLength(0);
    });
  });

  describe("createRegexFilter", () => {
    it("should create filter with custom regex pattern", () => {
      const filter = createRegexFilter("^{{query}}", "i");
      const result = filter(options, "user");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3");
    });

    it("should handle invalid regex gracefully", () => {
      const filter = createRegexFilter("[{{query}}");
      const result = filter(options, "[[[");
      expect(result).toEqual([]);
    });

    it("should support complex patterns", () => {
      const filter = createRegexFilter("{{query}}.*settings", "i");
      const result = filter(options, "user");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3");
    });
  });
});
