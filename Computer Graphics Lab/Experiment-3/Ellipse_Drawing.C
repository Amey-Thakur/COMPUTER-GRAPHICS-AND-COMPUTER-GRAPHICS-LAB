#include<stdio.h>
#include<graphics.h>
int main()
{
int gdriver=DETECT, gmode;
long midx, midy, xradius, yradius;
long xrad2, yrad2, twoxrad2, twoyrad2;
long x,y,dp,dpx,dpy;
initgraph(&gdriver,&gmode,"C:\\TURBOC3\\BGI");
printf("\n---------------------------------------------");
printf("\nMax of x and y is %d,%d",getmaxx()+1,getmaxy()+1);
printf("\nPress any key to generate ellipse.....");
getch();
setbkcolor(11);
outtextxy(10,100,"19DCO01");
xradius=100, yradius=50; // x axis radius and y axis radius
midx=getmaxx()/2;  //x of center of ellipse
midy=getmaxy()/2;  // y of center of ellipse
xrad2 = xradius * xradius;
yrad2 = yradius * yradius;
twoxrad2 = 2*xrad2;
twoyrad2 = 2*yrad2;
x=dpx=0;
y=yradius;
dpy=twoxrad2 *y;
putpixel(midx+x, midy+y, WHITE);
putpixel(midx-x, midy+y, WHITE);
putpixel(midx+x, midy-y, WHITE);
putpixel(midx-x, midy-y, WHITE);
dp=(long)(0.5+yrad2-(xrad2*yradius)+(0.25*xrad2));
// This loop is working for Region 1 
while(dpx<dpy)  // plot points around y -axis (top/bottom)
{
	x=x+1;  
	dpx = dpx + twoyrad2; 
	if(dp<0)
	dp=dp+yrad2+dpx; 
	else
	{
	y = y-1;  
	dpy = dpy - twoxrad2; 
	dp = dp + yrad2 + dpx - dpy; 
	}
putpixel(midx+x, midy+y, RED);
putpixel(midx-x, midy+y, BLUE);
putpixel(midx+x, midy-y, GREEN); 
putpixel(midx-x, midy-y, YELLOW);
delay(100);
}

dp = (long)(0.5 + yrad2 * (x+0.5) * (x+0.5) + xrad2 * (y-1) * (y-1) - xrad2 * yrad2);
// This loop is working for Region 2
while(y>0)  // plotting points around x- axis (left/right)
{
	y=y-1; 
	dpy=dpy-twoxrad2;
	if(dp>0)
	dp=dp+xrad2-dpy;
	else   //create pixels around x axis
	{
	x=x+1;
	dpx = dpx + twoyrad2;
	dp = dp + xrad2 - dpy + dpx;
	}
putpixel(midx+x, midy+y, YELLOW);
putpixel(midx-x, midy+y, GREEN);
putpixel(midx+x, midy-y, BLUE);
putpixel(midx-x, midy-y, RED);
delay(1000);
}
outtextxy(10,400,"............ELLIPSE END............");
getch();
closegraph(); // dealocate memory for graphic screen
return 0;
}
