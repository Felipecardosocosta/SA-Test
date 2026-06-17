
CREATE TABLE usuario(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
nome VARCHAR(200) NOT NULL,
email VARCHAR(200) UNIQUE NOT NULL,
senha VARCHAR(200) NOT NULL
);

CREATE TABLE produto(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
nome VARCHAR(200) NOT NULL,
valor DECIMAL(8,2) NOT NULL,
quantidade INT NOT NULL
)

INSERT INTO produto (nome, valor, quantidade) VALUES
('Ração Premium Cães Adultos Frango 15kg', 189.90, 25),
('Ração Seca Gatos Castrados Salmão 3kg', 74.50, 40),
('Sachê Whiskas Carne para Gatos Adultos 85g', 3.20, 150),
('Petisco Bifinho Keldog Carne Cães 60g', 5.90, 80),
('Shampoo Antipulgas Sanol Dog 500ml', 22.90, 30),
('Tapete Higiênico Chamego 30 Unidades', 59.90, 15),
('Areia Sanitária Pipicat Clássica 4kg', 14.90, 50),
('Eliminador de Odores Sanol Herbal 2L', 18.50, 20),
('Brinquedo Mordedor Macaco de Corda', 29.90, 12),
('Arranhador para Gatos com Torre e Rede', 145.00, 5),
('Bolinha de Borracha Maciça Pula-Pula', 12.00, 35),
('Antipulgas e Carrapatos Frontline Gatos', 42.00, 18),
('Vermífugo Drontal Plus para Cães 10kg', 38.90, 22),
('Suplemento Vitamínico Glicopan Pet 30ml', 26.50, 14),
('Cama Pet Quadrada Lavável Tamanho G', 98.90, 8),
('Coleira Guia Retrátil 5 Metros para Cães', 45.00, 15),
('Comedouro de Inox Antiderrapante 450ml', 24.90, 25),
('Caixa de Transporte N2 para Cães e Gatos', 89.90, 10),
('Escova Rasqueadeira para Pelos Mortos', 19.90, 20),
('Cortador de Unhas Pet tipo Alicate', 16.50, 15);


INSERT INTO usuario (nome, email, senha) VALUES(
'joao','joao@email.com','a12345678'
);
