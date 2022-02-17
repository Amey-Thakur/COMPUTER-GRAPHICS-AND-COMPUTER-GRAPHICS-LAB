#include<stdio.h>
#include<graphics.h>

int main()
{
int x,y,x1,y1,x2,y2,p,gm,gd=DETECT,dx,dy;
printf("Enter the Co-ordinates of the first point : \n");
scanf("%d",&x1);
scanf("%d",&y1);
printf("Enter the Co-ordinates of the second point : \n");
scanf("%d",&x2);
scanf("%d",&y2);
dx=x2-x1;
dy=y2-y1;
p=2*dy-dx; //Decision Parameter
x=x1;
y=y1;
initgraph(&gd,&gm,"");
setbkcolor(WHITE); 		// to set background color
putpixel(x,y,BLACK);
while(x<=x2)
{
	if(p<0)
	{
		x++;
		p=p+2*dy;
		}
	else
	{
		x++;
		y++;
		p=p+2*(dy+dx);
		}
		delay(100);
	putpixel(x,y,BLACK);
	}
	delay(2000);
	outtextxy(10,400,"19DCO06");
	closegraph();
	return 0;
}
