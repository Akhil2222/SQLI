import pyautogui,pygame,math
pygame.init()
screen = pyautogui.screenshot()
size = (screen._size[0]*0.5,screen._size[1]*0.5)
sco = pygame.image.fromstring(screen.tobytes(),screen._size,screen.mode)
pygame.image.save(sco,"test.png")
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