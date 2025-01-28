import Product from '../models/product.model';
import { client } from '../config/redis.config';

export const seedProducts = async () => {
  const products = [
    {
      name: 'PC Gamer Amd Ryzen 5 5600GT 32GB Ram NVME 500GB Gabinete Graphics Vega 7',
      description: 'O PC Gamer Personalizado da INFO3 Informática apresenta configurações robustas e de alta performance. Conta com uma placa-mãe A520 DDR4 equipada com interfaces HDMI e DVI, entrada de rede de 10/100/1000 Mbps e áudio de alta definição (HD Áudio). O processador é um AMD Ryzen 5 5600GT com 6 núcleos, frequência base de 3.9GHz e turbo de 4.4GHz. A memória é composta por dois módulos de 16GB DDR4, totalizando 32GB, operando a 3200MHz. Para armazenamento, oferece um SSD M.2 NVME de 500GB, garantindo alta velocidade. \n O gabinete é um modelo gamer com iluminação RGB, acompanhado por uma fonte real de 500W bivolt e três coolers fan RGB para refrigeração eficiente. A placa de vídeo integrada é a Radeon Graphics Vega 7, com frequência gráfica de 1900MHz e 7 núcleos gráficos. Inclui ainda um adaptador WiFi USB para conectividade. O sistema operacional é o Windows 11 Pro, e a montagem segue um padrão de alta qualidade da INFO3. \n Por fim, o produto oferece uma garantia premium de 1 ano.',
      price: 2319,
      imageUrl: 'https://m.media-amazon.com/images/I/71POEAtvDYL._AC_SL1080_.jpg',
      category: 'Computer',
      stock: 76,
    },
    {
      name: 'Samsung T350 - Monitor Gamer, 24", FHD, 75Hz, HDMI, VGA, Freesync, Preto',
      description: 'MONITOR GAMER SAMSUNG 22” FHD, 75HZ, HDMI, VGA, FREESYNC, PRETO, SÉRIE T350 \n Mais poder de jogo As configurações de jogo ideais proporcionam uma vantagem instantânea. Detecte inimigos escondidos nas sombras através do contraste ideal, mais nitidez e cenas com cores mais vivas. O Modo de Jogo ajusta qualquer jogo para preencher sua tela visualizando todos os detalhes.',
      price: 500,
      imageUrl: 'https://m.media-amazon.com/images/I/71fExkr1vWL.__AC_SY300_SX300_QL70_ML2_.jpg',
      category: 'Monitor',
      stock: 7,
    },
    {
      name: 'Dell - KM3322W, Teclado e Mouse sem fio, Preto',
      description: 'Projetado para máxima eficiência! Aumente a sua produtividade diária com essa combinação de teclado ABNT2 e mouse sem fio criado para durar. \n Ele se conecta facilmente ao seu PC Dell, tem longa duração da bateria e teclas resistentes a derramamento e antidesbotamento que ajudam a aprimorar sua experiência de trabalho. \n Essa combinação de teclado e mouse oferece uma duração da bateria que está entre as líderes do setor: 36 meses para o teclado e o mouse batendo o ponto por incríveis 18 meses. \n Comprovações rigorosas garantem que esse conjunto funcione perfeitamente com seu sistema Dell; portanto, configurar é fácil. \n Ele começa a funcionar e não perde o pique.',
      price: 129.99,
      imageUrl: 'https://m.media-amazon.com/images/I/51IPtedWrsL._AC_SX679_.jpg',
      category: 'Teclado e Mouse',
      stock: 23,
    },
    {
      name: 'C3Tech Mouse Pad MP-50 Com Apoio Ergonomico e descanso do Pulso',
      description: 'Mouse Pad com apoio de Espuma Para Usuários que sofrem dores na região do pulso Melhora o conforto tanto no uso doméstico ou no trabalho Altura 244 mm Largura 210 mm Espessura 19,7 mm',
      price: 28.99,
      imageUrl: 'https://m.media-amazon.com/images/I/511xtBACGAL._AC_SX679_.jpg',
      category: 'Mouse Pad',
      stock: 54,
    },
    {
      name: 'Monitor Gamer AOC Hero 24" 165Hz 1ms Ajuste de Altura 24G2S/BK',
      description: 'Monitor de 24 polegadas com 165 e tempo de resposta de 1ms.',
      price: 621.09,
      imageUrl: 'https://m.media-amazon.com/images/I/61brVJKRt5L._AC_SX679_.jpg',
      category: 'Monitor',
      stock: 91,
    },
    {
      name: 'Headphone Fone de Ouvido Havit HV-H2002d, Gamer, com Microfone, Falante 53mm, Plug 3.5mm: compatível com XBOX ONE e PS4, HAVIT, HV-H2002d e Outros',
      description: 'Headphone gamer para Xbox One, PS4 e PC.',
      price: 182.02,
      imageUrl: 'https://m.media-amazon.com/images/I/71i5jjOyOEL._AC_SX679_.jpg',
      category: 'Fone de Ouvido',
      stock: 0,
    },
    {
      name: 'Notebook Gamer ROG Strix G16, NVidia RTX4060, CORE I9, 16 GB, 512 GB, Windows 11 Home, Eclipse Gray - G614JV-N3094W',
      description: 'O novo ROG Strix G16 traz a 13 a geração de processadores Intel® Core™ i9-13980HX, que garante o desempenho supremo que você precisa para elevar sua gameplay e carregar seu time em quaisquer desafios, graças aos seus 8 núcleos de performance e 16 núcleos de eficiência. Este poderoso notebook gamer conta com a novíssima placa NVIDIA® GeForce RTX™ 4060, que fornece mais poder de processamento gráfico combinado com uma surpreendente e inovadora tecnologia de inteligência artificial. E com modernos recursos como o novo DLSS 3, que aumenta o FPS dos jogos, o ROG Strix G16 é capaz de trazer uma experiência ainda mais imersiva e realista.',
      price: 9.281,
      imageUrl: 'https://m.media-amazon.com/images/I/51O4bS147tL._AC_SX679_.jpg',
      category: 'Notebook Gamer',
      stock: 7,
    },
  ];

  try {
    const savedProducts = await Product.insertMany(products);

    for (const product of savedProducts) {
      await client.set(
        `product:${product._id}`,
        JSON.stringify(product),
        {
          EX: 3600, // 1 hora de TTL
        }
      );      
    }
    console.log('Produtos criados e salvos no Redis.');
  } catch (err) {
    console.error('Erro ao criar produtos:', err);
  }
};
