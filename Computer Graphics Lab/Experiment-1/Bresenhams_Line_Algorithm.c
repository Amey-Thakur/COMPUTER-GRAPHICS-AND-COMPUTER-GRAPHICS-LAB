/**
 * ============================================================================
 * Bresenham's Line Drawing Algorithm
 * ============================================================================
 * 
 * @file        Bresenhams_Line_Algorithm.c
 * @author      Amey Thakur
 * @repository  https://github.com/Amey-Thakur/COMPUTER-GRAPHICS-AND-COMPUTER-GRAPHICS-LAB
 * @experiment  Experiment 1 - Computer Graphics Lab
 * 
 * @description This program implements Bresenham's Line Drawing Algorithm,
 *              which is an efficient algorithm for drawing lines on raster
 *              displays. It uses only integer arithmetic, making it faster
 *              than algorithms using floating-point calculations.
 * 
 * @algorithm   Bresenham's Algorithm works by:
 *              1. Calculate the slope and initial decision parameter
 *              2. For each x-coordinate, decide whether to increment y
 *              3. Use the decision parameter to choose between two pixels
 *              4. Update the decision parameter based on the choice
 * 
 * @note        Requires Turbo C++ with graphics.h library
 * 
 * ============================================================================
 */

#include <stdio.h>
#include <graphics.h>

/* ========================== Main Function ================================ */

/**
 * @brief Main function to demonstrate Bresenham's Line Drawing Algorithm
 * @return 0 on successful execution
 */
int main()
{
    /* Variable declarations */
    int x, y;                   /* Current pixel coordinates */
    int x1, y1, x2, y2;         /* Start and end point coordinates */
    int p;                      /* Decision parameter */
    int gm, gd = DETECT;        /* Graphics mode and driver */
    int dx, dy;                 /* Differences in x and y coordinates */
    
    /* Get line endpoints from user */
    printf("============================================\n");
    printf("   Bresenham's Line Drawing Algorithm\n");
    printf("============================================\n\n");
    
    printf("Enter the coordinates of the first point:\n");
    printf("X1: ");
    scanf("%d", &x1);
    printf("Y1: ");
    scanf("%d", &y1);
    
    printf("\nEnter the coordinates of the second point:\n");
    printf("X2: ");
    scanf("%d", &x2);
    printf("Y2: ");
    scanf("%d", &y2);
    
    /* Calculate differences */
    dx = x2 - x1;
    dy = y2 - y1;
    
    /* Calculate initial decision parameter: p = 2*dy - dx */
    p = 2 * dy - dx;
    
    /* Initialize starting point */
    x = x1;
    y = y1;
    
    /* Initialize graphics mode */
    initgraph(&gd, &gm, "");
    setbkcolor(WHITE);
    
    /* Plot the starting point */
    putpixel(x, y, BLACK);
    
    /* Main loop: iterate through x coordinates */
    while (x <= x2)
    {
        if (p < 0)
        {
            /* Decision parameter is negative: choose pixel at (x+1, y) */
            x++;
            p = p + 2 * dy;
        }
        else
        {
            /* Decision parameter is non-negative: choose pixel at (x+1, y+1) */
            x++;
            y++;
            p = p + 2 * (dy - dx);
        }
        
        /* Add delay for visualization */
        delay(100);
        
        /* Plot the current pixel */
        putpixel(x, y, BLACK);
    }
    
    /* Display author information */
    delay(2000);
    outtextxy(10, 400, "Amey Thakur - Computer Graphics Lab");
    
    /* Wait for user input and close graphics */
    getch();
    closegraph();
    
    return 0;
}

/* ========================== Algorithm Explanation ======================== 
 
 Bresenham's Line Algorithm (for slope 0 < m < 1):
 
 1. Input: Line endpoints (x1, y1) and (x2, y2)
 
 2. Calculate:
    dx = x2 - x1
    dy = y2 - y1
    
 3. Initial decision parameter:
    p = 2*dy - dx
    
 4. For each x from x1 to x2:
    - If p < 0: Plot (x+1, y) and update p = p + 2*dy
    - Else: Plot (x+1, y+1) and update p = p + 2*(dy - dx)
    
 5. Repeat until x reaches x2
 
 Time Complexity: O(dx) where dx = x2 - x1
 Space Complexity: O(1)
 
 ========================================================================== */
