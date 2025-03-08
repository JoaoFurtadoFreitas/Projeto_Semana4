export default class CenaJogo extends Phaser.Scene {
    constructor() {
        super("CenaJogo");
        this.podePular = true; // Flag que indica se o personagem pode pular
        this.estaPlanando = false; // Flag para verificar se o personagem está planando
        this.direcao = "direita"; // Direção atual do Batman
        this.batarang = false; // Flag que indica se o Batarangue está sendo lançado
        this.historicoAcoes = []; // Lista para armazenar as ações realizadas
    }

    preload() {
        // Carrega as imagens e atlas (spritesheets) que serão usadas no jogo
        this.load.image("fundo", "assets/FundoBatman.png");
        this.load.atlas("batman", "assets/spritesheetBatman.png", "assets/spritesBatman.json");
        this.load.image("plataforma", "assets/plataforma.png");
        this.load.image("bomba", "assets/bomba.png");
        this.load.image("batarang", "assets/batarang.png");
    }

    create() {
        // Adiciona o fundo na tela
        this.add.image(390, 250, "fundo").setScale(0.8);

        // Configura as teclas de controle
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.cursors = this.input.keyboard.createCursorKeys();

        // Cria animações para o personagem (Batman)
        this.anims.create({
            key: "esquerda",
            frames: this.anims.generateFrameNames("batman", { prefix: "andandoesq", start: 0, end: 11, zeroPad: 4 }),
            repeat: -1,
            frameRate: 12,
        });

        this.anims.create({
            key: "direita",
            frames: this.anims.generateFrameNames("batman", { prefix: "andandodi", start: 0, end: 11, zeroPad: 4 }),
            repeat: -1,
            frameRate: 12,
        });

        this.anims.create({
            key: "parado",
            frames: this.anims.generateFrameNames("batman", { prefix: "parado", start: 0, end: 5, zeroPad: 4 }),
            repeat: -1,
            frameRate: 6,
        });

        this.anims.create({
            key: "puloEsquerda",
            frames: this.anims.generateFrameNames("batman", { prefix: "puloesq", start: 0, end: 11, zeroPad: 4 }),
            frameRate: 9,
        });

        this.anims.create({
            key: "puloDireita",
            frames: this.anims.generateFrameNames("batman", { prefix: "pulodi", start: 0, end: 11, zeroPad: 4 }),
            frameRate: 9,
        });

        this.anims.create({
            key: "planando",
            frames: this.anims.generateFrameNames("batman", { prefix: "planar", start: 0, end: 1, zeroPad: 4 }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "batarangEsquerdaChao",
            frames: this.anims.generateFrameNames("batman", { prefix: "lancaesq", start: 0, end: 8, zeroPad: 4 }),
            frameRate: 8,
        });

        this.anims.create({
            key: "batarangDireitaChao",
            frames: this.anims.generateFrameNames("batman", { prefix: "lancadi", start: 0, end: 8, zeroPad: 4 }),
            frameRate: 8,
        });

        this.anims.create({
            key: "batarangEsquerdaAr",
            frames: this.anims.generateFrameNames("batman", { prefix: "lancaesqAr", start: 0, end: 10, zeroPad: 4 }),
            frameRate: 10,
        });

        this.anims.create({
            key: "batarangDireitaAr",
            frames: this.anims.generateFrameNames("batman", { prefix: "lancadiAr", start: 0, end: 10, zeroPad: 4 }),
            frameRate: 10,
        });

        // Cria o personagem Batman com física
        this.batman = this.physics.add.sprite(this.scale.width / 2, this.scale.height / 2, "batman");
        this.batman.setScale(0.7);
        this.batman.setCollideWorldBounds(true); // Impede que o Batman saia da tela
        this.batman.anims.play("parado", true); // Inicia a animação "parado"

        // Cria o sprite do Batarangue, mas o mantém invisível
        this.batarangSprite = this.add.image(0, 0, "batarang").setVisible(false);

        // Evento para detectar o fim da animação do Batarangue
        this.batman.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
            if (anim.key.startsWith("batarang")) {
                this.batarang = false; // Libera o movimento após o ataque
                if (this.batman.body.blocked.down) {
                    if (this.cursors.left.isDown || this.a.isDown) {
                        this.batman.anims.play("esquerda", true);
                    } else if (this.cursors.right.isDown || this.d.isDown) {
                        this.batman.anims.play("direita", true);
                    } else {
                        this.batman.anims.play("parado", true);
                    }
                }
            }
        });
    }

    update() {
        // Itera sobre o histórico de ações e imprime cada uma
        let i = 0;
        while (i < this.historicoAcoes.length) {
            console.log("Ação no histórico:", this.historicoAcoes[i]);
            i++; // Avança para a próxima ação
        }

        // Se não estiver atacando (Batarangue não está lançado), permite movimentação
        if (!this.batarang) {
            // Movimentação horizontal
            if (this.cursors.left.isDown || this.a.isDown) {
                this.batman.setVelocityX(-160);
                this.direcao = "esquerda";
                if (this.batman.body.blocked.down) {
                    this.batman.anims.play("esquerda", true);
                }

                // Adiciona a ação ao histórico
                this.historicoAcoes.push("Andou para a esquerda");
            } else if (this.cursors.right.isDown || this.d.isDown) {
                this.batman.setVelocityX(160);
                this.direcao = "direita";
                if (this.batman.body.blocked.down) {
                    this.batman.anims.play("direita", true);
                }

                // Adiciona a ação ao histórico
                this.historicoAcoes.push("Andou para a direita");
            } else {
                this.batman.setVelocityX(0);
                if (this.batman.body.blocked.down) {
                    this.batman.anims.play("parado", true);
                }

                // Adiciona a ação ao histórico
                this.historicoAcoes.push("Ficou parado");
            }

            // Pulo
            if ((this.cursors.up.isDown || this.w.isDown || this.spacebar.isDown) && this.batman.body.blocked.down) {
                this.batman.setVelocityY(-450);
                this.estaPlanando = false;

                if (this.direcao === "esquerda") {
                    this.batman.anims.play("puloEsquerda", true);
                } else {
                    this.batman.anims.play("puloDireita", true);
                }

                // Adiciona a ação ao histórico
                this.historicoAcoes.push("Pulou");
            }

            // Planar
            if (this.spacebar.isDown && !this.batman.body.blocked.down && this.batman.body.velocity.y > 0) {
                if (!this.estaPlanando) {
                    this.batman.anims.play("planando", true);
                    this.estaPlanando = true;
                }
                this.batman.setVelocityY(50); // Reduz a velocidade de queda

                // Adiciona a ação ao histórico
                this.historicoAcoes.push("Está planando");
            }
        }

        // Lançar batarangue
        if (Phaser.Input.Keyboard.JustDown(this.x) && !this.batarang) {
            this.lancarBatarangue();

            // Adiciona a ação ao histórico
            this.historicoAcoes.push("Lançou batarangue");
        }

        // Bloqueia animações de movimento se a animação do batarangue estiver em andamento
        if (this.batman.anims.currentAnim && this.batman.anims.currentAnim.key.startsWith("batarang")) {
            this.batman.setVelocityX(0);  // Impede o movimento durante o ataque
        }
    }

    lancarBatarangue() {
        this.batarang = true; // Bloqueia movimento e ataque até a animação acabar

        // Definir a animação de lançamento
        if (this.batman.body.blocked.down) {
            if (this.direcao === "esquerda") {
                this.batman.anims.play("batarangEsquerdaChao", true);
            } else {
                this.batman.anims.play("batarangDireitaChao", true);
            }
        } else {
            if (this.direcao === "esquerda") {
                this.batman.anims.play("batarangEsquerdaAr", true);
            } else {
                this.batman.anims.play("batarangDireitaAr", true);
            }
        }

        // Lançar o batarangue
        let direcao = 0;
        let destinoBatarangue = 0;

        if (this.cursors.left.isDown || this.a.isDown) {
            direcao = -1;
            destinoBatarangue = 0;
        } else if (this.cursors.right.isDown || this.d.isDown) {
            direcao = 1;
            destinoBatarangue = this.scale.width;
        }

        if (direcao !== 0) {
            this.batarangSprite.setVisible(true);
            this.batarangSprite.setPosition(this.batman.x, this.batman.y); // Lança o batarangue da posição do Batman
            this.batarangSprite.setScale(0.5); // Ajuste de escala

            this.batarangSprite.setFlipX(direcao === -1);

            // Movimento do batarangue
            this.tweens.add({
                targets: this.batarangSprite,
                x: destinoBatarangue,
                duration: 1000,
                ease: "Power2",
                onComplete: () => {
                    this.batarangSprite.setVisible(false);  // Esconde o batarangue após o movimento
                }
            });
        }
    }
}
