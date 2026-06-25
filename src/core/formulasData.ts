export interface FormulaEntry {
  id: string;
  category: 'mathematics' | 'physics' | 'chemistry' | 'statistics';
  subcategory: string;
  name: string;
  description: string;
  displayExpression: string; // The token string rendered visually by <MathText />
  engineExpression: string;  // The raw evaluation string passed to engine.ts
  derivationSteps?: string[];
}

export const FORMULAS_DATA: FormulaEntry[] = [
  {
    "id": "math_trig_rec_sin",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Reciprocal Sine",
    "description": "The reciprocal identity relating sin and csc.",
    "displayExpression": "sin(\u03b8) = frac(1, csc(\u03b8))",
    "engineExpression": "frac(1, csc(\u03b8))",
    "derivationSteps": [
      "By definition of trigonometric ratios on a unit circle.",
      "sin(\u03b8) = y and csc(\u03b8) = frac(1, y).",
      "Therefore, sin(\u03b8) * csc(\u03b8) = 1, leading to sin(\u03b8) = frac(1, csc(\u03b8))."
    ]
  },
  {
    "id": "math_trig_rec_cos",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Reciprocal Cosine",
    "description": "The reciprocal identity relating cos and sec.",
    "displayExpression": "cos(\u03b8) = frac(1, sec(\u03b8))",
    "engineExpression": "frac(1, sec(\u03b8))",
    "derivationSteps": [
      "By definition of trigonometric ratios on a unit circle.",
      "cos(\u03b8) = y and sec(\u03b8) = frac(1, y).",
      "Therefore, cos(\u03b8) * sec(\u03b8) = 1, leading to cos(\u03b8) = frac(1, sec(\u03b8))."
    ]
  },
  {
    "id": "math_trig_rec_tan",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Reciprocal Tangent",
    "description": "The reciprocal identity relating tan and cot.",
    "displayExpression": "tan(\u03b8) = frac(1, cot(\u03b8))",
    "engineExpression": "frac(1, cot(\u03b8))",
    "derivationSteps": [
      "By definition of trigonometric ratios on a unit circle.",
      "tan(\u03b8) = y and cot(\u03b8) = frac(1, y).",
      "Therefore, tan(\u03b8) * cot(\u03b8) = 1, leading to tan(\u03b8) = frac(1, cot(\u03b8))."
    ]
  },
  {
    "id": "math_trig_rec_csc",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Reciprocal Cosecant",
    "description": "The reciprocal identity relating csc and sin.",
    "displayExpression": "csc(\u03b8) = frac(1, sin(\u03b8))",
    "engineExpression": "frac(1, sin(\u03b8))",
    "derivationSteps": [
      "By definition of trigonometric ratios on a unit circle.",
      "csc(\u03b8) = y and sin(\u03b8) = frac(1, y).",
      "Therefore, csc(\u03b8) * sin(\u03b8) = 1, leading to csc(\u03b8) = frac(1, sin(\u03b8))."
    ]
  },
  {
    "id": "math_trig_rec_sec",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Reciprocal Secant",
    "description": "The reciprocal identity relating sec and cos.",
    "displayExpression": "sec(\u03b8) = frac(1, cos(\u03b8))",
    "engineExpression": "frac(1, cos(\u03b8))",
    "derivationSteps": [
      "By definition of trigonometric ratios on a unit circle.",
      "sec(\u03b8) = y and cos(\u03b8) = frac(1, y).",
      "Therefore, sec(\u03b8) * cos(\u03b8) = 1, leading to sec(\u03b8) = frac(1, cos(\u03b8))."
    ]
  },
  {
    "id": "math_trig_rec_cot",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Reciprocal Cotangent",
    "description": "The reciprocal identity relating cot and tan.",
    "displayExpression": "cot(\u03b8) = frac(1, tan(\u03b8))",
    "engineExpression": "frac(1, tan(\u03b8))",
    "derivationSteps": [
      "By definition of trigonometric ratios on a unit circle.",
      "cot(\u03b8) = y and tan(\u03b8) = frac(1, y).",
      "Therefore, cot(\u03b8) * tan(\u03b8) = 1, leading to cot(\u03b8) = frac(1, tan(\u03b8))."
    ]
  },
  {
    "id": "math_trig_pyth_pythagorean_identity_sin-cos",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Pythagorean Identity (Sin-Cos)",
    "description": "Standard Pythagorean trigonometric identity.",
    "displayExpression": "sin^2(\u03b8) + cos^2(\u03b8) = 1",
    "engineExpression": "1 - cos(\u03b8)^2",
    "derivationSteps": [
      "From the Pythagorean theorem on the unit circle: x^2 + y^2 = r^2.",
      "On unit circle, r = 1, x = cos(\u03b8), y = sin(\u03b8).",
      "Thus, sin^2(\u03b8) + cos^2(\u03b8) = 1."
    ]
  },
  {
    "id": "math_trig_pyth_pythagorean_identity_tan-sec",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Pythagorean Identity (Tan-Sec)",
    "description": "Standard Pythagorean trigonometric identity.",
    "displayExpression": "1 + tan^2(\u03b8) = sec^2(\u03b8)",
    "engineExpression": "sec(\u03b8)^2 - 1",
    "derivationSteps": [
      "Start with sin^2(\u03b8) + cos^2(\u03b8) = 1.",
      "Divide all terms by cos^2(\u03b8).",
      "sin^2(\u03b8)/cos^2(\u03b8) + cos^2(\u03b8)/cos^2(\u03b8) = 1/cos^2(\u03b8).",
      "Simplify to get 1 + tan^2(\u03b8) = sec^2(\u03b8)."
    ]
  },
  {
    "id": "math_trig_pyth_pythagorean_identity_cot-csc",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Pythagorean Identity (Cot-Csc)",
    "description": "Standard Pythagorean trigonometric identity.",
    "displayExpression": "1 + cot^2(\u03b8) = csc^2(\u03b8)",
    "engineExpression": "csc(\u03b8)^2 - 1",
    "derivationSteps": [
      "Start with sin^2(\u03b8) + cos^2(\u03b8) = 1.",
      "Divide all terms by sin^2(\u03b8).",
      "sin^2(\u03b8)/sin^2(\u03b8) + cos^2(\u03b8)/sin^2(\u03b8) = 1/sin^2(\u03b8).",
      "Simplify to get 1 + cot^2(\u03b8) = csc^2(\u03b8)."
    ]
  },
  {
    "id": "math_trig_cof_sin",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Co-function Sine-Cosine",
    "description": "Relates complementary angles between sin and cos.",
    "displayExpression": "sin(frac(\u03c0,2) - \u03b8) = cos(\u03b8)",
    "engineExpression": "cos(\u03b8)",
    "derivationSteps": [
      "Consider a right triangle with acute angles \u03b8 and (\u03c0/2 - \u03b8).",
      "The side opposite to (\u03c0/2 - \u03b8) is adjacent to \u03b8.",
      "Therefore, the ratio for sin(frac(\u03c0,2) - \u03b8) equals the ratio for cos(\u03b8)."
    ]
  },
  {
    "id": "math_trig_cof_cos",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Co-function Cosine-Sine",
    "description": "Relates complementary angles between cos and sin.",
    "displayExpression": "cos(frac(\u03c0,2) - \u03b8) = sin(\u03b8)",
    "engineExpression": "sin(\u03b8)",
    "derivationSteps": [
      "Consider a right triangle with acute angles \u03b8 and (\u03c0/2 - \u03b8).",
      "The side opposite to (\u03c0/2 - \u03b8) is adjacent to \u03b8.",
      "Therefore, the ratio for cos(frac(\u03c0,2) - \u03b8) equals the ratio for sin(\u03b8)."
    ]
  },
  {
    "id": "math_trig_cof_tan",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Co-function Tangent-Cotangent",
    "description": "Relates complementary angles between tan and cot.",
    "displayExpression": "tan(frac(\u03c0,2) - \u03b8) = cot(\u03b8)",
    "engineExpression": "cot(\u03b8)",
    "derivationSteps": [
      "Consider a right triangle with acute angles \u03b8 and (\u03c0/2 - \u03b8).",
      "The side opposite to (\u03c0/2 - \u03b8) is adjacent to \u03b8.",
      "Therefore, the ratio for tan(frac(\u03c0,2) - \u03b8) equals the ratio for cot(\u03b8)."
    ]
  },
  {
    "id": "math_trig_cof_cot",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Co-function Cotangent-Tangent",
    "description": "Relates complementary angles between cot and tan.",
    "displayExpression": "cot(frac(\u03c0,2) - \u03b8) = tan(\u03b8)",
    "engineExpression": "tan(\u03b8)",
    "derivationSteps": [
      "Consider a right triangle with acute angles \u03b8 and (\u03c0/2 - \u03b8).",
      "The side opposite to (\u03c0/2 - \u03b8) is adjacent to \u03b8.",
      "Therefore, the ratio for cot(frac(\u03c0,2) - \u03b8) equals the ratio for tan(\u03b8)."
    ]
  },
  {
    "id": "math_trig_cof_sec",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Co-function Secant-Cosecant",
    "description": "Relates complementary angles between sec and csc.",
    "displayExpression": "sec(frac(\u03c0,2) - \u03b8) = csc(\u03b8)",
    "engineExpression": "csc(\u03b8)",
    "derivationSteps": [
      "Consider a right triangle with acute angles \u03b8 and (\u03c0/2 - \u03b8).",
      "The side opposite to (\u03c0/2 - \u03b8) is adjacent to \u03b8.",
      "Therefore, the ratio for sec(frac(\u03c0,2) - \u03b8) equals the ratio for csc(\u03b8)."
    ]
  },
  {
    "id": "math_trig_cof_csc",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Co-function Cosecant-Secant",
    "description": "Relates complementary angles between csc and sec.",
    "displayExpression": "csc(frac(\u03c0,2) - \u03b8) = sec(\u03b8)",
    "engineExpression": "sec(\u03b8)",
    "derivationSteps": [
      "Consider a right triangle with acute angles \u03b8 and (\u03c0/2 - \u03b8).",
      "The side opposite to (\u03c0/2 - \u03b8) is adjacent to \u03b8.",
      "Therefore, the ratio for csc(frac(\u03c0,2) - \u03b8) equals the ratio for sec(\u03b8)."
    ]
  },
  {
    "id": "math_trig_eo_sin",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Odd Identity",
    "description": "Symmetry property of the sin function (it is odd).",
    "displayExpression": "sin(-\u03b8) = -sin(\u03b8)",
    "engineExpression": "-sin(\u03b8)",
    "derivationSteps": [
      "In unit circle, rotation by -\u03b8 goes clockwise into Quadrant IV.",
      "x-coordinate (cosine) remains positive: cos(-\u03b8) = cos(\u03b8).",
      "y-coordinate (sine) becomes negative: sin(-\u03b8) = -sin(\u03b8).",
      "Other ratios follow from their sine and cosine representations."
    ]
  },
  {
    "id": "math_trig_eo_cos",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Even Identity",
    "description": "Symmetry property of the cos function (it is even).",
    "displayExpression": "cos(-\u03b8) = cos(\u03b8)",
    "engineExpression": "cos(\u03b8)",
    "derivationSteps": [
      "In unit circle, rotation by -\u03b8 goes clockwise into Quadrant IV.",
      "x-coordinate (cosine) remains positive: cos(-\u03b8) = cos(\u03b8).",
      "y-coordinate (sine) becomes negative: sin(-\u03b8) = -sin(\u03b8).",
      "Other ratios follow from their sine and cosine representations."
    ]
  },
  {
    "id": "math_trig_eo_tan",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Odd Identity",
    "description": "Symmetry property of the tan function (it is odd).",
    "displayExpression": "tan(-\u03b8) = -tan(\u03b8)",
    "engineExpression": "-tan(\u03b8)",
    "derivationSteps": [
      "In unit circle, rotation by -\u03b8 goes clockwise into Quadrant IV.",
      "x-coordinate (cosine) remains positive: cos(-\u03b8) = cos(\u03b8).",
      "y-coordinate (sine) becomes negative: sin(-\u03b8) = -sin(\u03b8).",
      "Other ratios follow from their sine and cosine representations."
    ]
  },
  {
    "id": "math_trig_eo_csc",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosecant Odd Identity",
    "description": "Symmetry property of the csc function (it is odd).",
    "displayExpression": "csc(-\u03b8) = -csc(\u03b8)",
    "engineExpression": "-csc(\u03b8)",
    "derivationSteps": [
      "In unit circle, rotation by -\u03b8 goes clockwise into Quadrant IV.",
      "x-coordinate (cosine) remains positive: cos(-\u03b8) = cos(\u03b8).",
      "y-coordinate (sine) becomes negative: sin(-\u03b8) = -sin(\u03b8).",
      "Other ratios follow from their sine and cosine representations."
    ]
  },
  {
    "id": "math_trig_eo_sec",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Secant Even Identity",
    "description": "Symmetry property of the sec function (it is even).",
    "displayExpression": "sec(-\u03b8) = sec(\u03b8)",
    "engineExpression": "sec(\u03b8)",
    "derivationSteps": [
      "In unit circle, rotation by -\u03b8 goes clockwise into Quadrant IV.",
      "x-coordinate (cosine) remains positive: cos(-\u03b8) = cos(\u03b8).",
      "y-coordinate (sine) becomes negative: sin(-\u03b8) = -sin(\u03b8).",
      "Other ratios follow from their sine and cosine representations."
    ]
  },
  {
    "id": "math_trig_eo_cot",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cotangent Odd Identity",
    "description": "Symmetry property of the cot function (it is odd).",
    "displayExpression": "cot(-\u03b8) = -cot(\u03b8)",
    "engineExpression": "-cot(\u03b8)",
    "derivationSteps": [
      "In unit circle, rotation by -\u03b8 goes clockwise into Quadrant IV.",
      "x-coordinate (cosine) remains positive: cos(-\u03b8) = cos(\u03b8).",
      "y-coordinate (sine) becomes negative: sin(-\u03b8) = -sin(\u03b8).",
      "Other ratios follow from their sine and cosine representations."
    ]
  },
  {
    "id": "math_trig_sd_sine_sum_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Sum Formula",
    "description": "Angle addition identity for trigonometric computations.",
    "displayExpression": "sin(A + B) = sin(A)cos(B) + cos(A)sin(B)",
    "engineExpression": "sin(A)*cos(B) + cos(A)*sin(B)",
    "derivationSteps": [
      "Can be derived using Euler's formula: e^(i(A+B)) = e^(iA) * e^(iB).",
      "Expand using cos(A+B) + i*sin(A+B) = (cos A + i*sin A)(cos B + i*sin B).",
      "Equate real parts for Cosine Sum and imaginary parts for Sine Sum."
    ]
  },
  {
    "id": "math_trig_sd_sine_difference_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Difference Formula",
    "description": "Angle addition identity for trigonometric computations.",
    "displayExpression": "sin(A - B) = sin(A)cos(B) - cos(A)sin(B)",
    "engineExpression": "sin(A)*cos(B) - cos(A)*sin(B)",
    "derivationSteps": [
      "Can be derived using Euler's formula: e^(i(A+B)) = e^(iA) * e^(iB).",
      "Expand using cos(A+B) + i*sin(A+B) = (cos A + i*sin A)(cos B + i*sin B).",
      "Equate real parts for Cosine Sum and imaginary parts for Sine Sum."
    ]
  },
  {
    "id": "math_trig_sd_cosine_sum_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Sum Formula",
    "description": "Angle addition identity for trigonometric computations.",
    "displayExpression": "cos(A + B) = cos(A)cos(B) - sin(A)sin(B)",
    "engineExpression": "cos(A)*cos(B) - sin(A)*sin(B)",
    "derivationSteps": [
      "Can be derived using Euler's formula: e^(i(A+B)) = e^(iA) * e^(iB).",
      "Expand using cos(A+B) + i*sin(A+B) = (cos A + i*sin A)(cos B + i*sin B).",
      "Equate real parts for Cosine Sum and imaginary parts for Sine Sum."
    ]
  },
  {
    "id": "math_trig_sd_cosine_difference_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Difference Formula",
    "description": "Angle addition identity for trigonometric computations.",
    "displayExpression": "cos(A - B) = cos(A)cos(B) + sin(A)sin(B)",
    "engineExpression": "cos(A)*cos(B) + sin(A)*sin(B)",
    "derivationSteps": [
      "Can be derived using Euler's formula: e^(i(A+B)) = e^(iA) * e^(iB).",
      "Expand using cos(A+B) + i*sin(A+B) = (cos A + i*sin A)(cos B + i*sin B).",
      "Equate real parts for Cosine Sum and imaginary parts for Sine Sum."
    ]
  },
  {
    "id": "math_trig_sd_tangent_sum_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Sum Formula",
    "description": "Angle addition identity for trigonometric computations.",
    "displayExpression": "tan(A + B) = frac(tan(A) + tan(B), 1 - tan(A)tan(B))",
    "engineExpression": "frac(tan(A) + tan(B), 1 - tan(A)*tan(B))",
    "derivationSteps": [
      "Can be derived using Euler's formula: e^(i(A+B)) = e^(iA) * e^(iB).",
      "Expand using cos(A+B) + i*sin(A+B) = (cos A + i*sin A)(cos B + i*sin B).",
      "Equate real parts for Cosine Sum and imaginary parts for Sine Sum."
    ]
  },
  {
    "id": "math_trig_sd_tangent_difference_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Difference Formula",
    "description": "Angle addition identity for trigonometric computations.",
    "displayExpression": "tan(A - B) = frac(tan(A) - tan(B), 1 + tan(A)tan(B))",
    "engineExpression": "frac(tan(A) - tan(B), 1 + tan(A)*tan(B))",
    "derivationSteps": [
      "Can be derived using Euler's formula: e^(i(A+B)) = e^(iA) * e^(iB).",
      "Expand using cos(A+B) + i*sin(A+B) = (cos A + i*sin A)(cos B + i*sin B).",
      "Equate real parts for Cosine Sum and imaginary parts for Sine Sum."
    ]
  },
  {
    "id": "math_trig_da_sine_double_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Double Angle",
    "description": "Reduces double-angle trigonometric terms to single-angle functions.",
    "displayExpression": "sin(2*\u03b8) = 2*sin(\u03b8)*cos(\u03b8)",
    "engineExpression": "2*sin(\u03b8)*cos(\u03b8)",
    "derivationSteps": [
      "Use the corresponding Sum formula where B = A = \u03b8.",
      "Substitute \u03b8 for both angles and simplify terms."
    ]
  },
  {
    "id": "math_trig_da_cosine_double_angle_standard",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Double Angle (Standard)",
    "description": "Reduces double-angle trigonometric terms to single-angle functions.",
    "displayExpression": "cos(2*\u03b8) = cos(\u03b8)^2 - sin(\u03b8)^2",
    "engineExpression": "cos(\u03b8)^2 - sin(\u03b8)^2",
    "derivationSteps": [
      "Use the corresponding Sum formula where B = A = \u03b8.",
      "Substitute \u03b8 for both angles and simplify terms."
    ]
  },
  {
    "id": "math_trig_da_cosine_double_angle_cos-only",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Double Angle (Cos-only)",
    "description": "Reduces double-angle trigonometric terms to single-angle functions.",
    "displayExpression": "cos(2*\u03b8) = 2*cos(\u03b8)^2 - 1",
    "engineExpression": "2*cos(\u03b8)^2 - 1",
    "derivationSteps": [
      "Use the corresponding Sum formula where B = A = \u03b8.",
      "Substitute \u03b8 for both angles and simplify terms."
    ]
  },
  {
    "id": "math_trig_da_cosine_double_angle_sin-only",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Double Angle (Sin-only)",
    "description": "Reduces double-angle trigonometric terms to single-angle functions.",
    "displayExpression": "cos(2*\u03b8) = 1 - 2*sin(\u03b8)^2",
    "engineExpression": "1 - 2*sin(\u03b8)^2",
    "derivationSteps": [
      "Use the corresponding Sum formula where B = A = \u03b8.",
      "Substitute \u03b8 for both angles and simplify terms."
    ]
  },
  {
    "id": "math_trig_da_tangent_double_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Double Angle",
    "description": "Reduces double-angle trigonometric terms to single-angle functions.",
    "displayExpression": "tan(2*\u03b8) = frac(2*tan(\u03b8), 1 - tan(\u03b8)^2)",
    "engineExpression": "frac(2*tan(\u03b8), 1 - tan(\u03b8)^2)",
    "derivationSteps": [
      "Use the corresponding Sum formula where B = A = \u03b8.",
      "Substitute \u03b8 for both angles and simplify terms."
    ]
  },
  {
    "id": "math_trig_ha_sine_half_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Half Angle",
    "description": "Calculates trigonometric value of a half angle from cosine of full angle.",
    "displayExpression": "sin(frac(\u03b8,2)) = \u00b1\u221a\u203e(frac(1 - cos(\u03b8), 2))",
    "engineExpression": "\u221a(frac(1 - cos(\u03b8), 2))",
    "derivationSteps": [
      "Start with double angle formula for Cosine: cos(2A) = 1 - 2*sin^2(A).",
      "Let 2A = \u03b8, so A = \u03b8/2. Substitute: cos(\u03b8) = 1 - 2*sin^2(\u03b8/2).",
      "Rearrange and solve for sin(\u03b8/2)."
    ]
  },
  {
    "id": "math_trig_ha_cosine_half_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Half Angle",
    "description": "Calculates trigonometric value of a half angle from cosine of full angle.",
    "displayExpression": "cos(frac(\u03b8,2)) = \u00b1\u221a\u203e(frac(1 + cos(\u03b8), 2))",
    "engineExpression": "\u221a(frac(1 + cos(\u03b8), 2))",
    "derivationSteps": [
      "Start with double angle formula for Cosine: cos(2A) = 1 - 2*sin^2(A).",
      "Let 2A = \u03b8, so A = \u03b8/2. Substitute: cos(\u03b8) = 1 - 2*sin^2(\u03b8/2).",
      "Rearrange and solve for sin(\u03b8/2)."
    ]
  },
  {
    "id": "math_trig_ha_tangent_half_angle_radical",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Half Angle (Radical)",
    "description": "Calculates trigonometric value of a half angle from cosine of full angle.",
    "displayExpression": "tan(frac(\u03b8,2)) = \u00b1\u221a\u203e(frac(1 - cos(\u03b8), 1 + cos(\u03b8)))",
    "engineExpression": "\u221a(frac(1 - cos(\u03b8), 1 + cos(\u03b8)))",
    "derivationSteps": [
      "Start with double angle formula for Cosine: cos(2A) = 1 - 2*sin^2(A).",
      "Let 2A = \u03b8, so A = \u03b8/2. Substitute: cos(\u03b8) = 1 - 2*sin^2(\u03b8/2).",
      "Rearrange and solve for sin(\u03b8/2)."
    ]
  },
  {
    "id": "math_trig_ha_tangent_half_angle_sin-num",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Half Angle (Sin-Num)",
    "description": "Calculates trigonometric value of a half angle from cosine of full angle.",
    "displayExpression": "tan(frac(\u03b8,2)) = frac(sin(\u03b8), 1 + cos(\u03b8))",
    "engineExpression": "frac(sin(\u03b8), 1 + cos(\u03b8))",
    "derivationSteps": [
      "Start with double angle formula for Cosine: cos(2A) = 1 - 2*sin^2(A).",
      "Let 2A = \u03b8, so A = \u03b8/2. Substitute: cos(\u03b8) = 1 - 2*sin^2(\u03b8/2).",
      "Rearrange and solve for sin(\u03b8/2)."
    ]
  },
  {
    "id": "math_trig_ha_tangent_half_angle_sin-den",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Half Angle (Sin-Den)",
    "description": "Calculates trigonometric value of a half angle from cosine of full angle.",
    "displayExpression": "tan(frac(\u03b8,2)) = frac(1 - cos(\u03b8), sin(\u03b8))",
    "engineExpression": "frac(1 - cos(\u03b8), sin(\u03b8))",
    "derivationSteps": [
      "Start with double angle formula for Cosine: cos(2A) = 1 - 2*sin^2(A).",
      "Let 2A = \u03b8, so A = \u03b8/2. Substitute: cos(\u03b8) = 1 - 2*sin^2(\u03b8/2).",
      "Rearrange and solve for sin(\u03b8/2)."
    ]
  },
  {
    "id": "math_trig_ha_cosecant_half_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosecant Half Angle",
    "description": "Calculates trigonometric value of a half angle from cosine of full angle.",
    "displayExpression": "csc(frac(\u03b8,2)) = \u00b1\u221a\u203e(frac(2, 1 - cos(\u03b8)))",
    "engineExpression": "\u221a(frac(2, 1 - cos(\u03b8)))",
    "derivationSteps": [
      "Start with double angle formula for Cosine: cos(2A) = 1 - 2*sin^2(A).",
      "Let 2A = \u03b8, so A = \u03b8/2. Substitute: cos(\u03b8) = 1 - 2*sin^2(\u03b8/2).",
      "Rearrange and solve for sin(\u03b8/2)."
    ]
  },
  {
    "id": "math_trig_ta_sine_triple_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Triple Angle",
    "description": "Expresses triple angles in terms of single-angle functions.",
    "displayExpression": "sin(3*\u03b8) = 3*sin(\u03b8) - 4*sin(\u03b8)^3",
    "engineExpression": "3*sin(\u03b8) - 4*sin(\u03b8)^3",
    "derivationSteps": [
      "Write 3\u03b8 as (2\u03b8 + \u03b8).",
      "Apply sum formula: sin(2\u03b8 + \u03b8) = sin(2\u03b8)cos(\u03b8) + cos(2\u03b8)sin(\u03b8).",
      "Expand double angle terms and simplify to single-angle functions."
    ]
  },
  {
    "id": "math_trig_ta_cosine_triple_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Triple Angle",
    "description": "Expresses triple angles in terms of single-angle functions.",
    "displayExpression": "cos(3*\u03b8) = 4*cos(\u03b8)^3 - 3*cos(\u03b8)",
    "engineExpression": "4*cos(\u03b8)^3 - 3*cos(\u03b8)",
    "derivationSteps": [
      "Write 3\u03b8 as (2\u03b8 + \u03b8).",
      "Apply sum formula: sin(2\u03b8 + \u03b8) = sin(2\u03b8)cos(\u03b8) + cos(2\u03b8)sin(\u03b8).",
      "Expand double angle terms and simplify to single-angle functions."
    ]
  },
  {
    "id": "math_trig_ta_tangent_triple_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Triple Angle",
    "description": "Expresses triple angles in terms of single-angle functions.",
    "displayExpression": "tan(3*\u03b8) = frac(3*tan(\u03b8) - tan(\u03b8)^3, 1 - 3*tan(\u03b8)^2)",
    "engineExpression": "frac(3*tan(\u03b8) - tan(\u03b8)^3, 1 - 3*tan(\u03b8)^2)",
    "derivationSteps": [
      "Write 3\u03b8 as (2\u03b8 + \u03b8).",
      "Apply sum formula: sin(2\u03b8 + \u03b8) = sin(2\u03b8)cos(\u03b8) + cos(2\u03b8)sin(\u03b8).",
      "Expand double angle terms and simplify to single-angle functions."
    ]
  },
  {
    "id": "math_trig_pts_sine_cosine_product",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine-Cosine Product",
    "description": "Converts a product of sine and cosine functions into a sum/difference.",
    "displayExpression": "sin(A)cos(B) = frac(1,2)*(sin(A+B) + sin(A-B))",
    "engineExpression": "frac(1,2)*(sin(A+B) + sin(A-B))",
    "derivationSteps": [
      "Add/subtract the sum and difference formulas for sine/cosine.",
      "Combine terms to isolate the product terms on one side."
    ]
  },
  {
    "id": "math_trig_pts_cosine_sine_product",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine-Sine Product",
    "description": "Converts a product of sine and cosine functions into a sum/difference.",
    "displayExpression": "cos(A)sin(B) = frac(1,2)*(sin(A+B) - sin(A-B))",
    "engineExpression": "frac(1,2)*(sin(A+B) - sin(A-B))",
    "derivationSteps": [
      "Add/subtract the sum and difference formulas for sine/cosine.",
      "Combine terms to isolate the product terms on one side."
    ]
  },
  {
    "id": "math_trig_pts_cosine_cosine_product",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine-Cosine Product",
    "description": "Converts a product of sine and cosine functions into a sum/difference.",
    "displayExpression": "cos(A)cos(B) = frac(1,2)*(cos(A+B) + cos(A-B))",
    "engineExpression": "frac(1,2)*(cos(A+B) + cos(A-B))",
    "derivationSteps": [
      "Add/subtract the sum and difference formulas for sine/cosine.",
      "Combine terms to isolate the product terms on one side."
    ]
  },
  {
    "id": "math_trig_pts_sine_sine_product",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine-Sine Product",
    "description": "Converts a product of sine and cosine functions into a sum/difference.",
    "displayExpression": "sin(A)sin(B) = frac(1,2)*(cos(A-B) - cos(A+B))",
    "engineExpression": "frac(1,2)*(cos(A-B) - cos(A+B))",
    "derivationSteps": [
      "Add/subtract the sum and difference formulas for sine/cosine.",
      "Combine terms to isolate the product terms on one side."
    ]
  },
  {
    "id": "math_trig_stp_sine_sum_to_product",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Sum to Product",
    "description": "Converts a sum/difference of sine or cosine terms into a product.",
    "displayExpression": "sin(A) + sin(B) = 2*sin(frac(A+B,2))cos(frac(A-B,2))",
    "engineExpression": "2*sin(frac(A+B,2))*cos(frac(A-B,2))",
    "derivationSteps": [
      "Let x = (A+B)/2 and y = (A-B)/2.",
      "Substitute into the product-to-sum formulas.",
      "Solve for the sum/difference terms."
    ]
  },
  {
    "id": "math_trig_stp_sine_difference_to_product",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Difference to Product",
    "description": "Converts a sum/difference of sine or cosine terms into a product.",
    "displayExpression": "sin(A) - sin(B) = 2*cos(frac(A+B,2))sin(frac(A-B,2))",
    "engineExpression": "2*cos(frac(A+B,2))*sin(frac(A-B,2))",
    "derivationSteps": [
      "Let x = (A+B)/2 and y = (A-B)/2.",
      "Substitute into the product-to-sum formulas.",
      "Solve for the sum/difference terms."
    ]
  },
  {
    "id": "math_trig_stp_cosine_sum_to_product",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Sum to Product",
    "description": "Converts a sum/difference of sine or cosine terms into a product.",
    "displayExpression": "cos(A) + cos(B) = 2*cos(frac(A+B,2))cos(frac(A-B,2))",
    "engineExpression": "2*cos(frac(A+B,2))*cos(frac(A-B,2))",
    "derivationSteps": [
      "Let x = (A+B)/2 and y = (A-B)/2.",
      "Substitute into the product-to-sum formulas.",
      "Solve for the sum/difference terms."
    ]
  },
  {
    "id": "math_trig_stp_cosine_difference_to_product",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Difference to Product",
    "description": "Converts a sum/difference of sine or cosine terms into a product.",
    "displayExpression": "cos(A) - cos(B) = -2*sin(frac(A+B,2))sin(frac(A-B,2))",
    "engineExpression": "-2*sin(frac(A+B,2))*sin(frac(A-B,2))",
    "derivationSteps": [
      "Let x = (A+B)/2 and y = (A-B)/2.",
      "Substitute into the product-to-sum formulas.",
      "Solve for the sum/difference terms."
    ]
  },
  {
    "id": "math_trig_tri_law_of_sines",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Law of Sines",
    "description": "Ratios of sides to sines of opposite angles are constant.",
    "displayExpression": "frac(a, sin(A)) = frac(b, sin(B)) = frac(c, sin(C))",
    "engineExpression": "frac(A, sin(a))",
    "derivationSteps": [
      "Derived using geometric construction of altitudes in an arbitrary oblique triangle.",
      "Apply basic right triangle definitions on sub-triangles."
    ]
  },
  {
    "id": "math_trig_tri_law_of_cosines_side_a",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Law of Cosines (Side a)",
    "description": "Computes side 'a' given sides 'b' and 'c' and angle 'A'.",
    "displayExpression": "a^2 = b^2 + c^2 - 2*b*c*cos(A)",
    "engineExpression": "\u221a(B^2 + C^2 - 2*B*C*cos(A))",
    "derivationSteps": [
      "Derived using geometric construction of altitudes in an arbitrary oblique triangle.",
      "Apply basic right triangle definitions on sub-triangles."
    ]
  },
  {
    "id": "math_trig_tri_law_of_cosines_side_b",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Law of Cosines (Side b)",
    "description": "Computes side 'b' given sides 'a' and 'c' and angle 'B'.",
    "displayExpression": "b^2 = a^2 + c^2 - 2*a*c*cos(B)",
    "engineExpression": "\u221a(A^2 + C^2 - 2*A*C*cos(B))",
    "derivationSteps": [
      "Derived using geometric construction of altitudes in an arbitrary oblique triangle.",
      "Apply basic right triangle definitions on sub-triangles."
    ]
  },
  {
    "id": "math_trig_tri_law_of_cosines_side_c",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Law of Cosines (Side c)",
    "description": "Computes side 'c' given sides 'a' and 'b' and angle 'C'.",
    "displayExpression": "c^2 = a^2 + b^2 - 2*a*b*cos(C)",
    "engineExpression": "\u221a(A^2 + B^2 - 2*A*B*cos(C))",
    "derivationSteps": [
      "Derived using geometric construction of altitudes in an arbitrary oblique triangle.",
      "Apply basic right triangle definitions on sub-triangles."
    ]
  },
  {
    "id": "math_trig_tri_law_of_tangents",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Law of Tangents",
    "description": "Relates difference and sum of two sides to their opposite angles.",
    "displayExpression": "frac(a-b, a+b) = frac(tan(frac(A-B,2)), tan(frac(A+B,2)))",
    "engineExpression": "frac(A-B, A+B)",
    "derivationSteps": [
      "Derived using geometric construction of altitudes in an arbitrary oblique triangle.",
      "Apply basic right triangle definitions on sub-triangles."
    ]
  },
  {
    "id": "math_trig_tri_triangle_area_sas",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Triangle Area (SAS)",
    "description": "Computes triangle area using two sides and the included angle.",
    "displayExpression": "Area = frac(1,2)*a*b*sin(C)",
    "engineExpression": "frac(1,2)*A*B*sin(C)",
    "derivationSteps": [
      "Derived using geometric construction of altitudes in an arbitrary oblique triangle.",
      "Apply basic right triangle definitions on sub-triangles."
    ]
  },
  {
    "id": "math_trig_inv_sine_of_arcsine",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine of Arcsine",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "sin(asin(x)) = x",
    "engineExpression": "x",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arcsine_negation_odd",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arcsine Negation Odd",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "asin(-x) = -asin(x)",
    "engineExpression": "-asin(x)",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arccosine_negation",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arccosine Negation",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "acos(-x) = \u03c0 - acos(x)",
    "engineExpression": "\u03c0 - acos(x)",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arctangent_negation_odd",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arctangent Negation Odd",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "atan(-x) = -atan(x)",
    "engineExpression": "-atan(x)",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arcsine_arccosine_complementary",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arcsine-Arccosine Complementary",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "asin(x) + acos(x) = frac(\u03c0,2)",
    "engineExpression": "frac(\u03c0,2) - asin(x)",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arctangent_arccotangent_complementary",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arctangent-Arccotangent Complementary",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "atan(x) + acot(x) = frac(\u03c0,2)",
    "engineExpression": "frac(\u03c0,2) - atan(x)",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arcsecant_arccosecant_complementary",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arcsecant-Arccosecant Complementary",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "asec(x) + acsc(x) = frac(\u03c0,2)",
    "engineExpression": "frac(\u03c0,2) - asec(x)",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arcsine_reciprocal",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arcsine Reciprocal",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "asin(x) = acsc(frac(1,x))",
    "engineExpression": "acsc(frac(1,x))",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arccosine_reciprocal",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arccosine Reciprocal",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "acos(x) = asec(frac(1,x))",
    "engineExpression": "asec(frac(1,x))",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arctangent_reciprocal",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arctangent Reciprocal",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "atan(x) = acot(frac(1,x))",
    "engineExpression": "acot(frac(1,x))",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arctangent_sum_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arctangent Sum Formula",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "atan(x) + atan(y) = atan(frac(x+y, 1-x*y))",
    "engineExpression": "atan(frac(x+y, 1-x*y))",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_inv_arctangent_difference_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Arctangent Difference Formula",
    "description": "Standard properties and relations for inverse trigonometric functions.",
    "displayExpression": "atan(x) - atan(y) = atan(frac(x-y, 1+x*y))",
    "engineExpression": "atan(frac(x-y, 1+x*y))",
    "derivationSteps": [
      "Proven by applying the definition of inverse functions.",
      "Set \u03b8 = asin(x), so sin(\u03b8) = x. Evaluate cos(\u03c0/2 - \u03b8) = sin(\u03b8) = x to get acos(x) = \u03c0/2 - \u03b8."
    ]
  },
  {
    "id": "math_trig_hyp_hyperbolic_sine",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Sine",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "sinh(x) = frac(e^x - e^(-x), 2)",
    "engineExpression": "frac(e^x - e^(-x), 2)",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_hyperbolic_cosine",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cosine",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "cosh(x) = frac(e^x + e^(-x), 2)",
    "engineExpression": "frac(e^x + e^(-x), 2)",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_hyperbolic_tangent",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Tangent",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "tanh(x) = frac(e^x - e^(-x), e^x + e^(-x))",
    "engineExpression": "frac(e^x - e^(-x), e^x + e^(-x))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_hyperbolic_cosecant",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cosecant",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "csch(x) = frac(2, e^x - e^(-x))",
    "engineExpression": "frac(2, e^x - e^(-x))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_hyperbolic_secant",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Secant",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "sech(x) = frac(2, e^x + e^(-x))",
    "engineExpression": "frac(2, e^x + e^(-x))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_hyperbolic_cotangent",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cotangent",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "coth(x) = frac(e^x + e^(-x), e^x - e^(-x))",
    "engineExpression": "frac(e^x + e^(-x), e^x - e^(-x))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_inverse_hyperbolic_sine",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Inverse Hyperbolic Sine",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "asinh(x) = ln(x + \u221a(x^2 + 1))",
    "engineExpression": "ln(x + \u221a(x^2 + 1))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_inverse_hyperbolic_cosine",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Inverse Hyperbolic Cosine",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "acosh(x) = ln(x + \u221a(x^2 - 1))",
    "engineExpression": "ln(x + \u221a(x^2 - 1))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_inverse_hyperbolic_tangent",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Inverse Hyperbolic Tangent",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "atanh(x) = frac(1,2)*ln(frac(1+x, 1-x))",
    "engineExpression": "frac(1,2)*ln(frac(1+x, 1-x))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_inverse_hyperbolic_cosecant",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Inverse Hyperbolic Cosecant",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "acsch(x) = ln(frac(1,x) + \u221a(frac(1,x^2) + 1))",
    "engineExpression": "ln(frac(1,x) + \u221a(frac(1,x^2) + 1))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_inverse_hyperbolic_secant",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Inverse Hyperbolic Secant",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "asech(x) = ln(frac(1,x) + \u221a(frac(1,x^2) - 1))",
    "engineExpression": "ln(frac(1,x) + \u221a(frac(1,x^2) - 1))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hyp_inverse_hyperbolic_cotangent",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Inverse Hyperbolic Cotangent",
    "description": "Definition of basic or inverse hyperbolic functions using exponentials and logarithms.",
    "displayExpression": "acoth(x) = frac(1,2)*ln(frac(x+1, x-1))",
    "engineExpression": "frac(1,2)*ln(frac(x+1, x-1))",
    "derivationSteps": [
      "Defined via parametrization of the unit hyperbola: x^2 - y^2 = 1.",
      "For inverses: set y = sinh(x) = (e^x - e^-x)/2. Let u = e^x, solve the quadratic in u: u^2 - 2yu - 1 = 0.",
      "Apply quadratic formula and take natural log: x = ln(y + \u221a(y^2 + 1))."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_fundamental_identity",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Fundamental Identity",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "cosh(x)^2 - sinh(x)^2 = 1",
    "engineExpression": "1",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_tangent_identity",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Tangent Identity",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "1 - tanh(x)^2 = sech(x)^2",
    "engineExpression": "sech(x)^2",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_cotangent_identity",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cotangent Identity",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "coth(x)^2 - 1 = csch(x)^2",
    "engineExpression": "csch(x)^2",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_sine_odd",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Sine Odd",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "sinh(-x) = -sinh(x)",
    "engineExpression": "-sinh(x)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_cosine_even",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cosine Even",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "cosh(-x) = cosh(x)",
    "engineExpression": "cosh(x)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_tangent_odd",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Tangent Odd",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "tanh(-x) = -tanh(x)",
    "engineExpression": "-tanh(x)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_sine_sum",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Sine Sum",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "sinh(x + y) = sinh(x)cosh(y) + cosh(x)sinh(y)",
    "engineExpression": "sinh(x)*cosh(y) + cosh(x)*sinh(y)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_sine_difference",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Sine Difference",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "sinh(x - y) = sinh(x)cosh(y) - cosh(x)sinh(y)",
    "engineExpression": "sinh(x)*cosh(y) - cosh(x)*sinh(y)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_cosine_sum",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cosine Sum",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "cosh(x + y) = cosh(x)cosh(y) + sinh(x)sinh(y)",
    "engineExpression": "cosh(x)*cosh(y) + sinh(x)*sinh(y)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_cosine_difference",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cosine Difference",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "cosh(x - y) = cosh(x)cosh(y) - sinh(x)sinh(y)",
    "engineExpression": "cosh(x)*cosh(y) - sinh(x)*sinh(y)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_tangent_sum",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Tangent Sum",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "tanh(x + y) = frac(tanh(x) + tanh(y), 1 + tanh(x)tanh(y))",
    "engineExpression": "frac(tanh(x) + tanh(y), 1 + tanh(x)*tanh(y))",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_tangent_difference",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Tangent Difference",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "tanh(x - y) = frac(tanh(x) - tanh(y), 1 - tanh(x)tanh(y))",
    "engineExpression": "frac(tanh(x) - tanh(y), 1 - tanh(x)*tanh(y))",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_sine_double_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Sine Double Angle",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "sinh(2*x) = 2*sinh(x)*cosh(x)",
    "engineExpression": "2*sinh(x)*cosh(x)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_cosine_double_angle_standard",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cosine Double Angle (Standard)",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "cosh(2*x) = cosh(x)^2 + sinh(x)^2",
    "engineExpression": "cosh(x)^2 + sinh(x)^2",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_cosine_double_angle_cosh",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cosine Double Angle (Cosh)",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "cosh(2*x) = 2*cosh(x)^2 - 1",
    "engineExpression": "2*cosh(x)^2 - 1",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_cosine_double_angle_sinh",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Cosine Double Angle (Sinh)",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "cosh(2*x) = 2*sinh(x)^2 + 1",
    "engineExpression": "2*sinh(x)^2 + 1",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_trig_hypid_hyperbolic_tangent_double_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Hyperbolic Tangent Double Angle",
    "description": "Hyperbolic trigonometric identity analogs to circular trigonometry.",
    "displayExpression": "tanh(2*x) = frac(2*tanh(x), 1 + tanh(x)^2)",
    "engineExpression": "frac(2*tanh(x), 1 + tanh(x)^2)",
    "derivationSteps": [
      "Substitute definitions of sinh(x) and cosh(x) in terms of e^x and e^-x.",
      "Expand terms and simplify exponentials."
    ]
  },
  {
    "id": "math_calc_lim_limits_constant_multiple_law",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Limits: Constant Multiple Law",
    "description": "Fundamental limit law used in real analysis and calculus.",
    "displayExpression": "lim(c * f(x)) = c * lim(f(x))",
    "engineExpression": "c",
    "derivationSteps": [
      "Proven using the formal epsilon-delta (\u03b5-\u03b4) definition of limits.",
      "Check limit constraints (e.g. non-zero denominator for Quotient Law)."
    ]
  },
  {
    "id": "math_calc_lim_limits_sum_law",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Limits: Sum Law",
    "description": "Fundamental limit law used in real analysis and calculus.",
    "displayExpression": "lim(f(x) + g(x)) = lim(f(x)) + lim(g(x))",
    "engineExpression": "L1 + L2",
    "derivationSteps": [
      "Proven using the formal epsilon-delta (\u03b5-\u03b4) definition of limits.",
      "Check limit constraints (e.g. non-zero denominator for Quotient Law)."
    ]
  },
  {
    "id": "math_calc_lim_limits_difference_law",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Limits: Difference Law",
    "description": "Fundamental limit law used in real analysis and calculus.",
    "displayExpression": "lim(f(x) - g(x)) = lim(f(x)) - lim(g(x))",
    "engineExpression": "L1 - L2",
    "derivationSteps": [
      "Proven using the formal epsilon-delta (\u03b5-\u03b4) definition of limits.",
      "Check limit constraints (e.g. non-zero denominator for Quotient Law)."
    ]
  },
  {
    "id": "math_calc_lim_limits_product_law",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Limits: Product Law",
    "description": "Fundamental limit law used in real analysis and calculus.",
    "displayExpression": "lim(f(x) * g(x)) = lim(f(x)) * lim(g(x))",
    "engineExpression": "L1 * L2",
    "derivationSteps": [
      "Proven using the formal epsilon-delta (\u03b5-\u03b4) definition of limits.",
      "Check limit constraints (e.g. non-zero denominator for Quotient Law)."
    ]
  },
  {
    "id": "math_calc_lim_limits_quotient_law",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Limits: Quotient Law",
    "description": "Fundamental limit law used in real analysis and calculus.",
    "displayExpression": "lim(frac(f(x), g(x))) = frac(lim(f(x)), lim(g(x)))",
    "engineExpression": "frac(L1, L2)",
    "derivationSteps": [
      "Proven using the formal epsilon-delta (\u03b5-\u03b4) definition of limits.",
      "Check limit constraints (e.g. non-zero denominator for Quotient Law)."
    ]
  },
  {
    "id": "math_calc_lim_limits_power_law",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Limits: Power Law",
    "description": "Fundamental limit law used in real analysis and calculus.",
    "displayExpression": "lim(f(x)^n) = (lim(f(x)))^n",
    "engineExpression": "L1^n",
    "derivationSteps": [
      "Proven using the formal epsilon-delta (\u03b5-\u03b4) definition of limits.",
      "Check limit constraints (e.g. non-zero denominator for Quotient Law)."
    ]
  },
  {
    "id": "math_calc_lim_limits_root_law",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Limits: Root Law",
    "description": "Fundamental limit law used in real analysis and calculus.",
    "displayExpression": "lim(\u221a\u203e(f(x))) = \u221a\u203e(lim(f(x)))",
    "engineExpression": "\u221a(L1)",
    "derivationSteps": [
      "Proven using the formal epsilon-delta (\u03b5-\u03b4) definition of limits.",
      "Check limit constraints (e.g. non-zero denominator for Quotient Law)."
    ]
  },
  {
    "id": "math_calc_lim_limits_squeeze_theorem_standard_limit",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Limits: Squeeze Theorem Standard Limit",
    "description": "Fundamental limit law used in real analysis and calculus.",
    "displayExpression": "lim(x->0, frac(sin(x), x)) = 1",
    "engineExpression": "1",
    "derivationSteps": [
      "Proven using the formal epsilon-delta (\u03b5-\u03b4) definition of limits.",
      "Check limit constraints (e.g. non-zero denominator for Quotient Law)."
    ]
  },
  {
    "id": "math_calc_der_derivative_of_constant",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Constant",
    "description": "Core rules of differentiation.",
    "displayExpression": "d/dx(c) = 0",
    "engineExpression": "0",
    "derivationSteps": [
      "Use the limit definition of derivative: f'(x) = lim(h->0) frac(f(x+h)-f(x), h).",
      "Apply binomial or algebraic expansion where appropriate."
    ]
  },
  {
    "id": "math_calc_der_derivative_of_identity",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Identity",
    "description": "Core rules of differentiation.",
    "displayExpression": "d/dx(x) = 1",
    "engineExpression": "1",
    "derivationSteps": [
      "Use the limit definition of derivative: f'(x) = lim(h->0) frac(f(x+h)-f(x), h).",
      "Apply binomial or algebraic expansion where appropriate."
    ]
  },
  {
    "id": "math_calc_der_power_rule",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Power Rule",
    "description": "Core rules of differentiation.",
    "displayExpression": "d/dx(x^n) = n*x^(n-1)",
    "engineExpression": "n*x^(n-1)",
    "derivationSteps": [
      "Use the limit definition of derivative: f'(x) = lim(h->0) frac(f(x+h)-f(x), h).",
      "Apply binomial or algebraic expansion where appropriate."
    ]
  },
  {
    "id": "math_calc_der_product_rule",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Product Rule",
    "description": "Core rules of differentiation.",
    "displayExpression": "d/dx(u * v) = u*v' + v*u'",
    "engineExpression": "u*d/dx(v) + v*d/dx(u)",
    "derivationSteps": [
      "Use the limit definition of derivative: f'(x) = lim(h->0) frac(f(x+h)-f(x), h).",
      "Apply binomial or algebraic expansion where appropriate."
    ]
  },
  {
    "id": "math_calc_der_quotient_rule",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Quotient Rule",
    "description": "Core rules of differentiation.",
    "displayExpression": "d/dx(frac(u,v)) = frac(v*u' - u*v', v^2)",
    "engineExpression": "frac(v*d/dx(u) - u*d/dx(v), v^2)",
    "derivationSteps": [
      "Use the limit definition of derivative: f'(x) = lim(h->0) frac(f(x+h)-f(x), h).",
      "Apply binomial or algebraic expansion where appropriate."
    ]
  },
  {
    "id": "math_calc_der_chain_rule",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Chain Rule",
    "description": "Core rules of differentiation.",
    "displayExpression": "d/dx(f(g(x))) = f'(g(x)) * g'(x)",
    "engineExpression": "d/dx(f(g(x)))",
    "derivationSteps": [
      "Use the limit definition of derivative: f'(x) = lim(h->0) frac(f(x+h)-f(x), h).",
      "Apply binomial or algebraic expansion where appropriate."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_sine",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Sine",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(sin(x)) = cos(x)",
    "engineExpression": "cos(x)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_cosine",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Cosine",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(cos(x)) = -sin(x)",
    "engineExpression": "-sin(x)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_tangent",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Tangent",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(tan(x)) = sec(x)^2",
    "engineExpression": "sec(x)^2",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_cosecant",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Cosecant",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(csc(x)) = -csc(x)cot(x)",
    "engineExpression": "-csc(x)*cot(x)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_secant",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Secant",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(sec(x)) = sec(x)tan(x)",
    "engineExpression": "sec(x)*tan(x)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_cotangent",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Cotangent",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(cot(x)) = -csc(x)^2",
    "engineExpression": "-csc(x)^2",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_natural_exponential",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Natural Exponential",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(e^x) = e^x",
    "engineExpression": "e^x",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_natural_log",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Natural Log",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(ln(x)) = frac(1, x)",
    "engineExpression": "frac(1, x)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_base-a_exponential",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Base-a Exponential",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(a^x) = a^x * ln(a)",
    "engineExpression": "a^x * ln(a)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_arcsine",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Arcsine",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(asin(x)) = frac(1, \u221a(1 - x^2))",
    "engineExpression": "frac(1, \u221a(1 - x^2))",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_arccosine",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Arccosine",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(acos(x)) = -frac(1, \u221a(1 - x^2))",
    "engineExpression": "-frac(1, \u221a(1 - x^2))",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_arctangent",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Arctangent",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(atan(x)) = frac(1, 1 + x^2)",
    "engineExpression": "frac(1, 1 + x^2)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_hyperbolic_sine",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Hyperbolic Sine",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(sinh(x)) = cosh(x)",
    "engineExpression": "cosh(x)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_hyperbolic_cosine",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Hyperbolic Cosine",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(cosh(x)) = sinh(x)",
    "engineExpression": "sinh(x)",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_derfn_derivative_of_hyperbolic_tangent",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Derivative of Hyperbolic Tangent",
    "description": "Standard derivative formula for specific mathematical functions.",
    "displayExpression": "d/dx(tanh(x)) = sech(x)^2",
    "engineExpression": "sech(x)^2",
    "derivationSteps": [
      "Use trigonometric limits or exponential series definition.",
      "Use implicit differentiation to prove inverse formulas."
    ]
  },
  {
    "id": "math_calc_int_power_rule_of_integration",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Power Rule of Integration",
    "description": "Core integration technique or antiderivative rule.",
    "displayExpression": "\u222b(x^n dx) = frac(x^(n+1), n+1) + C",
    "engineExpression": "frac(x^(n+1), n+1)",
    "derivationSteps": [
      "The inverse of the corresponding differentiation formula.",
      "Apply the Fundamental Theorem of Calculus to check by taking the derivative."
    ]
  },
  {
    "id": "math_calc_int_logarithmic_integration",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Logarithmic Integration",
    "description": "Core integration technique or antiderivative rule.",
    "displayExpression": "\u222b(frac(1,x) dx) = ln(|x|) + C",
    "engineExpression": "ln(abs(x))",
    "derivationSteps": [
      "The inverse of the corresponding differentiation formula.",
      "Apply the Fundamental Theorem of Calculus to check by taking the derivative."
    ]
  },
  {
    "id": "math_calc_int_exponential_integration",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Exponential Integration",
    "description": "Core integration technique or antiderivative rule.",
    "displayExpression": "\u222b(e^x dx) = e^x + C",
    "engineExpression": "e^x",
    "derivationSteps": [
      "The inverse of the corresponding differentiation formula.",
      "Apply the Fundamental Theorem of Calculus to check by taking the derivative."
    ]
  },
  {
    "id": "math_calc_int_integration_by_parts",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Integration by Parts",
    "description": "Core integration technique or antiderivative rule.",
    "displayExpression": "\u222b(u dv) = u*v - \u222b(v du)",
    "engineExpression": "u*v - \u222b(v*du)",
    "derivationSteps": [
      "The inverse of the corresponding differentiation formula.",
      "Apply the Fundamental Theorem of Calculus to check by taking the derivative."
    ]
  },
  {
    "id": "math_calc_int_integral_of_sine",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Integral of Sine",
    "description": "Core integration technique or antiderivative rule.",
    "displayExpression": "\u222b(sin(x) dx) = -cos(x) + C",
    "engineExpression": "-cos(x)",
    "derivationSteps": [
      "The inverse of the corresponding differentiation formula.",
      "Apply the Fundamental Theorem of Calculus to check by taking the derivative."
    ]
  },
  {
    "id": "math_calc_int_integral_of_cosine",
    "category": "mathematics",
    "subcategory": "Calculus",
    "name": "Integral of Cosine",
    "description": "Core integration technique or antiderivative rule.",
    "displayExpression": "\u222b(cos(x) dx) = sin(x) + C",
    "engineExpression": "sin(x)",
    "derivationSteps": [
      "The inverse of the corresponding differentiation formula.",
      "Apply the Fundamental Theorem of Calculus to check by taking the derivative."
    ]
  },
  {
    "id": "math_alggeom_square_expansion",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Square Expansion",
    "description": "Standard algebraic binomial square expansion.",
    "displayExpression": "(a + b)^2 = a^2 + 2*a*b + b^2",
    "engineExpression": "a^2 + 2*a*b + b^2",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_difference_square_expansion",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Difference Square Expansion",
    "description": "Standard algebraic binomial square difference expansion.",
    "displayExpression": "(a - b)^2 = a^2 - 2*a*b + b^2",
    "engineExpression": "a^2 - 2*a*b + b^2",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_difference_of_squares",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Difference of Squares",
    "description": "Standard factoring formula for difference of squares.",
    "displayExpression": "a^2 - b^2 = (a - b)(a + b)",
    "engineExpression": "(a - b)*(a + b)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_cubic_expansion",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Cubic Expansion",
    "description": "Standard algebraic binomial cubic expansion.",
    "displayExpression": "(a + b)^3 = a^3 + 3*a^2*b + 3*a*b^2 + b^3",
    "engineExpression": "a^3 + 3*a^2*b + 3*a*b^2 + b^3",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_difference_cubic_expansion",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Difference Cubic Expansion",
    "description": "Standard algebraic binomial cubic difference expansion.",
    "displayExpression": "(a - b)^3 = a^3 - 3*a^2*b + 3*a*b^2 - b^3",
    "engineExpression": "a^3 - 3*a^2*b + 3*a*b^2 - b^3",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_sum_of_cubes_factoring",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Sum of Cubes Factoring",
    "description": "Factoring algebraic identity for the sum of two cubic terms.",
    "displayExpression": "a^3 + b^3 = (a + b)(a^2 - a*b + b^2)",
    "engineExpression": "(a + b)*(a^2 - a*b + b^2)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_difference_of_cubes_factoring",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Difference of Cubes Factoring",
    "description": "Factoring algebraic identity for the difference of two cubic terms.",
    "displayExpression": "a^3 - b^3 = (a - b)(a^2 + a*b + b^2)",
    "engineExpression": "(a - b)*(a^2 + a*b + b^2)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_quadratic_formula",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Quadratic Formula",
    "description": "Yields roots of a quadratic equation ax\u00b2 + bx + c = 0.",
    "displayExpression": "x = frac(-b \u00b1 \u221a(b^2 - 4*a*c), 2*a)",
    "engineExpression": "frac(-b + \u221a(b^2 - 4*a*c), 2*a)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_quadratic_discriminant",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Quadratic Discriminant",
    "description": "Indicates the nature of roots: real/equal/complex.",
    "displayExpression": "Discriminant = b^2 - 4*a*c",
    "engineExpression": "b^2 - 4*a*c",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_arithmetic_nth_term",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Arithmetic Nth Term",
    "description": "Calculates the nth term of an arithmetic sequence.",
    "displayExpression": "An = A1 + (N-1)*D",
    "engineExpression": "A1 + (N-1)*D",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_arithmetic_series_sum",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Arithmetic Series Sum",
    "description": "Calculates the sum of first n terms of an arithmetic progression.",
    "displayExpression": "Sn = frac(N,2)*(2*A1 + (N-1)*D)",
    "engineExpression": "frac(N,2)*(2*A1 + (N-1)*D)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_geometric_nth_term",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Geometric Nth Term",
    "description": "Calculates the nth term of a geometric sequence.",
    "displayExpression": "An = A1 * R^(N-1)",
    "engineExpression": "A1 * R^(N-1)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_geometric_series_sum_finite",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Geometric Series Sum (Finite)",
    "description": "Calculates the sum of first n terms of a geometric progression.",
    "displayExpression": "Sn = A1 * frac(1 - R^N, 1 - R)",
    "engineExpression": "A1 * frac(1 - R^N, 1 - R)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_geometric_series_sum_infinite",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Geometric Series Sum (Infinite)",
    "description": "Calculates infinite sum of a geometric progression (convergent when |R| < 1).",
    "displayExpression": "S_inf = frac(A1, 1 - R)",
    "engineExpression": "frac(A1, 1 - R)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_logarithm_product_law",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Logarithm Product Law",
    "description": "Log law converting products into sums.",
    "displayExpression": "log_b(x * y) = log_b(x) + log_b(y)",
    "engineExpression": "log(X) + log(Y)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_logarithm_quotient_law",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Logarithm Quotient Law",
    "description": "Log law converting fractions into differences.",
    "displayExpression": "log_b(frac(x,y)) = log_b(x) - log_b(y)",
    "engineExpression": "log(X) - log(Y)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_logarithm_power_law",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Logarithm Power Law",
    "description": "Log law pulling powers to coefficients.",
    "displayExpression": "log_b(x^k) = k * log_b(x)",
    "engineExpression": "k * log(X)",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_logarithm_base_change_law",
    "category": "mathematics",
    "subcategory": "Algebra",
    "name": "Logarithm Base Change Law",
    "description": "Changes the logarithm base to a new arbitrary base.",
    "displayExpression": "log_b(x) = frac(log_a(x), log_a(b))",
    "engineExpression": "frac(log(X), log(B))",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_area_of_circle",
    "category": "mathematics",
    "subcategory": "Geometry",
    "name": "Area of Circle",
    "description": "Calculates circular area.",
    "displayExpression": "Area = \u03c0 * R^2",
    "engineExpression": "\u03c0 * R^2",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_circumference_of_circle",
    "category": "mathematics",
    "subcategory": "Geometry",
    "name": "Circumference of Circle",
    "description": "Calculates circle perimeter boundary length.",
    "displayExpression": "Circumference = 2 * \u03c0 * R",
    "engineExpression": "2 * \u03c0 * R",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_volume_of_sphere",
    "category": "mathematics",
    "subcategory": "Geometry",
    "name": "Volume of Sphere",
    "description": "Calculates spherical three-dimensional volume capacity.",
    "displayExpression": "Volume = frac(4,3) * \u03c0 * R^3",
    "engineExpression": "frac(4,3) * \u03c0 * R^3",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_surface_area_of_sphere",
    "category": "mathematics",
    "subcategory": "Geometry",
    "name": "Surface Area of Sphere",
    "description": "Calculates sphere external surface boundary area.",
    "displayExpression": "SA = 4 * \u03c0 * R^2",
    "engineExpression": "4 * \u03c0 * R^2",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_volume_of_cylinder",
    "category": "mathematics",
    "subcategory": "Geometry",
    "name": "Volume of Cylinder",
    "description": "Calculates cylindrical three-dimensional volume capacity.",
    "displayExpression": "Volume = \u03c0 * R^2 * H",
    "engineExpression": "\u03c0 * R^2 * H",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_volume_of_cone",
    "category": "mathematics",
    "subcategory": "Geometry",
    "name": "Volume of Cone",
    "description": "Calculates conical three-dimensional volume capacity.",
    "displayExpression": "Volume = frac(1,3) * \u03c0 * R^2 * H",
    "engineExpression": "frac(1,3) * \u03c0 * R^2 * H",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "math_alggeom_area_of_trapezoid",
    "category": "mathematics",
    "subcategory": "Geometry",
    "name": "Area of Trapezoid",
    "description": "Calculates trapezoid area given parallel bases and altitude height.",
    "displayExpression": "Area = frac(1,2) * (A + B) * H",
    "engineExpression": "frac(1,2) * (A + B) * H",
    "derivationSteps": [
      "Standard geometric theorem or algebraic identity.",
      "Apply basic expansion or partition proofs to demonstrate."
    ]
  },
  {
    "id": "stats_descriptive_statistics_arithmetic_mean",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Arithmetic Mean",
    "description": "Average value of a data set.",
    "displayExpression": "Mean = frac(\u03a3(x), N)",
    "engineExpression": "mean(X)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_weighted_mean",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Weighted Mean",
    "description": "Weighted average of values based on significance factors.",
    "displayExpression": "Weighted Mean = frac(\u03a3(w * x), \u03a3(w))",
    "engineExpression": "frac(sum(W * X), sum(W))",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_geometric_mean",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Geometric Mean",
    "description": "N-th root of the product of N elements.",
    "displayExpression": "Geometric Mean = (\u03a0(x))^(frac(1,N))",
    "engineExpression": "geomean(X)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_harmonic_mean",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Harmonic Mean",
    "description": "Reciprocal of the arithmetic mean of reciprocals.",
    "displayExpression": "Harmonic Mean = frac(N, \u03a3(frac(1,x)))",
    "engineExpression": "harmean(X)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_interquartile_range_iqr",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Interquartile Range (IQR)",
    "description": "Difference between the upper (75%) and lower (25%) quartiles.",
    "displayExpression": "IQR = Q3 - Q1",
    "engineExpression": "Q3 - Q1",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_sample_variance",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Sample Variance",
    "description": "Sample variance with Bessel's correction factor n-1.",
    "displayExpression": "s^2 = frac(\u03a3((x - x\u0304)^2), N - 1)",
    "engineExpression": "variance(X)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_population_variance",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Population Variance",
    "description": "Biased population variance divided by total population count.",
    "displayExpression": "\u03c3^2 = frac(\u03a3((x - \u03bc)^2), N)",
    "engineExpression": "pvariance(X)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_sample_standard_deviation",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Sample Standard Deviation",
    "description": "Measures variability or dispersion of sample data.",
    "displayExpression": "s = \u221a\u203e(s^2)",
    "engineExpression": "stddev(X)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_population_standard_deviation",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Population Standard Deviation",
    "description": "Measures variability or dispersion of population data.",
    "displayExpression": "\u03c3 = \u221a\u203e(\u03c3^2)",
    "engineExpression": "pstddev(X)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_mean_absolute_deviation_mad",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Mean Absolute Deviation (MAD)",
    "description": "Average of absolute deviations from the dataset mean.",
    "displayExpression": "MAD = frac(\u03a3(|x - x\u0304|), N)",
    "engineExpression": "mad(X)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_coefficient_of_variation_cv",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Coefficient of Variation (CV)",
    "description": "Relative standard deviation expressed as percentage.",
    "displayExpression": "CV = frac(s, x\u0304) * 100",
    "engineExpression": "frac(stddev(X), mean(X)) * 100",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_descriptive_statistics_z-score_standardization",
    "category": "statistics",
    "subcategory": "Descriptive Statistics",
    "name": "Z-Score (Standardization)",
    "description": "Number of standard deviations a data point is from the mean.",
    "displayExpression": "Z = frac(x - \u03bc, \u03c3)",
    "engineExpression": "frac(X - \u03bc, \u03c3)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_factorial_permutations_of_n_items",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Factorial (Permutations of n items)",
    "description": "Number of ways to order n unique items.",
    "displayExpression": "Pn = n!",
    "engineExpression": "n!",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_permutations_npr",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Permutations (nPr)",
    "description": "Number of ordered arrangements of r items chosen from n.",
    "displayExpression": "nPr = frac(n!, (n-r)!)",
    "engineExpression": "npr(N, R)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_combinations_ncr",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Combinations (nCr)",
    "description": "Number of subsets of size r chosen from n items, order ignored.",
    "displayExpression": "nCr = frac(n!, r!*(n-r)!)",
    "engineExpression": "ncr(N, R)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_permutations_with_repetitions",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Permutations with Repetitions",
    "description": "Arrangements of n items where some are identical.",
    "displayExpression": "Perm_Rep = frac(n!, n1!*n2!*...*nk!)",
    "engineExpression": "frac(n!, n1!*n2!)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_combinations_with_repetitions",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Combinations with Repetitions",
    "description": "Choosing combinations allowing repeated picks.",
    "displayExpression": "Comb_Rep = nCr(n + r - 1, r)",
    "engineExpression": "ncr(n + r - 1, r)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_addition_rule_of_probability",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Addition Rule of Probability",
    "description": "Probability of either event A or B occurring.",
    "displayExpression": "P(A \u222a B) = P(A) + P(B) - P(A \u2229 B)",
    "engineExpression": "P(A) + P(B) - P_and",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_conditional_probability",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Conditional Probability",
    "description": "Probability of A given that B has occurred.",
    "displayExpression": "P(A | B) = frac(P(A \u2229 B), P(B))",
    "engineExpression": "frac(P_and, P_B)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_multiplication_rule_independent",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Multiplication Rule (Independent)",
    "description": "Probability of intersection of two independent events.",
    "displayExpression": "P(A \u2229 B) = P(A) * P(B)",
    "engineExpression": "P_A * P_B",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_multiplication_rule_dependent",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Multiplication Rule (Dependent)",
    "description": "Probability of intersection of two dependent events.",
    "displayExpression": "P(A \u2229 B) = P(A) * P(B | A)",
    "engineExpression": "P_A * P_cond",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_bayes'_theorem",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Bayes' Theorem",
    "description": "Updates probability estimate based on conditional evidence.",
    "displayExpression": "P(A_i | B) = frac(P(B|A_i)*P(A_i), \u03a3(P(B|A_j)*P(A_j)))",
    "engineExpression": "frac(P_BA * P_A, P_B)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_expected_value_discrete",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Expected Value (Discrete)",
    "description": "Theoretical mean value of a discrete random variable.",
    "displayExpression": "E(X) = \u03a3(x * P(x))",
    "engineExpression": "sum(X * P)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_foundations_variance_of_random_variable",
    "category": "statistics",
    "subcategory": "Probability Foundations",
    "name": "Variance of Random Variable",
    "description": "Measures the theoretical dispersion of a random variable.",
    "displayExpression": "Var(X) = E(X^2) - (E(X))^2",
    "engineExpression": "E_X2 - E_X^2",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_binomial_pmf",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Binomial PMF",
    "description": "Probability of exactly k successes in n independent trials.",
    "displayExpression": "P(X=k) = nCr(N, K) * P^K * (1-P)^(N-K)",
    "engineExpression": "ncr(N,K) * P^K * (1-P)^(N-K)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_binomial_mean",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Binomial Mean",
    "description": "Expected value of a binomial distribution.",
    "displayExpression": "Mean = N * P",
    "engineExpression": "N * P",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_binomial_variance",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Binomial Variance",
    "description": "Variance of a binomial distribution.",
    "displayExpression": "Var = N * P * (1-P)",
    "engineExpression": "N * P * (1-P)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_poisson_pmf",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Poisson PMF",
    "description": "Probability of k events in fixed interval given mean rate \u03bb.",
    "displayExpression": "P(X=k) = frac(\u03bb^K * e^(-\u03bb), K!)",
    "engineExpression": "frac(\u03bb^K * e^(-\u03bb), K!)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_poisson_mean",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Poisson Mean",
    "description": "Expected value of a Poisson distribution.",
    "displayExpression": "Mean = \u03bb",
    "engineExpression": "\u03bb",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_poisson_variance",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Poisson Variance",
    "description": "Variance of a Poisson distribution.",
    "displayExpression": "Var = \u03bb",
    "engineExpression": "\u03bb",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_normal_pdf",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Normal PDF",
    "description": "Probability density function of normal distribution.",
    "displayExpression": "f(x) = frac(1, \u03c3*\u221a(2*\u03c0)) * e^(-frac((x-\u03bc)^2, 2*\u03c3^2))",
    "engineExpression": "frac(1, \u03c3*\u221a(2*\u03c0)) * e^(-(X-\u03bc)^2 / (2*\u03c3^2))",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_standard_error_of_the_mean",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Standard Error of the Mean",
    "description": "Standard deviation of the sampling distribution of the mean.",
    "displayExpression": "SE = frac(\u03c3, \u221a\u203e(N))",
    "engineExpression": "frac(\u03c3, \u221a(N))",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_margin_of_error",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Margin of Error",
    "description": "Interval half-width for confidence interval estimates.",
    "displayExpression": "Margin of Error = Z * frac(\u03c3, \u221a\u203e(N))",
    "engineExpression": "Z * frac(\u03c3, \u221a(N))",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_confidence_interval",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Confidence Interval",
    "description": "Interval estimate for population mean based on sample statistics.",
    "displayExpression": "Confidence Interval = x\u0304 \u00b1 Z * frac(s, \u221a\u203e(N))",
    "engineExpression": "mean(X) + Z*frac(stddev(X), \u221a(N))",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "stats_probability_distributions_chi-square_test_statistic",
    "category": "statistics",
    "subcategory": "Probability Distributions",
    "name": "Chi-Square Test Statistic",
    "description": "Measures goodness-of-fit or independence between observed and expected frequencies.",
    "displayExpression": "Chi-Square = \u03a3(frac((O - E)^2, E))",
    "engineExpression": "sum((O - E)^2 / E)",
    "derivationSteps": [
      "Standard statistical formulation.",
      "Utilizes sample datasets or probability postulates for calculations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_1st_equation_of_motion",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "1st Equation of Motion",
    "description": "Final velocity given initial velocity, constant acceleration, and time.",
    "displayExpression": "V = U + A * T",
    "engineExpression": "U + A*T",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_2nd_equation_of_motion",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "2nd Equation of Motion",
    "description": "Displacement given initial velocity, acceleration, and time.",
    "displayExpression": "S = U * T + frac(1,2) * A * T^2",
    "engineExpression": "U*T + frac(1,2)*A*T^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_3rd_equation_of_motion",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "3rd Equation of Motion",
    "description": "Velocity given initial velocity, acceleration, and displacement.",
    "displayExpression": "V^2 = U^2 + 2 * A * S",
    "engineExpression": "\u221a(U^2 + 2*A*S)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_average_velocity_displacement",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Average Velocity Displacement",
    "description": "Displacement based on average of initial and final velocities.",
    "displayExpression": "S = frac(U + V, 2) * T",
    "engineExpression": "frac(U + V, 2) * T",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_displacement_in_nth_second",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Displacement in Nth Second",
    "description": "Displacement during the specific N-th second of motion.",
    "displayExpression": "S_n = U + frac(A,2)*(2*N - 1)",
    "engineExpression": "U + frac(A,2)*(2*N - 1)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_projectile_max_height",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Projectile Max Height",
    "description": "Maximum vertical altitude achieved by a projectile.",
    "displayExpression": "Hmax = frac(U^2 * sin(\u03b8)^2, 2*g)",
    "engineExpression": "frac(U^2 * sin(\u03b8)^2, 2*9.80665)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_projectile_range",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Projectile Range",
    "description": "Maximum horizontal flight displacement achieved by a projectile.",
    "displayExpression": "Range = frac(U^2 * sin(2*\u03b8), g)",
    "engineExpression": "frac(U^2 * sin(2*\u03b8), 9.80665)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_projectile_time_of_flight",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Projectile Time of Flight",
    "description": "Total time spent in the air by a projectile.",
    "displayExpression": "T_flight = frac(2 * U * sin(\u03b8), g)",
    "engineExpression": "frac(2 * U * sin(\u03b8), 9.80665)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_linear_momentum",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Linear Momentum",
    "description": "Translational momentum of a particle.",
    "displayExpression": "P = M * V",
    "engineExpression": "M*V",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_newton's_second_law",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Newton's Second Law",
    "description": "Translational acceleration force relation.",
    "displayExpression": "F = M * A",
    "engineExpression": "M*A",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_impulse-momentum_theorem",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Impulse-Momentum Theorem",
    "description": "Impulse equals total momentum change.",
    "displayExpression": "J = F * \u0394T = \u0394P",
    "engineExpression": "F*T",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_work_done",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Work Done",
    "description": "Work generated by constant force exerted over displacement.",
    "displayExpression": "Work = F * D * cos(\u03b8)",
    "engineExpression": "F*D*cos(\u03b8)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_kinetic_energy",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Kinetic Energy",
    "description": "Translational kinetic energy of a moving mass.",
    "displayExpression": "KE = frac(1,2) * M * V^2",
    "engineExpression": "frac(1,2)*M*V^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_gravitational_potential_energy",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Gravitational Potential Energy",
    "description": "Potential energy stored via gravitational elevation.",
    "displayExpression": "GPE = M * g * H",
    "engineExpression": "M*9.80665*H",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_elastic_potential_energy",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Elastic Potential Energy",
    "description": "Potential energy stored inside a compressed Hookean spring.",
    "displayExpression": "EPE = frac(1,2) * K * X^2",
    "engineExpression": "frac(1,2)*K*X^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_mechanical_power",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Mechanical Power",
    "description": "Rate of performing mechanical work.",
    "displayExpression": "Power = frac(Work, Time)",
    "engineExpression": "Work/Time",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_centripetal_acceleration",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Centripetal Acceleration",
    "description": "Radial acceleration on circular trajectory.",
    "displayExpression": "a_c = frac(V^2, R)",
    "engineExpression": "V^2/R",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_centripetal_force",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Centripetal Force",
    "description": "Radial centripetal force constraining circular motion.",
    "displayExpression": "F_c = frac(M * V^2, R)",
    "engineExpression": "M*V^2/R",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_torque",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Torque",
    "description": "Rotational force or moment about a pivot point.",
    "displayExpression": "Torque = F * R * sin(\u03b8)",
    "engineExpression": "F*R*sin(\u03b8)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_angular_momentum",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Angular Momentum",
    "description": "Rotational momentum of a rigid body.",
    "displayExpression": "L = I * \u03c9",
    "engineExpression": "I*\u03c9",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_linear-angular_velocity_relation",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Linear-Angular Velocity relation",
    "description": "Relates linear tangential velocity to angular speed.",
    "displayExpression": "v = r * \u03c9",
    "engineExpression": "R*\u03c9",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_linear-angular_acceleration_relation",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Linear-Angular Acceleration relation",
    "description": "Relates linear tangential acceleration to angular acceleration.",
    "displayExpression": "a = r * \u03b1",
    "engineExpression": "R*\u03b1",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_moment_of_inertia_point_mass",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Moment of Inertia (Point Mass)",
    "description": "Rotational inertia of a single point mass.",
    "displayExpression": "I = M * R^2",
    "engineExpression": "M*R^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_rotational_kinetic_energy",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Rotational Kinetic Energy",
    "description": "Kinetic energy of a body rotating about a fixed axis.",
    "displayExpression": "K_rot = frac(1,2) * I * \u03c9^2",
    "engineExpression": "frac(1,2)*I*\u03c9^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_kinematics___mechanics_frictional_force",
    "category": "physics",
    "subcategory": "Kinematics & Mechanics",
    "name": "Frictional Force",
    "description": "Maximum static or kinetic friction between two surfaces.",
    "displayExpression": "F_f = \u03bc * F_n",
    "engineExpression": "\u03bc*Fn",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_gravitation_newton's_gravity_law",
    "category": "physics",
    "subcategory": "Gravitation",
    "name": "Newton's Gravity Law",
    "description": "Universal gravitational attractive force between two masses.",
    "displayExpression": "F = G * frac(M1 * M2, R^2)",
    "engineExpression": "(6.6743e-11 * M1 * M2)/R^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_gravitation_gravitational_field_strength",
    "category": "physics",
    "subcategory": "Gravitation",
    "name": "Gravitational Field Strength",
    "description": "Acceleration due to gravity at distance R from source mass.",
    "displayExpression": "g = G * frac(M, R^2)",
    "engineExpression": "(6.6743e-11 * M)/R^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_gravitation_orbital_velocity",
    "category": "physics",
    "subcategory": "Gravitation",
    "name": "Orbital Velocity",
    "description": "Tangential velocity required for stable circular orbit.",
    "displayExpression": "V_orb = \u221a(G * frac(M, R))",
    "engineExpression": "\u221a((6.6743e-11 * M)/R)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_gravitation_escape_velocity",
    "category": "physics",
    "subcategory": "Gravitation",
    "name": "Escape Velocity",
    "description": "Minimum speed required to escape gravitational binding field.",
    "displayExpression": "V_esc = \u221a(2 * G * frac(M, R))",
    "engineExpression": "\u221a((2 * 6.6743e-11 * M)/R)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_gravitation_orbital_period_kepler",
    "category": "physics",
    "subcategory": "Gravitation",
    "name": "Orbital Period (Kepler)",
    "description": "Kepler's Third Law for circular orbits.",
    "displayExpression": "T^2 = frac(4*\u03c0^2, G*M) * R^3",
    "engineExpression": "\u221a(frac(4*\u03c0^2, 6.6743e-11*M) * R^3)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_gravitation_gravitational_potential_energy_universal",
    "category": "physics",
    "subcategory": "Gravitation",
    "name": "Gravitational Potential Energy (Universal)",
    "description": "System potential energy relative to infinite separation.",
    "displayExpression": "U = -G * frac(M1*M2, R)",
    "engineExpression": "(-6.6743e-11 * M1 * M2)/R",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_wave_speed_equation",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Wave Speed Equation",
    "description": "Relates wave velocity to frequency and wavelength.",
    "displayExpression": "v = f * \u03bb",
    "engineExpression": "F*\u03bb",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_wave_period",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Wave Period",
    "description": "Duration of one full cycle of a wave.",
    "displayExpression": "T = frac(1, f)",
    "engineExpression": "1/F",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_doppler_effect_general",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Doppler Effect (General)",
    "description": "Observed frequency due to relative motion of source and observer.",
    "displayExpression": "f_obs = f * frac(v \u00b1 v_obs, v \u2213 v_src)",
    "engineExpression": "F * frac(V + Vo, V - Vs)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_index_of_refraction",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Index of Refraction",
    "description": "Ratio of light speed in vacuum to light speed in medium.",
    "displayExpression": "n = frac(c, v)",
    "engineExpression": "299792458 / V",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_snell's_law_of_refraction",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Snell's Law of Refraction",
    "description": "Angle of refraction across boundaries of differing media.",
    "displayExpression": "n1 * sin(\u03b81) = n2 * sin(\u03b82)",
    "engineExpression": "asin((N1*sin(\u03b81))/N2)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_critical_angle",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Critical Angle",
    "description": "Angle of incidence leading to total internal reflection.",
    "displayExpression": "\u03b8c = asin(frac(n2, n1))",
    "engineExpression": "asin(N2/N1)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_lens_maker's_equation",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Lens Maker's Equation",
    "description": "Computes focal length of thin lens based on radii of curvature.",
    "displayExpression": "frac(1, f) = (n - 1) * (frac(1, R1) - frac(1, R2))",
    "engineExpression": "1 / ((N-1) * (1/R1 - 1/R2))",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_thin_lens_/_mirror_equation",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Thin Lens / Mirror Equation",
    "description": "Relates focal length to object and image distances.",
    "displayExpression": "frac(1, f) = frac(1, do) + frac(1, di)",
    "engineExpression": "1 / (1/Do + 1/Di)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_magnification",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Magnification",
    "description": "Ratio of image height to object height.",
    "displayExpression": "M = -frac(di, do)",
    "engineExpression": "-Di/Do",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_lens_power",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Lens Power",
    "description": "Refractive power of a lens in Diopters.",
    "displayExpression": "P = frac(1, f)",
    "engineExpression": "1/F",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_double_slit_constructive",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Double Slit Constructive",
    "description": "Fringe maxima conditions in double-slit interference.",
    "displayExpression": "d * sin(\u03b8) = m * \u03bb",
    "engineExpression": "asin((M*\u03bb)/D)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_double_slit_destructive",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Double Slit Destructive",
    "description": "Fringe minima conditions in double-slit interference.",
    "displayExpression": "d * sin(\u03b8) = (m + frac(1,2)) * \u03bb",
    "engineExpression": "asin(((M+0.5)*\u03bb)/D)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_fringe_displacement",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Fringe Displacement",
    "description": "Linear position of fringes from central maximum.",
    "displayExpression": "y = frac(m * \u03bb * L, d)",
    "engineExpression": "M*\u03bb*L/D",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_waves___optics_fringe_width",
    "category": "physics",
    "subcategory": "Waves & Optics",
    "name": "Fringe Width",
    "description": "Distance between two adjacent bright fringes.",
    "displayExpression": "w = frac(\u03bb * L, d)",
    "engineExpression": "\u03bb*L/D",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_coulomb's_law",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Coulomb's Law",
    "description": "Electrostatic force between two point charges.",
    "displayExpression": "F = k * frac(Q1 * Q2, R^2)",
    "engineExpression": "(8.98755e9 * Q1 * Q2)/R^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_electric_field_point_charge",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Electric Field (Point Charge)",
    "description": "Electric field intensity at distance R from source charge.",
    "displayExpression": "E = k * frac(Q, R^2)",
    "engineExpression": "(8.98755e9 * Q)/R^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_electric_potential_point_charge",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Electric Potential (Point Charge)",
    "description": "Electric potential at distance R from source charge.",
    "displayExpression": "V = k * frac(Q, R)",
    "engineExpression": "(8.98755e9 * Q)/R",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_ohm's_law",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Ohm's Law",
    "description": "Voltage drop relation across simple resistors.",
    "displayExpression": "V = I * R",
    "engineExpression": "I*R",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_electrical_power",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Electrical Power",
    "description": "Rate of electrical energy transfer in a circuit.",
    "displayExpression": "P = V * I",
    "engineExpression": "V*I",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_series_resistors",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Series Resistors",
    "description": "Equivalent resistance of series connection.",
    "displayExpression": "Req = R1 + R2 + R3",
    "engineExpression": "R1 + R2 + R3",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_parallel_resistors",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Parallel Resistors",
    "description": "Equivalent resistance of parallel connection.",
    "displayExpression": "Req = frac(1, frac(1,R1) + frac(1,R2) + frac(1,R3))",
    "engineExpression": "1 / (1/R1 + 1/R2 + 1/R3)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_capacitance_definition",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Capacitance definition",
    "description": "Stored charge per unit potential difference.",
    "displayExpression": "C = frac(Q, V)",
    "engineExpression": "Q/V",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_parallel_capacitors",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Parallel Capacitors",
    "description": "Equivalent capacitance of parallel connection.",
    "displayExpression": "C_parallel = C1 + C2 + C3",
    "engineExpression": "C1 + C2 + C3",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_series_capacitors",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Series Capacitors",
    "description": "Equivalent capacitance of series connection.",
    "displayExpression": "C_series = frac(1, frac(1,C1) + frac(1,C2) + frac(1,C3))",
    "engineExpression": "1 / (1/C1 + 1/C2 + 1/C3)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_magnetic_force_on_charge",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Magnetic Force on Charge",
    "description": "Lorentz force on moving charge in magnetic field.",
    "displayExpression": "F = Q * V * B * sin(\u03b8)",
    "engineExpression": "Q*V*B*sin(\u03b8)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_magnetic_force_on_wire",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Magnetic Force on Wire",
    "description": "Force exerted on current-carrying wire of length L in magnetic field.",
    "displayExpression": "F = I * L * B * sin(\u03b8)",
    "engineExpression": "I*L*B*sin(\u03b8)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_magnetic_flux",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Magnetic Flux",
    "description": "Total magnetic field lines passing through area A.",
    "displayExpression": "\u03a6 = B * A * cos(\u03b8)",
    "engineExpression": "B*A*cos(\u03b8)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_faraday's_law_of_induction",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Faraday's Law of Induction",
    "description": "Induced electromotive force equals rate of flux change.",
    "displayExpression": "EMF = -N * frac(\u0394\u03a6, \u0394T)",
    "engineExpression": "-N * (dPhi/dT)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_electricity___magnetism_electric_field_potential_relation",
    "category": "physics",
    "subcategory": "Electricity & Magnetism",
    "name": "Electric Field Potential Relation",
    "description": "Relates electric field to voltage gradient.",
    "displayExpression": "E = -frac(\u0394V, \u0394X)",
    "engineExpression": "-V/X",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_planck's_relation",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Planck's Relation",
    "description": "Energy of a photon based on its frequency.",
    "displayExpression": "E = H * F",
    "engineExpression": "6.62607e-34 * F",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_photoelectric_equation",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Photoelectric Equation",
    "description": "Maximum kinetic energy of photoelectrons.",
    "displayExpression": "KEmax = H * F - \u03a6",
    "engineExpression": "6.62607e-34 * F - \u03a6",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_de_broglie_wavelength",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "de Broglie Wavelength",
    "description": "Wavelength associated with a moving particle.",
    "displayExpression": "\u03bb = frac(H, M * V)",
    "engineExpression": "6.62607e-34 / (M*V)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_mass-energy_equivalence",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Mass-Energy Equivalence",
    "description": "Einstein's mass-energy equivalence equation.",
    "displayExpression": "E = M * c^2",
    "engineExpression": "M * 299792458^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_radioactive_decay_law",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Radioactive Decay Law",
    "description": "Exponential decay formula for radioactive nuclei population.",
    "displayExpression": "N = N0 * e^(-\u03bb * T)",
    "engineExpression": "N0 * e^(-\u03bb * T)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_decay_constant",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Decay Constant",
    "description": "Relates radioactive decay constant to half-life.",
    "displayExpression": "\u03bb = frac(ln(2), T_half)",
    "engineExpression": "0.693147 / Thalf",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_half-life_formula",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Half-Life Formula",
    "description": "Time required for half of radioactive nuclei to decay.",
    "displayExpression": "T_half = frac(ln(2), \u03bb)",
    "engineExpression": "0.693147 / \u03bb",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_hydrogen_energy_levels",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Hydrogen Energy Levels",
    "description": "Bohr orbital energy levels in electron-volts.",
    "displayExpression": "E_n = -frac(13.6, n^2)",
    "engineExpression": "-13.6 / n^2",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_heisenberg_uncertainty_principle",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Heisenberg Uncertainty Principle",
    "description": "Limits precision of simultaneous position and momentum measurements.",
    "displayExpression": "\u0394p * \u0394x \u2265 frac(h, 4*\u03c0)",
    "engineExpression": "6.62607e-34 / (4*\u03c0)",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "phys_modern___quantum_photon_momentum",
    "category": "physics",
    "subcategory": "Modern & Quantum",
    "name": "Photon Momentum",
    "description": "Momentum of a photon.",
    "displayExpression": "p = frac(h, \u03bb)",
    "engineExpression": "6.62607e-34 / \u03bb",
    "derivationSteps": [
      "Derived from laws of physics.",
      "Conserves mechanical energy or momentum equations."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_molarity",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Molarity",
    "description": "Moles of solute per liter of solution.",
    "displayExpression": "M = frac(Moles, Vol)",
    "engineExpression": "Moles/Vol",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_molality",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Molality",
    "description": "Moles of solute per kilogram of solvent.",
    "displayExpression": "m = frac(Moles, Mass_kg)",
    "engineExpression": "Moles/Mass",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_mole_fraction",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Mole Fraction",
    "description": "Ratio of moles of one component to total moles.",
    "displayExpression": "X_A = frac(nA, nA + nB)",
    "engineExpression": "nA / (nA + nB)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_mass_percent",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Mass Percent",
    "description": "Percentage concentration by mass.",
    "displayExpression": "MassPercent = frac(MassSolute, MassTotal) * 100",
    "engineExpression": "(MassSolute / MassTotal) * 100",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_parts_per_million_ppm",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Parts Per Million (ppm)",
    "description": "Trace concentration level measure.",
    "displayExpression": "ppm = frac(MassSolute, MassTotal) * 10^6",
    "engineExpression": "(MassSolute / MassTotal) * 1000000",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_ideal_gas_law",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Ideal Gas Law",
    "description": "Equation of state for ideal gases.",
    "displayExpression": "P * V = N * R * T",
    "engineExpression": "(n * 8.31446 * T) / V",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_boyle's_law",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Boyle's Law",
    "description": "Volume of gas is inversely proportional to pressure at constant temp.",
    "displayExpression": "P1 * V1 = P2 * V2",
    "engineExpression": "(P1 * V1) / V2",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_charles's_law",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Charles's Law",
    "description": "Volume of gas is directly proportional to temperature at constant pressure.",
    "displayExpression": "frac(V1, T1) = frac(V2, T2)",
    "engineExpression": "(V1 * T2) / T1",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_gay-lussac's_law",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Gay-Lussac's Law",
    "description": "Pressure of gas is directly proportional to temperature at constant volume.",
    "displayExpression": "frac(P1, T1) = frac(P2, T2)",
    "engineExpression": "(P1 * T2) / T1",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_avogadro's_law",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Avogadro's Law",
    "description": "Volume of gas is proportional to moles at constant temp and pressure.",
    "displayExpression": "frac(V1, N1) = frac(V2, N2)",
    "engineExpression": "(V1 * N2) / N1",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_combined_gas_law",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Combined Gas Law",
    "description": "Combines Boyle's, Charles's, and Gay-Lussac's laws.",
    "displayExpression": "frac(P1*V1, T1) = frac(P2*V2, T2)",
    "engineExpression": "(P1 * V1 * T2) / (T1 * V2)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_dalton's_partial_pressures",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Dalton's Partial Pressures",
    "description": "Total pressure of gas mixture is sum of partial pressures.",
    "displayExpression": "P_total = P1 + P2 + P3",
    "engineExpression": "P1 + P2 + P3",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_partial_pressure_from_mole_fraction",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Partial Pressure from Mole Fraction",
    "description": "Computes partial pressure using mole fraction.",
    "displayExpression": "P_i = X_i * P_total",
    "engineExpression": "X * Ptotal",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_graham's_law_of_effusion",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Graham's Law of Effusion",
    "description": "Rate of effusion of a gas is inversely proportional to square root of molar mass.",
    "displayExpression": "frac(Rate1, Rate2) = \u221a\u203e(frac(M2, M1))",
    "engineExpression": "\u221a(M2/M1)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_density_of_ideal_gas",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Density of Ideal Gas",
    "description": "Calculates gas density from pressure, molar mass, and temperature.",
    "displayExpression": "Density = frac(P * M, R * T)",
    "engineExpression": "(P * M) / (8.31446 * T)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_kinetic_energy_of_gas_molecule",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Kinetic Energy of Gas Molecule",
    "description": "Average translational kinetic energy per mole of gas.",
    "displayExpression": "Average_KE = frac(3,2) * R * T",
    "engineExpression": "1.5 * 8.31446 * T",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_root-mean-square_speed",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Root-Mean-Square Speed",
    "description": "Average velocity measure of gas particles.",
    "displayExpression": "V_rms = \u221a(frac(3*R*T, M))",
    "engineExpression": "\u221a((3 * 8.31446 * T) / M)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_stoichiometry___gas_laws_moles_from_mass",
    "category": "chemistry",
    "subcategory": "Stoichiometry & Gas Laws",
    "name": "Moles from Mass",
    "description": "Calculates moles of a chemical substance.",
    "displayExpression": "Moles = frac(Mass, MolarMass)",
    "engineExpression": "Mass/MolarMass",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_rate_law_expression",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Rate Law Expression",
    "description": "Rate of reaction as function of concentrations.",
    "displayExpression": "Rate = K * [A]^m * [B]^n",
    "engineExpression": "K * A^M * B^N",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_arrhenius_equation",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Arrhenius Equation",
    "description": "Rate constant dependence on temperature and activation energy.",
    "displayExpression": "K = A * e^(-frac(Ea, R*T))",
    "engineExpression": "A * e^(-Ea / (8.31446 * T))",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_first-order_half-life",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "First-Order Half-Life",
    "description": "Time required for half of reactant to decompose in first-order reaction.",
    "displayExpression": "t_half = frac(ln(2), K)",
    "engineExpression": "0.693147 / K",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_second-order_half-life",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Second-Order Half-Life",
    "description": "Time required for half of reactant to decompose in second-order reaction.",
    "displayExpression": "t_half = frac(1, K * [A]0)",
    "engineExpression": "1 / (K * A0)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_zero-order_half-life",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Zero-Order Half-Life",
    "description": "Time required for half of reactant to decompose in zero-order reaction.",
    "displayExpression": "t_half = frac([A]0, 2*K)",
    "engineExpression": "A0 / (2 * K)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_equilibrium_constant_kc",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Equilibrium Constant (Kc)",
    "description": "Ratio of product to reactant concentrations at equilibrium.",
    "displayExpression": "Kc = frac([C]^c * [D]^d, [A]^a * [B]^b)",
    "engineExpression": "(C^c * D^d) / (A^a * B^b)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_kp-kc_relation",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Kp-Kc Relation",
    "description": "Relates equilibrium constants by partial pressure and concentration.",
    "displayExpression": "Kp = Kc * (R * T)^\u0394n",
    "engineExpression": "Kc * (0.082057 * T)^dn",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_ph_definition",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "pH Definition",
    "description": "Negative logarithm of hydronium ion concentration.",
    "displayExpression": "pH = -log(H)",
    "engineExpression": "-log(H)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_poh_definition",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "pOH Definition",
    "description": "Negative logarithm of hydroxide ion concentration.",
    "displayExpression": "pOH = -log(OH)",
    "engineExpression": "-log(OH)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_ph-poh_relation",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "pH-pOH Relation",
    "description": "Sum of pH and pOH in aqueous solutions at 25\u00b0C.",
    "displayExpression": "pH + pOH = 14",
    "engineExpression": "14 - pH",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_water_autoionization_constant",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Water Autoionization Constant",
    "description": "Equilibrium constant for water self-ionization.",
    "displayExpression": "Kw = H * OH = 1.0\u00d710^(-14)",
    "engineExpression": "1e-14 / H",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_henderson-hasselbalch_acid",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Henderson-Hasselbalch (Acid)",
    "description": "Calculates pH of acidic buffer solutions.",
    "displayExpression": "pH = pKa + log(frac([A-], [HA]))",
    "engineExpression": "pKa + log(A_conj / A_acid)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_henderson-hasselbalch_base",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Henderson-Hasselbalch (Base)",
    "description": "Calculates pOH of basic buffer solutions.",
    "displayExpression": "pOH = pKb + log(frac([HB+], [B]))",
    "engineExpression": "pKb + log(B_conj / B_base)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_ka-kb_relation",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Ka-Kb Relation",
    "description": "Relates acid and conjugate base ionization constants.",
    "displayExpression": "Ka * Kb = Kw",
    "engineExpression": "1e-14 / Ka",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_ostwald_dilution_law_weak_acid",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Ostwald Dilution Law (Weak Acid)",
    "description": "Degree of dissociation of a weak electrolyte.",
    "displayExpression": "\u03b1 = \u221a(frac(Ka, C))",
    "engineExpression": "\u221a(Ka / C)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_arrhenius_two-point_form",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Arrhenius Two-Point Form",
    "description": "Calculates activation energy from rate constants at two temperatures.",
    "displayExpression": "ln(frac(K2, K1)) = -frac(Ea, R) * (frac(1,T2) - frac(1,T1))",
    "engineExpression": "(-Ea/8.31446) * (1/T2 - 1/T1)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_reaction_quotient_q",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Reaction Quotient (Q)",
    "description": "Concentration ratio at any non-equilibrium point in reaction.",
    "displayExpression": "Q = frac([C]^c * [D]^d, [A]^a * [B]^b)",
    "engineExpression": "(C^c * D^d) / (A^a * B^b)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_physical___kinetics_nernst_equation",
    "category": "chemistry",
    "subcategory": "Physical & Kinetics",
    "name": "Nernst Equation",
    "description": "Calculates electrochemical cell potential under non-standard conditions.",
    "displayExpression": "E_cell = E0_cell - frac(R*T, n*F) * ln(Q)",
    "engineExpression": "E0_cell - (8.31446 * T / (N * 96485.33)) * ln(Q)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_enthalpy_change",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Enthalpy Change",
    "description": "Enthalpy change of reaction at constant pressure.",
    "displayExpression": "\u0394H = \u0394U + P * \u0394V",
    "engineExpression": "\u0394U + P*\u0394V",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_gibbs_free_energy_spontaneity",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Gibbs Free Energy Spontaneity",
    "description": "Spontaneity criterion (spontaneous when \u0394G < 0).",
    "displayExpression": "\u0394G = \u0394H - T * \u0394S",
    "engineExpression": "\u0394H - T*\u0394S",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_standard_gibbs_free_energy_&_k",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Standard Gibbs Free Energy & K",
    "description": "Relates standard free energy change to equilibrium constant.",
    "displayExpression": "\u0394G0 = -R * T * ln(K)",
    "engineExpression": "-8.31446 * T * ln(K)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_entropy_definition",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Entropy Definition",
    "description": "Entropy change of reversible thermodynamic process.",
    "displayExpression": "\u0394S = frac(Q_rev, T)",
    "engineExpression": "Q/T",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_sensible_heat_transfer",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Sensible Heat Transfer",
    "description": "Heat absorbed/released during temperature change without phase change.",
    "displayExpression": "Q = M * C * \u0394T",
    "engineExpression": "M*C*dT",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_hess's_law_of_summation",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Hess's Law of Summation",
    "description": "Total enthalpy change is sum of standard enthalpies of formation.",
    "displayExpression": "\u0394H0 = \u03a3(n * \u0394Hf0_products) - \u03a3(m * \u0394Hf0_reactants)",
    "engineExpression": "sum_prod - sum_react",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_rydberg_formula",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Rydberg Formula",
    "description": "Predicts wavelengths of hydrogen spectral emission lines.",
    "displayExpression": "frac(1, \u03bb) = R_H * (frac(1, N1^2) - frac(1, N2^2))",
    "engineExpression": "10973731.57 * (1/(N1^2) - 1/(N2^2))",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_bragg's_law_of_diffraction",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Bragg's Law of Diffraction",
    "description": "Conditions for constructive interference of X-rays in crystals.",
    "displayExpression": "n * \u03bb = 2 * D * sin(\u03b8)",
    "engineExpression": "asin((N*\u03bb)/(2*D))",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_photon_wavelength_energy_relation",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Photon Wavelength Energy Relation",
    "description": "Calculates photon energy from wavelength.",
    "displayExpression": "E = frac(h*c, \u03bb)",
    "engineExpression": "(6.62607e-34 * 299792458) / \u03bb",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_de_broglie_wavelength_energy",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "de Broglie Wavelength (Energy)",
    "description": "Calculates particle de Broglie wavelength from kinetic energy.",
    "displayExpression": "\u03bb = frac(h, \u221a(2*M*KE))",
    "engineExpression": "6.62607e-34 / \u221a(2 * M * KE)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_pressure-volume_work",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Pressure-Volume Work",
    "description": "Work done by expanding gas against constant pressure.",
    "displayExpression": "W = -P * \u0394V",
    "engineExpression": "-P*dV",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_second_law_of_thermodynamics",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Second Law of Thermodynamics",
    "description": "Total entropy of universe always increases in spontaneous process.",
    "displayExpression": "\u0394S_universe = \u0394S_system + \u0394S_surrounds",
    "engineExpression": "dS_sys + dS_surr",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_free_energy_non-standard",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Free Energy Non-Standard",
    "description": "Calculates free energy under non-standard concentrations.",
    "displayExpression": "\u0394G = \u0394G0 + R * T * ln(Q)",
    "engineExpression": "dG0 + 8.31446 * T * ln(Q)",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "chem_thermodynamics___atomic_maximum_useful_work",
    "category": "chemistry",
    "subcategory": "Thermodynamics & Atomic",
    "name": "Maximum Useful Work",
    "description": "Gibbs free energy change equals maximum non-expansion work obtainable.",
    "displayExpression": "w_max = -\u0394G",
    "engineExpression": "dG",
    "derivationSteps": [
      "Standard chemical calculation formula.",
      "Based on stoichiometry, kinetic models, or thermodynamic definitions."
    ]
  },
  {
    "id": "math_trig_extra_cotangent_sum_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cotangent Sum Formula",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "cot(A+B) = frac(cot(A)cot(B)-1, cot(B)+cot(A))",
    "engineExpression": "frac(cot(A)*cot(B)-1, cot(B)+cot(A))",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_cotangent_difference_formula",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cotangent Difference Formula",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "cot(A-B) = frac(cot(A)cot(B)+1, cot(B)-cot(A))",
    "engineExpression": "frac(cot(A)*cot(B)+1, cot(B)-cot(A))",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_sine_angle_shift_(\u03c0/2)",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Angle Shift (\u03c0/2)",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "sin(frac(\u03c0,2) + \u03b8) = cos(\u03b8)",
    "engineExpression": "cos(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_cosine_angle_shift_(\u03c0/2)",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Angle Shift (\u03c0/2)",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "cos(frac(\u03c0,2) + \u03b8) = -sin(\u03b8)",
    "engineExpression": "-sin(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_sine_supplementary_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Supplementary Angle",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "sin(\u03c0 - \u03b8) = sin(\u03b8)",
    "engineExpression": "sin(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_cosine_supplementary_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Supplementary Angle",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "cos(\u03c0 - \u03b8) = -cos(\u03b8)",
    "engineExpression": "-cos(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_tangent_supplementary_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Supplementary Angle",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "tan(\u03c0 - \u03b8) = -tan(\u03b8)",
    "engineExpression": "-tan(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_sine_angle_shift_(\u03c0)",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Angle Shift (\u03c0)",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "sin(\u03c0 + \u03b8) = -sin(\u03b8)",
    "engineExpression": "-sin(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_cosine_angle_shift_(\u03c0)",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Angle Shift (\u03c0)",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "cos(\u03c0 + \u03b8) = -cos(\u03b8)",
    "engineExpression": "-cos(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_tangent_angle_shift_(\u03c0)",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Angle Shift (\u03c0)",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "tan(\u03c0 + \u03b8) = tan(\u03b8)",
    "engineExpression": "tan(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_sine_angle_shift_(2\u03c0)",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Angle Shift (2\u03c0)",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "sin(2*\u03c0 - \u03b8) = -sin(\u03b8)",
    "engineExpression": "-sin(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_cosine_angle_shift_(2\u03c0)",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Angle Shift (2\u03c0)",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "cos(2*\u03c0 - \u03b8) = cos(\u03b8)",
    "engineExpression": "cos(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_tangent_angle_shift_(2\u03c0)",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Tangent Angle Shift (2\u03c0)",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "tan(2*\u03c0 - \u03b8) = -tan(\u03b8)",
    "engineExpression": "-tan(\u03b8)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_secant_double_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Secant Double Angle",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "sec(2*\u03b8) = frac(sec(\u03b8)^2, 2 - sec(\u03b8)^2)",
    "engineExpression": "frac(sec(\u03b8)^2, 2 - sec(\u03b8)^2)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_cosecant_double_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosecant Double Angle",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "csc(2*\u03b8) = frac(sec(\u03b8)csc(\u03b8), 2)",
    "engineExpression": "frac(sec(\u03b8)*csc(\u03b8), 2)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_cotangent_double_angle",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cotangent Double Angle",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "cot(2*\u03b8) = frac(cot(\u03b8)^2 - 1, 2*cot(\u03b8))",
    "engineExpression": "frac(cot(\u03b8)^2 - 1, 2*cot(\u03b8))",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_sine_triple_sum",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Sine Triple Sum",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "sin(A+B+C) = sin(A)cos(B)cos(C) + cos(A)sin(B)cos(C) + cos(A)cos(B)sin(C) - sin(A)sin(B)sin(C)",
    "engineExpression": "sin(A)*cos(B)*cos(C)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  },
  {
    "id": "math_trig_extra_cosine_triple_sum",
    "category": "mathematics",
    "subcategory": "Trigonometry",
    "name": "Cosine Triple Sum",
    "description": "Additional helper trigonometric identity.",
    "displayExpression": "cos(A+B+C) = cos(A)cos(B)cos(C) - sin(A)sin(B)cos(C) - sin(A)cos(B)sin(C) - cos(A)sin(B)sin(C)",
    "engineExpression": "cos(A)*cos(B)*cos(C)",
    "derivationSteps": [
      "Use fundamental addition identities.",
      "Simplify terms algebraically."
    ]
  }
];
