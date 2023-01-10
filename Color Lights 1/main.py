import pygame,PIL.Image as filter,numpy as np
pygame.init()
size = (1200,600)
screen = pygame.display.set_mode(size)
image = 'test.jpg'
pil_img = filter.open(image)
game_img = pygame.image.load(image)
img_dat = {
    'pos':np.array((600,300)),
    'size':np.array(game_img.get_size())
}
zoom = 1
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            quit()
        elif event.type == pygame.MOUSEWHEEL:
            zoom *= 1.1**event.y
            pygame.transform.scale_by(game_img,zoom)
    screen.fill((100,100,110))
    screen.blit(game_img,img_dat['pos'])
    pygame.display.flip()
