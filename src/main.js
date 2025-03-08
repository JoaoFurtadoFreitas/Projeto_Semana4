import CenaMenu from "./CenaMenu.js";
import CenaJogo from "./CenaJogo.js";
import CenaFimJogo from "./CenaFimJogo.js";

// Configuração do Phaser
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [CenaMenu, CenaJogo, CenaFimJogo], // Adicionando as cenas
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 600 }, debug: false }
    }
};

// Criar o jogo
const game = new Phaser.Game(config);
