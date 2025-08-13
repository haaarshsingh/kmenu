import type { CommandOption, FilterFunction } from "./core";

/**
 * Case-insensitive contains match across label and keywords.
 */
export const simpleFilter: FilterFunction = (options, query) => {
  if (!query) return options;

  const normalizedQuery = query.toLowerCase();

  return options.filter((option) => {
    if (option.disabled) return false;

    const labelMatch = option.label.toLowerCase().includes(normalizedQuery);
    const keywordMatch = option.keywords?.some((k) =>
      k.toLowerCase().includes(normalizedQuery)
    );

    return labelMatch || keywordMatch;
  });
};

/**
 * Case-insensitive starts-with match across label and keywords.
 */
export const startsWithFilter: FilterFunction = (options, query) => {
  if (!query) return options;

  const normalizedQuery = query.toLowerCase();

  return options.filter((option) => {
    if (option.disabled) return false;

    const labelMatch = option.label.toLowerCase().startsWith(normalizedQuery);
    const keywordMatch = option.keywords?.some((k) =>
      k.toLowerCase().startsWith(normalizedQuery)
    );

    return labelMatch || keywordMatch;
  });
};

/**
 * Simple fuzzy matcher that rewards consecutive and word-boundary matches.
 */
export const fuzzyFilter: FilterFunction = (options, query) => {
  if (!query) return options;

  const normalizedQuery = query.toLowerCase();
  const queryChars = normalizedQuery.split("");

  const scored = options
    .filter((option) => !option.disabled)
    .map((option) => {
      const text =
        `${option.label} ${option.keywords?.join(" ") || ""}`.toLowerCase();
      let score = 0;
      let lastIndex = -1;
      let consecutiveMatches = 0;

      for (const char of queryChars) {
        const index = text.indexOf(char, lastIndex + 1);
        if (index === -1) {
          return null;
        }

        if (index === lastIndex + 1) {
          consecutiveMatches++;
          score += 10 * consecutiveMatches;
        } else {
          consecutiveMatches = 0;
          score += 1;
        }

        if (index === 0 || text[index - 1] === " ") {
          score += 5;
        }

        lastIndex = index;
      }

      score -= text.length * 0.1;

      return { option, score };
    })
    .filter(
      (item): item is { option: CommandOption; score: number } => item !== null
    )
    .sort((a, b) => b.score - a.score)
    .map((item) => item.option);

  return scored;
};

/**
 * Build a filter using a regex pattern where `{{query}}` is replaced
 * by the user's query at evaluation time.
 */
export function createRegexFilter(
  pattern: string,
  flags?: string
): FilterFunction {
  return (options, query) => {
    if (!query) return options;

    try {
      const regex = new RegExp(pattern.replace("{{query}}", query), flags);

      return options.filter((option) => {
        if (option.disabled) return false;

        const text = `${option.label} ${option.keywords?.join(" ") || ""}`;
        return regex.test(text);
      });
    } catch {
      return [];
    }
  };
}
