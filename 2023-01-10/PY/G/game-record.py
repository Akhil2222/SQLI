import pyautogui,os,time,pygame
pygame.init()

os.startfile("chrome.exe")
time.sleep(2)
pyautogui.write("https://poki.com/en/g/g-switch-3")
pyautogui.press("enter")
pyautogui.hotkey("win","alt","r")
time.sleep(2)
pyautogui.drag()
screen = pyautogui.screenshot(rec[0],rec[1])
size = (screen._size[0]-300,screen._size[1]-176)
sco = pygame.image.fromstring(screen.tobytes(),screen._size,screen.mode)
game = pygame.display.set_mode(size)
pygame.display.set_caption('Screenshot')
while True:
    for events in pygame.event.get():
        if events.type == pygame.QUIT:
            pygame.quit()
    screen = pyautogui.screenshot()
    sco = pygame.image.fromstring(screen.tobytes(),screen._size,screen.mode)
    game.blit(sco,(0,0))
    pygame.display.flip()
