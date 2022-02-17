#include<stdio.h>
#include<graphics.h>

int main(){
int gd=DETECT,gm;
initgraph(&gd,&gm,NULL);
int midx,midy,x,y,radius,dp;
radius=100;
midx=getmaxx()/2;
midy=getmaxy()/2;
printf("CIRCLE GENERATION");
printf("\n MAX of x and y is at :%d %d",getmaxx()+1,getmaxy()+1);
printf("\n MID of x and y is at :%d %d",midx+1,midy+1);
outtextxy(10,350,"\n 19DCO06");
printf("\n Press any key to continue");
getch();
dp=1-radius;
x=0,y=radius;
initgraph(&gd,&gm,NULL);

do
{
	putpixel(midx+x,midy+y,GREEN);
	putpixel(midx-x,midy+y,RED);
	putpixel(midx+x,midy-y,YELLOW);
	putpixel(midx-x,midy-y,BLUE);
	putpixel(midx+y,midy+x,GREEN);
	putpixel(midx-y,midy+x,GREEN);
	putpixel(midx+y,midy-x,GREEN);
	putpixel(midx-y,midy-x,GREEN);
	delay(50);
	x=x+1;
	if(dp<0)
	{
		dp=dp+2*x+1;
		}
		else{
			y=y-1;
			dp=dp+2*(x-y)+1;
			}
			
	}while(x<y);
	printf("\n Circle Generation using mid point algorithms begins");
	outtextxy(10,400,"\n Circle Generation using mid point algorithms");
	delay(50000);
	
}
