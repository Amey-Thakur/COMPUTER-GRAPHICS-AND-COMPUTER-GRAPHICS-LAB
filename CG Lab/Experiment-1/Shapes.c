#include<stdio.h>
#include<graphics.h>
//gd=*graphdriver is the integer that specifies which graphics driver is to be used.
//gm=*graphmode is also an integer that specifies the initial graphics mode.
int main()
{
   int gd = DETECT,gm,left=100,top=100,right=200,bottom=200,x= 310,y=160,radius=30;

   initgraph(&gd, &gm, "C:\\TC\\BGI");
   

   rectangle(left,top,right,bottom);
   floodfill(left+10,top+10,WHITE);
   circle(x,y+200,radius);
   bar(left+300,top,right+300,bottom);
   line(left-10,top+150,right+410,top+150);
   ellipse(x,y+200,0,360,100,50);
   outtextxy(left+160,top+105,"19DCO01");
   outtextxy(left+100,top+125,"My first graphics programming c");
   
   getch();
   closegraph();
}
