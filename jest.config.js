module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^@root/(.*)$": "<rootDir>/src/$1",
    // Map CSS module imports to identity-obj-proxy for testing
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Map file imports to mock files for testing (e.g., images, fonts)
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    // Transform TypeScript files using ts-jest
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: [
    // Match test files using the pattern *.test.ts or *.spec.ts
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
  ],
  globals: {
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder,
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
