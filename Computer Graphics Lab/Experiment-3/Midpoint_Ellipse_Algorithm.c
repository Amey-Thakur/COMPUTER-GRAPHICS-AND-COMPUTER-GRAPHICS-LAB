/**
 * ============================================================================
 * Midpoint Ellipse Drawing Algorithm
 * ============================================================================
 * 
 * @file        Midpoint_Ellipse_Algorithm.c
 * @author      Amey Thakur
 * @repository  https://github.com/Amey-Thakur/COMPUTER-GRAPHICS-AND-COMPUTER-GRAPHICS-LAB
 * @experiment  Experiment 3 - Computer Graphics Lab
 * 
 * @description This program implements the Midpoint Ellipse Drawing Algorithm.
 *              Unlike circles, ellipses have different radii along x and y axes,
 *              requiring the algorithm to handle two distinct regions.
 * 
 * @algorithm   The ellipse is divided into two regions:
 *              Region 1: Where slope magnitude is less than 1 (|dy/dx| < 1)
 *              Region 2: Where slope magnitude is greater than 1 (|dy/dx| > 1)
 *              
 *              The algorithm uses 4-way symmetry of ellipses.
 * 
 * @equation    Ellipse equation: (x/rx)² + (y/ry)² = 1
 *              Or: ry²x² + rx²y² - rx²ry² = 0
 * 
 * @note        Requires Turbo C++ with graphics.h library
 * 
 * ============================================================================
 */

#include <stdio.h>
#include <graphics.h>

/* ========================== Main Function ================================ */

/**
 * @brief Main function to demonstrate Midpoint Ellipse Drawing Algorithm
 * @return 0 on successful execution
 */
int main()
{
    /* Graphics driver and mode variables */
    int gdriver = DETECT, gmode;
    
    /* Ellipse parameters */
    long midx, midy;            /* Center of the ellipse */
    long xradius, yradius;      /* Semi-major and semi-minor axes */
    
    /* Algorithm variables */
    long xrad2, yrad2;          /* Squared radii: rx², ry² */
    long twoxrad2, twoyrad2;    /* Double of squared radii: 2*rx², 2*ry² */
    long x, y;                  /* Current point coordinates */
    long dp;                    /* Decision parameter */
    long dpx, dpy;              /* Partial derivatives for decision */
    
    /* Initialize graphics mode */
    initgraph(&gdriver, &gmode, "C:\\TURBOC3\\BGI");
    
    /* Display information */
    printf("============================================\n");
    printf("   Midpoint Ellipse Drawing Algorithm\n");
    printf("============================================\n\n");
    printf("Screen Resolution: %d x %d\n", getmaxx() + 1, getmaxy() + 1);
    printf("\nPress any key to draw the ellipse...\n");
    
    getch();
    setbkcolor(11);
    
    /* Set ellipse parameters */
    xradius = 100;              /* Horizontal radius (semi-major axis) */
    yradius = 50;               /* Vertical radius (semi-minor axis) */
    
    /* Calculate center of screen */
    midx = getmaxx() / 2;
    midy = getmaxy() / 2;
    
    /* Pre-calculate squared values for efficiency */
    xrad2 = xradius * xradius;              /* rx² */
    yrad2 = yradius * yradius;              /* ry² */
    twoxrad2 = 2 * xrad2;                   /* 2 * rx² */
    twoyrad2 = 2 * yrad2;                   /* 2 * ry² */
    
    /* ==================== REGION 1 ==================== */
    /* Start at (0, ry) and move until slope = -1 */
    
    /* Initialize for Region 1 */
    x = 0;
    dpx = 0;                                /* 2 * ry² * x = 0 initially */
    y = yradius;
    dpy = twoxrad2 * y;                     /* 2 * rx² * y */
    
    /* Plot initial 4 symmetric points */
    putpixel(midx + x, midy + y, WHITE);
    putpixel(midx - x, midy + y, WHITE);
    putpixel(midx + x, midy - y, WHITE);
    putpixel(midx - x, midy - y, WHITE);
    
    /* Decision parameter for Region 1 */
    dp = (long)(yrad2 - (xrad2 * yradius) + (0.25 * xrad2) + 0.5);
    
    /* Region 1: Plot points where |slope| < 1 */
    while (dpx < dpy)
    {
        x = x + 1;
        dpx = dpx + twoyrad2;
        
        if (dp < 0)
        {
            /* Choose E (East) pixel */
            dp = dp + yrad2 + dpx;
        }
        else
        {
            /* Choose SE (South-East) pixel */
            y = y - 1;
            dpy = dpy - twoxrad2;
            dp = dp + yrad2 + dpx - dpy;
        }
        
        /* Plot 4 symmetric points */
        putpixel(midx + x, midy + y, RED);
        putpixel(midx - x, midy + y, BLUE);
        putpixel(midx + x, midy - y, GREEN);
        putpixel(midx - x, midy - y, YELLOW);
        
        delay(50);
    }
    
    /* ==================== REGION 2 ==================== */
    /* Continue from current point until y = 0 */
    
    /* Decision parameter for Region 2 */
    dp = (long)(yrad2 * (x + 0.5) * (x + 0.5) + xrad2 * (y - 1) * (y - 1) 
                - xrad2 * yrad2 + 0.5);
    
    /* Region 2: Plot points where |slope| > 1 */
    while (y > 0)
    {
        y = y - 1;
        dpy = dpy - twoxrad2;
        
        if (dp > 0)
        {
            /* Choose S (South) pixel */
            dp = dp + xrad2 - dpy;
        }
        else
        {
            /* Choose SE (South-East) pixel */
            x = x + 1;
            dpx = dpx + twoyrad2;
            dp = dp + xrad2 - dpy + dpx;
        }
        
        /* Plot 4 symmetric points */
        putpixel(midx + x, midy + y, YELLOW);
        putpixel(midx - x, midy + y, GREEN);
        putpixel(midx + x, midy - y, BLUE);
        putpixel(midx - x, midy - y, RED);
        
        delay(50);
    }
    
    /* Display completion message */
    outtextxy(10, 400, "Midpoint Ellipse Algorithm - Amey Thakur");
    
    /* Wait for user input and close graphics */
    getch();
    closegraph();
    
    return 0;
}

/* ========================== Algorithm Explanation ======================== 
 
 Midpoint Ellipse Algorithm:
 
 Ellipse Equation: F(x,y) = ry²x² + rx²y² - rx²ry² = 0
 
 REGION 1: (Where |slope| < 1, i.e., 2*ry²*x < 2*rx²*y)
 
 1. Start at (0, ry)
 2. Initial: dp = ry² - rx²*ry + 0.25*rx²
 3. While 2*ry²*x < 2*rx²*y:
    - x = x + 1
    - If dp < 0: dp = dp + 2*ry²*x + ry²
    - Else: y = y - 1, dp = dp + 2*ry²*x - 2*rx²*y + ry²
    - Plot 4 symmetric points
    
 REGION 2: (Where |slope| > 1)
 
 1. Continue from Region 1 endpoint
 2. Initial: dp = ry²*(x+0.5)² + rx²*(y-1)² - rx²*ry²
 3. While y > 0:
    - y = y - 1
    - If dp > 0: dp = dp - 2*rx²*y + rx²
    - Else: x = x + 1, dp = dp + 2*ry²*x - 2*rx²*y + rx²
    - Plot 4 symmetric points
 
 4-Way Symmetry Points:
 For point (x, y) on ellipse, also plot: (-x, y), (x, -y), (-x, -y)
 
 Time Complexity: O(rx + ry)
 Space Complexity: O(1)
 
 ========================================================================== */
