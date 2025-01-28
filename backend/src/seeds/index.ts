import { seedProducts } from './product.seed';
import { seedUsers } from './user.seed';
import { client } from '../config/redis.config';

const SEED_KEY = 'seeds:executed';

export const runSeeds = async () => {
  console.log('Verificando se os seeds já foram executados...');

  try {
    // Verifica se a chave SEED_KEY já existe no Redis
    const alreadySeeded = await client.get(SEED_KEY);

    if (alreadySeeded) {
      console.log('Os seeds já foram executados anteriormente. Ignorando...');
      return;
    }

    console.log('Iniciando scripts de seed...');
    await seedProducts();
    await seedUsers();

    // Marca os seeds como executados no Redis
    await client.set(SEED_KEY, 'true');
    console.log('Todos os scripts de seed foram executados com sucesso.');

  } catch (err) {
    console.error('Erro ao executar os scripts de seed:', err);
  }
};
