<!-- =========================================================================================
                                     HEADER SECTION
     ========================================================================================= -->
<div align="center">

  <!-- Title -->
  # Computer Graphics Lab

  <!-- Subtitle -->
  ### CSL402 · Semester IV · Computer Engineering

  <!-- Badges -->
  [![Curated by](https://img.shields.io/badge/Curated%20by-Amey%20Thakur-blue.svg)](https://github.com/Amey-Thakur)
  [![Programs](https://img.shields.io/badge/Programs-4-yellowgreen.svg)](#quick-navigation)
  [![Language](https://img.shields.io/badge/Language-C-blueviolet.svg)](./)
  [![Lab Manual](https://img.shields.io/badge/Lab%20Manual-Available-brightgreen.svg)](PRACTICAL%20LAB.pdf)

  <!-- Short Description -->
  **A comprehensive collection of 4 programs across 3 experiments covering fundamental graphics algorithms with detailed comments, proper documentation, and industry-standard coding practices using the graphics.h library.**

  ---

  <!-- Navigation Links -->
  [How to Use](#how-to-use) &nbsp;·&nbsp; [Learning Path](#learning-path) &nbsp;·&nbsp; [Lab Manual](#lab-manual) &nbsp;·&nbsp; [Experiment 1](#experiment-1-line-drawing--basic-shapes-2-programs) &nbsp;·&nbsp; [Experiment 2](#experiment-2-circle-drawing-1-program) &nbsp;·&nbsp; [Experiment 3](#experiment-3-ellipse-drawing-1-program)

</div>

---

> [!TIP]
> **Graphics Visualization**: Always sketch your graphics output on paper before coding. Draw coordinate systems, trace pixel positions for line/circle algorithms step-by-step, and visualize transformation matrices with example points. Understanding the mathematical foundation - Bresenham's error terms, midpoint decisions, and symmetry properties - is essential for implementing efficient graphics algorithms.

> [!WARNING]
> **Environment Setup**: These programs require **Turbo C++** or a compatible environment with the **graphics.h** library. Modern compilers like GCC/Clang do not support graphics.h natively. Use DOSBox with Turbo C++ or WinBGIm library for modern systems.

---

<!-- =========================================================================================
                                     HOW TO USE SECTION
     ========================================================================================= -->
## How to Use

These programs require **Turbo C++** or a compatible environment with the **graphics.h** library.

### Using Turbo C++

1. **Open** Turbo C++ IDE
2. **Load** the `.c` file
3. **Compile** using: `Alt + F9`
4. **Run** using: `Ctrl + F9`

### Using DOSBox with Turbo C++

1. **Install** DOSBox on your system
2. **Mount** your Turbo C directory
3. **Navigate** to the file location
4. **Compile and run** as above

Example:
```
mount c c:\tc
c:
cd bgi
tc
```

---

<!-- =========================================================================================
                                     LEARNING PATH SECTION
     ========================================================================================= -->
## Learning Path

**Beginner Level:**
- Start with Experiment 1 (Basic Graphics Shapes)
- Understand graphics primitives and library functions

**Intermediate Level:**
- Explore Experiment 1 (Bresenham's Line Algorithm)
- Learn efficient line drawing with integer arithmetic

**Advanced Level:**
- Study Experiment 2 (Midpoint Circle Algorithm)
- Understand 8-way symmetry and decision parameter
- Analyze Experiment 3 (Midpoint Ellipse Algorithm)
- Master two-region approach and 4-way symmetry

---

<!-- =========================================================================================
                                     LAB MANUAL
     ========================================================================================= -->
## Lab Manual

| # | Resource | Description | Link |
|:-:|:---|:---|:-:|
| 1 | Practical Lab (PDF) | Complete laboratory manual with all experiments | [View](PRACTICAL%20LAB.pdf) |

---

<!-- =========================================================================================
                                     EXPERIMENT 1
     ========================================================================================= -->
## Experiment 1: Line Drawing & Basic Shapes (2 Programs)

| # | Program | Algorithm | Description | Source Code |
|:-:|:---|:---|:---|:-:|
| 1 | Bresenhams_Line_Algorithm.c | Bresenham's Line | Efficient line drawing using integer arithmetic | [View](Experiment-1/Bresenhams_Line_Algorithm.c) |
| 2 | Basic_Graphics_Shapes.c | Graphics Primitives | Rectangle, circle, line, ellipse, bar primitives | [View](Experiment-1/Basic_Graphics_Shapes.c) |

---

<!-- =========================================================================================
                                     EXPERIMENT 2
     ========================================================================================= -->
## Experiment 2: Circle Drawing (1 Program)

| # | Program | Algorithm | Description | Source Code |
|:-:|:---|:---|:---|:-:|
| 1 | Midpoint_Circle_Algorithm.c | Midpoint Circle | Circle generation using 8-way symmetry | [View](Experiment-2/Midpoint_Circle_Algorithm.c) |

---

<!-- =========================================================================================
                                     EXPERIMENT 3
     ========================================================================================= -->
## Experiment 3: Ellipse Drawing (1 Program)

| # | Program | Algorithm | Description | Source Code |
|:-:|:---|:---|:---|:-:|
| 1 | Midpoint_Ellipse_Algorithm.c | Midpoint Ellipse | Ellipse generation using 4-way symmetry | [View](Experiment-3/Midpoint_Ellipse_Algorithm.c) |


---

<!-- =========================================================================================
                                     FOOTER SECTION
     ========================================================================================= -->
<div align="center">

  <!-- Footer Navigation -->
  [↑ Back to Top](#computer-graphics-lab)

  [How to Use](#how-to-use) &nbsp;·&nbsp; [Learning Path](#learning-path) &nbsp;·&nbsp; [Lab Manual](#lab-manual) &nbsp;·&nbsp; [Experiment 1](#experiment-1-line-drawing--basic-shapes-2-programs) &nbsp;·&nbsp; [Experiment 2](#experiment-2-circle-drawing-1-program) &nbsp;·&nbsp; [Experiment 3](#experiment-3-ellipse-drawing-1-program)

  <br>

  **[🏠 Back to Main Repository](../)**

</div>

---

<div align="center">

  ### [Computer Graphics and Computer Graphics Lab](../)

  **CSC404 & CSL402 · Semester IV · Computer Engineering**

  *University of Mumbai · Curated by [Amey Thakur](https://github.com/Amey-Thakur)*

</div>
