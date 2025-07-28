import js from '@eslint/js'; // ESLint 기본 규칙
import globals from 'globals'; // 전역 변수 설정
import reactHooks from 'eslint-plugin-react-hooks'; // <-- 이 줄을 추가합니다.
import reactRefresh from 'eslint-plugin-react-refresh'; // <-- 이 줄을 추가합니다.

// ESLint v9에서 이전 스타일의 플러그인 설정을 사용하기 위한 호환성 레이어
import { FlatCompat } from '@eslint/eslint-plugin-legacy-compat'; 
import path from 'path';
import { fileURLToPath } from 'url';

// 현재 파일의 디렉토리 경로를 얻는 방식 (ESM 모듈에서 필요)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname, // 프로젝트의 기본 디렉토리
});

export default [
  // 'dist' 폴더 및 타입스크립트 선언 파일 무시
  {
    ignores: ['dist', '**/*.d.ts'], 
  },
  // ESLint v9에서 이전 스타일의 플러그인 설정을 사용하기 위한 호환성 레이어 적용
  // 'plugin:react-hooks/recommended'와 'plugin:react-refresh/recommended'는 이렇게 불러와야 합니다.
  ...compat.extends(
    'plugin:react-hooks/recommended',
    'plugin:react-refresh/recommended' // <-- 이 줄을 추가합니다.
  ),
  {
    files: ['**/*.{js,jsx}'], // .js, .jsx 파일에 이 설정을 적용합니다.
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 버전 사용
      sourceType: 'module', // 모듈 시스템 사용
      globals: {
        ...globals.browser, // 브라우저 전역 객체 (window, document 등) 사용 가능하게 설정
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }, // JSX 구문 허용
      },
    },
    plugins: {
      // 필요한 플러그인들을 여기에 명시적으로 등록해야 합니다.
      'react-hooks': reactHooks, // react-hooks 플러그인 등록
      'react-refresh': reactRefresh // <-- 이 줄을 추가합니다.
    },
    rules: {
      // ESLint 기본 추천 규칙을 적용합니다.
      ...js.configs.recommended.rules, 
      
      // 사용하지 않는 변수에 대한 규칙 설정 (대문자로 시작하는 변수는 무시)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      
      // 'react-hooks/exhaustive-deps' 규칙을 명시적으로 끕니다.
      'react-hooks/exhaustive-deps': 'off',
      
      // 'react-refresh/only-export-components' 규칙을 'off'로 설정합니다. <-- 이 부분을 'off'로 변경합니다.
      'react-refresh/only-export-components': 'off', 
    },
    settings: {
      react: {
        version: 'detect', // React 버전을 자동으로 감지하여 React 관련 규칙에 사용
      },
    },
  }
];

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{js,jsx}'],
//     extends: [
//       js.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     rules: {
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-hooks/exhaustive-deps': 'off',
//     },
//   },
// ])
