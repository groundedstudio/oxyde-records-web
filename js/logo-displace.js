PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const canvas = document.getElementById('logo')
const app = new PIXI.Application({width: 2010, height: 432, transparent: true, resolution: 1, view: canvas});

app.stage.interactive = true;

const container = new PIXI.Container();
app.stage.addChild(container);

const logo = PIXI.Sprite.from('/oxyde-records-web/static/logo.png');
container.addChild(logo);
logo.x = 0;
logo.y = 0;
logo.height = 427;
logo.width = 2000;


const displacementSprite = PIXI.Sprite.from('/oxyde-records-web/static/clouds.jpg');
// Make sure the sprite is wrapping.
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

displacementSprite.position = logo.position;

app.stage.addChild(displacementSprite);
app.stage.filters = [displacementFilter]

animate();

function animate() {
    displacementSprite.x += 10;
    displacementSprite.y += 4;
    requestAnimationFrame(animate);
}
