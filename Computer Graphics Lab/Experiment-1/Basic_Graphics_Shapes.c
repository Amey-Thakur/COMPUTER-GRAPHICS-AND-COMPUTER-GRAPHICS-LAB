/**
 * ============================================================================
 * Basic Graphics Shapes Drawing
 * ============================================================================
 * 
 * @file        Basic_Graphics_Shapes.c
 * @author      Amey Thakur
 * @repository  https://github.com/Amey-Thakur/COMPUTER-GRAPHICS-AND-COMPUTER-GRAPHICS-LAB
 * @experiment  Experiment 1 - Computer Graphics Lab
 * 
 * @description This program demonstrates the basic graphics primitives
 *              available in the graphics.h library. It draws various shapes
 *              including rectangles, circles, lines, ellipses, and filled bars.
 * 
 * @shapes      1. Rectangle - Using rectangle() function
 *              2. Circle - Using circle() function
 *              3. Line - Using line() function
 *              4. Ellipse - Using ellipse() function
 *              5. Filled Bar - Using bar() function
 *              6. Flood Fill - Using floodfill() function
 * 
 * @note        Requires Turbo C++ with graphics.h library
 * 
 * ============================================================================
 */

#include <stdio.h>
#include <graphics.h>

/* ========================== Main Function ================================ */

/**
 * @brief Main function to demonstrate basic graphics shapes
 * @return 0 on successful execution
 */
int main()
{
    /* Graphics driver and mode variables */
    int gd = DETECT, gm;
    
    /* Shape parameters */
    int left = 100, top = 100;          /* Top-left corner coordinates */
    int right = 200, bottom = 200;       /* Bottom-right corner coordinates */
    int x = 310, y = 160;                /* Center point for circle/ellipse */
    int radius = 30;                      /* Circle radius */
    
    /* Initialize graphics mode */
    /* Note: Update the path to your BGI folder location */
    initgraph(&gd, &gm, "C:\\TC\\BGI");
    
    /* -------------------- Drawing Shapes -------------------- */
    
    /* 1. Draw a rectangle */
    rectangle(left, top, right, bottom);
    
    /* 2. Fill the rectangle with color */
    floodfill(left + 10, top + 10, WHITE);
    
    /* 3. Draw a circle */
    circle(x, y + 200, radius);
    
    /* 4. Draw a filled bar (filled rectangle) */
    bar(left + 300, top, right + 300, bottom);
    
    /* 5. Draw a horizontal line */
    line(left - 10, top + 150, right + 410, top + 150);
    
    /* 6. Draw an ellipse */
    /* Parameters: center(x,y), start_angle, end_angle, x_radius, y_radius */
    ellipse(x, y + 200, 0, 360, 100, 50);
    
    /* -------------------- Display Information -------------------- */
    
    /* Display author information */
    outtextxy(left + 100, top + 105, "Amey Thakur");
    outtextxy(left + 50, top + 125, "Basic Graphics Shapes - CG Lab");
    
    /* Wait for user input */
    getch();
    
    /* Close graphics mode and deallocate memory */
    closegraph();
    
    return 0;
}

/* ========================== Graphics Functions Reference ================= 
 
 1. rectangle(left, top, right, bottom)
    - Draws a rectangle with corners at (left,top) and (right,bottom)
    
 2. circle(x, y, radius)
    - Draws a circle with center at (x,y) and given radius
    
 3. line(x1, y1, x2, y2)
    - Draws a line from point (x1,y1) to (x2,y2)
    
 4. ellipse(x, y, start_angle, end_angle, x_radius, y_radius)
    - Draws an ellipse with center at (x,y)
    - start_angle and end_angle define the arc (0 to 360 for full ellipse)
    
 5. bar(left, top, right, bottom)
    - Draws a filled rectangle (bar)
    
 6. floodfill(x, y, border_color)
    - Fills an enclosed area with the current fill color
    - (x,y) is a point inside the area to fill
    
 7. initgraph(&gd, &gm, path)
    - Initializes the graphics system
    
 8. closegraph()
    - Closes the graphics system and frees memory
 
 ========================================================================== */
