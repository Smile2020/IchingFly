

export default class Button {
    constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
        this.img = new Image()
        this.img.src = imgSrc

        this.width = width
        this.height = height

        this.x = x
        this.y = y

        this.visible = true
    }

    drawToCanvas(ctx) {
        if (!this.visible) return

        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
    
    isClicked(x, y) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
    }
}



