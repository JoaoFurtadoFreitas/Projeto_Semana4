import CenaMenu from "./CenaMenu.js";
import CenaJogo from "./CenaJogo.js";
import CenaFimJogo from "./CenaFimJogo.js";

// Configuração do Phaser
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FILL, //Aplicação de um tipo de resposividade
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: [CenaMenu, CenaJogo, CenaFimJogo], // Adicionando as cenas
    
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 600 }, debug: false }
    },
};

// Criar o jogo
const game = new Phaser.Game(config);
