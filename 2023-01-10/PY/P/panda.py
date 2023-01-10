from direct.showbase.ShowBase import ShowBase,DirectObject
from direct.task import Task
from math import pi,sin,cos
from direct.actor.Actor import Actor
class panda(ShowBase):

    def __init__(self):
        ShowBase.__init__(self)
        self.scene = self.loader.loadModel("models/environment")
        self.scene.reparentTo(self.render)
        self.scene.setScale(0.25,0.25,0.25)
        self.scene.setPos(-8,42,0)
        self.panda = Actor("models/panda-model",{'walk':'models/panda-walk4'})
        self.panda.setScale(0.05,0.05,0.05)
        self.panda.reparentTo(self.render)
        self.panda.loop('walk')
        self.camera
    def goforward(self):
        self.camera.setPos()
app = panda()
app.run()