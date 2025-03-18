export default class CenaMenu extends Phaser.Scene {
    constructor() {
        super("CenaMenu");
    }
    preload(){
        this.load.image("background", "assets/gotham.jpg");
    }
    create() {
        this.add.image(350, 300, "background").setScale(0.7)
        this.add.text(400, 200, "BATMAN", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

        let playButton = this.add.text(400, 300, "Jogar", { fontSize: "24px", fill: "#0f0" })
            .setOrigin(0.5)
            .setInteractive();

        playButton.on("pointerdown", () => {
            this.scene.start("CenaJogo");
        });
    }
}
