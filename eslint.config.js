// eslint.config.js
import antfu from '@antfu/eslint-config'

export default await antfu({ rules: { 'no-console': 'off', 'node/prefer-global/process': 'off', 'no-unused-vars': 'off', ''} })
