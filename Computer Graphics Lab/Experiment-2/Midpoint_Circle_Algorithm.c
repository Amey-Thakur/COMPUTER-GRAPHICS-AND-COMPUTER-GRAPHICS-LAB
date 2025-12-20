/**
 * ============================================================================
 * Midpoint Circle Drawing Algorithm
 * ============================================================================
 * 
 * @file        Midpoint_Circle_Algorithm.c
 * @author      Amey Thakur
 * @repository  https://github.com/Amey-Thakur/COMPUTER-GRAPHICS-AND-COMPUTER-GRAPHICS-LAB
 * @experiment  Experiment 2 - Computer Graphics Lab
 * 
 * @description This program implements the Midpoint Circle Drawing Algorithm
 *              (also known as Bresenham's Circle Algorithm). It efficiently
 *              draws circles using only integer arithmetic by exploiting
 *              the 8-way symmetry of circles.
 * 
 * @algorithm   Midpoint Circle Algorithm works by:
 *              1. Start at (0, radius) - top of the circle
 *              2. Use decision parameter to choose next pixel
 *              3. Exploit 8-way symmetry to plot 8 points at once
 *              4. Continue until x >= y (covers 45-degree arc)
 * 
 * @symmetry    For a point (x, y) on the circle, these 8 points are also on it:
 *              (x,y), (-x,y), (x,-y), (-x,-y), (y,x), (-y,x), (y,-x), (-y,-x)
 * 
 * @note        Requires Turbo C++ with graphics.h library
 * 
 * ============================================================================
 */

#include <stdio.h>
#include <graphics.h>

/* ========================== Main Function ================================ */

/**
 * @brief Main function to demonstrate Midpoint Circle Drawing Algorithm
 * @return 0 on successful execution
 */
int main()
{
    /* Graphics driver and mode variables */
    int gd = DETECT, gm;
    
    /* Circle parameters */
    int midx, midy;         /* Center of the circle (screen center) */
    int x, y;               /* Current point coordinates */
    int radius;             /* Circle radius */
    int dp;                 /* Decision parameter */
    
    /* Set circle radius */
    radius = 100;
    
    /* Initialize graphics and get screen dimensions */
    initgraph(&gd, &gm, NULL);
    
    /* Calculate screen center for circle center */
    midx = getmaxx() / 2;
    midy = getmaxy() / 2;
    
    /* Display information */
    printf("============================================\n");
    printf("   Midpoint Circle Drawing Algorithm\n");
    printf("============================================\n\n");
    printf("Screen Resolution: %d x %d\n", getmaxx() + 1, getmaxy() + 1);
    printf("Circle Center: (%d, %d)\n", midx, midy);
    printf("Circle Radius: %d\n\n", radius);
    printf("Press any key to draw the circle...\n");
    
    getch();
    
    /* Clear and reinitialize for drawing */
    cleardevice();
    
    /* Initialize algorithm variables */
    dp = 1 - radius;        /* Initial decision parameter: p = 1 - r */
    x = 0;                  /* Start at x = 0 */
    y = radius;             /* Start at y = radius (top of circle) */
    
    /* Main loop: draw circle using 8-way symmetry */
    do
    {
        /* -------------------- Plot 8 symmetric points -------------------- */
        
        /* Octant 1: (x, y) - Top right */
        putpixel(midx + x, midy - y, GREEN);
        
        /* Octant 2: (y, x) - Right top */
        putpixel(midx + y, midy - x, GREEN);
        
        /* Octant 3: (y, -x) - Right bottom */
        putpixel(midx + y, midy + x, GREEN);
        
        /* Octant 4: (x, -y) - Bottom right */
        putpixel(midx + x, midy + y, RED);
        
        /* Octant 5: (-x, -y) - Bottom left */
        putpixel(midx - x, midy + y, YELLOW);
        
        /* Octant 6: (-y, -x) - Left bottom */
        putpixel(midx - y, midy + x, GREEN);
        
        /* Octant 7: (-y, x) - Left top */
        putpixel(midx - y, midy - x, GREEN);
        
        /* Octant 8: (-x, y) - Top left */
        putpixel(midx - x, midy - y, BLUE);
        
        /* Add delay for visualization */
        delay(50);
        
        /* -------------------- Update position -------------------- */
        
        /* Move to next x position */
        x = x + 1;
        
        /* Decide next y position based on decision parameter */
        if (dp < 0)
        {
            /* Choose pixel at (x+1, y) - stay at same y */
            dp = dp + 2 * x + 1;
        }
        else
        {
            /* Choose pixel at (x+1, y-1) - move y down */
            y = y - 1;
            dp = dp + 2 * (x - y) + 1;
        }
        
    } while (x < y);    /* Continue until 45-degree arc is complete */
    
    /* Display completion message */
    outtextxy(10, 400, "Midpoint Circle Algorithm - Amey Thakur");
    
    /* Wait for user input and close graphics */
    getch();
    closegraph();
    
    return 0;
}

/* ========================== Algorithm Explanation ======================== 
 
 Midpoint Circle Algorithm:
 
 1. Input: Radius r and center (xc, yc)
 
 2. Initialize:
    x = 0, y = r
    dp = 1 - r (initial decision parameter)
    
 3. While x < y:
    a. Plot 8 symmetric points:
       (xc+x, yc+y), (xc-x, yc+y), (xc+x, yc-y), (xc-x, yc-y)
       (xc+y, yc+x), (xc-y, yc+x), (xc+y, yc-x), (xc-y, yc-x)
       
    b. x = x + 1
    
    c. If dp < 0:
          dp = dp + 2*x + 1
       Else:
          y = y - 1
          dp = dp + 2*(x - y) + 1
          
 4. Repeat until x >= y
 
 Time Complexity: O(r) where r is the radius
 Space Complexity: O(1)
 
 Advantages:
 - Uses only integer arithmetic (no floating point)
 - Exploits symmetry to reduce calculations by 8x
 - Efficient and fast for raster displays
 
 ========================================================================== */
