import java.awt.*;
import java.awt.image.*;
import java.io.*;
import java.awt.event.*;
import javax.swing.*;
import javax.sound.sampled.*;

public class run{
    public static void main(String[] args){
        JFrame frame = new JFrame();
        frame.setSize(Toolkit.getDefaultToolkit().getScreenSize());
        frame.setDefaultCloseOperation(3);
        frame.add(new item());
        //Clip victory = AudioSystem.getAudioInputStream(new File("Dungeons of Skill Issues/Music/victory.mp3"));
        //victory.play();
        frame.setVisible(true);
    }

}

public class item extends JTextArea implements KeyListener {
    int[] shift = {0,0};
    Image img = (new ImageIcon("fnf_notes.png")).getImage();
    public void paint(Graphics g){
        g.fillRect(shift[0],shift[1],100,100);
        g.fillRect(shift[0] + 40, shift[1] + 40, 20, 20);
        g.drawImage(img, 0 , 0, getFocusCycleRootAncestor());
    }
    public item(){
        addKeyListener(this);
    }    
    public void keyPressed(KeyEvent e){
        int keycode = e.getKeyCode();
        if(keycode < 41 || keycode > 36){
            int[][] shifts = {{-1,0},{0,-1},{1,0},{0,1}};
            for(int i = 0; i < shift.length; i++){
                this.shift[i] = this.shift[i] + shifts[keycode-37][i];
            };
            repaint();
        }
    }
    public void keyReleased(KeyEvent e){
        int keycode = e.getKeyCode();
        if(keycode < 41 || keycode > 36){
            int[][] shifts = {{-1,0},{0,-1},{1,0},{0,1}};
            for(int i = 0; i < shift.length; i++){
                this.shift[i] = this.shift[i] + shifts[keycode-37][i];
            };
            repaint();
        }
    }
    public void keyTyped(KeyEvent e){}
}
