import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
public class geo {
    public static void main(String[] args) {
        JFrame frame = new JFrame();
        frame.setSize(800, 600);
        cube player = new cube(7000);
        frame.add(player);
        frame.setDefaultCloseOperation(3);
        frame.setVisible(true);
        new Timer(30, new ActionListener(){
            public void actionPerformed(ActionEvent e){
                player.addTime(10);
                
            }
        }).start();
    }
}

class cube extends JTextArea implements KeyListener{
    int[][] points;
    int pos = 300;
    boolean up = false;
    int time = 0;
    void addTime(int timeAdd){
        time += timeAdd;
        repaint();
    }
    public void paint(Graphics g){
        pos = (up ? pos - 1 : pos + 1);
        Polygon player = new Polygon();
        player.addPoint(10, pos);
        player.addPoint(0, pos - 10);
        player.addPoint(30,pos);
        player.addPoint(0, pos+10);
        g.drawPolygon(player);
        Polygon bordera = new Polygon();
        Polygon borderb = new Polygon();
        for (int i = 0; i < points.length;i++){
            bordera.addPoint(points[i][0]-time, points[i][1]);
            borderb.addPoint(points[i][0]-time, 600-points[i][1]);
        }
        g.drawPolygon(bordera);
        g.drawPolygon(borderb);
    }
    public void keyPressed(KeyEvent e) {
        this.up = true;
        pos += 1;
        repaint();
    };
    public void keyReleased(KeyEvent e) {
        this.up = false;
        pos += 1;
        repaint();
    };
    public void keyTyped(KeyEvent e) {};

    cube(int length){
        points = new int[length+2][2];
        points[0][0] = 0;
        points[0][1] = 0;
        points[1][0] = 0;
        points[1][1] = Math.round(new Float(Math.random())*150+100);
        for (int i = 2; i < points.length;i++){
            points[i][0] = i*30;
            points[i][1] = Math.max(Math.min(Math.round(new Float(Math.random()*70 - 35))+points[i-1][1],250),0);
        }
        points[length+1][0] = length*30;
        points[length+1][1] = 0;
        setOpaque(false);
        addKeyListener(this);
    }
}