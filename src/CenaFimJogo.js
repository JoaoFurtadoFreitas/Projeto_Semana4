export default class CenaFimJogo extends Phaser.Scene {
    constructor() {
        super("CenaFimJogo");
    }

    create() {
        this.add.text(400, 200, "GAME OVER", { fontSize: "32px", fill: "#f00" }).setOrigin(0.5);

        let restartButton = this.add.text(400, 300, "Reiniciar", { fontSize: "24px", fill: "#0f0" })
            .setOrigin(0.5)
            .setInteractive();

        restartButton.on("pointerdown", () => {
            this.scene.start("CenaJogo");
        });
    }
}
