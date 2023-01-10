import java.awt.*;
import java.awt.event.*;

import javax.swing.*;







/**
 * test
 */

public class test {;
    public static void main(String[] args) {
        JFrame frame = new JFrame("Hoogway");
        int w = 1000,h = 1000;
        
        frame.setSize(w,h);
        frame.setDefaultCloseOperation(3);
        frame.add(new thing(w/20,h/20));
        frame.setVisible(true);
        
    }
}
class thing extends JComponent implements MouseMotionListener{
    int mx = 125;
    int my = 125;
    int width;
    int height;
    int hx = 700;
    int hy = 700;
    int ox = (int)Math.signum(Math.random()-0.5);
    int oy = (int)Math.signum(Math.random()-0.5);
    int  score = 0;
    long whpos = Math.round(-1 + Math.random()*2)*width;
    long hhpos = Math.round(-1 + Math.random()*2)*height;
    String extra = "";
    public thing(int w, int h){
        width = w;
        height = h;
        addMouseMotionListener(this);
    }
    public void paintComponent( Graphics g ){
        g.drawString(("Score:" + score + extra), 20, 20);
        g.setColor(new Color(0,0,255));
        g.fillRect(mx-(width/2), my-(height/2), width, height);
        g.setColor(new Color(0,255,0));
        g.fillRect(ox-(width/2), oy-(height/2), width, height);
        g.setColor(new Color(255,0,0));
        g.fillRect(hx-(width/2), hy-(height/2), width, height);

}
    public void mouseDragged(java.awt.event.MouseEvent e) {
              
    }
    public void mouseMoved(java.awt.event.MouseEvent e) {
        int holx = e.getX();
        int holy = e.getY();
        holx = (int)Math.round(Math.signum((holx - mx)));
        holy = (int)Math.round(Math.signum((holy - my)));
        mx = mx + holx;
        my = my + holy;
        hx = hx + (int)(Math.signum(((ox + whpos) - hx)));
        hy = hy + (int)(Math.signum(((oy + hhpos) - hy)));
        if(whpos == 0 && hhpos == 0){
            whpos = Math.round(-1 + Math.random()*2)*width;
            hhpos = Math.round(-1 + Math.random()*2)*height;
        }
        if(Math.abs(ox-mx) < width/2 && Math.abs(oy-my) < height/2){
            score = score + 1;
            ox = (int)Math.round(Math.random()*700);
            oy = (int)Math.round(Math.random()*700);
            whpos = Math.round(-1 + Math.random()*2)*width;
            hhpos = Math.round(-1 + Math.random()*2)*height;
        }
        if(Math.abs(mx-hx) < width/2 && Math.abs(my-hy) < height/2){
            ox = 100000;
            oy = 100000;
            extra = ",Game Over!";
        }
        repaint();     
        int[] arr = new int[400];
        arr[0] = 1;
        System.out.println(arr[399]);
    }
}