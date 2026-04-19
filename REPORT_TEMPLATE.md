# 23F-XXXX_A2_Q4_Report

## 1. Introduction

Circular q-shift is a data permutation where each node i sends its data to node (i + q) mod p.
This project visualizes the operation on a 2D mesh, making communication stages and complexity
trade-offs easy to understand.

## 2. Algorithm Description

For p = n^2 mesh:

- Stage 1 (Row Shift): shift each row by r = q mod n
- Stage 2 (Column Shift): shift each column by c = floor(q / n)

Formulas:

- Ring steps = min(q, p - q)
- Mesh steps = (q mod n) + floor(q / n)

Worked example (p = 16, q = 5):

- n = 4
- Row shift = 5 mod 4 = 1
- Column shift = floor(5 / 4) = 1
- Total mesh steps = 2
- Ring steps = min(5, 11) = 5

Node mapping example:

- Initial data D0..D15
- After Stage 1 each row rotates right by 1
- After Stage 2 each column rotates down by 1

## 3. Application Architecture

- App state in App component:
- input state (p, q)
- simulation state (before, stage1, stage2)
- animation stage control
- Components:
- ControlPanel for validated user input
- MeshGrid for grid rendering and stage arrows
- ComplexityPanel for formulas and comparison bars
- Utility module shiftLogic.js contains pure testable functions.

## 4. Complexity Analysis

Comparison table:

| p  | q | sqrt(p) | Row Shift q mod sqrt(p) | Column Shift floor(q/sqrt(p)) | Mesh Steps | Ring Steps min(q,p-q) |
|----|---|---------|--------------------------|--------------------------------|------------|------------------------|
| 16 | 3 | 4       | 3                        | 0                              | 3          | 3                      |
| 16 | 5 | 4       | 1                        | 1                              | 2          | 5                      |
| 16 | 7 | 4       | 3                        | 1                              | 4          | 7                      |
| 64 | 3 | 8       | 3                        | 0                              | 3          | 3                      |
| 64 | 5 | 8       | 5                        | 0                              | 5          | 5                      |
| 64 | 7 | 8       | 7                        | 0                              | 7          | 7                      |

Observation:

- For larger q relative to sqrt(p), mesh often requires fewer communication stages than ring.
- The UI visual comparison reinforces this with live bar values.

## 5. Deployment Guide

1. Push code to public GitHub repository.
2. Import repo to Vercel (or Netlify).
3. Build command: npm run build
4. Output directory: dist
5. Deploy and verify URL is publicly accessible.
6. Put URL in README and include URL in screenshot.

## 6. Screenshots

Insert at least three screenshots:

1. Initial state (before shift)
2. Mid-animation (Stage 1 or Stage 2)
3. Final state (after Stage 2)

Requirement:

- Ensure live deployment URL is visible in at least one screenshot.
